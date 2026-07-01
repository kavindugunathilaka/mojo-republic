/**
 * content-data.js — same content as data/content.json, exposed as a plain
 * global so the site works when opened directly via file:// (double-click
 * index.html). Browsers block fetch()/XHR of local files under file://,
 * but regular <script> tags load fine, so this is the file://-safe path.
 * If you later serve this over http(s), you can switch back to fetching
 * data/content.json instead — the shape is identical either way.
 */
window.MOJO_CONTENT = {
  "stats": [
    { "value": 15, "suffix": "+", "label": "Years in Communications" },
    { "value": 120, "suffix": "+", "label": "Campaigns Delivered" },
    { "value": 40, "suffix": "+", "label": "Brand Partners" },
    { "value": 27, "suffix": "", "label": "Awards Won" }
  ],

  "services": [
    { "id": "brand-strategy", "title": "Brand Strategy & Positioning", "description": "Defining the story worth telling before a single asset is made." },
    { "id": "campaign-planning", "title": "Integrated Campaign Planning", "description": "One narrative, engineered to travel seamlessly across every channel." },
    { "id": "media-planning", "title": "Digital Media Planning & Buying", "description": "Judgement-led placement so every ringgit works harder." },
    { "id": "social-media", "title": "Social Media Management", "description": "Always-on communities, curated with intent, not just volume." },
    { "id": "influencer-kol", "title": "Influencer & KOL Marketing", "description": "Partnerships with voices your audience already trusts." },
    { "id": "experiential", "title": "Experiential & Event Marketing", "description": "Real-world moments that earn attention the algorithm can't fake." },
    { "id": "mojo", "title": "MOJO", "description": "Our signature blend — PR, content, and culture in one motion." },
    { "id": "content-creation", "title": "Content Creation", "description": "Craft-first production: film, photography, copy, and design." },
    { "id": "digital-marketing", "title": "Digital Marketing", "description": "Performance and brand working from the same playbook." }
  ],

  "clients": [
    { "name": "Client 01" }, { "name": "Client 02" }, { "name": "Client 03" },
    { "name": "Client 04" }, { "name": "Client 05" }, { "name": "Client 06" },
    { "name": "Client 07" }, { "name": "Client 08" }, { "name": "Client 09" },
    { "name": "Client 10" }, { "name": "Client 11" }, { "name": "Client 12" }
  ],

  "caseStudies": [
    {
      "id": "brand-launch",
      "title": "A regional brand launch that outran its category",
      "image": "assets/images/case-study-1.svg",
      "stats": [
        { "label": "Reach", "text": "18.4M organic impressions across 6 markets." },
        { "label": "Engagement", "text": "4.6x category-average engagement rate." },
        { "label": "Coverage", "text": "62 pieces of unpaid media coverage." }
      ]
    },
    {
      "id": "digital-transformation",
      "title": "Turning a legacy brand into a digital-first voice",
      "image": "assets/images/case-study-2.svg",
      "stats": [
        { "label": "Growth", "text": "212% growth in social following in 9 months." },
        { "label": "Conversion", "text": "3.1x lift in qualified site traffic." },
        { "label": "Sentiment", "text": "89% positive brand sentiment score." }
      ]
    },
    {
      "id": "experiential-activation",
      "title": "An experiential activation that sold out in 48 hours",
      "image": "assets/images/case-study-3.svg",
      "stats": [
        { "label": "Attendance", "text": "5,200 attendees across 3 city stops." },
        { "label": "Earned Media", "text": "RM2.8M in earned media value." },
        { "label": "Advocacy", "text": "1,400+ user-generated posts." }
      ]
    }
  ],

  "testimonials": [
    {
      "quote": "Mojo doesn't chase trends — they build the ones everyone else follows. Our campaign outperformed every benchmark we set.",
      "name": "Priya Nathan",
      "role": "Marketing Director, Northline Group",
      "avatar": ""
    },
    {
      "quote": "The craft is in every detail. No spray and pray — just sharp thinking placed exactly where it matters.",
      "name": "Marcus Wei",
      "role": "Head of Brand, Solace Living",
      "avatar": ""
    },
    {
      "quote": "They outthink, outmake, and outlast the competition. Genuinely one of the best partners we've worked with.",
      "name": "Farah Ismail",
      "role": "CEO, Verdant Foods",
      "avatar": ""
    }
  ],

  "faq": [
    {
      "question": "What makes The Mojo Republic different from other agencies?",
      "answer": "We start with strategy and ideas, not trends. Every execution is judged against a simple bar: does it move people, solve a problem, or sell something. If it doesn't, it doesn't ship."
    },
    {
      "question": "What services do you offer?",
      "answer": "Brand strategy, integrated campaign planning, digital media, social media management, influencer & KOL marketing, experiential & event marketing, content creation, and performance digital marketing — all under one roof."
    },
    {
      "question": "Do you work with brands outside Malaysia?",
      "answer": "Yes. While we're based in Kuala Lumpur, our campaigns run across Southeast Asia and beyond, with a network of regional partners and creators."
    },
    {
      "question": "How long does a typical campaign take to launch?",
      "answer": "It depends on scope, but most integrated campaigns move from brief to launch in 6–10 weeks, including strategy, creative development, and production."
    },
    {
      "question": "How do we start working together?",
      "answer": "Reach out through our contact form or email hello@themojorepublic.com.my. We'll set up a discovery call to understand your goals before proposing an approach."
    }
  ],

  "team": [
    {
      "id": "andora-fredericks",
      "name": "Andora Fredericks",
      "role": "Managing Director",
      "photo": "assets/images/team-portrait.svg",
      "quote": "Success requires sheer determination and tenacity.",
      "bio": [
        "As a leader, I believe true achievement is born not from fleeting bursts of inspiration, but from the relentless pursuit of progress even in the face of adversity. Challenges are inevitable, but they are also opportunities to grow stronger, smarter, and more resilient.",
        "Every obstacle is a test of our character, and every victory is a reflection of the discipline and grit we invest daily. I stand by the principle that consistency outweighs talent, and that integrity must guide ambition. Together, with unwavering focus and unity of purpose, we will not only meet expectations but redefine what is possible."
      ],
      "bioExtended": [
        "Andora Fredericks is an award-winning PR practitioner who moved into integrated communications in 2011, bringing with her over 26 years of practice in the field. She founded Truth Communications Sdn Bhd 15 years ago and rebranded the agency as The Mojo Republic as content marketing became borderless.",
        "To her, PR has no boundaries and is an ever-expanding universe. Having worked with four generations of PR practitioners, she remains malleable to change — always observing, absorbing, transcending.",
        "Under her leadership, the agency has won numerous local, regional, and international awards for its work in integrated communications. Curated, artisanal work is Mojo's signature.",
        "Through it all, one thing has remained steadfast in her stable of values — the importance of honesty and authenticity, the bedrock of trust in communications. These values she emphasizes and nurtures in the agency and with clients.",
        "She is a graduate in BSc Marine Science and had intentions to pursue a life in conservation after her hands-on work with sea turtles on Pulau Redang. But alas, she was not destined for a sun-soaked beach life — life had its own plans.",
        "On a more personal side, Andora is the mother of a beautiful daughter and a band of dogs. Like most PR practitioners, she thrives on multiplicity, and loves reading thought-provoking books and getting engrossed in compelling conversations with brilliant minds."
      ]
    }
  ],

  "awards": [
    { "title": "Gold, Best Integrated Campaign", "year": "2025", "issuer": "PR Awards Asia" },
    { "title": "Agency of the Year", "year": "2024", "issuer": "MARKETING Excellence Awards" },
    { "title": "Best Use of Social Media", "year": "2024", "issuer": "Digital Impact Awards" },
    { "title": "Silver, Experiential Campaign", "year": "2023", "issuer": "Spikes Asia" },
    { "title": "Best Brand Launch", "year": "2023", "issuer": "PR Awards Asia" },
    { "title": "Rising Agency of the Year", "year": "2022", "issuer": "MARKETING Excellence Awards" },
    { "title": "Best Content Series", "year": "2022", "issuer": "Digital Impact Awards" }
  ],

  "jobs": [
    {
      "id": "campaign-manager",
      "title": "Campaign Manager",
      "location": "Kuala Lumpur, Malaysia (Hybrid)",
      "type": "Full-time",
      "posted": "2026-06-13",
      "department": "Campaign Operations",
      "featured": true,
      "responsibilities": [
        {
          "group": "Campaign Strategy & End-to-End Execution",
          "items": [
            "Collaborate with Strategy and Creative teams to transform complex client briefs into comprehensive, multi-channel campaign deployment frameworks.",
            "Lead the launch and day-to-day management of integrated campaigns spanning social media, paid performance media, influencer marketing, and localized offline activations.",
            "Develop and maintain rigorous campaign timelines, milestone trackers, and resource allocation schedules using modern project management methodologies.",
            "Oversee campaign budgets, monitoring spend velocity and creative resource hours to maximize profitability and deliver optimal ROI for clients."
          ]
        },
        {
          "group": "Cross-functional Leadership",
          "items": [
            "Serve as the primary day-to-day point of contact for assigned clients, translating business objectives into actionable creative and media direction.",
            "Coordinate across PR, social, content, digital, and experiential teams so every touchpoint reinforces one narrative.",
            "Run status meetings, post-mortems, and reporting cadences that keep stakeholders aligned and informed."
          ]
        }
      ],
      "requirements": [
        "3–5 years of experience in campaign or account management at an agency or in-house marketing team.",
        "Proven track record delivering integrated, multi-channel campaigns on time and on budget.",
        "Strong project management instincts — comfortable with timelines, trackers, and budgets.",
        "Excellent written and verbal communication skills in English (Bahasa Malaysia a plus)."
      ]
    },
    {
      "id": "marketing-executive",
      "title": "Marketing Executive",
      "location": "Kuala Lumpur, Malaysia (Hybrid)",
      "type": "Full-time",
      "posted": "2026-06-10",
      "department": "Marketing",
      "featured": false,
      "responsibilities": [
        {
          "group": "Campaign Support",
          "items": [
            "Support the planning and execution of integrated marketing campaigns across digital and offline channels.",
            "Assist with content calendars, scheduling, and community management across client social platforms.",
            "Coordinate with vendors, creators, and media partners to keep deliverables on track."
          ]
        }
      ],
      "requirements": [
        "1–3 years of marketing experience, agency exposure preferred.",
        "Comfortable working across multiple client accounts at once.",
        "Detail-oriented with strong organizational skills."
      ]
    },
    {
      "id": "senior-marketing-exec",
      "title": "Senior Marketing Exec.",
      "location": "Kuala Lumpur, Malaysia (Hybrid)",
      "type": "Full-time",
      "posted": "2026-06-08",
      "department": "Marketing",
      "featured": false,
      "responsibilities": [
        {
          "group": "Client & Campaign Ownership",
          "items": [
            "Own day-to-day execution for a portfolio of client accounts, from briefing through reporting.",
            "Mentor junior executives and review campaign materials for quality and brand fit.",
            "Identify upsell and growth opportunities within existing client relationships."
          ]
        }
      ],
      "requirements": [
        "3+ years marketing experience with demonstrated account ownership.",
        "Strong stakeholder management and presentation skills.",
        "Analytical mindset with comfort reading campaign performance data."
      ]
    },
    {
      "id": "marketing-intern",
      "title": "Marketing Intern",
      "location": "Kuala Lumpur, Malaysia (On-site)",
      "type": "Internship",
      "posted": "2026-06-01",
      "department": "Marketing",
      "featured": false,
      "responsibilities": [
        {
          "group": "Learning & Support",
          "items": [
            "Assist the marketing team with research, content drafts, and campaign admin.",
            "Support social media scheduling and basic reporting.",
            "Join client and internal meetings to learn agency workflows end-to-end."
          ]
        }
      ],
      "requirements": [
        "Currently pursuing a degree in Marketing, Communications, or a related field.",
        "Strong writing skills and a genuine curiosity about brands and culture.",
        "Available for a minimum 3-month internship."
      ]
    }
  ]
};
