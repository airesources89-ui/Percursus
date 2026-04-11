// ═══════════════════════════════════════════════════════════════
// PRECURSUS WORKER — serves HTML + handles all API routes
// KV binding: PRECURSUS_KV
// ═══════════════════════════════════════════════════════════════

import INDEX_HTML from './index.html';
import AI_ADVISOR_HTML from './ai-advisor.html';
import ADMIN_HTML from './admin-precursus.html';

const ADMIN_PASSWORD = 'Dick.4879';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function html(content, status = 200) {
  return new Response(content, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function authCheck(request) {
  return request.headers.get('X-Admin-Password') === ADMIN_PASSWORD;
}

// ── SLUG GENERATOR ──
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // ══════════════════════════════════════
    // STATIC PAGES
    // ══════════════════════════════════════

    if (path === '/' || path === '/index.html') {
      return html(INDEX_HTML);
    }

    if (path === '/ai-advisor.html' || path === '/ai-advisor') {
      return html(AI_ADVISOR_HTML);
    }

    if (path === '/admin-precursus.html' || path === '/admin-precursus') {
      return html(ADMIN_HTML);
    }

    // ══════════════════════════════════════
    // API: BLOG POSTS
    // ══════════════════════════════════════

    // GET /api/posts — public, returns published posts
    if (path === '/api/posts' && request.method === 'GET') {
      try {
        const index = await env.PRECURSUS_KV.get('blog:index');
        if (!index) return json({ posts: [] });

        const slugs = JSON.parse(index);
        const posts = [];

        for (const slug of slugs) {
          const raw = await env.PRECURSUS_KV.get(`blog:post:${slug}`);
          if (raw) {
            const post = JSON.parse(raw);
            if (post.published) {
              // Return summary (no full body for list view)
              posts.push({
                slug: post.slug,
                title: post.title,
                date: post.date,
                category: post.category,
                excerpt: post.excerpt,
                author: post.author || 'Precursus Think Tank',
              });
            }
          }
        }

        // Sort newest first
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        return json({ posts });
      } catch (e) {
        return json({ error: 'Failed to load posts' }, 500);
      }
    }

    // GET /api/posts/:slug — public, returns full post
    if (path.startsWith('/api/posts/') && request.method === 'GET') {
      const slug = path.replace('/api/posts/', '');
      const raw = await env.PRECURSUS_KV.get(`blog:post:${slug}`);
      if (!raw) return json({ error: 'Not found' }, 404);
      const post = JSON.parse(raw);
      if (!post.published) return json({ error: 'Not found' }, 404);
      return json({ post });
    }

    // GET /api/admin/posts — admin, returns ALL posts including unpublished
    if (path === '/api/admin/posts' && request.method === 'GET') {
      if (!authCheck(request)) return json({ error: 'Unauthorized' }, 401);
      try {
        const index = await env.PRECURSUS_KV.get('blog:index');
        if (!index) return json({ posts: [] });
        const slugs = JSON.parse(index);
        const posts = [];
        for (const slug of slugs) {
          const raw = await env.PRECURSUS_KV.get(`blog:post:${slug}`);
          if (raw) posts.push(JSON.parse(raw));
        }
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        return json({ posts });
      } catch (e) {
        return json({ error: 'Failed to load posts' }, 500);
      }
    }

    // POST /api/admin/posts — create new post
    if (path === '/api/admin/posts' && request.method === 'POST') {
      if (!authCheck(request)) return json({ error: 'Unauthorized' }, 401);
      try {
        const body = await request.json();
        const { title, date, category, excerpt, content, published, author } = body;
        if (!title || !content) return json({ error: 'Title and content required' }, 400);

        const slug = slugify(title) + '-' + Date.now();
        const post = { slug, title, date: date || new Date().toISOString().split('T')[0], category: category || 'General', excerpt: excerpt || content.substring(0, 160) + '...', content, published: !!published, author: author || 'Precursus Think Tank', createdAt: new Date().toISOString() };

        // Save post
        await env.PRECURSUS_KV.put(`blog:post:${slug}`, JSON.stringify(post));

        // Update index
        const indexRaw = await env.PRECURSUS_KV.get('blog:index');
        const slugs = indexRaw ? JSON.parse(indexRaw) : [];
        slugs.unshift(slug);
        await env.PRECURSUS_KV.put('blog:index', JSON.stringify(slugs));

        return json({ success: true, slug });
      } catch (e) {
        return json({ error: 'Failed to create post' }, 500);
      }
    }

    // PUT /api/admin/posts/:slug — update post
    if (path.startsWith('/api/admin/posts/') && request.method === 'PUT') {
      if (!authCheck(request)) return json({ error: 'Unauthorized' }, 401);
      try {
        const slug = path.replace('/api/admin/posts/', '');
        const existing = await env.PRECURSUS_KV.get(`blog:post:${slug}`);
        if (!existing) return json({ error: 'Not found' }, 404);

        const body = await request.json();
        const post = { ...JSON.parse(existing), ...body, slug, updatedAt: new Date().toISOString() };
        await env.PRECURSUS_KV.put(`blog:post:${slug}`, JSON.stringify(post));
        return json({ success: true });
      } catch (e) {
        return json({ error: 'Failed to update post' }, 500);
      }
    }

    // DELETE /api/admin/posts/:slug — delete post
    if (path.startsWith('/api/admin/posts/') && request.method === 'DELETE') {
      if (!authCheck(request)) return json({ error: 'Unauthorized' }, 401);
      try {
        const slug = path.replace('/api/admin/posts/', '');
        await env.PRECURSUS_KV.delete(`blog:post:${slug}`);

        // Remove from index
        const indexRaw = await env.PRECURSUS_KV.get('blog:index');
        if (indexRaw) {
          const slugs = JSON.parse(indexRaw).filter(s => s !== slug);
          await env.PRECURSUS_KV.put('blog:index', JSON.stringify(slugs));
        }
        return json({ success: true });
      } catch (e) {
        return json({ error: 'Failed to delete post' }, 500);
      }
    }

    // ══════════════════════════════════════
    // API: LEAD CAPTURE
    // ══════════════════════════════════════

    if (path === '/api/advisor-lead' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, question, timestamp, source } = body;
        if (!email) return json({ error: 'Email required' }, 400);

        const key = `lead:${Date.now()}:${email.replace(/[^a-z0-9]/gi, '')}`;
        await env.PRECURSUS_KV.put(key, JSON.stringify({ email, question, timestamp, source }), { expirationTtl: 60 * 60 * 24 * 365 });

        return json({ success: true });
      } catch (e) {
        return json({ error: 'Failed to save lead' }, 500);
      }
    }

    // ══════════════════════════════════════
    // API: FAQ TRACKING
    // ══════════════════════════════════════

    if (path === '/api/track-faq' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { faq_id, question, timestamp } = body;

        // Increment counter
        const countKey = `faq:count:${faq_id}`;
        const existing = await env.PRECURSUS_KV.get(countKey);
        const count = existing ? parseInt(existing) + 1 : 1;
        await env.PRECURSUS_KV.put(countKey, String(count));

        return json({ success: true });
      } catch (e) {
        return json({ success: true }); // silent fail for tracking
      }
    }

    // ── 404 ──
    return new Response('Not found', { status: 404 });
  }
};
