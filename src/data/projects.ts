// One entry per case study. The home page work list and the /work/<slug>/ pages
// are both generated from this list, so adding a project means adding an entry.

export type Tone = 'ok' | 'warn';

export type Media = {
  kind: 'video' | 'image';
  src: string;
  poster?: string; // still frame shown before a clip plays
  w: number; // intrinsic size, so the page reserves the space before the file loads
  h: number;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string; // one line, shown on the work plate
  summary: string; // one or two sentences, shown at the top of the case study
  when: string;
  builtFor: string;
  outcome: string;
  tone: Tone;
  facts: { label: string; value: string }[];
  problem?: string[];
  built: string[];
  code?: { caption: string; text: string };
  results: string[];
  limits: string[];
  links: { label: string; href: string }[];
  visual: 'timemachine' | 'skillguard' | 'bars' | 'flow' | 'none';
  mediaTitle?: string;
  media?: Media[];
  flow?: { caption: string; steps: { title: string; items: string[] }[] };
};

export const projects: Project[] = [
  {
    slug: 'asof',
    title: 'AsOf',
    tagline: "Checks an AI assistant's answers against the policy in force on the customer's date.",
    summary:
      "AsOf checks each policy claim in an AI assistant's answer against the policy version that was in force on the customer's date, stops answers that contradict it, and keeps a tamper-evident record of every decision.",
    when: 'Nov 2026',
    builtFor: 'IBM Db2Hack 2026 finalist, solo',
    outcome: '0 of 65 wrong drafts released on blind sets',
    tone: 'ok',
    facts: [
      { label: 'Role', value: 'Solo build' },
      { label: 'Context', value: 'IBM Db2Hack 2026 finalist (top 15), November 2026' },
      { label: 'Stack', value: 'IBM Db2 12.1, SQL PL, LangGraph, LangChain, Python' },
      { label: 'Outcome', value: '1,331 tests. 0 of 65 wrong drafts released on blind test sets.' },
    ],
    problem: [
      "In 2024 a Canadian tribunal held Air Canada liable after its website chatbot told a grieving customer he could claim a bereavement fare after travelling. The airline's own policy said the opposite (Moffatt v. Air Canada, 2024 BCCRT 149).",
      'Every company running an AI assistant has the same exposure, and it gets worse with time. Policies change, and when a complaint arrives months later, nobody can show which version of the policy the assistant should have been answering from.',
      "Checking an answer against today's policy is not enough. It has to be right for the customer's date.",
    ],
    built: [
      'Policy clauses live in a bitemporal Db2 table. Business time records when a version applies. System time records when the database learned about it, so any past answer can be replayed against what was known at that moment.',
      "One SQL statement finds the clauses in force on the customer's date and ranks them by meaning, using Db2's native vector search in the same query as the date filter.",
      'A LangGraph pipeline with fixed edges checks every claim in the draft. A contradicted answer is rewritten from the policy text or held for a person. If any step fails, the answer is not released.',
      'Every decision is appended to a ledger whose rows are hash-chained with SHA-256 inside Db2. Triggers block edits and deletes, even by the table owner.',
      'It plugs in wherever answers are written: an API, a LangChain runnable, a chat page and an MCP tool.',
    ],
    code: {
      caption: "The retrieval at the centre of the check: clauses in force on the customer's date, ranked by meaning.",
      text: `SELECT c.CLAUSE_ID, c.VERSION_LABEL, c.CLAUSE_TEXT, c.RULE_JSON,
       VECTOR_DISTANCE(c.EMBEDDING, VECTOR(?, 384, FLOAT32), COSINE) AS DIST
FROM POLICY_CLAUSE FOR BUSINESS_TIME AS OF ? AS c
WHERE c.DOC_ID = ?
ORDER BY DIST FETCH EXACT FIRST ? ROWS ONLY`,
    },
    results: [
      'On the five frozen test sets that never motivated a fix, it released 0 of 65 wrong drafts (95% upper bound about 4.6%).',
      'Across all nine frozen sets in the latest run, it released 1 of 121 wrong drafts and stopped 4 of 70 correct ones.',
      "Checked against today's policy instead of the customer's date, the same pipeline released 6 of 16 date-sensitive wrong drafts. With the customer's date, none.",
      'On a policy written by another AI that it had never seen, it made the right call on 30 of 40 drafts. A plain LLM judge managed 6 of 40.',
      "1,331 tests at 80% line coverage, with CI running against IBM's stock Db2 image.",
      'Along the way I documented a Db2 defect with a one-command reproduction: a forced vector-index scan under a date predicate fails with SQL0901N.',
    ],
    limits: [
      'Four of the nine test sets motivated a fix at some point, so they are not blind. The number I stand behind is the 0 of 65 on the five that never did.',
      'Verifying the full hash chain takes 46 minutes at one million decisions. Checkpointed verification reads only the rows since the last checkpoint, and the full scan is kept for audits.',
      "The policies are two demo domains: an airline's customer service plan and a bank's fee schedule. It has not yet run on a real company's policy history.",
    ],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/JustJay7/asof' },
      { label: 'Demo video (2:58)', href: 'https://www.youtube.com/watch?v=mntehVWQn8E' },
    ],
    media: [
      {
        kind: 'video',
        src: '/media/asof-tour.mp4',
        w: 1120,
        h: 700,
        poster: '/media/asof-tour.webp',
        alt: 'Screens from the AsOf app: answer check, policy timeline, audit ledger and customer chat',
        caption: 'The real app: the answer check, the policy timeline, the audit ledger and the customer chat.',
      },
      {
        kind: 'image',
        src: '/media/asof-two-dates.webp',
        w: 1600,
        h: 336,
        alt: 'The same draft checked for 10 March 2026 and 2 June 2026',
        caption: 'The same draft on two dates: corrected under version 1, released under version 2.',
      },
      {
        kind: 'image',
        src: '/media/asof-chat.webp',
        w: 1400,
        h: 875,
        alt: 'A customer chat with AsOf checking each reply behind the scenes',
        caption: 'The customer-facing chat, with the check running behind it.',
      },
    ],
    visual: 'timemachine',
  },
  {
    slug: 'perfect-pair',
    title: 'Perfect Pair',
    tagline: 'An agentic returns assistant for a footwear retailer.',
    summary:
      'An agentic returns assistant built for ALDO. It resolves customer returns, supports store decisions and investigates why products come back.',
    when: 'Oct 2026',
    builtFor: 'BSRM x ALDO Retail Gen AI Hackathon, team of five',
    outcome: 'prize winner',
    tone: 'warn',
    facts: [
      { label: 'Role', value: 'Owned the full technical build on a team of five' },
      { label: 'Context', value: 'BSRM x ALDO Retail Gen AI Hackathon, October 2026' },
      { label: 'Stack', value: 'Claude on AWS Bedrock, Node.js, SQLite, EC2' },
      { label: 'Outcome', value: 'Selected as a finalist, then won a prize at the live final.' },
    ],
    problem: [
      'The hackathon theme was returns. A return costs a retailer twice: once to process, and again when the same product keeps coming back for the same reason.',
    ],
    built: [
      "Three workflows in one interface: resolving a customer's return, supporting a store decision, and investigating return patterns across products.",
      'The server owns case state, tool execution and approval checks. The model proposes an action and the application decides whether it runs.',
      'Every session is saved and can be replayed, so anyone can see exactly what the agent did and why.',
      'Runs on Claude through AWS Bedrock. The hackathon copy was hosted on EC2 behind an IAM role.',
      "Works from synthetic operational scenarios plus aggregates of the data ALDO supplied. The raw files stay out of the repository.",
    ],
    results: [
      'Selected as a finalist after the first phase.',
      'Won a prize at the live final on October 15 and 16, 2026.',
    ],
    limits: [
      'It is a demo, not a production service. Financial, inventory and publication actions are simulated.',
      'Role switching is a demonstration control, not real authentication.',
    ],
    links: [{ label: 'Code on GitHub', href: 'https://github.com/JustJay7/perfect-pair' }],
    media: [
      {
        kind: 'video',
        src: '/media/perfect-pair-run.mp4',
        w: 1120,
        h: 700,
        poster: '/media/perfect-pair-run.webp',
        alt: 'Perfect Pair handling a return: the customer phone view beside the agent trace',
        caption:
          "A return handled end to end in scripted demo mode. The customer's phone is on the left; the agent's plan, tool calls and safety checks are on the right.",
      },
      {
        kind: 'image',
        src: '/media/perfect-pair-receipt.webp',
        w: 1280,
        h: 800,
        alt: 'The value receipt and outcome explanation shown to staff',
        caption: 'The value receipt and the reason for the outcome. Staff see this; the customer does not.',
      },
    ],
    visual: 'flow',
    flow: {
      caption: 'The model proposes. The server decides what actually runs.',
      steps: [
        { title: 'Three workflows', items: ['Customer return', 'Store decision', 'Pattern investigation'] },
        { title: 'Server', items: ['Case state', 'Tool execution', 'Approval checks', 'Saved replays'] },
        { title: 'Model', items: ['Claude on AWS Bedrock'] },
      ],
    },
  },
  {
    slug: 'skillguard',
    title: 'SkillGuard',
    tagline: 'Tests what a new skill does before an AI agent can install it.',
    summary:
      'Before a personal AI agent installs a skill it wrote for itself, SkillGuard runs that skill in a sandbox, records what it does, and lets a person decide.',
    when: 'Oct 2026',
    builtFor: 'Nebius x NVIDIA Global AI Hackathon, team of two',
    outcome: 'blocked a skill a static scanner rated safe',
    tone: 'ok',
    facts: [
      { label: 'Role', value: 'Team of two' },
      { label: 'Context', value: 'Nebius x NVIDIA Global AI Hackathon, October 2026' },
      { label: 'Stack', value: 'NVIDIA Nemotron on Nebius Token Factory, Hermes Agent, NVIDIA OpenShell, NVIDIA SkillEvaluator, Harbor, Python' },
      { label: 'Outcome', value: '1,058 tests. Blocked an unsafe skill that static checks rated safe.' },
    ],
    problem: [
      'AI agents can now write their own skills: instructions and scripts they save and reuse. A skill that looks fine on paper can behave very differently once it runs.',
      "Static scanners read a skill's source. They cannot see what it does when it executes.",
    ],
    built: [
      'Pause. SkillGuard captures the skill an agent stages for itself before it is written, and records a hash of the exact guide and script.',
      "Test. It runs NVIDIA's source checks, twelve receipt tasks and four generated attack probes. A test agent exercises the skill inside an OpenShell sandbox.",
      'Decide. Nemotron reviews the recorded evidence. Failed checks or observed unsafe actions block the install. A passing version becomes eligible for human approval, and installs are versioned so they can be rolled back.',
    ],
    results: [
      'A static scanner scored our unsafe test skill 7 out of 100 and rated it safe, the same score it gave the repaired version.',
      'At runtime the same skill got all twelve receipt tasks right while attempting thirteen reads of a private file, all denied by the sandbox.',
      'SkillGuard blocked the install, even when the model reviewer wrongly recommended allowing it.',
      '1,058 tests in the offline suite.',
    ],
    limits: [
      'The supported profile is narrow: receipt skills in a fixed, isolated workspace. Small attack sets and partial traces do not establish general safety.',
      'An earlier paired study found no overall gain in safe task completion from using the skill. That result is kept in the repository.',
    ],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/JustJay7/skillguard' },
      { label: 'Demo video (2:44)', href: 'https://youtu.be/eZ9NVyEEMAI' },
    ],
    media: [
      {
        kind: 'video',
        src: '/media/skillguard-walkthrough.mp4',
        w: 1120,
        h: 700,
        poster: '/media/skillguard-walkthrough.webp',
        alt: 'The SkillGuard walkthrough stepping through its four stages',
        caption: 'The recorded walkthrough: catch the change, watch the agent, review the boundary, keep control.',
      },
      {
        kind: 'image',
        src: '/media/skillguard-watch.webp',
        w: 1400,
        h: 896,
        alt: 'Evidence from a sandbox run: the injected instruction and what the agent actually did',
        caption: 'Evidence from the sandbox run: the injected instruction, and what the agent actually did.',
      },
    ],
    visual: 'skillguard',
  },
  {
    slug: 'olist-late-delivery',
    title: 'Olist late deliveries',
    tagline: 'Flags e-commerce orders likely to arrive late, at the moment they are approved.',
    summary:
      'A model that flags e-commerce orders likely to arrive after the promised date, using only what is known when the order is approved.',
    when: 'Fall 2026',
    builtFor: 'McGill INSY 674, led a team of seven',
    outcome: 'top 10% of flags catch 36% of late orders',
    tone: 'ok',
    facts: [
      { label: 'Role', value: 'Project lead on a team of seven: framing, repository and shared code, feature iteration, integration' },
      { label: 'Context', value: 'McGill INSY 674 final project, Fall 2026' },
      { label: 'Stack', value: 'Python, pandas, scikit-learn' },
      { label: 'Outcome', value: 'Checking the riskiest 10% of orders catches 36% of the late ones.' },
    ],
    problem: [
      'Olist is a Brazilian marketplace. Between January 2017 and July 2018, 7.0% of its delivered orders arrived after the promised date. Late orders averaged 2.21 stars, against 4.28 for orders that arrived on time.',
      'The goal was to flag risky orders early enough for someone to act, instead of finding out from a bad review.',
    ],
    built: [
      'One row per order, joined from seven tables: 85,371 delivered orders after filtering.',
      'Only features known at approval. Reviews were left out because they do not exist yet, and payments because we could not confirm they are known at that point.',
      'Every model was scored with the same five-fold time-series cross-validation. The test set was used once, at the end.',
      'Models were compared on lift, because late rates swing from 2.8% to 18.8% across folds and raw PR-AUC swings with them.',
    ],
    results: [
      'Checking the riskiest 10% of orders each day would have caught 36% of late orders in the test period, against 10% for random checks.',
      'Logistic regression beat the tree models. They overfit: their lift on training folds was 6 to 12 times their validation lift.',
      'Where the parcel is going and how long the promise is matter more than what is in it.',
    ],
    limits: [
      'The gain over a simple baseline is modest. A logistic regression on two features, promised days and customer state, already catches 33.6%.',
      'No single feature is strong, and lateness comes in system-wide waves that the model cannot see coming.',
    ],
    links: [{ label: 'Code on GitHub', href: 'https://github.com/JustJay7/olist-late-delivery' }],
    mediaTitle: 'From the analysis',
    media: [
      {
        kind: 'image',
        src: '/media/olist-budget-curves.webp',
        w: 1400,
        h: 492,
        alt: 'Precision-recall curve and recall at each review budget on the test set',
        caption: 'Precision-recall, and the share of late orders caught at each review budget, on the test set.',
      },
      {
        kind: 'image',
        src: '/media/olist-heatmap.webp',
        w: 1332,
        h: 744,
        alt: 'Heatmap of late rate by seller-to-customer distance and promised delivery window',
        caption: 'Late rate by distance and promised window. Far away with a short promise is the riskiest corner.',
      },
    ],
    visual: 'bars',
  },
  {
    slug: 'kidneystone-x',
    title: 'KidneyStone-X',
    tagline: 'Finds kidney stones on CT scans and outlines the kidney around them.',
    summary:
      'A computer vision pipeline that detects kidney stones on CT slices with YOLOv8, outlines the kidney with a U-Net, and shows which pixels drove each detection.',
    when: 'Nov 2025',
    builtFor: 'Bennett University course project, team of three',
    outcome: 'mAP@0.5 of 0.965 on validation',
    tone: 'ok',
    facts: [
      { label: 'Role', value: 'Team of three' },
      { label: 'Context', value: 'CBCA 241 Image and Video Processing, Bennett University, November 2025' },
      { label: 'Stack', value: 'PyTorch, Ultralytics YOLOv8, U-Net, OpenCV' },
      { label: 'Outcome', value: 'Detector precision 0.923, recall 0.914, mAP@0.5 0.965 on validation.' },
    ],
    problem: [
      'A kidney stone on a CT slice is a few bright pixels. Bone is bright too, and the spine sits a few centimetres away. A detector has to tell them apart.',
    ],
    built: [
      'A ResNet18 stone or no-stone classifier as a sanity check on the data. It reached 99.65% validation accuracy, which confirmed the signal was there before we invested in detection.',
      'A YOLOv8 detector that boxes each stone.',
      'A U-Net that outlines the kidney region, to give each detection anatomical context.',
      'A quantification step that writes stone measurements for each image to a CSV.',
      'Occlusion-sensitivity heatmaps for explainability, after Grad-CAM and SHAP proved a poor fit for this task.',
    ],
    results: [
      'Detector on validation: precision 0.923, recall 0.914, mAP@0.5 0.965, mAP@[0.5 to 0.95] 0.897.',
      'Kidney segmentation: mean Dice 0.84 and mean IoU 0.78 on a small curated set.',
      'The first detector confidently boxed vertebrae as stones, because the automatic labels had treated bright bone as stone. We fixed it by labelling 185 images by hand and using them as ground truth.',
    ],
    limits: [
      'The validation split comes from the same curated subset as the training data, so the headline scores mostly measure label consistency. The stricter mAP@[0.5 to 0.95] of 0.897 is the more honest number.',
      'It has not been tested on scans from another hospital, and it is not a clinical tool.',
    ],
    links: [{ label: 'Code on GitHub', href: 'https://github.com/JustJay7/KidneyStone-X' }],
    mediaTitle: 'Detections',
    media: [
      {
        kind: 'image',
        src: '/media/kidneystone-detections.webp',
        w: 950,
        h: 589,
        alt: 'CT slices with detected kidney stones boxed',
        caption: 'Stones boxed on validation CT slices.',
      },
    ],
    visual: 'none',
  },
  {
    slug: 'ayebot',
    title: 'Ayebot',
    tagline: 'An AI assistant and encrypted messaging platform for universities.',
    summary:
      'A B2B SaaS platform that gives universities an AI assistant and a secure communication layer. In production, with a signed pilot.',
    when: 'Since Jan 2026',
    builtFor: 'Founding engineer',
    outcome: 'in production, pilot signed',
    tone: 'ok',
    facts: [
      { label: 'Role', value: 'Founding engineer' },
      { label: 'Context', value: 'B2B SaaS for universities, January 2026 to present' },
      { label: 'Stack', value: 'Flutter, Next.js, RAG, end-to-end encryption' },
      { label: 'Outcome', value: 'In production. Pilot signed with a private university in India.' },
    ],
    built: [
      'A backend, a Flutter Android app and a Next.js admin dashboard, all in production. About 84,500 lines of code.',
      'End-to-end encrypted one-to-one and group chat, plus meeting chat.',
      'A RAG chatbot that answers from faculty knowledge.',
    ],
    results: ['All three surfaces are in production.', 'A pilot is signed with a private university in India.'],
    limits: ['The source is private. I am happy to walk through the architecture and the code in an interview.'],
    links: [],
    visual: 'flow',
    flow: {
      caption: 'Three surfaces on one backend.',
      steps: [
        { title: 'Clients', items: ['Flutter Android app', 'Next.js admin dashboard'] },
        { title: 'Backend', items: ['Encrypted 1:1 and group chat', 'Meeting chat', 'RAG chatbot'] },
        { title: 'Knowledge', items: ['Faculty knowledge base'] },
      ],
    },
  },
];
