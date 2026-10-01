export type Course = {
  code: string;
  title: string;
  fullTitle: string;
  duration: string;
  durationMonths: number;
  icon: string;
  level: string;
  topics: string[];
  accent: string;
  popular?: boolean;
};

export const BRAND = {
  name: "BICT Computer Education",
  tagline: "Join us today for better tomorrow",
  regNo: "Regd. No. - 054879",
  approval: "Approved by Ministry of Corporate Affairs, Govt. of India",
  sub: "A Complete IT - Professional Training Institute",
  phone: "+91 70708 85367",
  phoneRaw: "7070885367",
  whatsapp: "917070885367",
  address:
    "BICT Computer Education, Near Devi Asthan, Saidpur More, Bhikhna Pahari, Opp. Gopal Medical Hall, Patna - 4",
  email: "bictcomputereducation@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#features", label: "Facilities" },
  { href: "#faculty", label: "Faculty" },
  { href: "#career", label: "Career" },
  { href: "#contact", label: "Contact" },
];

export const STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "10,000+", label: "Students Trained" },
  { value: "13", label: "Courses & Modules" },
  { value: "100%", label: "Job Assistance" },
];

export const FEATURES = [
  {
    icon: "certificate",
    title: "Approved Certificate",
    text: "Approved Certificate by Govt. recognised after every course completion.",
  },
  {
    icon: "ac",
    title: "A.C. Classroom",
    text: "Fully air-conditioned, comfortable classrooms for better learning.",
  },
  {
    icon: "wifi",
    title: "Wi-Fi & Screen",
    text: "High speed Wi-Fi and projector screen powered teaching setup.",
  },
  {
    icon: "power",
    title: "Power Backup",
    text: "Power (Electricity) backup facility so classes never get stopped.",
  },
  {
    icon: "lab",
    title: "Well Equipped Lab",
    text: "Well equipped computer lab with modern hardware and software.",
  },
  {
    icon: "one",
    title: "One Person One Computer",
    text: "Every learner gets a personal computer for hands-on practice.",
  },
  {
    icon: "weekly",
    title: "Weekly Extra Lab",
    text: "Weekly extra lab facility to strengthen your practical knowledge.",
  },
  {
    icon: "doubt",
    title: "Doubt Class Every Day",
    text: "Daily doubt clearing sessions so no concept is left unclear.",
  },
  {
    icon: "assignment",
    title: "Practical Assignment",
    text: "Topic wise practical assignment after every single module.",
  },
  {
    icon: "test",
    title: "Topic Wise Test",
    text: "Topic wise test to evaluate and improve your performance.",
  },
  {
    icon: "award",
    title: "Awards & Prizes",
    text: "Awards & prizes for meritorious students every month.",
  },
  {
    icon: "quiz",
    title: "K.B.C., Debate & Quiz",
    text: "K.B.C. Champion, debate and quiz competitions for all-round growth.",
  },
  {
    icon: "job",
    title: "100% Job Assistance",
    text: "Dedicated placement support and job assistance for all students.",
  },
];
export const TYPING = [
  {
    icon: "keyboard",
    title: "Typing in Hindi",
    text: "Learn Hindi typing on Remington / Kruti Dev layout with regular speed building practice.",
  },
  {
    icon: "keyboard",
    title: "Typing in English",
    text: "English typing practice with speed, accuracy and time-bound assessments.",
  },
  {
    icon: "certificate",
    title: "Free Approved Certificate",
    text: "Get a free approved and additional typing certificate after successful completion.",
  },
];

export const CAREERS = [
  { icon: "briefcase", title: "Office Management", text: "Eligible for office and administration roles in private and government sector." },
  { icon: "database", title: "Data Entry Operator", text: "High demand government and BPO data entry operator positions." },
  { icon: "palette", title: "Graphics Designer", text: "Work with CorelDraw, Photoshop and PageMaker for design studios and printers." },
  { icon: "code", title: "Web Designer", text: "Build websites with HTML and modern web designing tools." },
  { icon: "chip", title: "Software Developer", text: "Strong foundation in Python, C and Java for software development careers." },
  { icon: "calculator", title: "Accountant", text: "Tally Prime with GST and TDS makes you job-ready for accounting roles." },
  { icon: "certificate", title: "All Govt. Jobs", text: "Eligible for all government jobs that require computer certification." },
];

export const COURSE_OPTIONS = [
  "Certificate in Computer Application (CCA)",
  "Certificate in Financial Accounting (CFA)",
  "Computer Professional Training (CPT)",
  "Diploma in Computer Application (DCA)",
  "Diploma in Financial Accounting (DFA)",
  "Diploma in Desktop Publishing (DTP)",
  "Advance Diploma in Computer Application (ADCA)",
  "Hardware & Networking / Laptop Servicing",
  "Web Designing & Software Development",
  "Computer Typing",
  "Other / Not Sure",
];

export const BATCH_TIMES = [
  "Morning (6 AM - 10 AM)",
  "Day (10 AM - 2 PM)",
  "Evening (2 PM - 7 PM)",
];

export const PROCESS = [
  { step: "01", title: "Enquiry", text: "Fill the enquiry form or simply call us. We will guide you to pick the right course." },
  { step: "02", title: "Counselling", text: "Free counselling to understand your goals, eligibility and career direction." },
  { step: "03", title: "Admission", text: "Complete admission with easy instalment option and nominal downpayment." },
  { step: "04", title: "Learning", text: "Learn on one-person-one-computer with daily doubt classes, assignments and tests." },
  { step: "05", title: "Certificate", text: "Receive approved course certificate along with the free typing certificate." },
  { step: "06", title: "Job Assistance", text: "100% job assistance and placement support to get you started." },
];

export const REVIEWS = [
  {
    name: "Priya Kumari",
    course: "ADCA",
    text: "I joined ADCA and now I work as a data entry operator. The daily doubt classes and one computer per student helped me a lot.",
  },
  {
    name: "Rakesh Yadav",
    course: "CFA / Tally Prime",
    text: "The Tally and GST training was very practical. I got a job in an accounts department within two months of completion.",
  },
  {
    name: "Md. Sahil Anwar",
    course: "DTP",
    text: "CorelDraw and Photoshop classes were excellent. Fees were also very affordable compared to other institutes.",
  },
];

export const FAQS = [
  {
    q: "Do I need prior computer knowledge to join?",
    a: "No. Our beginner level courses like CCA, CFA and CPT start from the very basics. We also give daily doubt clearing support.",
  },
  {
    q: "Is the certificate government approved?",
    a: "Yes. BICT Computer Education is registered (Regd. No. 054879) and approved by the Ministry of Corporate Affairs, Govt. of India. Certificates are issued after course completion.",
  },
  {
    q: "Can I pay the fee in instalments?",
    a: "Yes. Fees can be paid in instalments with a nominal downpayment. Visit the institute or call us for the current fee structure.",
  },
  {
    q: "Do you provide job assistance?",
    a: "Yes, we provide 100% job assistance including practice sessions, interview preparation and placement support.",
  },
  {
    q: "Is computer typing included?",
    a: "Yes. Typing in Hindi and English is included, and you receive a free approved typing certificate.",
  },
  {
    q: "What are the batch timings?",
    a: "We run morning, day and evening batches so that working students and job seekers can also attend.",
  },
];
