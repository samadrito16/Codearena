import { AtsResumeSection, HrQuestion } from '../../../types/placement';

export const ATS_RESUME_GUIDELINES: AtsResumeSection[] = [
  {
    id: 'ats-format',
    title: 'ATS-Friendly Formatting & Structure',
    importance: 'Critical',
    summary:
      'Mass recruiters receive 100,000+ applications. Automated Applicant Tracking Systems (ATS) scan for machine-readable text and discard parsing errors.',
    dos: [
      'Use a single-column layout with clean standard fonts (Inter, Calibri, Arial, Helvetica).',
      'Save and submit in clean PDF format generated directly from document editors.',
      'Use standard section headings: "Education", "Skills", "Technical Projects", "Work Experience", "Certifications".',
      'Keep your contact information simple: Full Name, Phone, Email, LinkedIn URL, GitHub profile URL.',
    ],
    donts: [
      'Do NOT use multi-column graphical templates with sidebars, progress percentage bars, or embedded icons.',
      'Do NOT put critical info inside header or footer zones (many ATS engines ignore them).',
      'Do NOT include photographs, personal address, marital status, or passport numbers.',
      'Avoid exporting scanned image PDFs or text embedded inside Canva drawings.',
    ],
    sampleTemplate: `[Full Name]
[City, State] • [Phone Number] • [College Email] • [LinkedIn URL] • [GitHub URL]

EDUCATION
[Degree Name] in [Major], [College Name], [Year - Year] • CGPA: [X.X/10.0]
Higher Secondary (12th), [School/Junior College Name] • Percentage: [XX%]

TECHNICAL SKILLS
• Programming Languages: C++, Java (Core & OOPs), Python, SQL
• Web & Database Technologies: React.js, Node.js, Express, MySQL, MongoDB
• Developer Tools: Git, GitHub, Linux Shell, Postman, VS Code
• Core CS Knowledge: Data Structures & Algorithms, OS, DBMS, Computer Networks

TECHNICAL PROJECTS
Project Title: [Project Name] | Tech Stack: [C++, Python, React, MySQL]
• Engineered a [System/App] serving [X purpose], processing [Y dataset/inputs] with [Z efficiency].
• Implemented [Algorithm / Pattern] to optimize execution time by [XX%] and reduce memory usage.
• Built clean REST APIs with structured error handling and database connection pooling.`,
  },
  {
    id: 'ats-bullets',
    title: 'The XYZ Formula for Project Bullets',
    importance: 'High',
    summary:
      'Google and top tech recruiters look for impact statements using the formula: "Accomplished [X] as measured by [Y], by doing [Z]". Avoid vague descriptive text like "Made an e-commerce website".',
    dos: [
      'Start every bullet point with an assertive action verb (Architected, Spearheaded, Implemented, Automated, Refactored, Debugged).',
      'Quantify results wherever possible (reduced query time from 400ms to 80ms, supported 50+ concurrent requests, tested 100+ edge cases).',
      'Highlight specific algorithms and CS concepts (Two Pointers, BFS, Hash Indexing, ACID compliance).',
    ],
    donts: [
      'Never write "Responsible for...", "Worked on...", or "Learned...".',
      'Do not write vague non-technical claims like "User-friendly and very fast".',
      'Avoid listing basic boilerplate tutorial projects (To-Do List, Calculator) unless substantially upgraded with backend auth, databases, or analytics.',
    ],
    sampleTemplate: `• Developed an automated placement notification bot using Node.js and Telegram API, delivering real-time drive alerts to 400+ college peers with sub-2-second latency.
• Engineered a hospital patient management portal using Java and MySQL, indexing foreign keys to reduce query lookup time by 35%.
• Implemented an interactive algorithm visualizer with React, explaining Dijkstra's and BFS graph traversals for 10+ edge graph topologies.`,
  },
];

export const HR_QUESTIONS_BANK: HrQuestion[] = [
  {
    id: 'hr-001',
    category: 'Introduction',
    question: 'Tell me about yourself (Fresher Elevator Pitch for Mass Recruiters)',
    frequentlyAskedAt: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Zoho'],
    whyInterviewersAsk:
      'Interviewers evaluate your communication fluency, confidence, clarity of thought, and whether your background aligns with their engineering role.',
    starBreakdown: {
      situation: 'Current education, engineering branch, and college.',
      task: 'Core areas of technical focus (DSA, Web, Database systems).',
      action: 'Practical project highlights and hackathon / problem-solving practice.',
      result: 'Why you are eager to begin your software engineering career with their organization.',
    },
    sampleAnswer:
      'Good morning sir/ma’am. Thank you for this opportunity. I am [Your Name], currently in my final year pursuing B.Tech in [Branch] from [College Name] with a CGPA of [X.X]. Over the past three years, I developed a strong passion for problem solving and software engineering. I have actively practiced Data Structures and Algorithms in C++ and Java, solving over 250 problems across arrays, trees, and dynamic programming.\n\nRecently, I built a [Project Name], where I worked on [Tech Stack], implementing [Key feature/achievement]. Beyond academics, I enjoy collaborating in team hackathons and have served as [Club Role/Activity]. I am eager to contribute my problem-solving acumen and learn enterprise technologies as an Associate Software Engineer at [Company Name].',
    proTips: [
      'Keep it strictly between 60 to 90 seconds.',
      'Do not recite your entire resume chronological history—focus on technical highlights.',
      'End with a forward-looking sentence connecting your interests to the company.',
    ],
    pitfallsToAvoid: [
      'Do not talk about family details, childhood hobbies, or high school marks unless explicitly asked.',
      'Avoid robotic memorization; speak naturally and maintain gentle eye contact.',
    ],
  },
  {
    id: 'hr-002',
    category: 'Technical Transition',
    question: 'Why do you want to join the IT / Software industry if you are from a Non-CS branch (ECE, Mech, Civil, EE)?',
    frequentlyAskedAt: ['TCS', 'Infosys', 'Cognizant', 'Accenture', 'Wipro'],
    whyInterviewersAsk:
      'Mass recruiters hire thousands of non-CS engineers. They want to verify that your decision to transition to software is deliberate, backed by self-driven learning, and not just a desperate fallback.',
    starBreakdown: {
      situation: 'Initial engineering exposure and discovering programming interest.',
      task: 'Bridging the core computer science curriculum gap.',
      action: 'Dedicated self-study in OOP, DBMS, OS, and hands-on coding.',
      result: 'Building software projects and proving dual competency in analytical problem-solving.',
    },
    sampleAnswer:
      'During my second year in [Mechanical/ECE], I took a course in numerical computation and C programming. I realized how much I enjoyed writing logic to solve algorithmic problems compared to manual drafting. To build strong software foundations, I dedicated my weekends to learning Object-Oriented Programming, Database Management Systems, and Web Technologies through online courses and open-source platforms.\n\nMy engineering background has taught me rigorous analytical thinking and mathematical rigor, while my self-driven projects in Java and MySQL demonstrated my capability to build reliable software. Today, engineering is software-driven across all sectors, and I am excited to apply my problem-solving mindset full-time at [Company Name].',
    proTips: [
      'Never say "Because there are no jobs in my core branch"—this sounds dismissive.',
      'Show concrete evidence of effort: mention specific languages, projects, and online coding platforms.',
    ],
    pitfallsToAvoid: [
      'Do not disrespect your original engineering branch; frame it as an added advantage.',
    ],
  },
  {
    id: 'hr-003',
    category: 'Company Fit',
    question: 'Why do you want to join TCS / Infosys / Wipro specifically over other companies?',
    frequentlyAskedAt: ['TCS', 'Infosys', 'Wipro', 'Capgemini'],
    whyInterviewersAsk:
      'They check whether you have researched the company’s recent initiatives, training programs, and scale, or if you simply submitted applications everywhere.',
    starBreakdown: {
      situation: 'Recognizing the company’s industry footprint and enterprise leadership.',
      task: 'Finding specific programs (e.g. TCS ILP, Infosys Mysore Global Education Center).',
      action: 'Connecting your early career learning goals with their structured training.',
      result: 'Commitment to long-term stability and professional development.',
    },
    sampleAnswer:
      'I want to start my career with [Company Name] because of its world-class training infrastructure and multi-domain exposure. For instance, the training curriculum at [Infosys Mysore / TCS Initial Learning Program] is renowned for transforming fresh graduates into production-ready engineers.\n\nFurthermore, [Company Name] operates in cloud, AI, banking, and healthcare services across 50+ countries. Starting here provides a structured platform to master clean coding, learn agile team workflows, and build a stable, long-term foundation under the mentorship of senior architects.',
    proTips: [
      'Mention a specific fact: e.g., TCS market cap and TCS BaNCS, or Infosys Cobalt Cloud, or Wipro FullStride Cloud.',
      'Compliment their training culture—mass recruiters take enormous pride in their fresher onboarding academies.',
    ],
    pitfallsToAvoid: [
      'Never give generic answers like "It is a big MNC and my parents like it".',
    ],
  },
  {
    id: 'hr-004',
    category: 'Company Fit',
    question: 'Are you comfortable with relocation, working in rotational/night shifts, and the standard training bond / service agreement?',
    frequentlyAskedAt: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Persistent'],
    whyInterviewersAsk:
      'This is a mandatory operational filter question. Any hesitation or conditional response ("Only if I get Bangalore or daytime shift") often results in an instant rejection.',
    starBreakdown: {
      situation: 'Understanding enterprise client global operations across time zones.',
      task: 'Expressing readiness to support client deliveries.',
      action: 'Emphasizing adaptability, geographic flexibility, and career prioritization.',
      result: 'Confirming unconditional acceptance of company staffing policies.',
    },
    sampleAnswer:
      'Yes, absolutely. As a fresher entering the global IT industry, my foremost priority is career growth, technical learning, and delivering value to our clients. I understand that enterprise projects operate across international time zones requiring rotational shifts, and I am 100% prepared to relocate to any office location allocated by the organization. I am also completely comfortable with the service agreement as it reflects a mutual commitment between the company investing in my training and my dedication to the team.',
    proTips: [
      'Answer with clear, unambiguous conviction: "Yes, I am completely comfortable with relocation and rotational shifts."',
      'Mass recruiters view geographic mobility as non-negotiable for campus hires.',
    ],
    pitfallsToAvoid: [
      'Never say "I will ask my parents first" or "I prefer working near my hometown".',
    ],
  },
  {
    id: 'hr-005',
    category: 'Behavioral',
    question: 'Tell me about a time you handled a conflict or disagreement during a college team project.',
    frequentlyAskedAt: ['Accenture', 'Capgemini', 'Zoho', 'Persistent', 'Infosys'],
    whyInterviewersAsk:
      'Evaluates emotional intelligence, team collaboration, listening skills, and resolving differences constructively without drama.',
    starBreakdown: {
      situation: 'A team project deadline where members disagreed on tech stack or division of tasks.',
      task: 'Need to reach consensus without delaying project milestones.',
      action: 'Organized a structured discussion, evaluated pros/cons objectively, and divided modules according to strengths.',
      result: 'Completed the project successfully on schedule and received a top grade.',
    },
    sampleAnswer:
      'During our 6th-semester database project, our four-member team had a strong disagreement on database choice: two members wanted MongoDB while another preferred MySQL. With the proposal deadline in 48 hours, the discussion had stalled.\n\nI suggested we write down our core requirements: our application needed multi-table ACID transactions for financial records, and none of our team members had prior experience with NoSQL aggregations. I organized a 30-minute sync where we reviewed these points objectively. The team agreed that MySQL provided the relational integrity we needed with zero learning curve risk. We divided the schema design and frontend integration cleanly, finished two days before the submission date, and our professor praised our database normalization.',
    proTips: [
      'Focus on the constructive resolution, not blaming teammates.',
      'Show that you listen and use facts/requirements rather than ego to settle decisions.',
    ],
    pitfallsToAvoid: [
      'Never say "I did all the work myself because they were useless".',
    ],
  },
  {
    id: 'hr-006',
    category: 'Behavioral',
    question: 'What is your greatest weakness, and how are you working to overcome it?',
    frequentlyAskedAt: ['TCS', 'Wipro', 'Cognizant', 'Zoho', 'Persistent'],
    whyInterviewersAsk:
      'Tests self-awareness, honesty, and whether you actively take corrective action to improve your limitations.',
    starBreakdown: {
      situation: 'Recognizing a genuine, non-fatal professional tendency.',
      task: 'Awareness of how it affected your productivity.',
      action: 'Specific mechanisms or tools implemented to manage it.',
      result: 'Measurable positive improvement in your daily routine.',
    },
    sampleAnswer:
      'In the past, I sometimes found it difficult to say no when peers asked for help with their lab assignments, which occasionally caused me to rush my own preparation close to submission deadlines. I realized that while being helpful is positive, poor boundary management hurts overall quality.\n\nTo address this, I started using calendar time-blocking and digital task managers like Notion. Now, I schedule my dedicated study hours first, and allocate a specific 1-hour evening window for peer discussions. This allows me to support my classmates while maintaining high personal standards on my own projects.',
    proTips: [
      'Pick a real, relatable weakness (e.g. public speaking hesitation, over-committing, difficulty delegating) and pair it with proactive remedies.',
      'Show that the solution is already actively working in your life.',
    ],
    pitfallsToAvoid: [
      'Avoid fake humble-brags: "My weakness is that I work too hard" or "I am a perfectionist" (recruiters find this clichéd).',
      'Never mention fatal weaknesses like "I am lazy", "I get angry easily", or "I dislike coding".',
    ],
  },
];

