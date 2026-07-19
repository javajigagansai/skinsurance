// Mock Data Repository for SK Smart Premium Insurance Platform

export const PLANS = [
  {
    id: 'plan-health-premium',
    name: 'SK Platinum Care',
    category: 'Health',
    description: 'Comprehensive health coverage with global treatment access, zero co-pay, and unlimited room rent benefits.',
    premiumMonthly: 120,
    coverageAmount: '1,000,000',
    features: [
      'Cashless hospitalisation worldwide',
      'Zero co-pay on operations',
      'Pre & post hospitalisation expenses up to 180 days',
      'Complimentary annual health checks',
      'No room rent caps'
    ],
    badge: 'Popular',
    icon: 'FaHeartbeat'
  },
  {
    id: 'plan-health-standard',
    name: 'SK Health Shield',
    category: 'Health',
    description: 'Essential medical protection covering hospital bills, diagnostics, and day-care procedures.',
    premiumMonthly: 65,
    coverageAmount: '500,000',
    features: [
      'Over 10,000 cashless network hospitals',
      'Ambulance charge coverage',
      '24/7 online doctor teleconsultation',
      'Tax savings under Section 80D',
      'No-claim bonus up to 50%'
    ],
    badge: null,
    icon: 'FaShieldAlt'
  },
  {
    id: 'plan-life-secure',
    name: 'SK Term Elite',
    category: 'Life',
    description: 'High-value term life protection securing your family\'s financial stability with flexible payout structures.',
    premiumMonthly: 45,
    coverageAmount: '2,500,000',
    features: [
      'Lump-sum or monthly pension payouts',
      'Optional critical illness riders',
      'Terminal illness early payout benefit',
      'Accidental death double coverage benefit',
      'Premium waiver on permanent disability'
    ],
    badge: 'Best Value',
    icon: 'FaHandHoldingHeart'
  },
  {
    id: 'plan-motor-max',
    name: 'SK Auto Max Cover',
    category: 'Motor',
    description: 'Comprehensive bumper-to-bumper car insurance with roadside assistance and zero depreciation.',
    premiumMonthly: 35,
    coverageAmount: 'Full Vehicle Value',
    features: [
      'Bumper-to-Bumper zero depreciation coverage',
      '24/7 spot roadside assistance (towing, flat tires)',
      'Engine protection and consumables cover',
      'Key replacement & personal belongings cover',
      'Cashless repairs at 5,000+ garages'
    ],
    badge: 'Best-Seller',
    icon: 'FaCar'
  },
  {
    id: 'plan-home-castle',
    name: 'SK Safe Haven',
    category: 'Home',
    description: 'Complete home structure and contents policy securing your home from fire, flood, burglary, and natural disasters.',
    premiumMonthly: 25,
    coverageAmount: '750,000',
    features: [
      'Structure and content coverage',
      'Rent for alternative accommodation benefit',
      'Electrical/mechanical breakdown cover for appliances',
      'Burglary and theft coverage',
      'Third-party public liability cover'
    ],
    badge: null,
    icon: 'FaHome'
  },
  {
    id: 'plan-travel-global',
    name: 'SK GlobeTrotter Pro',
    category: 'Travel',
    description: 'Stress-free international travel coverage covering trip cancellation, baggage loss, and emergency medical fees.',
    premiumMonthly: 15,
    coverageAmount: '200,000',
    features: [
      'Emergency medical evacuation coverage',
      'Flight delay & trip cancellation compensation',
      'Baggage loss and passport loss coverage',
      'Bail bond and legal liability assistance',
      'Covid-19 medical coverage included'
    ],
    badge: null,
    icon: 'FaPlane'
  }
];

export const MY_POLICIES = [
  {
    policyNumber: 'AP-HLTH-88390',
    planName: 'SK Platinum Care',
    type: 'Health',
    status: 'Active',
    coverage: '₹1,000,000',
    startDate: '2025-01-15',
    endDate: '2026-01-14',
    premiumAmount: '₹120/mo',
    paymentFrequency: 'Monthly',
    nextDueDate: '2026-08-15',
    insuredPersons: ['John Doe (Self)', 'Jane Doe (Spouse)'],
    documents: ['Policy_Wording.pdf', 'Premium_Receipt_July.pdf']
  },
  {
    policyNumber: 'AP-LIFE-47291',
    planName: 'SK Term Elite',
    type: 'Life',
    status: 'Active',
    coverage: '₹2,500,000',
    startDate: '2024-03-22',
    endDate: '2049-03-21',
    premiumAmount: '₹45/mo',
    paymentFrequency: 'Monthly',
    nextDueDate: '2026-08-22',
    insuredPersons: ['John Doe (Self)'],
    nominee: 'Jane Doe (Spouse)',
    documents: ['Policy_Certificate.pdf']
  },
  {
    policyNumber: 'AP-MTR-10293',
    planName: 'SK Auto Max Cover',
    type: 'Motor',
    status: 'Renewal Due',
    coverage: '₹35,000 (Vehicle IDV)',
    startDate: '2025-07-20',
    endDate: '2026-07-20',
    premiumAmount: '₹420/yr',
    paymentFrequency: 'Annually',
    nextDueDate: '2026-07-20',
    vehicleDetails: 'Tesla Model 3 (2023) - Reg: TX-77B-998',
    documents: ['Auto_Insurance_Card.pdf', 'Terms_Schedule.pdf']
  }
];

export const CLAIMS = [
  {
    id: 'CLM-9028',
    policyNumber: 'AP-HLTH-88390',
    planName: 'SK Platinum Care',
    type: 'Health',
    amount: '₹3,200',
    dateFiled: '2026-06-12',
    status: 'Approved',
    description: 'Emergency appendectomy hospital charges at St. Mary Hospital.',
    history: [
      { date: '2026-06-12', status: 'Claim Filed', note: 'Claim documents submitted successfully.' },
      { date: '2026-06-14', status: 'Document Verification', note: 'Hospital bills and discharge summary validated.' },
      { date: '2026-06-16', status: 'Approved', note: 'Claim approved by auditor. Payout processed.' }
    ]
  },
  {
    id: 'CLM-4431',
    policyNumber: 'AP-MTR-10293',
    planName: 'SK Auto Max Cover',
    type: 'Motor',
    amount: '₹1,850',
    dateFiled: '2026-07-02',
    status: 'In Progress',
    description: 'Minor bumper damage repair claim following parking lot collision.',
    history: [
      { date: '2026-07-02', status: 'Claim Filed', note: 'Incident report and photos submitted.' },
      { date: '2026-07-05', status: 'Surveyor Assigned', note: 'Surveyor inspector Mike Jenkins assigned.' },
      { date: '2026-07-09', status: 'Inspection Completed', note: 'Damage estimate evaluated. Under final review.' }
    ]
  },
  {
    id: 'CLM-0192',
    policyNumber: 'AP-HLTH-88390',
    planName: 'SK Platinum Care',
    type: 'Health',
    amount: '₹450',
    dateFiled: '2025-11-20',
    status: 'Settled',
    description: 'Outpatient specialist consultation and prescription medication bills.',
    history: [
      { date: '2025-11-20', status: 'Claim Filed', note: 'Pharmacy bills submitted.' },
      { date: '2025-11-21', status: 'Approved', note: 'Claim approved.' },
      { date: '2025-11-24', status: 'Settled', note: 'Funds deposited in customer\'s primary bank account.' }
    ]
  }
];

export const LEADS = [
  { id: 'LD-902', name: 'Robert Dow', phone: '+1 234-987-1122', email: 'robert@test.com', planInterest: 'Health Plan', status: 'New', notes: 'Interested in Platinum plan, requested call after 4 PM' },
  { id: 'LD-903', name: 'Angela Merkel', phone: '+1 345-123-5566', email: 'angela@merkel.de', planInterest: 'Home Cover', status: 'Contacted', notes: 'Wants premium details for structure coverage' },
  { id: 'LD-904', name: 'Elon Dust', phone: '+1 899-722-1111', email: 'elon.d@spacey.org', planInterest: 'Motor Insurance', status: 'Follow Up', notes: 'Wants multi-vehicle discount for electric cars' },
  { id: 'LD-905', name: 'Steve Jobs', phone: '+1 408-999-8888', email: 'steve@apple.com', planInterest: 'Life Cover', status: 'Interested', notes: 'Interested in high premium riders and disability benefits' },
  { id: 'LD-906', name: 'Warren Buffet', phone: '+1 402-123-4567', email: 'warren@berkshire.com', planInterest: 'Life Cover', status: 'Not Interested', notes: 'Refused offer, already has comprehensive life packages' }
];

export const CLIENTS = [
  { id: 'CLT-1102', name: 'Mark Zuckerberg', email: 'zuck@meta.com', phone: '+1 650-111-2222', activePolicies: 2, lastContact: '2026-07-01', totalPremium: '₹2,400/yr', riskLevel: 'Low' },
  { id: 'CLT-1103', name: 'Jeff Bezos', email: 'jeff@amazon.com', phone: '+1 206-888-9999', activePolicies: 1, lastContact: '2026-06-25', totalPremium: '₹1,800/yr', riskLevel: 'Medium' },
  { id: 'CLT-1104', name: 'Bill Gates', email: 'bill@gatesfoundation.org', phone: '+1 425-777-5555', activePolicies: 3, lastContact: '2026-07-12', totalPremium: '₹5,200/yr', riskLevel: 'Low' },
  { id: 'CLT-1105', name: 'Tim Cook', email: 'tcook@apple.com', phone: '+1 408-555-0199', activePolicies: 1, lastContact: '2026-05-18', totalPremium: '₹900/yr', riskLevel: 'Low' }
];

export const SUPPORT_TICKETS = [
  { id: 'TCK-8819', creator: 'John Doe', subject: 'Tax Certificate Query', priority: 'Medium', status: 'Open', dateCreated: '2026-07-13', category: 'Tax' },
  { id: 'TCK-8812', creator: 'Jeff Bezos', subject: 'Policy Addition Issue', priority: 'High', status: 'Resolved', dateCreated: '2026-07-08', category: 'Technical' },
  { id: 'TCK-8809', creator: 'Bill Gates', subject: 'Auto Debit Setup Failed', priority: 'High', status: 'In Review', dateCreated: '2026-07-11', category: 'Billing' }
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Top 5 Tips to Reduce Your Car Insurance Premium',
    excerpt: 'Find out how defensive driving courses, higher deductibles, and anti-theft equipment can lower your premium payments significantly.',
    content: 'Insurance companies calculate auto insurance premiums based on risk. Fortunately, as a vehicle owner, you have significant control over many risk factors. First, consider taking a certified defensive driving course; many providers offer automatic premium reductions of up to 10% for drivers holding these certificates. Second, adjust your deductibles. Raising your collision and comprehensive deductible from ₹20,000 to ₹80,000 can reduce your premium by 15% to 30%. Third, ensure your car is equipped with anti-theft devices like alarm systems or GPS trackers, which deter thieves and please insurers.',
    category: 'Auto',
    date: 'July 10, 2026',
    author: 'Mark Sterling (Auto Risk Lead)',
    readTime: '4 min read'
  },
  {
    id: 'blog-2',
    title: 'Understanding Term vs. Whole Life Insurance',
    excerpt: 'A clean, comprehensive analysis explaining the difference between simple term plans and cash-accumulation whole-life packages.',
    content: 'Choosing the right life insurance coverage is one of the most critical decisions you will make for your family’s financial future. The debate usually centers on Term Life vs. Whole Life. Term Life is straightforward: you pay a monthly premium for a set period (e.g., 10, 20, or 30 years). If you pass away during the term, your beneficiaries receive the death benefit. Whole Life, conversely, lasts your entire lifetime and includes a "cash value" savings component that grows tax-deferred. While Whole Life offers lifetime security, its premiums can be 5x to 10x higher than Term Life, making Term Life the preferred choice for those looking to maximize immediate protection.',
    category: 'Life',
    date: 'June 28, 2026',
    author: 'Elena Rostova (Financial Planner)',
    readTime: '6 min read'
  },
  {
    id: 'blog-3',
    title: 'A Guide to Planning Health Coverage for Seniors',
    excerpt: 'What to look for in senior citizen policies: critical illness riders, co-payments, pre-existing condition wait times.',
    content: 'As we age, healthcare expenses naturally increase, making comprehensive health insurance vital. When purchasing a policy for seniors, pay careful attention to the "waiting period" for pre-existing diseases, which typically ranges from 1 to 4 years. Additionally, examine the "co-payment" clause—a percentage of the bill the policyholder must pay out-of-pocket (e.g., 20%). Seeking plans with no room-rent sub-limits and checking the network hospital count near the resident home are also essential steps to guarantee quick, stress-free admissions during medical emergencies.',
    category: 'Health',
    date: 'May 14, 2026',
    author: 'Dr. Arthur Pendelton (Health Consultant)',
    readTime: '5 min read'
  }
];

export const FAQS = [
  {
    question: 'How long does it take to process a claim?',
    answer: 'Most outpatient health claims and minor motor claims are processed within 3 to 5 business days. In-patient cash-less claims are settled directly with the hospital within 2 to 4 hours. Complex claims requiring physical surveys or extensive documentation can take up to 14 business days.'
  },
  {
    question: 'Can I change my nominee details after purchasing a life policy?',
    answer: 'Yes. You can update nominee details at any time by logging into the Customer Dashboard, navigating to the "Policy Details" page, clicking on "Manage Nominee," and uploading the updated nomination form. Changes are typically processed within 24 hours.'
  },
  {
    question: 'What is a "No Claim Bonus" (NCB)?',
    answer: 'A No Claim Bonus is a discount on the renewal premium offered by insurance companies to policyholders who did not file any claims during the preceding policy year. It accumulates annually and can reach up to 50% for motor and health policies, providing substantial savings.'
  },
  {
    question: 'Is international medical coverage included in health plans?',
    answer: 'Our SK Platinum Care plan provides global cashless healthcare cover. Other standard plans generally cover emergency medical expenses within the home country. For travel abroad, we recommend our specialized GlobeTrotter Pro travel plan.'
  }
];

export const CAREERS = [
  {
    id: 'car-1',
    title: 'Senior Claims Underwriter',
    department: 'Claims & Underwriting',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    description: 'We are seeking a senior underwriting professional with 5+ years of experience to assess high-risk premium portfolios and streamline employee validation systems.'
  },
  {
    id: 'car-2',
    title: 'Insurance Sales Agent',
    department: 'Agency Force',
    location: 'Remote (USA)',
    type: 'Commission-based',
    description: 'Looking for energetic individuals with active state insurance licenses. Earn competitive commissions, access top-tier marketing support, and manage your portfolio inside our agent interface.'
  },
  {
    id: 'car-3',
    title: 'Lead Frontend Developer (React)',
    department: 'Digital Innovation Hub',
    location: 'New York, NY (On-site)',
    type: 'Full-time',
    description: 'Help us design and polish the next generation of premium client portals. Advanced knowledge of React, Tailwind CSS, routing architectures, and dashboard optimization is required.'
  }
];

export const NOTIFICATIONS = [
  { id: 'ntf-1', title: 'Premium Payment Received', message: 'Thank you for your premium payment of ₹120 for policy AP-HLTH-88390.', time: '2 hours ago', unread: true, type: 'payment' },
  { id: 'ntf-2', title: 'Claim Status Updated', message: 'Claim CLM-4431 has progressed to "Surveyor Inspection" stage.', time: '1 day ago', unread: true, type: 'claim' },
  { id: 'ntf-3', title: 'Renewal Impending', message: 'Your Auto Max Cover policy AP-MTR-10293 expires in 6 days. Click to renew.', time: '2 days ago', unread: false, type: 'alert' }
];

export const SYSTEM_LOGS = [
  { timestamp: '2026-07-14T12:05:12', user: 'Alex Mercer (Admin)', action: 'System settings update', status: 'Success', ip: '192.168.1.1' },
  { timestamp: '2026-07-14T11:45:22', user: 'Mike Ross (Telecaller)', action: 'Status change LD-902 -> Contacted', status: 'Success', ip: '192.168.1.42' },
  { timestamp: '2026-07-14T10:12:00', user: 'Jane Watson (Employee)', action: 'Claim CLM-9028 approved', status: 'Success', ip: '192.168.1.109' },
  { timestamp: '2026-07-14T09:30:15', user: 'System Cron', action: 'Automated renewal reminders dispatched', status: 'Success', ip: 'localhost' }
];
