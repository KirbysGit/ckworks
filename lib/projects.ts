/**
 * Case-study content model.
 *
 * Every project page is generated from this file. Edit copy here, never in
 * the components. Empty arrays are fine because sections with no content are
 * not rendered.
 */

export type Group = "client" | "product" | "prototype";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  group: Group;
  featured: boolean;
  /** One-liner under the name on the project page hero. */
  oneLiner: string;
  /** Single sentence on homepage/index cards explaining the project. */
  teaser: string;
  /** Short chips shown as "What I worked on". */
  workedOn: string[];
  role: string;
  stack: string[];
  status: string;
  /** Placeholder gradient until real screenshots exist. */
  accent: string;
  coverImage?: {
    src: string;
    alt: string;
    position?: string;
  };
  liveUrl?: string;
  hidden?: boolean;
  shortVersion: string[];
  problem: string[];
  built: string[];
  designDecisions: string[];
  technicalDecisions: string[];
  challenges: string[];
  outcome: string[];
  improveNext: string[];
};

export const groups: { id: Group; title: string; blurb: string }[] = [
  {
    id: "client",
    title: "Client & Brand Work",
    blurb: "Projects shaped around real people, feedback, budgets, and business goals.",
  },
  {
    id: "product",
    title: "Product & Systems Work",
    blurb: "Products I have designed, built, and worked through from the original idea onward.",
  },
  {
    id: "prototype",
    title: "Experiments & Prototypes",
    blurb: "Earlier work, technical experiments, and ideas taken far enough to learn from.",
  },
];

const allCaseStudies: CaseStudy[] = [
  {
    slug: "halo-reserve",
    name: "Halo Reserve",
    category: "Brand Identity / Wellness Direction",
    group: "client",
    featured: false,
    hidden: true,
    oneLiner:
      "A wellness identity designed to feel calm, premium, and distinct enough to grow into a larger brand.",
    teaser:
      "A premium identity for a salt, wellness, and recovery concept that was still finding its visual direction.",
    workedOn: [
      "Logo Design",
      "Brand Direction",
      "Signage Lockup",
      "Visual Exploration",
    ],
    role: "Brand Design, Art Direction",
    stack: ["Figma", "Illustrator"],
    status: "Client Work / Brand Phase",
    accent: "from-[#3a4d3f] to-[#6d7d5f]",
    shortVersion: [
      "Halo Reserve started with a client who had the name, the general wellness direction, and a rough idea of how she wanted the business to feel, but not a finished visual identity yet.",
      "I explored several logo systems, type directions, color palettes, and storefront applications before narrowing everything into a calmer luxury direction built around salt, wellness, and recovery.",
      "The final system uses a stacked primary logo, a horizontal storefront version, a muted gold accent, and a custom O inspired by the Greek letter Phi.",
    ],
    problem: [
      "The business needed to look premium without turning into another soft, interchangeable spa brand.",
      "It also needed a logo that could work in two very different situations: as a refined brand mark and across a long, narrow storefront sign that still had to be readable from a distance.",
    ],
    built: [
      "primary stacked logo system",
      "horizontal storefront lockup",
      "custom Phi-inspired letterform",
      "charcoal, ivory, white, and muted gold color direction",
      "signage and brand presentation mockups",
      "export-ready logo variations",
    ],
    designDecisions: [
      "I kept the system mostly typographic because the name already carried a strong luxury feel. The custom O and gold A add enough character without making the logo overly decorative.",
      "The horizontal sign version was treated as its own practical lockup instead of forcing the primary stacked logo into a space it was not designed for.",
    ],
    technicalDecisions: [],
    challenges: [
      "The hardest part was finding the point where the identity felt calm but not empty, and premium but not cold.",
      "There were also a lot of possible directions early on, so the work became as much about narrowing the brand as it was about drawing the logo.",
    ],
    outcome: [
      "The project ended with a clearer identity the client could use for the storefront, early marketing, and the next phase of the business.",
      "It also gave me a much better understanding of how logo decisions change once they have to work on actual signage instead of only inside a presentation board.",
    ],
    improveNext: [
      "The next phase would be extending the identity into the website, service menus, membership materials, and real photography once the business details are fully defined.",
    ],
  },
  {
    slug: "tizirsso",
    name: "Tizirsso Racing",
    category: "Website Design & Development",
    group: "client",
    featured: true,
    oneLiner:
      "A racing portfolio and sponsorship site built with the driver through several rounds of brand, content, and layout decisions.",
    teaser:
      "A client website that turns a professional karting career into a clearer story for fans, sponsors, and future opportunities.",
    workedOn: [
      "Brand Direction",
      "Web Design",
      "Development",
      "Content Structure",
      "Hosting",
    ],
    role: "Design, Development, Brand Direction, Hosting",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Vercel"],
    status: "Client Work / Live V1",
    accent: "from-[#2F5B3F] to-[#4f7a58]",
    coverImage: {
      src: "/images/projects/png/tizirsso.png",
      alt: "Tizirsso Racing website preview",
    },
    liveUrl: "https://tizianorossoorcel.com/",
    shortVersion: [
      "This project started when a friend connected me with a professional karting driver who needed a stronger web presence for the next stage of his racing career.",
      "We started pretty broadly. I learned what he wanted the site to accomplish, looked through racing sites and visual references with him, and worked back and forth through logo ideas, colors, and the overall tone before getting too deep into the build.",
      "I used AI-generated references during the early exploration phase, then rebuilt and refined the actual logo and interface direction myself in Figma. From there I put a working skeleton online, shared different versions directly through the site, and kept tightening the design until we had a V1 we both felt represented him well.",
    ],
    problem: [
      "The driver had photos, results, history, and a real story, but there was no single place that organized all of it into something he could confidently send to a sponsor or new connection.",
      "The site needed to feel like motorsport without looking like a generic racing template covered in speed lines, oversized statistics, and effects that competed with the actual content.",
    ],
    built: [
      "logo and visual direction",
      "responsive website design and development",
      "driver story and racing history structure",
      "achievements and results sections",
      "photo and media presentation",
      "sponsor-facing partnership content",
      "contact flow, deployment, and continued hosting",
    ],
    designDecisions: [
      "I let the racing photography create most of the energy and kept the surrounding interface controlled. The site still feels bold, but the layout gives the driver's story room to breathe.",
      "Instead of treating the project like one final mockup, I shared working versions online. That made feedback much more practical because the client could react to the real page instead of imagining how a static frame might feel once built.",
    ],
    technicalDecisions: [
      "I built the site with Next.js and Tailwind CSS so I could move quickly between design and implementation while keeping the layout responsive and reusable.",
      "Framer Motion was used selectively for movement without turning the site into an animation demo, and Vercel kept deployment and later updates simple.",
    ],
    challenges: [
      "The main challenge was translating broad inspiration into a direction that felt personal to the driver instead of copying the visual language of another racing site.",
      "There was also a lot of content to organize, so I had to keep asking what a sponsor or new visitor actually needed to understand first.",
    ],
    outcome: [
      "We launched a complete first version that gives the driver one professional place to share his background, achievements, media, and sponsorship value.",
      "I have continued handling the hosting and maintenance, so the project also became useful experience in supporting a client after the initial design and build were finished.",
    ],
    improveNext: [
      "I would eventually add a lightweight content system for race updates, results, and new media so the client can keep the site current throughout a season without needing a code change each time.",
    ],
  },
  {
    slug: "taylor",
    name: "Taylor.io",
    category: "AI Resume Platform / Full-Stack System",
    group: "product",
    featured: true,
    oneLiner:
      "A resume tailoring platform built from the workflow I repeated more than 150 times during my own job search.",
    teaser:
      "A guided resume workflow that turns an existing career story into structured data, role-specific edits, and reusable documents.",
    workedOn: [
      "Product Strategy",
      "AI Workflow",
      "Resume Parsing",
      "Editor UX",
      "Document Export",
    ],
    role: "Product Design, Full-Stack Development, AI Workflow Design",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "OpenAI API",
      "Tailwind CSS",
      "Playwright",
    ],
    status: "Personal Product / Early Release",
    accent: "from-[#43524a] to-[#7a8a72]",
    coverImage: {
      src: "/images/projects/png/taylor.png",
      alt: "Taylor.io resume platform preview",
    },
    liveUrl: "https://trytaylor.io",
    shortVersion: [
      "Taylor.io came directly out of my own job search. At first I was sending the same resume everywhere and mostly getting automated rejections. Once I started changing the story for each type of role, I felt like the responses became noticeably better, but every application also took much longer.",
      "My process eventually became repetitive: read the job description, identify the strongest parts of my background for that role, use AI to improve the wording and emphasis, rebuild the resume, and submit it. After doing that for more than 150 resumes for myself and friends, it felt obvious that most of the workflow could be turned into a product.",
      "The original idea was simple: sign in, explain your background, provide a role, and get a tailored resume. I kept expanding it with uploads, saved profiles, templates, previews, exports, and different tailoring controls until the scope started slowing me down. The biggest turning point was finally defining what a successful first version actually needed, finishing that version, and deploying it before it felt perfect.",
    ],
    problem: [
      "Tailoring a resume can help, but the normal process is slow and scattered. The user reads a job description in one place, asks an AI tool questions in another, edits a document somewhere else, and repeats the same background information every time.",
      "Most resume products also treat the resume like one block of text. I wanted the underlying career information to be structured, reusable, and able to shift without forcing the user to rebuild everything from the beginning.",
    ],
    built: [
      "PDF and DOCX resume upload and extraction",
      "structured resumeData profile model",
      "job-description and role analysis",
      "role-specific resume tailoring pipeline",
      "section-based editor with live preview",
      "saved profiles, authentication, and user data",
      "PDF and DOCX generation",
      "review explanations showing what changed and why",
    ],
    designDecisions: [
      "I wanted the product to feel guided instead of opening on an empty document. Users should be able to see the story they already have, understand what the system is emphasizing, and make smaller decisions instead of rewriting the entire resume in one large text box.",
      "The editor and preview stay connected because the final document still matters. The structured data is useful behind the scenes, but the user needs to see how those decisions actually change the resume a recruiter will receive.",
      "I also started giving the AI output a clearer explanation layer. A suggestion is easier to trust when the user can see what was prioritized, what was trimmed, and where the system was intentionally being cautious.",
    ],
    technicalDecisions: [
      "The core system is organized around structured resume data rather than a single generated document. Education, experience, projects, skills, and layout settings can be edited independently and reused across different versions.",
      "FastAPI handles the parsing, tailoring, authentication, and export workflows. PostgreSQL stores user and resume data, while React powers the editor and preview experience.",
      "The AI layer handles extraction, analysis, and drafting, but the output is constrained by the user's existing evidence so the product does not casually invent experience or replace the user's real stack with keywords from a job description.",
      "Playwright and a separate DOCX builder handle the two export paths because a good browser preview does not automatically translate into a reliable editable document.",
    ],
    challenges: [
      "The biggest product challenge was my own scope creep. Every useful idea made me want to add three more before I had proven the main flow.",
      "The hardest system problem was balancing useful rewriting with strict truth. The product has to make a resume more focused without turning it into a confident list of things the person never actually did.",
      "Document generation was another project by itself. A resume can look correct in the browser and still break once it becomes a PDF or DOCX file with different page, spacing, and font behavior.",
    ],
    outcome: [
      "Taylor.io is now an early working product instead of an idea I keep redesigning privately. It can take existing resume information, structure it, tailor the presentation for a role, and export a usable document.",
      "There are still imperfections, but shipping it gave me a real system to test, evaluate, and improve. It also became the clearest example of how I approach a product from the first frustration through the data model, interface, AI behavior, and deployment.",
    ],
    improveNext: [
      "The next version needs a cleaner onboarding flow, stronger version comparison, and an easier way to move between a base profile and several tailored resumes.",
      "I also want to keep improving the explanation and evaluation layers so users can understand why a change was made, catch weak suggestions quickly, and stay in control of the final story.",
    ],
  },
  {
    slug: "centi",
    name: "Centi",
    category: "Personal Finance Dashboard / API Integration",
    group: "product",
    featured: true,
    oneLiner:
      "My first full-stack application outside school, built to give me a clearer view of my own spending after Mint shut down.",
    teaser:
      "A personal finance dashboard that combines connected accounts, uploaded transactions, and simple spending insights.",
    workedOn: [
      "Full-Stack Development",
      "Dashboard UX",
      "Plaid Integration",
      "Data Modeling",
      "Authentication",
    ],
    role: "Product Design, Full-Stack Development",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Plaid API",
      "Vercel",
      "Railway",
    ],
    status: "Personal Product / Working Build",
    accent: "from-[#2F5B3F] to-[#6d7d5f]",
    coverImage: {
      src: "/images/projects/png/centi.png",
      alt: "Centi personal finance dashboard preview",
    },
    liveUrl: "https://centi.dev",
    shortVersion: [
      "Centi was the first full-stack application I built outside of school. I started it near the end of my final semester at UCF because I wanted to stay sharp after senior design, get better at styling real interfaces, and build something I would personally use.",
      "At the same time, I was trying to understand my spending before graduating. I had previously used Mint, but once it shut down I no longer had one clear place to look at my accounts and transactions. Combining those two problems gave me the project.",
      "The first version was extremely basic. I experimented with uploaded transaction files and regular expressions, then discovered Plaid and started rebuilding the app around connected financial data. A large part of the project became learning how to organize messy transaction information into a dashboard that was simple enough to read without hiding the detail underneath it.",
    ],
    problem: [
      "Banking apps are good at showing what happened inside one account, but they do not always give a useful picture of how money is moving across everything together.",
      "The data itself is also inconsistent. Merchant names are messy, transfers can look like spending, and one purchase can arrive with very little context. The real problem was not displaying transactions. It was making the information feel understandable.",
    ],
    built: [
      "Plaid account linking and financial data import",
      "CSV upload flow for unsupported or historical data",
      "manual cash transaction entries",
      "transaction cleanup and categorization",
      "spending summaries, trends, and monthly comparisons",
      "Centi Score concept for a simpler financial snapshot",
      "Google OAuth and account authentication",
      "email verification and password reset flows",
      "separate frontend, API, and database deployments",
    ],
    designDecisions: [
      "I treated the dashboard like an explanation layer instead of trying to fit every possible number onto the first screen. The overview should answer where the money is going and what changed before the user has to inspect individual transactions.",
      "I kept the visual language fairly calm because financial products can become stressful quickly. The interface needed to feel useful and readable, not like it was constantly warning the user that every purchase was a mistake.",
    ],
    technicalDecisions: [
      "React handles the interface, FastAPI serves the application and integration logic, and PostgreSQL stores accounts, transactions, users, and categories.",
      "Plaid became the main source for connected account data, but I kept CSV and manual entry paths because a personal finance view is incomplete if it can only understand one provider.",
      "The frontend is deployed through Vercel, while the API and database run through Railway. Building those pieces separately forced me to learn much more about authentication, environment configuration, cross-origin requests, and production deployment than a local school project would have.",
    ],
    challenges: [
      "The data was harder than the dashboard. Merchant cleanup, duplicate handling, transfers, refunds, and categories all create edge cases that are easy to ignore until the app starts using real transactions.",
      "It was also my first time owning the entire application outside a class project, so every missing piece became mine to solve, including authentication, deployments, API failures, database changes, and the design itself.",
    ],
    outcome: [
      "Centi became a working personal finance product and the project that moved me from building assignments to thinking through a full application as one connected system.",
      "Even though it is still evolving, it gave me a strong foundation in API integration, data modeling, authentication, deployment, and the quieter work required to make a dashboard feel trustworthy.",
    ],
    improveNext: [
      "The next version would improve categorization by learning from user corrections, add clearer forecasting, and make the main spending story feel even more immediate on mobile.",
    ],
  },
  {
    slug: "setlst",
    name: "SETLST",
    category: "Music-Driven Fitness App / Product Concept",
    group: "product",
    featured: true,
    oneLiner:
      "A music-driven gym companion my friend and I have been shaping around who is at your gym, what they are listening to, and a less awkward way to connect.",
    teaser:
      "A gym app concept combining live music activity, workout consistency, and social features that stay secondary to the workout.",
    workedOn: [
      "Product Strategy",
      "Brand Identity",
      "Mobile UI",
      "User Flows",
      "Frontend Prototype",
    ],
    role: "Product Design, Brand Direction, Frontend Prototyping",
    stack: ["Figma", "React", "Tailwind CSS"],
    status: "Collaborative Product Concept / In Progress",
    accent: "from-[#14242b] to-[#297b88]",
    coverImage: {
      src: "/images/projects/png/setlst.png",
      alt: "SETLST music-driven fitness app preview",
    },
    shortVersion: [
      "SETLST started when a friend came to me with an idea for a gym app. The original concept was a live map of the gym where users could see who was nearby, roughly where they were, and what song they were currently listening to.",
      "We kept working through what the app should actually be. The concept gradually became less about tracking exact positions and more about being a music-based gym companion: see who is at your gym, view the current listening activity, keep a workout streak, and optionally connect without turning the whole thing into Instagram or a dating app.",
      "My part has been helping turn the loose idea into a clearer product direction, brand system, logo, interface concepts, and a more realistic first version. It is still in development, so the current work is best understood as product strategy and an evolving prototype rather than a finished production app.",
    ],
    problem: [
      "The gym is already a shared social environment, but the ways people signal that they are open to talking are awkward or nonexistent. Music is also a huge part of the experience, yet it stays completely private even when it could be a natural conversation starter.",
      "The opportunity was to make the gym feel a little more connected while still respecting that most people are there to train, not spend their workout managing another social feed.",
    ],
    built: [
      "product direction and first-version feature planning",
      "SETLST name, logo, and visual identity exploration",
      "onboarding, profile, and gym-presence concepts",
      "now-playing and live gym activity feed",
      "friend requests and controlled messaging ideas",
      "public or private workout streaks",
      "forum and motivation feature concepts",
      "early mobile dashboard and interaction prototypes",
    ],
    designDecisions: [
      "The brand mixes a dark gym interface with teal, blue, and purple accents. We wanted it to feel sleek and energetic without becoming a loud neon gaming interface.",
      "The now-playing activity is treated as the main hook. Social features support that experience, but they stay quieter so the product does not immediately read as a dating app or a generic social network.",
      "An Open to Chat control is intentionally subtle. The user should be able to signal availability without placing a large social label on themselves every time they enter the gym.",
      "The name SETLST is intentional. It connects musical setlists with workout sets while using a shorter, more balanced spelling for the brand.",
    ],
    technicalDecisions: [
      "The early product model is organized around users, gym presence, connected music activity, friendships, and workout consistency.",
      "We stepped back from the original exact in-gym map for the first version because location privacy, safety, and liability would quickly become larger than the core product. A broader activity board can test the idea without exposing precise positions inside the gym.",
      "The current React prototype is mainly being used to work through navigation, hierarchy, and interaction behavior before committing to a larger mobile build and specific music or location integrations.",
    ],
    challenges: [
      "The biggest challenge has been deciding what the product really is. It can easily expand into a gym map, music feed, social network, forum, streak tracker, creator platform, and trainer marketplace all at once.",
      "Privacy is the second major challenge. A feature that feels interesting on a concept board can feel very different when it reveals where a real person is standing, what they are doing, and whether they are open to being approached.",
      "We have also had to keep checking whether each new social idea helps the workout experience or distracts from it.",
    ],
    outcome: [
      "SETLST currently has a much clearer identity and product direction than the original map idea. We know the central experience should be music-driven gym activity, with social and consistency features supporting it.",
      "The project has also been good practice in collaborative product thinking because I am not only designing my own idea. I am helping another person's original concept become more focused, presentable, and technically realistic.",
    ],
    improveNext: [
      "The next step is to lock the smallest useful first version, validate it with people who actually train regularly, and prototype the privacy controls before investing in deeper location or music integrations.",
    ],
  },
  {
    slug: "ck-dev",
    name: "CK Dev",
    category: "Creative Portfolio / Frontend Experiment",
    group: "prototype",
    featured: false,
    oneLiner:
      "The personal portfolio that started as a CSS playground and slowly turned into a visual record of how I learned frontend design.",
    teaser:
      "An earlier portfolio built from styling experiments, shifting themes, and whatever frontend idea I wanted to test next.",
    workedOn: [
      "Creative Development",
      "CSS Experiments",
      "Interaction Design",
      "Portfolio Design",
    ],
    role: "Design, Frontend Development",
    stack: ["CSS", "JavaScript"],
    status: "Personal Portfolio / Archived",
    accent: "from-[#241f35] to-[#62527b]",
    coverImage: {
      src: "/images/projects/png/ck-dev.png",
      alt: "CK Dev portfolio preview",
    },
    liveUrl: "https://colinkirby.dev",
    shortVersion: [
      "CK Dev did not start as a serious portfolio plan. It was mostly a place for me to practice CSS, build small visual ideas with basic elements, and see how far I could push the frontend skills I had at the time.",
      "I kept coming back with another theme, animation, interaction, or layout idea and trying to blend it into whatever was already there. Eventually that constant cycle became the identity of the site, so I turned it into my portfolio instead of forcing myself to choose one permanent style.",
      "It is dated now, but I still like what it represents. The site captured the point where I stopped treating frontend work as only arranging components and started using it as a creative medium.",
    ],
    problem: [
      "I needed somewhere to practice visual development and eventually somewhere to show the projects I was building.",
      "A normal template portfolio would have been faster, but it would not have taught me as much or reflected how exploratory my work felt at the time.",
    ],
    built: [
      "custom portfolio layout",
      "multiple visual themes and transitions",
      "project showcase sections",
      "animated interface experiments",
      "responsive frontend styling",
    ],
    designDecisions: [
      "Instead of hiding my indecisiveness around one theme, I turned the movement between different styles into part of the experience.",
      "The site was intentionally more expressive than practical. It was a place to test ideas first and a professional portfolio second.",
    ],
    technicalDecisions: [
      "The code grew organically alongside the visual experiments. That made it useful for learning, but it also meant the structure became harder to maintain as each new idea was layered onto the last one.",
    ],
    challenges: [
      "The hardest part was keeping all of the visual ideas connected enough that the site still felt intentional.",
      "I also learned that adding another interaction is much easier than deciding whether it actually improves navigation, performance, or the way someone understands the work.",
    ],
    outcome: [
      "CK Dev became my first real portfolio and gave me a place to show work before I had a polished professional identity.",
      "More importantly, it helped me learn what kind of designer and developer I wanted to become, even if the current CK Works site now presents that work in a calmer and more focused way.",
    ],
    improveNext: [
      "I would not rebuild the same site now. I would preserve a few of the strongest experiments as an archive and let the main portfolio stay simpler, faster, and more centered on the work itself.",
    ],
  },
  {
    slug: "sentiment-trader",
    name: "SentimentTrader",
    category: "Financial Data / Machine Learning Pipeline",
    group: "prototype",
    featured: false,
    oneLiner:
      "A financial data pipeline that turns online market discussions, search activity, and stock data into structured features for future machine-learning research.",
    teaser:
      "A continuously growing dataset connecting Reddit sentiment, search interest, and market behavior.",
    workedOn: [
      "Data Pipelines",
      "NLP",
      "Feature Engineering",
      "Financial Data",
    ],
    role: "Data Engineering, Machine Learning, System Design",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Hugging Face",
      "PRAW",
      "pytrends",
      "yfinance",
    ],
    status: "Personal Project / Data Collection in Progress",
    accent: "from-[#1f342a] to-[#58715f]",
    coverImage: {
      src: "/images/projects/png/sentiment-trader.png",
      alt: "SentimentTrader data pipeline preview",
    },
    shortVersion: [
      "SentimentTrader started from a question I kept coming back to: can the way people talk about a stock online reveal anything useful about how that stock behaves afterward?",
      "The first version was built between January and May 2025. I returned to the project in December 2025 with a clearer goal: instead of rushing into a prediction model with a small and unreliable dataset, I would focus on building a dependable historical data pipeline first.",
      "The project now collects Reddit finance discussions, Google Trends search interest, and stock-market data, then turns those sources into structured features that can support future machine-learning research.",
    ],
    problem: [
      "Online financial discussion moves quickly, but it is also extremely messy. People use ticker symbols, company names, abbreviations, jokes, sarcasm, and everyday words that can easily be mistaken for stocks.",
      "A ticker such as AI or IT might refer to a company, or it might just be part of a normal sentence. Even when a post clearly discusses a stock, not every mention should be treated equally.",
      "Reddit activity, Google search interest, and stock prices all arrive in different formats and at different intervals, so the system has to normalize each source and align the data around the same ticker symbols and dates.",
    ],
    built: [
      "Reddit post and comment collection through PRAW",
      "text cleaning and ticker/company mention extraction",
      "false-positive filtering for ambiguous ticker symbols",
      "financial and social-media sentiment analysis",
      "engagement-weighted daily sentiment aggregation",
      "Google Trends data collection through pytrends",
      "historical stock price and volume collection through yfinance",
      "ticker-and-date aligned feature dataset for future modeling",
    ],
    designDecisions: [
      "I treated the historical dataset as the primary product instead of presenting the first version as a stock-prediction system.",
      "That made the project more honest. Financial markets are noisy, and a small dataset can make a model look much more accurate than it really is.",
      "I also kept the output structured so different sentiment models, engagement signals, search interest, and market features can be compared or combined later instead of locking the system into one interpretation too early.",
    ],
    technicalDecisions: [
      "Python, Pandas, and NumPy handle most of the pipeline because the core work is text processing, feature creation, date alignment, aggregation, and dataset management.",
      "The Reddit portion uses PRAW to collect finance discussions, then cleans text, extracts possible ticker mentions, and filters out common false positives before sentiment analysis.",
      "The sentiment layer uses financial and social-media models, including FinBERT and Twitter-RoBERTa, so the system can compare formal financial language with the shorter, more informal language common in Reddit comments.",
      "The final pipeline combines Reddit sentiment, engagement signals, Google Trends data, and market data into a repeated data-collection workflow that continues growing the dataset over time.",
    ],
    challenges: [
      "Ticker extraction was one of the first major challenges because a simple regular expression creates many incorrect matches from normal words, unsupported symbols, and ambiguous references.",
      "Another challenge was deciding what a sentiment score should represent. A single positive post should not necessarily outweigh a large negative discussion, but raw engagement can also be misleading.",
      "Timing was also difficult because a post made after the market closes should not be treated the same as one made before trading begins, and Reddit, Google Trends, and market prices do not naturally share the same reporting windows.",
    ],
    outcome: [
      "SentimentTrader is currently operating as a data-collection and feature-engineering pipeline.",
      "It has given me hands-on experience with external APIs, natural-language processing, scheduled data workflows, noisy real-world datasets, financial time-series data, and the practical limits of machine-learning projects.",
      "The project is now accumulating historical observations that can later be divided into training, validation, and out-of-sample testing periods.",
    ],
    improveNext: [
      "The next phase is to begin testing prediction models once the dataset covers enough time and different market conditions.",
      "The first models will likely focus on limited questions, such as whether changes in discussion volume or sentiment provide any useful signal for short-term volatility or directional movement.",
      "I also want to improve company-mention detection, experiment with time-of-day features, monitor changes in sentiment rather than only daily averages, and build a dashboard for inspecting individual tickers and pipeline health.",
    ],
  },
  {
    slug: "internal-automation-tool",
    name: "Internal Automation Tool",
    category: "Professional Systems / Internal Tooling",
    group: "product",
    featured: false,
    oneLiner:
      "An internal portal that gave recurring scripts, operational workflows, and their results one shared interface.",
    teaser:
      "A generalized look at the internal automation platform I helped build during my software engineering internship.",
    workedOn: [
      "Backend APIs",
      "Automation",
      "Dashboards",
      "Monitoring",
      "Deployment",
    ],
    role: "Full-Stack Development, Internal Systems",
    stack: ["Python", "Django", "React", "PostgreSQL", "AWS EC2"],
    status: "Professional Work / Generalized",
    accent: "from-[#43524a] to-[#5F665F]",
    shortVersion: [
      "During my software engineering internship, I worked on an internal portal that brought recurring scripts and operational workflows into one place instead of leaving them as separate tools that had to be run, checked, and debugged manually.",
      "The project involved much more than putting buttons in front of scripts. The system needed permissions, scheduling, live status, logs, error handling, and a clear way for internal teams to understand what was happening without reading through backend output themselves.",
    ],
    problem: [
      "The existing workflows worked, but they depended too heavily on engineering knowledge and repeated manual steps.",
      "Internal teams needed a faster way to run approved automations, see whether they succeeded, and understand when something actually required attention.",
    ],
    built: [
      "Django APIs for internal automation workflows",
      "React portal for running and monitoring jobs",
      "scheduling and background task support",
      "real-time execution status and logs",
      "role-based access and OAuth sign-in",
      "PostgreSQL-backed workflow and result data",
      "AWS EC2 deployment with Gunicorn and Nginx",
    ],
    designDecisions: [
      "The interface was designed around state. A user needed to understand what could be run, what was currently running, what finished, and what failed without digging through technical details first.",
      "The goal was not to expose every possible configuration. It was to make the common, approved workflow easier while keeping the risky or unusual cases controlled.",
    ],
    technicalDecisions: [
      "Django provided the API and permission structure, while React gave the portal a more responsive monitoring experience.",
      "Celery and background workers handled longer-running jobs, WebSockets supported live updates, and PostgreSQL stored the workflow state and results.",
      "The application was deployed on AWS EC2 behind Gunicorn and Nginx, which gave me direct experience taking a full-stack internal system from local development into a maintained environment.",
    ],
    challenges: [
      "The main challenge was making automation failures understandable. A script can fail for many reasons, but the interface still has to tell a non-author what happened and what they should do next.",
      "Performance also mattered once several workflows and users were active at the same time, so backend queries and data handling had to be tightened as the portal grew.",
    ],
    outcome: [
      "The portal supported more than 20 automated workflows, reduced repeated manual work by roughly 150 hours per year, and made internal operations easier to monitor from one place.",
      "I also improved API query performance by about 25 percent under concurrent load while working through the system's backend bottlenecks.",
    ],
    improveNext: [
      "A later version could make more workflow configuration self-service while still preserving approvals, permissions, and safe failure behavior.",
    ],
  },
  {
    slug: "securescape",
    name: "SecureScape",
    category: "Portable Security System / Senior Design Prototype",
    group: "prototype",
    featured: false,
    oneLiner:
      "A portable security prototype combining camera nodes, on-device detection, a mobile app, and near real-time alerts.",
    teaser:
      "A senior design project that connected embedded hardware, computer vision, backend communication, and user controls into one working demo.",
    workedOn: [
      "Mobile App",
      "Python Backend",
      "Device Communication",
      "System Integration",
    ],
    role: "Mobile Development, Backend Development, System Integration",
    stack: [
      "ESP32-CAM",
      "Flutter",
      "Python",
      "Arduino C++",
      "TensorFlow Lite",
    ],
    status: "Senior Design Prototype",
    accent: "from-[#111714] to-[#43524a]",
    coverImage: {
      src: "/images/projects/png/secure-scape.png",
      alt: "SecureScape portable security system preview",
    },
    shortVersion: [
      "SecureScape was my senior design project at UCF. The idea was a portable security system made from small camera nodes that could be placed in a temporary environment, detect activity, and send controls and alerts back to a user.",
      "My main work focused on the Flutter mobile app, the Python communication layer, and getting the hardware and software pieces to behave like one system during a live demonstration.",
    ],
    problem: [
      "Traditional security systems are usually tied to a building and a permanent installation. We wanted to explore whether a smaller, portable setup could provide useful monitoring in spaces where installing a full system would not make sense.",
      "The prototype had to prove the complete loop: detect something, communicate across devices, alert the user quickly, and provide controls that actually worked.",
    ],
    built: [
      "ESP32-CAM security nodes",
      "lightweight TensorFlow Lite detection model",
      "Flutter mobile controls for alarms, lighting, photos, and recordings",
      "Python backend and device communication layer",
      "React monitoring dashboard",
      "near real-time alert flow",
      "working end-to-end demonstration",
    ],
    designDecisions: [
      "We kept the user controls direct because the prototype was testing the system, not trying to redesign the entire home security market.",
      "The live demonstration was treated as the main success criterion, so reliability of the core detection and alert flow mattered more than adding a long list of unfinished features.",
    ],
    technicalDecisions: [
      "The detection model was kept under 1 MB so it could run within the limits of the embedded hardware while still reaching roughly 80 percent or better accuracy in our tests.",
      "The Python communication layer coordinated the device and application behavior, while the Flutter app gave the user portable access to the main controls.",
      "The full detection-to-alert path reached approximately 3.5 seconds in the working prototype.",
    ],
    challenges: [
      "Hardware failures are rarely as clean as software errors. Connectivity, power, camera behavior, timing, and the physical environment could all affect a demo that looked stable in code.",
      "A large part of the work was integration and repeated testing so one unreliable component did not break the entire experience.",
    ],
    outcome: [
      "The team completed a working prototype that connected embedded cameras, local detection, backend communication, a mobile interface, and alerts in one end-to-end system.",
      "The project gave me practical experience working across hardware and software boundaries where debugging requires understanding the whole path instead of only one codebase.",
    ],
    improveNext: [
      "A production version would need stronger hardware enclosures, better battery behavior, more reliable networking, hardened device security, and much more testing outside a controlled demo environment.",
    ],
  },
];

export const caseStudies = allCaseStudies.filter((c) => !c.hidden);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
export const secondaryCaseStudies = caseStudies.filter((c) => !c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
