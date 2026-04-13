// PRECURSUS WORKER — weekly blog auto-poster + API
// KV: PRECURSUS_KV | Cron: every Monday 13:00 UTC (8am CT)

const ADMIN_PASSWORD = 'Dick.4879';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
};

// ── 52 WEEKLY POSTS ──────────────────────────────────────────────
const SCHEDULED_POSTS = [
  {
    week: 1,
    title: 'Why Every Gulf Coast Small Business Needs an AI Strategy in 2026',
    category: 'AI Strategy',
    excerpt: 'AI isn\'t just for big corporations anymore. Here\'s why Gulf Coast small businesses that start now will have a decisive advantage over competitors who wait.',
    content: '<p>If you own a small business on the Mississippi Gulf Coast, the businesses that figure out AI in 2026 will have a significant advantage over those that wait. This is the same pattern we saw with websites in the 1990s, social media in the 2010s, and online reviews around 2015. Early adopters pulled ahead.</p><h3>What AI Means for a Local Business</h3><p>For a plumber in Gulfport, a restaurant in Bay St. Louis, or a boutique in Ocean Springs, AI means three practical things: saving time on repetitive tasks, capturing leads you are currently missing, and communicating better with customers without hiring more staff.</p><h3>The Gulf Coast Advantage</h3><p>AI adoption among small businesses in Mississippi is still relatively low. If you start now, you are getting ahead of the curve in a market where most competitors are still doing things the old way. The businesses succeeding fastest pick one problem and solve it with AI first.</p><p><strong>First Step:</strong> Identify the single most time-consuming repetitive task in your business. Write it down. That is your AI starting point.</p>'
  },
  {
    week: 2,
    title: 'The 5 AI Tools Gulf Coast Small Businesses Are Using Right Now',
    category: 'Tools & Resources',
    excerpt: 'From free to affordable, these five AI tools are delivering real results for Mississippi small businesses today — no tech background required.',
    content: '<p>These are five tools that Gulf Coast small business owners are actually using right now, not theoretical future technology, but practical tools available today.</p><h3>1. ChatGPT (Free or $20/month)</h3><p>The most versatile AI tool available. Use it to write customer emails, draft social posts, create job listings, respond to reviews, and brainstorm marketing ideas.</p><h3>2. Google Gemini (Free with Google Workspace)</h3><p>If your business already uses Gmail and Google Docs, Gemini is built right in. It summarizes email threads, drafts replies, and helps you create documents faster.</p><h3>3. Canva AI (Free tier available)</h3><p>Creating professional graphics used to require a designer. Canva AI lets you generate social media images, flyers, and promotional materials in minutes.</p><h3>4. Tidio (Free tier available)</h3><p>A website chat widget powered by AI that answers customer questions automatically, even at midnight.</p><h3>5. Otter.ai (Free tier available)</h3><p>Records and transcribes meetings, phone calls, and voice notes automatically.</p><p><strong>First Step:</strong> Pick one tool from this list and spend 30 minutes with it this week. Just one.</p>'
  },
  {
    week: 3,
    title: 'How AI Phone Answering Is Changing the Game for Gulf Coast Service Businesses',
    category: 'Operations',
    excerpt: 'Mississippi contractors, HVAC companies, and service businesses are recovering thousands in lost revenue by letting AI answer calls after hours.',
    content: '<p>62 percent of calls to small service businesses go unanswered after hours. On the Gulf Coast, where storm season creates unpredictable demand surges, that missed call usually means a missed job.</p><h3>What Happens When Someone Calls</h3><p>When a customer calls your business and you do not answer, an AI picks up. It greets the caller using your business name, answers common questions, collects caller contact information, books an appointment or estimate, and sends you an instant text summary.</p><h3>The Math for a Gulf Coast Contractor</h3><p>Say you are an HVAC company in Harrison County. Your average job is $800. You miss five calls per week after hours. If even two of those callers would have hired you, that is $1,600 per week in recoverable revenue. An AI phone system costs roughly $50 to $150 per month.</p><p><strong>First Step:</strong> Count how many calls you miss in a single day. Multiply that by your average job value.</p>'
  },
  {
    week: 4,
    title: 'AI for Mississippi Restaurants: Cut Waste, Fill Seats, Save Hours',
    category: 'Industry Spotlight',
    excerpt: 'Gulf Coast restaurants are using AI to predict demand, manage reservations, respond to reviews, and create marketing content — without adding staff.',
    content: '<p>The restaurant business on the Gulf Coast is uniquely challenging: tourist season swings, hurricane disruptions, fresh seafood inventory that spoils, and customers who leave reviews the moment they walk out the door.</p><h3>Demand Forecasting and Food Waste</h3><p>AI demand forecasting tools analyze your historical sales data, local event calendars, weather patterns, and day-of-week trends to predict volume with surprising accuracy.</p><h3>Reservation and Waitlist Management</h3><p>Tools like OpenTable and Resy now have AI built in that manages your floor automatically, optimizing table turns and predicting no-shows.</p><h3>Review Response at Scale</h3><p>AI tools can draft personalized review responses in seconds. Consistent review responses improve your local search ranking.</p><h3>Social Media Content</h3><p>AI writing tools can generate a week of social media captions in 15 minutes.</p><p><strong>First Step:</strong> Pull your last 90 days of Google reviews. Count how many you have responded to. If less than 80 percent, use ChatGPT this week to draft responses to the ones you missed.</p>'
  },
  {
    week: 5,
    title: 'The Real Cost of AI for Small Businesses (No Hype, Just Numbers)',
    category: 'Cost & ROI',
    excerpt: 'Confused about what AI actually costs? Here\'s a plain-English breakdown of what Gulf Coast small businesses actually pay — and what they get for it.',
    content: '<p>One of the biggest barriers to AI adoption is confusion about cost. People assume AI is either free or enterprise-priced. The reality is somewhere in between.</p><h3>The Free Tier Reality</h3><p>Several genuinely useful AI tools have free tiers: ChatGPT basic, Google Gemini, Canva AI, Tidio, and Mailchimp. These free tiers are real and useful, not crippled demos.</p><h3>The $50 to $200 Per Month Range</h3><p>A full AI-powered website with booking, follow-up automation, and basic AI phone answering runs $99 to $218 per month through done-for-you platforms built for local service businesses.</p><h3>The ROI Calculation</h3><p>An AI phone system costs $100 per month. It recovers two missed leads per week at a $400 average job value. That is $3,200 per month in recovered revenue against $100 in cost.</p><p><strong>First Step:</strong> Pick the AI tool you are most curious about and find its pricing page. Look for a free trial. Commit to testing one tool for 30 days.</p>'
  },
  {
    week: 6,
    title: 'AI and Hurricane Preparedness: How Gulf Coast Businesses Stay Ahead of the Storm',
    category: 'Gulf Coast',
    excerpt: 'Hurricane season is a fact of life on the Mississippi Gulf Coast. AI tools are helping local businesses communicate faster, recover smarter, and build customer loyalty that outlasts any storm.',
    content: '<p>If you have operated a business on the Gulf Coast for any length of time, you know that hurricane preparedness is a core business competency. AI tools now give small businesses capabilities that used to require a full communications and operations team.</p><h3>Before the Storm: Mass Communication in Minutes</h3><p>When a storm is 48 hours out, AI-powered communication tools can draft and send mass emails, texts, and social media posts to your entire customer list in minutes.</p><h3>During Recovery: AI Phone Systems Handle the Surge</h3><p>After a storm, service businesses get slammed with calls simultaneously while staff is stretched thin. An AI phone system handles the overflow, collecting caller information and triaging urgency.</p><h3>Building Loyalty Through Crisis Communication</h3><p>Businesses that communicate well during disasters build lasting customer loyalty.</p><p><strong>First Step:</strong> This week, draft your storm communication templates using ChatGPT. It takes an hour now and saves critical time when it matters most.</p>'
  },
  {
    week: 7,
    title: 'How to Use AI to Dominate Local Google Search on the Gulf Coast',
    category: 'Marketing',
    excerpt: 'Local SEO is the most valuable marketing channel for Gulf Coast small businesses. AI tools are making it faster and more effective than ever — here\'s exactly what to do.',
    content: '<p>When someone in Gulfport searches HVAC repair near me or a visitor in Biloxi searches best seafood restaurant, the businesses that show up at the top are the ones that have done the work of local SEO. AI tools are making that work dramatically faster.</p><h3>Start With Your Google Business Profile</h3><p>Your Google Business Profile is free, and most small businesses have barely touched it. Use ChatGPT to write a compelling business description loaded with the keywords your customers actually search.</p><h3>Review Responses as SEO</h3><p>Google rewards businesses that respond consistently to reviews. Every response is an opportunity to include relevant keywords naturally. AI can generate these responses in seconds.</p><h3>Fresh Content on a Schedule</h3><p>Posting to your Google Business Profile weekly signals that your business is active. AI can generate caption text for your posts in seconds.</p><p><strong>First Step:</strong> Log into your Google Business Profile and look at your business description. If it is thin or generic, use ChatGPT to rewrite it today.</p>'
  },
  {
    week: 8,
    title: 'AI for Gulf Coast Contractors: Never Miss Another Lead',
    category: 'Industry Spotlight',
    excerpt: 'Plumbers, electricians, roofers, and HVAC technicians on the Gulf Coast are using AI to capture leads 24/7, generate estimates faster, and follow up automatically.',
    content: '<p>Gulf Coast contractors face specific challenges that AI is unusually well-suited to solve. You are often on job sites without phone access. Your customers frequently call in emergencies. Storm season creates demand surges that overwhelm even well-staffed operations.</p><h3>The 24/7 Lead Capture Problem</h3><p>Leads who call at 10pm are often the most motivated buyers. If your voicemail picks up, they call the next contractor on their list. An AI phone system changes this equation entirely.</p><h3>Faster Estimates with AI</h3><p>AI writing tools help you build estimate templates for your most common job types and generate professional proposal language in minutes.</p><h3>Storm Season Surge Management</h3><p>After a major storm, AI phone systems triage calls, separating emergency situations from non-urgent repairs and managing customer expectations.</p><p><strong>First Step:</strong> Check your missed call log from the past week. Multiply the number by your average job value. Then search AI answering service for contractors and request one free demo.</p>'
  },
  {
    week: 9,
    title: 'Social Media AI: A Full Month of Content in One Afternoon',
    category: 'Marketing',
    excerpt: 'Gulf Coast small businesses are using AI to create a full month of social media content in a single sitting. Here\'s the exact process — step by step.',
    content: '<p>Social media is one of the most time-consuming marketing tasks for small business owners and one of the easiest to hand off to AI.</p><h3>Step 1: Define Your Content Mix</h3><p>A good mix for most Gulf Coast businesses: 40 percent educational, 30 percent promotional, 20 percent community, 10 percent customer stories.</p><h3>Step 2: Use ChatGPT to Generate All 20</h3><p>Prompt: I own a [type of business] in [city], Mississippi. Write 20 social media posts for Facebook and Instagram. My tone is [friendly/professional/casual]. Each post should be 2 to 3 sentences with a call to action.</p><h3>Step 3: Create Graphics with Canva AI</h3><p>For posts that need visuals, open Canva and use their AI tools to generate or edit images.</p><h3>Step 4: Schedule Everything at Once</h3><p>Tools like Meta Business Suite, Buffer, or Hootsuite let you schedule all 20 posts in advance.</p><p><strong>First Step:</strong> Spend 30 minutes with ChatGPT generating five social media posts for your business. Schedule them using Meta Business Suite.</p>'
  },
  {
    week: 10,
    title: 'AI for Retail on the Gulf Coast: Inventory, Marketing, and Customer Loyalty',
    category: 'Industry Spotlight',
    excerpt: 'Gulf Coast retail stores are using AI to predict inventory needs, create marketing content, and build the customer loyalty programs that keep shoppers coming back.',
    content: '<p>Gulf Coast retail has a unique rhythm: tourist season spikes, local event surges around Mardi Gras and festivals, hurricane-driven demand shifts, and the constant challenge of competing with online retailers.</p><h3>Inventory Prediction</h3><p>AI inventory tools analyze your historical sales data, seasonal patterns, and upcoming local events to predict what you will sell and when. For a gift shop in Ocean Springs gearing up for the Peter Anderson Festival, this kind of demand forecasting directly impacts profitability.</p><h3>Product Descriptions That Sell</h3><p>Writing compelling product descriptions for dozens or hundreds of items is a grind. AI generates professional, SEO-friendly product descriptions in seconds.</p><h3>Customer Loyalty Programs</h3><p>AI-powered loyalty platforms identify your highest-value customers and trigger personalized offers automatically.</p><p><strong>First Step:</strong> Pick your three best-selling products. Use ChatGPT to rewrite their descriptions with better SEO and more compelling language.</p>'
  },
  {
    week: 11,
    title: 'How Gulf Coast Tourism Businesses Are Using AI to Fill Rooms and Boats Year-Round',
    category: 'Industry Spotlight',
    excerpt: 'Hotels, vacation rentals, charter fishing operations, and tour companies on the Gulf Coast are using AI to maximize bookings, automate guest communication, and build repeat business.',
    content: '<p>Tourism is the economic engine of the Mississippi Gulf Coast, and AI is reshaping how businesses in this industry operate.</p><h3>Dynamic Pricing</h3><p>AI dynamic pricing tools analyze demand signals, competitor rates, local events, and weather forecasts, and adjust your prices automatically to maximize revenue.</p><h3>Automated Guest Communication</h3><p>From booking confirmation to pre-arrival instructions to post-stay review requests, AI handles the entire guest communication sequence automatically.</p><h3>Charter Fishing and Tour Operations</h3><p>Gulf Coast charter captains use AI for automated booking, deposit collection, weather-related rescheduling communication, and post-trip review requests.</p><p><strong>First Step:</strong> Review your post-stay communication process. Are you consistently asking every guest for a review? Set up one automated text or email this week.</p>'
  },
  {
    week: 12,
    title: 'AI Writing Tools: The Unfair Advantage for Time-Strapped Business Owners',
    category: 'Tools & Resources',
    excerpt: 'Writing takes time most small business owners don\'t have. AI writing tools change the equation — here\'s how Gulf Coast entrepreneurs are communicating better in less time.',
    content: '<p>Most small business owners are not writers by training or inclination. But running a business requires constant writing: emails, review responses, social posts, proposals, job listings, and more. AI writing tools have made this dramatically easier.</p><h3>The Core Tool: ChatGPT</h3><p>ChatGPT can write in virtually any style, for any audience, on any topic. The key to getting good output is giving good input. Be specific about your audience, your tone, the purpose of the piece, and any key details you want included.</p><h3>Practical Use Cases for Gulf Coast Businesses</h3><p>Customer emails: describe the situation and ask ChatGPT to draft the email. Review responses: paste the review text and ask for a professional response. Job listings: describe the role and AI drafts a compelling listing.</p><h3>Maintaining Your Voice</h3><p>Always add one or two specific local details that only you would know.</p><p><strong>First Step:</strong> The next email you need to write, give ChatGPT a one-sentence description and ask it to write the full email. You will be surprised.</p>'
  },
  {
    week: 13,
    title: 'AI for Healthcare and Medical Practices on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Medical and dental practices across Mississippi are using AI to reduce no-shows, handle after-hours inquiries, and improve patient communication — while staying HIPAA compliant.',
    content: '<p>Healthcare is one of the fastest-growing areas of AI adoption among small businesses. The administrative burden in medical and dental practices is enormous, and AI tools are specifically designed to reduce it.</p><h3>Appointment Reminders and No-Show Reduction</h3><p>An AI-powered patient communication system sends automated reminders via text and email, allows patients to confirm or reschedule with a simple reply, and fills cancellation slots automatically from a waitlist. Practices using automated reminder systems typically see no-show rates drop 30 to 50 percent.</p><h3>After-Hours Patient Inquiries</h3><p>An AI chat or phone system can handle common after-hours inquiries including office hours, location, insurance accepted, and appointment scheduling.</p><h3>The HIPAA Reality</h3><p>Any AI tool handling actual patient health information must be HIPAA-compliant. Use healthcare-specific platforms for anything touching patient data.</p><p><strong>First Step:</strong> Calculate your no-show rate from last month. If it is above 10 percent, research an AI-powered patient reminder system this week.</p>'
  },
  {
    week: 14,
    title: 'Building a Year-Round Marketing Calendar with AI',
    category: 'Marketing',
    excerpt: 'Stop scrambling for marketing ideas at the last minute. Here\'s how Gulf Coast businesses are using AI to build a complete year of marketing content in a single planning session.',
    content: '<p>One of the most common marketing failures for small businesses is not lack of effort, it is lack of planning. AI solves this by making the planning process fast enough that you can actually do it.</p><h3>The Annual Marketing Calendar Framework</h3><p>For Gulf Coast businesses, anchor your calendar to predictable local events: Mardi Gras season in January and February, spring break in March, summer tourist peak from June through August, hurricane season awareness, fall festivals including Peter Anderson in Ocean Springs, and holiday season.</p><h3>Using AI to Build the Calendar</h3><p>Prompt: I own a [business type] in [city], Mississippi. Create a month-by-month marketing calendar with suggested themes, promotions, and content ideas for social media, email, and Google Business Profile posts.</p><h3>Content Batching with AI</h3><p>Spend one afternoon per quarter generating all the copy for the next three months. Schedule it in advance and your marketing runs on autopilot.</p><p><strong>First Step:</strong> Open ChatGPT and ask it to list every relevant holiday and marketing opportunity for a small business in coastal Mississippi, month by month.</p>'
  },
  {
    week: 15,
    title: 'AI Customer Service: How Small Businesses Are Competing with Big Box Stores',
    category: 'Operations',
    excerpt: 'Large retailers have had AI-powered customer service for years. Now Gulf Coast small businesses can access the same capabilities — and deliver a more personal experience doing it.',
    content: '<p>Gulf Coast small businesses can now deploy AI customer service tools for $50 to $100 per month that match or exceed what large retailers offer.</p><h3>Website Chat: Your 24/7 Sales Person</h3><p>An AI chat widget on your website answers visitor questions immediately, at any hour. For a home services company, it qualifies leads and books estimates. For a retail store, it answers questions about inventory, hours, and returns.</p><h3>What AI Customer Service Does Better Than Humans</h3><p>AI is faster, more consistent, available 24/7, and infinitely patient. For routine, repetitive inquiries, AI handles them excellently.</p><h3>What AI Cannot Replace</h3><p>Complex complaints, emotionally charged situations, and anything requiring genuine human judgment should always route to a real person.</p><p><strong>First Step:</strong> Visit your own website as if you were a customer. How easy is it to get a question answered right now? If the answer is not very easy, look up Tidio this week and start a free trial.</p>'
  },
  {
    week: 16,
    title: 'AI Hiring Tools: Find Better Employees Faster on the Gulf Coast',
    category: 'Operations',
    excerpt: 'Hiring is one of the most time-consuming and high-stakes activities for small business owners. AI tools are cutting hiring time in half and improving the quality of candidates who make it through.',
    content: '<p>Finding good employees on the Gulf Coast is genuinely competitive. The hospitality, construction, and service industries are all fishing from the same talent pool, and the cost of a bad hire is significant.</p><h3>Better Job Listings with AI</h3><p>A generic listing attracts generic applicants. An AI-written listing that clearly describes the role, the culture, and the growth opportunities attracts candidates who actually fit.</p><h3>Application Screening</h3><p>AI screening tools can review applications against your stated criteria and surface the top candidates before you spend time reading every submission.</p><h3>Interview Preparation</h3><p>AI can generate structured interview question sets tailored to the specific role. Structured interviews produce more reliable comparisons than unstructured conversations.</p><p><strong>First Step:</strong> The next time you need to hire, use ChatGPT to write the job listing before you post it anywhere. Compare the AI version to what you would have written.</p>'
  },
  {
    week: 17,
    title: 'AI for Accounting and Financial Management: No CPA Degree Required',
    category: 'Operations',
    excerpt: 'AI-powered accounting tools are making financial management accessible for Gulf Coast small business owners who aren\'t numbers people.',
    content: '<p>For most small business owners, accounting is the task they dread most and understand least. AI-powered accounting tools are changing this dramatically.</p><h3>Automated Transaction Categorization</h3><p>Modern accounting platforms like QuickBooks Online, FreshBooks, and Wave use AI to automatically categorize your business transactions as they come in. The AI learns your patterns over time and gets more accurate each month.</p><h3>Receipt Capture and Processing</h3><p>Take a photo of a receipt with your phone. AI extracts the vendor, date, amount, and suggested category automatically. The receipt is stored digitally and the expense is recorded.</p><h3>Cash Flow Forecasting</h3><p>AI cash flow tools analyze your income and expense patterns and project your bank balance weeks in advance. For businesses with seasonal cash flow on the Gulf Coast, this is invaluable.</p><p><strong>First Step:</strong> If you are still managing finances in a spreadsheet, sign up for a free trial of Wave, which is genuinely free, or QuickBooks Simple Start.</p>'
  },
  {
    week: 18,
    title: 'The Gulf Coast Small Business Guide to AI Email Marketing',
    category: 'Marketing',
    excerpt: 'Email marketing delivers the highest ROI of any digital marketing channel. AI tools are making it faster and more effective for Gulf Coast businesses — here\'s how to get started.',
    content: '<p>Email marketing remains the highest-ROI marketing channel available to small businesses, returning an average of $36 for every $1 spent. The reason most small businesses do not use it consistently is that writing good emails takes time. AI eliminates that barrier.</p><h3>Building Your List</h3><p>Every customer interaction is an opportunity to collect an email address: checkout, service completion, reservation booking, website visits. AI helps you write the sign-up offers that convert visitors into subscribers.</p><h3>The AI Email Writing Process</h3><p>Describe the email you need to ChatGPT: Write a promotional email for a [business type] in [city], Mississippi announcing [promotion]. Tone: friendly. Include a clear call to action. Edit the output for your voice. Done in five minutes instead of thirty.</p><h3>Automation Sequences</h3><p>Build welcome sequences, re-engagement sequences, and post-purchase review requests once using AI-drafted content, and they run forever.</p><p><strong>First Step:</strong> Sign up for a free Mailchimp account and import your customer email list. Send one AI-drafted email this week.</p>'
  },
  {
    week: 19,
    title: 'AI for Legal Professionals on the Gulf Coast: More Clients, Less Paperwork',
    category: 'Industry Spotlight',
    excerpt: 'Mississippi attorneys and legal professionals are using AI to draft documents faster, research more efficiently, and serve more clients without adding staff.',
    content: '<p>The legal profession is one of the most document-intensive businesses that exists. AI is making a significant dent in that burden for solo practitioners and small firms on the Gulf Coast.</p><h3>Document Drafting</h3><p>AI excels at drafting routine legal documents: standard contracts, demand letters, client correspondence, intake questionnaires, and straightforward agreements. The AI produces a complete, professional first draft in minutes. All AI-generated legal documents require attorney review before use.</p><h3>Legal Research Assistance</h3><p>AI legal research tools can summarize case law, identify relevant precedents, and provide overviews of legal issues faster than traditional research platforms.</p><h3>Client Intake and Communication</h3><p>AI phone and chat systems handle after-hours intake calls, collecting basic case information and scheduling consultations automatically.</p><p><strong>First Step:</strong> Identify the document type you draft most frequently in your practice. Use ChatGPT to draft one this week. Note the time savings, then multiply that by how many you draft per month.</p>'
  },
  {
    week: 20,
    title: 'AI Chatbots for Your Website: Setup, Cost, and What to Expect',
    category: 'Tools & Resources',
    excerpt: 'An AI chat widget on your website can answer questions, collect leads, and book appointments 24/7. Here\'s everything Gulf Coast business owners need to know to get started.',
    content: '<p>A website without a way for visitors to get immediate answers is a missed opportunity. An AI chat widget gives every visitor an immediate, helpful response at any hour, on any day, without any staff involvement.</p><h3>How Website AI Chat Works</h3><p>A small chat widget appears in the corner of your website. When a visitor clicks it, they can type a question. The AI responds immediately, drawing from information you have provided about your business: your services, your hours, your pricing, your FAQs, your location.</p><h3>Setup: Easier Than You Think</h3><p>Most AI chat platforms provide a code snippet you paste into your website once. A basic setup takes two to four hours. A thorough setup with booking integration takes a full day.</p><h3>Platform Options and Costs</h3><p>Tidio: free tier available, paid from $29 per month. Intercom: starts around $74 per month. For most Gulf Coast small businesses, Tidio is the right starting point.</p><p><strong>First Step:</strong> Identify the five questions a first-time visitor would most likely want to ask. Write down the answers. That is your AI chat configuration starting point.</p>'
  },
  {
    week: 21,
    title: 'How AI is Helping Gulf Coast Businesses Manage Online Reputation',
    category: 'Marketing',
    excerpt: 'Your online reputation on Google, Yelp, and Facebook directly impacts how many customers find and choose your business. AI tools are making reputation management faster and more effective.',
    content: '<p>Your online reputation is your most valuable marketing asset, and most Gulf Coast small businesses are managing it poorly — not because they do not care, but because responding to reviews consistently is time-consuming. AI tools are changing that.</p><h3>Why Online Reputation Matters More Than Ever</h3><p>93 percent of consumers say online reviews influence their purchasing decisions. Your average star rating on Google directly impacts your search ranking.</p><h3>AI-Powered Review Response</h3><p>Respond to every review, positive or negative, within 48 hours. AI makes it possible without significant time investment. Paste the review text into ChatGPT, ask for a professional and personalized response, edit for your voice, and post.</p><h3>Generating More Reviews</h3><p>AI-powered CRM tools automate this: when a job is completed, an automatic text goes to the customer asking for a Google review with a direct link.</p><p><strong>First Step:</strong> Search your business name on Google right now. Read your last 10 reviews. How many have responses? Use ChatGPT to draft responses to any that do not.</p>'
  },
  {
    week: 22,
    title: 'AI for Agriculture and Aquaponics on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Mississippi farmers, aquaponics operators, and specialty agriculture businesses are using AI to forecast demand, build customer relationships, and compete in premium markets.',
    content: '<p>Agriculture on the Mississippi Gulf Coast is evolving. Specialty producers including microgreens, mushrooms, aquaponics systems, honey, and herbs are finding that direct-to-consumer models offer better margins than commodity markets.</p><h3>Demand Forecasting for Perishable Products</h3><p>The core challenge in specialty agriculture is perishability. AI demand forecasting tools analyze your historical sales, seasonal patterns, and customer ordering behavior to help you grow the right quantities at the right times. For aquaponics operations growing fish and produce simultaneously, this planning is essential for profitability.</p><h3>Building a Subscription Model</h3><p>Community Supported Agriculture and subscription box models provide predictable revenue and committed customers. AI tools help you manage subscription logistics and communicate with members.</p><h3>Grant Writing Assistance</h3><p>AI writing tools can significantly improve your grant application quality for USDA, state agriculture departments, and environmental organizations.</p><p><strong>First Step:</strong> Write a one-paragraph description of your agricultural operation. Then use ChatGPT to expand it into a compelling business description suitable for a website, farmers market booth, or grant application.</p>'
  },
  {
    week: 23,
    title: 'The AI Tools That Save Gulf Coast Business Owners the Most Time',
    category: 'Tools & Resources',
    excerpt: 'Time is the scarcest resource for small business owners. These are the AI tools that deliver the biggest time savings for Gulf Coast entrepreneurs — ranked by impact.',
    content: '<p>Every small business owner faces the same fundamental constraint: not enough hours in the day. Here are the highest-impact AI time-savers, ranked by typical hours saved per week.</p><h3>1. AI Writing Assistance: 3 to 5 Hours Per Week</h3><p>Every email, social post, review response, proposal, and document you write takes time. AI writing assistance cuts the time on each of these by 60 to 80 percent.</p><h3>2. AI Phone Answering: 5 to 10 Hours Per Week</h3><p>An AI phone system handles routine calls automatically, answering questions, collecting information, and booking appointments. For businesses handling 20 or more calls per day, this saves many hours weekly.</p><h3>3. Automated Review Management: 1 to 2 Hours Per Week</h3><p>AI-powered review management handles monitoring automatically and speeds up response drafting dramatically.</p><h3>4. Social Media Scheduling: 2 to 3 Hours Per Week</h3><p>AI content generation plus scheduling tools can compress a week of social media work into 30 minutes.</p><p><strong>First Step:</strong> Track how much time you spend this week on each category above. At the end of the week, you will know exactly where AI will have the biggest impact.</p>'
  },
  {
    week: 24,
    title: 'AI Security: Protecting Your Business from AI-Powered Threats',
    category: 'Getting Started',
    excerpt: 'As AI becomes more powerful, so do the threats using it. Gulf Coast small businesses need to understand the new AI-powered scams and security risks — and how to protect against them.',
    content: '<p>As Gulf Coast businesses adopt AI to improve their operations, they are also becoming targets for increasingly sophisticated AI-powered scams and security threats.</p><h3>AI-Powered Phishing</h3><p>AI-generated phishing emails are now perfectly written, personalized to your business, and include accurate details pulled from your public-facing web presence. The defense: establish clear verification procedures for any email requesting money transfers or account changes.</p><h3>Deepfake Voice Scams</h3><p>AI can now clone a voice from a few seconds of audio. Establish a code word or verification process for any unusual financial request, even from a voice you recognize.</p><h3>Protecting Customer Data</h3><p>Read the privacy policies of the AI platforms you use before entering customer data. Never enter sensitive customer information including payment details or Social Security numbers into general-purpose AI tools.</p><p><strong>First Step:</strong> Share this article with your employees this week. Awareness is your most cost-effective security investment.</p>'
  },
  {
    week: 25,
    title: 'Halfway Through the Year: Measuring Your AI ROI',
    category: 'Cost & ROI',
    excerpt: 'If you\'ve been following this series, you\'ve had six months of AI tools in your business. Here\'s how to measure what\'s working, what\'s not, and where to focus for the second half of the year.',
    content: '<p>We are at the midpoint of the year, a good time to assess what AI has actually delivered for your business.</p><h3>The Metrics That Matter</h3><p>Revenue metrics: Have your monthly sales increased? Has your average transaction value changed? Operational metrics: How many calls are being handled by AI versus requiring human attention? Marketing metrics: How are your Google review count and average rating trending?</p><h3>What Good AI ROI Looks Like</h3><p>A business spending $200 per month on AI tools should be seeing at minimum $600 to $800 per month in value, whether that is recovered revenue, time saved, or cost avoided.</p><h3>What to Do If the Numbers Are Disappointing</h3><p>If you are not seeing clear ROI after six months, the issue is almost always one of three things: the tool is not configured for your specific business, you are not using it consistently, or you chose the wrong tool for your biggest problem.</p><p><strong>First Step:</strong> Spend 30 minutes pulling together the data: your revenue trend, your call volume, your review count, your social media metrics. Write them down and compare to six months ago.</p>'
  },
  {
    week: 26,
    title: 'AI for Marine and Fishing Businesses on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Charter captains, marine supply businesses, and boat repair shops on the Gulf Coast are using AI to fill booking calendars, manage customer communication, and compete in a crowded market.',
    content: '<p>The Gulf Coast marine industry operates in one of the most beautiful but also most competitive and weather-dependent markets imaginable.</p><h3>Booking and Scheduling for Charter Operations</h3><p>Charter fishing captains deal with a specific operational challenge: multi-person bookings, deposit management, weather-dependent rescheduling, and the need to communicate quickly when conditions change. AI-powered booking systems handle online reservations and collect deposits automatically.</p><h3>Weather Communication</h3><p>Nothing damages a charter operation\'s reputation faster than poor communication around weather cancellations. AI communication tools let you send instant, professional updates to all affected customers simultaneously.</p><h3>Post-Trip Content and Reviews</h3><p>AI writing tools help captains turn a few notes about a day\'s catch into a compelling social media post or trip report. Combined with automated review requests, this content flywheel builds powerful organic marketing momentum.</p><p><strong>First Step:</strong> Check your last 20 customers. How many left a Google review? Set up one automated follow-up text this week with a review request and direct link.</p>'
  },
  {
    week: 27,
    title: 'AI Automation: Set It and Forget It Business Systems',
    category: 'Operations',
    excerpt: 'The most valuable AI applications run automatically in the background, doing work while you focus on the business. Here\'s how to build automated systems that run your business while you sleep.',
    content: '<p>The concept is simple: a trigger happens, and a defined response fires automatically without human involvement. AI-powered automation makes the responses intelligent and personalized rather than just templated.</p><h3>The Automation Mindset</h3><p>Start by identifying the repetitive sequences in your business. Every time X happens, you do Y. These sequences are automation opportunities. Each one you automate is work your staff never has to think about again.</p><h3>Customer Journey Automation</h3><p>Map the typical customer journey in your business: awareness, inquiry, booking, service, follow-up, repeat. Each transition in that journey can be automated.</p><h3>Lead Follow-Up Automation</h3><p>Leads are exponentially more likely to convert if contacted within five minutes of their inquiry. An AI-powered lead response system sends an immediate, intelligent response to every inquiry within seconds.</p><p><strong>First Step:</strong> Identify one repetitive customer communication sequence in your business. Write down the trigger and the response. Then research whether your current tools have automation features that can handle it.</p>'
  },
  {
    week: 28,
    title: 'Using AI to Compete Against Bigger Businesses on the Gulf Coast',
    category: 'AI Strategy',
    excerpt: 'Large corporations have technology and marketing budgets that dwarf what most small businesses spend. AI is closing that gap — here\'s how Gulf Coast small businesses are using it to punch above their weight.',
    content: '<p>AI is compressing the capability gap between large corporations and small businesses. The AI tools available to a solo contractor in Bay St. Louis are essentially the same tools available to a Fortune 500 company, at a fraction of the cost.</p><h3>Marketing Quality</h3><p>AI gives a single business owner access to professional-quality copywriting, graphic design, social media management, and email marketing for a few hundred dollars per month.</p><h3>Customer Service Speed</h3><p>AI phone answering, chat, and follow-up systems let small businesses offer both: immediate response at any hour AND the personal touch when a human is needed. That combination is genuinely hard for large corporations to replicate.</p><h3>Local Authenticity</h3><p>Here is an advantage AI cannot give large corporations: genuine local knowledge and relationships. Use AI to amplify your local authenticity.</p><p><strong>First Step:</strong> Identify the area where you feel most outgunned by larger competitors. Pick one and research which AI tool addresses it. Start there.</p>'
  },
  {
    week: 29,
    title: 'AI Video and Visual Content for Gulf Coast Businesses',
    category: 'Marketing',
    excerpt: 'Video is the highest-engagement content on every social media platform. AI tools are making it possible for Gulf Coast small businesses to create professional video content without a production team.',
    content: '<p>Video content generates dramatically higher engagement than text or images on every social media platform. For Gulf Coast businesses, with the natural backdrop of the water, the seafood, the boats, and the beauty of coastal Mississippi, video is an especially powerful tool.</p><h3>AI Video Creation Tools</h3><p>Several AI platforms now convert text into video automatically: you write a script, the AI generates visuals, adds voiceover, and produces a finished video. Tools like InVideo and Canva Video are accessible and affordable.</p><h3>Your Own Video, Enhanced by AI</h3><p>AI tools enhance your authentic footage with automatic captions, background noise reduction, and smart editing. Captions are essential for social media where most videos are watched without sound.</p><h3>Short-Form Video for Social Media</h3><p>Instagram Reels, Facebook Reels, and TikTok all prioritize short-form video content in their algorithms. A 30 to 60 second video showing your business gets dramatically more reach than a text post.</p><p><strong>First Step:</strong> Film one 60-second video on your phone this week showing something real about your business. Upload it to Instagram Reels or Facebook Reels. Raw authenticity performs remarkably well for local businesses.</p>'
  },
  {
    week: 30,
    title: 'AI for Event Planning and Management on the Gulf Coast',
    category: 'Operations',
    excerpt: 'From festivals to corporate events to private parties, Gulf Coast event businesses are using AI to plan better, communicate faster, and deliver more memorable experiences.',
    content: '<p>The Gulf Coast has a rich event culture, from the Peter Anderson Arts and Crafts Festival in Ocean Springs to private events at waterfront venues throughout the coast. Businesses in the event space face constant coordination challenges that AI tools are increasingly well-equipped to handle.</p><h3>Event Planning and Timeline Management</h3><p>AI can generate comprehensive event planning timelines from scratch. Give it the event type, date, scale, and key requirements, and it produces a complete checklist with deadlines and vendor coordination points.</p><h3>Client Communication and Proposals</h3><p>Event proposals are elaborate documents that take significant time to produce. AI drafts the narrative sections, suggested vendor recommendations, and FAQ answers while you focus on pricing and logistics.</p><h3>Post-Event Follow-Up</h3><p>AI-automated follow-up sequences handle this perfectly: a thank-you message the next day, a review request two days later, a referral invitation a week later.</p><p><strong>First Step:</strong> Use ChatGPT this week to create a master event planning checklist for your most common event type. That checklist, refined over time, becomes one of your most valuable operational assets.</p>'
  },
  {
    week: 31,
    title: 'AI Pricing Strategy: Charge What You\'re Worth',
    category: 'Cost & ROI',
    excerpt: 'Most Gulf Coast small businesses are undercharging. AI tools can help you analyze the market, communicate your value, and implement pricing strategies that improve your margins.',
    content: '<p>Pricing is one of the most consequential and most avoided decisions in small business. Most owners set prices based on gut feel, what competitors charge, or what they have always charged. AI tools can bring rigor to pricing decisions.</p><h3>Market Rate Analysis</h3><p>AI tools help you systematically gather and analyze pricing information from competitors, industry benchmarks, and customer expectations. Use ChatGPT to analyze the pricing you find and identify where your rates sit relative to the market.</p><h3>Value Communication</h3><p>The most common reason small businesses undercharge is that they fail to communicate their value effectively. AI writing tools help you articulate what makes your business worth premium pricing.</p><h3>Package and Bundle Strategy</h3><p>Bundling services into packages typically increases average transaction value and simplifies the customer decision. AI helps you design bundle packages that are attractive to customers while protecting your margins.</p><p><strong>First Step:</strong> When did you last raise your prices? If it has been more than 18 months, they are almost certainly below market. Use ChatGPT to research what comparable businesses charge in similar markets.</p>'
  },
  {
    week: 32,
    title: 'Building an AI-Powered Customer Loyalty Program',
    category: 'Marketing',
    excerpt: 'Repeat customers are more profitable than new ones. AI-powered loyalty programs help Gulf Coast businesses identify their best customers, reward them intelligently, and keep them coming back.',
    content: '<p>It costs five to seven times more to acquire a new customer than to retain an existing one. AI-powered loyalty programs are making sophisticated retention marketing accessible and affordable for Gulf Coast businesses.</p><h3>What AI Adds to Loyalty Programs</h3><p>AI identifies which customers are most valuable, not just most frequent but most profitable, predicts which customers are at risk of churning before they disappear, and tailors offers to individual customer preferences.</p><h3>Customer Segmentation</h3><p>AI can automatically segment your customer base into meaningful groups: high-frequency low-spend, low-frequency high-spend, seasonal-only, lapsed, and at-risk. Each segment requires a different retention strategy.</p><h3>Personalized Rewards</h3><p>AI makes reward offers more relevant to individual customers based on their purchase history. This relevance dramatically improves redemption rates and customer satisfaction.</p><p><strong>First Step:</strong> Pull your customer list and identify your top 20 customers by revenue over the past 12 months. If any have not been in for 60 or more days, send them a personal message this week.</p>'
  },
  {
    week: 33,
    title: 'AI for Property Management and Real Estate on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Gulf Coast property managers, real estate agents, and vacation rental operators are using AI to automate tenant communication, generate listings, and manage more properties with the same staff.',
    content: '<p>The Gulf Coast real estate and property management market is active and diverse, from short-term vacation rentals to long-term residential properties to commercial spaces in the casino corridor.</p><h3>Listing Generation</h3><p>A compelling property listing is the difference between a vacancy that sits for weeks and one that fills in days. AI writing tools generate professional, evocative property descriptions in minutes. For Gulf Coast properties, emphasizing proximity to the water, local dining, and coastal lifestyle is particularly effective.</p><h3>Tenant and Guest Communication</h3><p>Property managers handle an enormous volume of repetitive communication. AI handles all of this through automated sequences that feel personal because they are specific to the property and the tenant.</p><h3>Maintenance Management</h3><p>AI tools can help you manage maintenance requests more efficiently, categorizing by urgency and routing to the right contractor.</p><p><strong>First Step:</strong> Take your current property listings and use ChatGPT to rewrite the description, emphasizing the Gulf Coast lifestyle and the unique features of the property. The difference in quality will be immediately apparent.</p>'
  },
  {
    week: 34,
    title: 'Getting Your Team to Actually Use AI Tools',
    category: 'Getting Started',
    excerpt: 'Buying AI tools is easy. Getting your employees to use them consistently is the real challenge. Here\'s how Gulf Coast business owners are successfully rolling out AI adoption across their teams.',
    content: '<p>One of the most common AI adoption failures is not choosing the wrong tool, it is failing to get employee buy-in. You invest in an AI platform, the team uses it for a week, then gradually falls back to old habits.</p><h3>Address the Fear First</h3><p>Many employees are worried that AI will replace their jobs. Be explicit and honest. Tell your team exactly what AI will and will not change about their roles. Frame it as an upgrade to their capabilities, not a threat to their position.</p><h3>Start with a Champion</h3><p>In almost every successful AI rollout, there is one person who gets genuinely excited about a tool and becomes the internal champion. Find that person and invest in their expertise first.</p><h3>Make It Part of the Process</h3><p>The most successful AI adoptions integrate the tool into existing workflows rather than asking employees to add a new step.</p><p><strong>First Step:</strong> This week, identify the one employee most likely to be enthusiastic about AI tools. Have a conversation about what AI could take off their plate.</p>'
  },
  {
    week: 35,
    title: 'AI for Nonprofit and Community Organizations on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Gulf Coast nonprofits, community organizations, and civic groups are using AI to stretch limited resources, communicate more effectively, and have greater impact.',
    content: '<p>Nonprofits and community organizations face a unique set of challenges: important missions, limited resources, and constant communication demands. AI tools are proving particularly valuable in this sector.</p><h3>Grant Writing Assistance</h3><p>Grant writing is one of the most time-consuming activities for nonprofit staff. AI writing tools can significantly accelerate the process, generating first drafts of narrative sections and ensuring the language is compelling and funder-appropriate.</p><h3>Donor Communication</h3><p>Consistent, personalized donor communication is essential for retention. AI helps nonprofits generate thank-you letters, impact reports, newsletter content, and fundraising appeals faster and at higher quality.</p><h3>Social Media and Awareness</h3><p>A month of social media content can be planned and drafted in a single afternoon with AI, then scheduled to post automatically.</p><p><strong>First Step:</strong> Identify the grant application that is due soonest. Use ChatGPT to draft one section of that application this week. See how much time it saves compared to writing from scratch.</p>'
  },
  {
    week: 36,
    title: 'AI for Auto Repair and Auto Services on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Auto repair shops across Mississippi are using AI to improve customer communication, manage service reminders, and compete more effectively against dealer service departments.',
    content: '<p>The auto repair business on the Gulf Coast is competitive. Independent shops compete with dealer service departments, quick-lube chains, and each other for customers who have more options than ever.</p><h3>Service Reminder Automation</h3><p>AI-powered service reminder systems track each vehicle service history and automatically send reminders when maintenance is due: oil changes, tire rotations, brake inspections. The reminder is personalized to the specific vehicle and customer, and it fires automatically without anyone at the shop thinking about it.</p><h3>Customer Communication During Service</h3><p>AI communication tools can send automated status updates that keep customers informed without requiring a service advisor to make individual calls.</p><h3>Review Generation</h3><p>AI-powered follow-up systems send every customer a review request immediately after pickup, while the positive experience is fresh.</p><p><strong>First Step:</strong> Check when you last reached out to your top 20 customers about upcoming service needs. If you do not have a systematic service reminder process, that is your AI starting point.</p>'
  },
  {
    week: 37,
    title: 'The Future of AI on the Gulf Coast: What\'s Coming in the Next Two Years',
    category: 'AI Strategy',
    excerpt: 'AI capabilities are advancing rapidly. Here\'s an honest look at what Gulf Coast businesses should expect in AI technology over the next 24 months — and how to position now.',
    content: '<p>Certain trajectories are clear enough to inform strategic planning for Gulf Coast businesses. Here is an honest look at what is likely coming and how to think about positioning your business for it.</p><h3>AI Will Become More Embedded, Less Noticeable</h3><p>Within two years, AI will be embedded in virtually every business software platform you already use: your email client, your accounting software, your scheduling platform, your point-of-sale system. The question will not be whether to use AI but how.</p><h3>Voice AI Will Become More Natural</h3><p>AI phone systems and voice assistants will become indistinguishable from human agents in routine customer service interactions. Get ahead of this now by building AI phone systems into your operation before it becomes standard.</p><h3>Cost Will Continue to Fall</h3><p>AI capabilities that cost hundreds of dollars per month today will cost tens of dollars in two years. Early adopters will have the advantage of experience and customer data, not capital.</p><p><strong>First Step:</strong> The best preparation for an AI-rich future is building AI habits now. Every week you use AI tools, you get better at using them and accumulate more customer data.</p>'
  },
  {
    week: 38,
    title: 'AI for Beauty and Wellness Businesses on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Salons, spas, fitness studios, and wellness businesses across Mississippi are using AI to fill appointment books, retain clients, and compete with national chains.',
    content: '<p>Beauty and wellness businesses on the Gulf Coast operate in a relationship-driven industry where client retention is everything.</p><h3>Online Booking and Schedule Optimization</h3><p>AI-powered booking systems let clients book online 24/7, automatically handle confirmations and reminders, manage waitlists for popular time slots, and optimize the schedule to minimize gaps and maximize revenue per hour.</p><h3>Client Retention Communication</h3><p>The most common reason clients leave a salon or wellness practice is that they feel forgotten between visits. AI communication tools automate the touchpoints that make clients feel valued: a birthday message, a reminder, a seasonal promotion tailored to their service history.</p><h3>Product Recommendations</h3><p>AI can analyze a client service history and recommend relevant retail products. Relevant product recommendations feel like good service, not sales.</p><p><strong>First Step:</strong> Calculate your no-show and cancellation rate from last month. If it is above 10 percent, implement automated appointment reminders immediately.</p>'
  },
  {
    week: 39,
    title: 'AI Document Management: Organize Your Business, Reduce Your Stress',
    category: 'Operations',
    excerpt: 'Most small businesses are drowning in documents — contracts, invoices, permits, photos, correspondence. AI document management tools bring order to the chaos and make critical information instantly findable.',
    content: '<p>AI document management goes beyond simple file storage. It reads and understands the content of your documents, extracting key information like parties, dates, amounts, and terms. It makes every document searchable by content, not just by filename.</p><h3>Automatic Organization</h3><p>Upload a document and AI categorizes it automatically based on its content. A contract goes into contracts. An invoice goes into accounts payable. A permit goes into regulatory compliance.</p><h3>Expiration and Renewal Alerts</h3><p>Business licenses, insurance policies, contractor licenses, leases, and vendor contracts all have expiration dates that matter. AI document management systems read these dates and alert you automatically before they expire.</p><p><strong>First Step:</strong> Spend one hour this week locating and digitizing your three most critical business documents: your business license, your primary insurance policy, and your most important vendor contract. Store digital copies in Google Drive.</p>'
  },
  {
    week: 40,
    title: 'AI for Gulf Coast Landscaping and Lawn Care Businesses',
    category: 'Industry Spotlight',
    excerpt: 'Landscaping and lawn care companies across Mississippi are using AI to optimize routes, capture leads after hours, and build the recurring service base that creates predictable revenue.',
    content: '<p>Lawn care and landscaping on the Gulf Coast has a natural rhythm. The growing season is long, the demand for curb appeal is year-round, and storm cleanup creates periodic surge demand.</p><h3>Route Optimization</h3><p>For a lawn care company servicing 30 or 40 properties per week, the route you run determines your profitability. AI route optimization tools analyze your customer locations and crew availability to generate routes that minimize drive time and maximize productive hours.</p><h3>Recurring Service Management</h3><p>AI CRM tools help you manage recurring customer relationships: automated invoicing, service confirmation messages, weather delay notifications, and renewal reminders at the end of the season.</p><h3>Lead Capture During Peak Demand</h3><p>During spring startup season and after major storms, an AI phone system handles overflow calls, collecting property addresses and service requirements while you are out in the field.</p><p><strong>First Step:</strong> How many recurring service customers do you have? What is your annual renewal rate? If your renewal rate is below 85 percent, implement an automated renewal sequence 30 to 45 days before the season ends.</p>'
  },
  {
    week: 41,
    title: 'AI Ethics for Small Business: Using AI Responsibly',
    category: 'Getting Started',
    excerpt: 'As AI becomes more capable and more integrated into Gulf Coast businesses, understanding how to use it ethically — for your customers, your employees, and your community — becomes increasingly important.',
    content: '<p>As AI becomes more embedded in how you operate, some ethical considerations become practically important because they affect customer trust, employee relationships, and legal liability.</p><h3>Transparency with Customers</h3><p>When customers interact with AI systems including phone answering, chat, and review responses, do they know they are interacting with AI? Authenticity tends to outperform deception even when deception is technically legal.</p><h3>AI in Hiring: Fairness Requirements</h3><p>If you use AI tools in your hiring process, you have legal obligations. AI screening tools must not discriminate based on protected characteristics: race, color, religion, sex, national origin, age, or disability.</p><h3>Accuracy and Human Oversight</h3><p>AI makes mistakes. For any AI-generated content that represents your business to customers, have a human review before publication.</p><p><strong>First Step:</strong> Review your current AI tool usage and ask: Is there any place where AI output is reaching customers without human review? If so, build a review step into that process this week.</p>'
  },
  {
    week: 42,
    title: 'AI for Construction and Home Building on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Gulf Coast construction companies are using AI to produce better bids, manage subcontractors more efficiently, and navigate the complex permitting and compliance landscape.',
    content: '<p>Construction on the Gulf Coast is a high-stakes business. Projects are large, timelines are critical, and the regulatory environment, especially for coastal construction with FEMA flood regulations and wind zone requirements, is complex.</p><h3>Bid and Estimate Preparation</h3><p>AI writing tools help construction companies produce professional, thorough bid documents faster. The technical specifications and quantities still come from your estimating expertise; AI helps you present them in a format that is clear, complete, and competitive.</p><h3>Subcontractor Management</h3><p>Coordinating multiple subcontractors is a logistics challenge that AI tools address well. Automated scheduling reminders, document collection sequences, and status update communications reduce the administrative overhead significantly.</p><h3>Customer Communication During Projects</h3><p>Proactive, consistent communication reduces client anxiety and builds the trust that leads to referrals.</p><p><strong>First Step:</strong> Look at your last three project bids. How long did each take to prepare? Use ChatGPT to draft the narrative sections of your next bid. See how much time the AI-assisted version saves.</p>'
  },
  {
    week: 43,
    title: 'AI Tools for the Solo Business Owner on the Gulf Coast',
    category: 'Getting Started',
    excerpt: 'If you\'re a one-person show, AI tools aren\'t just nice to have — they\'re how you compete. Here\'s the essential AI toolkit for solo business owners on the Gulf Coast.',
    content: '<p>There are thousands of solo business owners on the Gulf Coast: freelancers, consultants, independent contractors, sole proprietors who are essentially running a full business with one person. For these business owners, AI is a force multiplier that allows one person to operate at the level of a team.</p><h3>Your AI Assistant: ChatGPT or Claude</h3><p>Every solo business owner needs an AI writing and thinking assistant. Use your AI assistant for drafting every email and document, thinking through business decisions, preparing for client conversations, and generating marketing content. At $20 per month, this is the highest-ROI tool in your stack.</p><h3>Your AI Scheduler</h3><p>Tools like Calendly handle scheduling automatically, sending your availability link, confirming appointments, and sending reminders. Eliminate the what time works for you email chains entirely.</p><h3>Your AI Phone System</h3><p>When you are with a client or on a job, an AI phone system ensures every call gets a professional response. The cost of $50 to $100 per month is justified by a single recovered lead per month.</p><p><strong>First Step:</strong> Audit your current tool stack. For each task you do manually, find one AI tool that can handle it. Implement one new tool per month. In six months you will have a fully automated operation.</p>'
  },
  {
    week: 44,
    title: 'AI for Senior Care and Home Health Services on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Senior care, home health, and assisted living businesses on the Gulf Coast are using AI to improve care coordination, reduce administrative burden, and communicate better with families.',
    content: '<p>Senior care and home health services on the Gulf Coast face a combination of challenges unique to their sector: complex scheduling, regulatory compliance demands, family communication expectations, and caregiver workforce challenges.</p><h3>Caregiver Scheduling Optimization</h3><p>AI scheduling tools handle this optimization automatically, accounting for caregiver preferences, client needs, and the inevitable last-minute changes that characterize home health scheduling.</p><h3>Family Communication</h3><p>Families of senior care clients want regular updates on their loved ones wellbeing. AI-assisted communication tools help care coordinators send consistent, informative updates without the time burden of individual phone calls or emails.</p><h3>Compliance Documentation</h3><p>AI tools help caregivers document care notes more completely and efficiently, flag missing required documentation, and generate the compliance reports that regulatory bodies require.</p><p><strong>First Step:</strong> What is your current caregiver turnover rate? If it is above 40 percent annually, use AI to analyze your exit interview data and identify the most common reasons for departure. Then use ChatGPT to draft a retention strategy addressing those specific issues.</p>'
  },
  {
    week: 45,
    title: 'Preparing Your Gulf Coast Business for the AI-Powered Holiday Season',
    category: 'Marketing',
    excerpt: 'The holiday season is the most critical revenue period for many Gulf Coast businesses. AI tools help you prepare smarter, execute faster, and capture more of the seasonal opportunity.',
    content: '<p>For retail businesses, restaurants, hospitality operations, and many service businesses on the Gulf Coast, the holiday season from Thanksgiving through New Year\'s represents a disproportionate share of annual revenue.</p><h3>Holiday Campaign Planning with AI</h3><p>Prompt ChatGPT with your business type, your typical holiday offers, and your customer base, and ask for a week-by-week holiday marketing calendar from Thanksgiving through New Year\'s. You have a complete plan in hours rather than days.</p><h3>Inventory and Staffing Preparation</h3><p>AI demand forecasting tools analyze your historical holiday data to predict inventory needs and optimal staffing levels for each week of the season.</p><h3>Post-Holiday Retention</h3><p>Plan your post-holiday retention campaign now: a January offer for holiday customers, a loyalty program introduction, a survey to gather feedback. AI drafts all of these in advance so they are ready to deploy automatically in January.</p><p><strong>First Step:</strong> Open ChatGPT this week and ask it to draft a Thanksgiving through New Year\'s marketing calendar for your specific business type and Gulf Coast location.</p>'
  },
  {
    week: 46,
    title: 'AI for Financial Services and Insurance on the Gulf Coast',
    category: 'Industry Spotlight',
    excerpt: 'Financial advisors, insurance agents, and mortgage brokers on the Gulf Coast are using AI to serve more clients, generate better content, and streamline the complex compliance requirements of regulated industries.',
    content: '<p>Financial services and insurance professionals operate in one of the most heavily regulated industries. AI tools are helping these professionals work more efficiently within those constraints.</p><h3>Client Communication at Scale</h3><p>AI-assisted communication tools help these professionals send personalized market updates, policy review reminders, and planning milestone communications at scale. Every client feels attended to, even when the professional\'s time is limited.</p><h3>Gulf Coast-Specific Considerations</h3><p>Insurance in coastal Mississippi involves specific products and considerations: flood insurance, wind and hail coverage, named storm deductibles, and the complexity of NFIP policies. AI writing tools help insurance agents explain these complex products clearly to clients.</p><h3>Client Onboarding Documentation</h3><p>AI tools help prepare personalized onboarding documents faster, organize the required signatures and disclosures, and ensure nothing is missed.</p><p><strong>First Step:</strong> Identify the client communication you send most frequently. Use ChatGPT to draft a template version with personalization placeholders. Review it for compliance. That template becomes the foundation of an automated communication sequence.</p>'
  },
  {
    week: 47,
    title: 'Building Your AI-Powered Business in 2027: A Gulf Coast Roadmap',
    category: 'AI Strategy',
    excerpt: 'The Gulf Coast small businesses that thrive in 2027 are building their AI infrastructure now. Here\'s a practical roadmap for getting fully AI-integrated by the end of next year.',
    content: '<p>Here is a practical roadmap for being fully AI-integrated by the end of next year.</p><h3>Quarter 1: Foundation</h3><p>Focus on the highest-ROI basics: AI writing assistant, AI phone answering, and automated review management. Implementation timeline: six to eight weeks for all three.</p><h3>Quarter 2: Customer Experience</h3><p>Add AI-powered customer communication: website chat, automated follow-up sequences, and AI-assisted email marketing. These tools extend your customer relationships beyond the transaction.</p><h3>Quarter 3: Operations</h3><p>Implement operational AI: scheduling optimization, AI accounting, and document management. These tools reduce the internal administrative burden that consumes owner time.</p><h3>Quarter 4: Marketing Sophistication</h3><p>Elevate your marketing with AI-powered social media scheduling, video content, local SEO optimization, and potentially AI advertising management.</p><h3>The Compounding Effect</h3><p>Each AI tool you add builds on the others. AI-captured leads flow into AI-managed follow-up sequences. AI-written marketing content drives traffic to your AI-powered website chat.</p><p><strong>First Step:</strong> Audit where you are on this roadmap today. Write down the one tool you will implement in the next 30 days and put it in your calendar.</p>'
  },
  {
    week: 48,
    title: 'AI Accessibility: Tools for Business Owners with Disabilities on the Gulf Coast',
    category: 'Getting Started',
    excerpt: 'AI tools are proving particularly transformative for business owners and employees with disabilities — removing barriers that previously limited participation in business ownership and professional work.',
    content: '<p>AI tools are removing barriers that have historically limited the ability of people with certain disabilities to start and run businesses, participate fully in the workforce, and communicate professionally.</p><h3>AI for Writing Challenges</h3><p>Business owners with dyslexia, ADHD, or other conditions that affect writing have historically been at a disadvantage in a business world that demands constant written communication. AI writing assistants level this playing field completely. You just need to communicate your ideas, and AI handles the written expression.</p><h3>AI for Visual Impairments</h3><p>Modern AI assistants with voice interfaces can read and summarize documents, describe charts and images, and allow full interaction through natural conversation.</p><h3>Making Your Business More Accessible</h3><p>AI tools help businesses serve customers with disabilities better: AI-powered website accessibility checking, automatic caption generation for videos, and multilingual communication tools.</p><p><strong>First Step:</strong> Explore the accessibility features of the AI tools you already use. ChatGPT and Claude both have voice interaction capabilities that may be useful for you or your employees, often at no additional cost.</p>'
  },
  {
    week: 49,
    title: 'The Gulf Coast Small Business AI Audit: Where Do You Stand?',
    category: 'AI Strategy',
    excerpt: 'As the year winds down, it\'s time to take stock. This practical audit helps Gulf Coast business owners assess their AI maturity and identify the highest-priority gaps to close.',
    content: '<p>End of year is the right time to assess where your business stands on AI adoption: what is working, what is missing, and what to prioritize in the year ahead.</p><h3>Customer Communication: Score Yourself 1 to 5</h3><p>1: All customer communication is manual and reactive. 3: You use AI to help draft communications but send them manually. 5: You have automated follow-up sequences, AI phone answering, and consistent review response running automatically.</p><h3>Marketing: Score Yourself 1 to 5</h3><p>1: Marketing happens when you have time. 3: You use AI to create content but post it manually and inconsistently. 5: You have a full marketing calendar executing automatically on autopilot.</p><h3>Operations: Score Yourself 1 to 5</h3><p>1: Core business operations are manual. 3: Some operations are automated but AI is not specifically involved. 5: AI-powered tools handle scheduling optimization, accounting automation, and document management with minimal manual input.</p><h3>Lead Capture: Score Yourself 1 to 5</h3><p>1: Leads only come in when you are available. 3: You have a website contact form but no automation. 5: AI phone answering captures every call, website chat handles after-hours inquiries, and automated follow-up sequences nurture every lead.</p><p><strong>First Step:</strong> Share this audit with a business owner peer or trusted advisor. Commit to a specific score improvement in your lowest-rated category by next quarter.</p>'
  },
  {
    week: 50,
    title: 'AI Success Stories from the Gulf Coast: What\'s Actually Working',
    category: 'AI Strategy',
    excerpt: 'The best proof that AI works for Gulf Coast small businesses isn\'t theory — it\'s results. Here are the patterns of success we\'re seeing across industries on the Mississippi Gulf Coast.',
    content: '<p>Fifty weeks into our year of Gulf Coast AI insights, it is worth stepping back to look at the patterns of what is actually working across industries on the Gulf Coast.</p><h3>Pattern 1: The After-Hours Lead Recovery</h3><p>Businesses that implement AI phone answering report significant increases in weekly leads, often 20 to 40 percent, with no increase in marketing spend. The leads were always there. They just could not get through.</p><h3>Pattern 2: The Review Acceleration</h3><p>Businesses that implement automated post-service review requests consistently see their Google review counts double or triple within six months.</p><h3>Pattern 3: The Content Machine</h3><p>Business owners who commit to AI-assisted content creation report consistent improvement in organic reach and inbound leads over 6 to 12 months. The content produces compounding results.</p><h3>Pattern 4: The Time Recovery</h3><p>Business owners who systematically delegate writing tasks to AI consistently report recovering 5 to 10 hours per week. Over a year, that is 250 to 500 hours returned to the business for higher-value activities.</p><p><strong>First Step:</strong> Which of these four patterns resonates most with your business situation? Make it your priority for the next 90 days.</p>'
  },
  {
    week: 51,
    title: 'Setting Your AI Goals for the New Year on the Gulf Coast',
    category: 'AI Strategy',
    excerpt: 'A new year is the perfect moment to set clear, measurable AI goals for your Gulf Coast business. Here\'s how to set goals that are ambitious enough to matter and specific enough to achieve.',
    content: '<p>Goal setting without specificity is wishful thinking. Here is how to set specific, measurable AI goals for the new year that will actually drive your business forward.</p><h3>Revenue Goals Tied to AI</h3><p>Implement AI phone answering and capture 10 additional leads per month. Use AI-powered review management to reach 100 Google reviews by June. Deploy AI social media scheduling to grow organic reach by 25 percent.</p><h3>Operational Goals</h3><p>Reduce time spent on administrative tasks by 5 hours per week using AI writing and automation tools. Automate customer follow-up so that 100 percent of completed jobs receive a follow-up communication within 24 hours.</p><h3>The 90-Day Goal Framework</h3><p>Break your annual AI goals into quarterly milestones: Q1 is foundation, Q2 is customer experience, Q3 is operations, Q4 is marketing sophistication. Each quarter has a clear focus and measurable deliverable.</p><h3>Making Goals Stick</h3><p>Write them down. Share them with someone. Schedule a monthly review. These three practices dramatically improve goal achievement rates.</p><p><strong>First Step:</strong> Before the new year begins, write down three specific AI goals with measurable outcomes and target dates. Put them somewhere you will see them regularly.</p>'
  },
  {
    week: 52,
    title: 'A Year of AI on the Gulf Coast: What We\'ve Learned Together',
    category: 'AI Strategy',
    excerpt: 'Fifty-two weeks of AI insights for Gulf Coast small businesses. Here\'s the most important thing we\'ve learned — and what comes next.',
    content: '<p>A year ago, many Gulf Coast small business owners were curious about AI but unsure where to start. Today, the ones who acted on that curiosity are operating differently: capturing leads they used to miss, communicating more consistently with customers, creating marketing content in a fraction of the time, and running businesses that feel more under control.</p><h3>The Biggest Lesson: Start Small, Stay Consistent</h3><p>The businesses that got the most from AI in the past year were not the ones that tried to implement everything at once. They were the ones that picked one problem, solved it with one tool, built the habit, then moved to the next problem. Consistency compounds.</p><h3>The Gulf Coast Advantage Is Real</h3><p>AI adoption among Gulf Coast small businesses is still relatively early. The businesses that have built AI competency over this past year have a genuine competitive advantage that will take competitors years to close.</p><h3>AI Does Not Replace What Makes Local Business Special</h3><p>AI handles the repetitive and the routine; it amplifies the personal and the authentic. The AI does the administrative work; the humans do the relationship work.</p><h3>What Comes Next</h3><p>The tools available to Gulf Coast small businesses next year will be more capable, more affordable, and more integrated than what is available today.</p><p><strong>First Step and Last Step:</strong> Do something with AI in your business this week. Not plan something. Do something. That consistent action is what separates the Gulf Coast businesses that will thrive from those that will struggle to catch up.</p>'
  },
];

// ── HELPERS ──────────────────────────────────────────────────────
function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
function authOK(req) {
  return req.headers.get('X-Admin-Password') === ADMIN_PASSWORD;
}

// ── CRON: publish one post every Monday 8am CT ───────────────────
async function publishWeeklyPost(env, overrideIndex = null) {
  try {
    const epoch = new Date('2026-04-13T13:00:00Z');
    const now   = new Date();
    const weekIndex = overrideIndex !== null
      ? overrideIndex
      : Math.floor((now - epoch) / (7 * 24 * 60 * 60 * 1000));

    if (weekIndex < 0 || weekIndex >= SCHEDULED_POSTS.length) {
      return { skipped: true, reason: 'weekIndex out of range', weekIndex };
    }

    const post = SCHEDULED_POSTS[weekIndex];
    const slug = slugify(post.title) + '-w' + post.week;

    if (overrideIndex === null) {
      const exists = await env.PRECURSUS_KV.get('blog:post:' + slug);
      if (exists) return { skipped: true, reason: 'already published', slug };
    }

    const obj = {
      slug,
      title:         post.title,
      category:      post.category,
      excerpt:       post.excerpt,
      content:       post.content,
      author:        'Precursus Think Tank',
      date:          now.toISOString().split('T')[0],
      published:     true,
      createdAt:     now.toISOString(),
      scheduledWeek: post.week,
    };

    await env.PRECURSUS_KV.put('blog:post:' + slug, JSON.stringify(obj));

    const idxRaw = await env.PRECURSUS_KV.get('blog:index');
    const slugs  = idxRaw ? JSON.parse(idxRaw) : [];
    if (!slugs.includes(slug)) {
      slugs.unshift(slug);
      await env.PRECURSUS_KV.put('blog:index', JSON.stringify(slugs));
    }

    return { published: true, slug, week: post.week, title: post.title };
  } catch (e) {
    console.error('Cron error:', e);
    return { error: e.message };
  }
}

// ── FETCH HANDLER ────────────────────────────────────────────────
async function handleRequest(req, env) {
  const url  = new URL(req.url);
  const path = url.pathname;

  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

  // Static pages
  const statics = ['/', '/index.html', '/ai-advisor', '/ai-advisor.html',
                   '/admin-precursus', '/admin-precursus.html'];
  if (statics.includes(path)) {
    const file = (path === '/' || path === '/index.html') ? '/index.html'
               : path.endsWith('.html') ? path : path + '.html';
    return env.ASSETS.fetch(new Request(new URL(file, req.url)));
  }

  // GET /api/posts — public list
  if (path === '/api/posts' && req.method === 'GET') {
    const idx = await env.PRECURSUS_KV.get('blog:index');
    if (!idx) return jsonResp({ posts: [] });
    const posts = [];
    for (const s of JSON.parse(idx)) {
      const raw = await env.PRECURSUS_KV.get('blog:post:' + s);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.published) posts.push({ slug: p.slug, title: p.title, date: p.date, category: p.category, excerpt: p.excerpt, author: p.author });
      }
    }
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return jsonResp({ posts });
  }

  // GET /api/posts/:slug — public single
  if (path.startsWith('/api/posts/') && req.method === 'GET') {
    const slug = path.replace('/api/posts/', '');
    const raw  = await env.PRECURSUS_KV.get('blog:post:' + slug);
    if (!raw) return jsonResp({ error: 'Not found' }, 404);
    const p = JSON.parse(raw);
    if (!p.published) return jsonResp({ error: 'Not found' }, 404);
    return jsonResp({ post: p });
  }

  // GET /api/admin/posts — admin list
  if (path === '/api/admin/posts' && req.method === 'GET') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const idx = await env.PRECURSUS_KV.get('blog:index');
    if (!idx) return jsonResp({ posts: [] });
    const posts = [];
    for (const s of JSON.parse(idx)) {
      const raw = await env.PRECURSUS_KV.get('blog:post:' + s);
      if (raw) posts.push(JSON.parse(raw));
    }
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return jsonResp({ posts });
  }

  // POST /api/admin/posts — create post
  if (path === '/api/admin/posts' && req.method === 'POST') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const b = await req.json();
    if (!b.title || !b.content) return jsonResp({ error: 'Title and content required' }, 400);
    const slug = slugify(b.title) + '-' + Date.now();
    const post = {
      slug, title: b.title,
      date:      b.date || new Date().toISOString().split('T')[0],
      category:  b.category || 'General',
      excerpt:   b.excerpt || (b.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...'),
      content:   b.content,
      published: !!b.published,
      author:    b.author || 'Precursus Think Tank',
      createdAt: new Date().toISOString(),
    };
    await env.PRECURSUS_KV.put('blog:post:' + slug, JSON.stringify(post));
    const idxRaw = await env.PRECURSUS_KV.get('blog:index');
    const slugs  = idxRaw ? JSON.parse(idxRaw) : [];
    slugs.unshift(slug);
    await env.PRECURSUS_KV.put('blog:index', JSON.stringify(slugs));
    return jsonResp({ success: true, slug });
  }

  // PUT /api/admin/posts/:slug — update post
  if (path.startsWith('/api/admin/posts/') && req.method === 'PUT') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const slug = path.replace('/api/admin/posts/', '');
    const old  = await env.PRECURSUS_KV.get('blog:post:' + slug);
    if (!old) return jsonResp({ error: 'Not found' }, 404);
    const b    = await req.json();
    const post = { ...JSON.parse(old), ...b, slug, updatedAt: new Date().toISOString() };
    await env.PRECURSUS_KV.put('blog:post:' + slug, JSON.stringify(post));
    return jsonResp({ success: true });
  }

  // DELETE /api/admin/posts/:slug — delete post
  if (path.startsWith('/api/admin/posts/') && req.method === 'DELETE') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const slug = path.replace('/api/admin/posts/', '');
    await env.PRECURSUS_KV.delete('blog:post:' + slug);
    const idxRaw = await env.PRECURSUS_KV.get('blog:index');
    if (idxRaw) {
      const slugs = JSON.parse(idxRaw).filter(s => s !== slug);
      await env.PRECURSUS_KV.put('blog:index', JSON.stringify(slugs));
    }
    return jsonResp({ success: true });
  }

  // POST /api/advisor-lead — email lead capture
  if (path === '/api/advisor-lead' && req.method === 'POST') {
    const b = await req.json();
    if (!b.email) return jsonResp({ error: 'Email required' }, 400);
    const key = 'lead:' + Date.now() + ':' + b.email.replace(/[^a-z0-9]/gi, '');
    await env.PRECURSUS_KV.put(key, JSON.stringify(b), { expirationTtl: 31536000 });
    return jsonResp({ success: true });
  }

  // POST /api/track-faq — FAQ headcount only, no PII
  if (path === '/api/track-faq' && req.method === 'POST') {
    const b   = await req.json().catch(() => ({}));
    const key = 'faq:count:' + (b.faq_id || 'unknown');
    const cur = await env.PRECURSUS_KV.get(key);
    await env.PRECURSUS_KV.put(key, String(cur ? parseInt(cur) + 1 : 1));
    return jsonResp({ success: true });
  }

  // GET /api/admin/cron-status
  if (path === '/api/admin/cron-status' && req.method === 'GET') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const epoch     = new Date('2026-04-13T13:00:00Z');
    const now       = new Date();
    const weekIndex = Math.floor((now - epoch) / (7 * 24 * 60 * 60 * 1000));
    const current   = SCHEDULED_POSTS[weekIndex];
    const next      = SCHEDULED_POSTS[weekIndex + 1];
    const slug      = current ? slugify(current.title) + '-w' + current.week : null;
    const published = slug ? !!(await env.PRECURSUS_KV.get('blog:post:' + slug)) : false;
    return jsonResp({
      weekIndex,
      currentPost: current ? { week: current.week, title: current.title, slug, published } : null,
      nextPost:    next    ? { week: next.week,    title: next.title }                      : null,
      serverTime:  now.toISOString(),
    });
  }

  // POST /api/admin/trigger-post — manual publish
  if (path === '/api/admin/trigger-post' && req.method === 'POST') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const b         = await req.json().catch(() => ({}));
    const epoch     = new Date('2026-04-13T13:00:00Z');
    const now       = new Date();
    const autoIndex = Math.floor((now - epoch) / (7 * 24 * 60 * 60 * 1000));
    const idx       = (b.weekIndex !== undefined) ? parseInt(b.weekIndex) : autoIndex;
    const result    = await publishWeeklyPost(env, idx);
    return jsonResp(result);
  }

  // GET /api/admin/stats — full dashboard data
  if (path === '/api/admin/stats' && req.method === 'GET') {
    if (!authOK(req)) return jsonResp({ error: 'Unauthorized' }, 401);
    const idxRaw    = await env.PRECURSUS_KV.get('blog:index');
    const slugs     = idxRaw ? JSON.parse(idxRaw) : [];
    const leadsList = await env.PRECURSUS_KV.list({ prefix: 'lead:' });
    const leads     = [];
    for (const key of leadsList.keys) {
      const raw = await env.PRECURSUS_KV.get(key.name);
      if (raw) {
        try {
          const d = JSON.parse(raw);
          leads.push({ email: d.email || '', question: d.question || '', timestamp: d.timestamp || '' });
        } catch(e) {}
      }
    }
    leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const faqList   = await env.PRECURSUS_KV.list({ prefix: 'faq:count:' });
    const faqCounts = [];
    for (const key of faqList.keys) {
      const count = await env.PRECURSUS_KV.get(key.name);
      faqCounts.push({ id: key.name.replace('faq:count:', ''), count: parseInt(count) || 0 });
    }
    faqCounts.sort((a, b) => b.count - a.count);
    const epoch     = new Date('2026-04-13T13:00:00Z');
    const now       = new Date();
    const weekIndex = Math.floor((now - epoch) / (7 * 24 * 60 * 60 * 1000));
    return jsonResp({
      posts:  { published: slugs.length, scheduledTotal: SCHEDULED_POSTS.length, currentWeekIndex: weekIndex },
      leads:  { total: leads.length, recent: leads.slice(0, 20) },
      faq:    { totalClicks: faqCounts.reduce((s, f) => s + f.count, 0), byQuestion: faqCounts },
      cron:   { weekIndex, currentTitle: SCHEDULED_POSTS[weekIndex]?.title || 'N/A', nextTitle: SCHEDULED_POSTS[weekIndex + 1]?.title || 'Series complete' },
    });
  }

  // Fallback: static assets
  try { return await env.ASSETS.fetch(req); }
  catch { return new Response('Not found', { status: 404 }); }
}

// ── EXPORT ───────────────────────────────────────────────────────
export default {
  fetch:     (req, env, ctx) => handleRequest(req, env),
  scheduled: (event, env, ctx) => ctx.waitUntil(publishWeeklyPost(env)),
};
