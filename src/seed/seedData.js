import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables (.env is in gdg-backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Import Models
import Event from '../models/Event.js';
import Alumni from '../models/Alumni.js';
import TeamMember from '../models/TeamMember.js';
import Project from '../models/Project.js';
import GalleryAlbum from '../models/GalleryAlbum.js';
import SiteSection from '../models/SiteSection.js';

// ============================================================================
// 1. ORIGINAL ALUMNI DATA
// ============================================================================
const originalAlumni = [
  {
    name: "Anamika Jain",
    role: "Lead GDSC at SATI (2023-24) | Coordinator at GDG Bhopal | CSE Batch 2025",
    era: "The Pioneers",
    bio: "An impactful leader who spearheaded the transition and growth of the community, fostering a culture of innovation and collaboration.",
    skills: ["Community Management", "Leadership", "Public Speaking", "Event Planning"],
    image: "/assets/core team/profile/anamika.jpg",
    color: "#4285F4",
    linkedin: "https://www.linkedin.com/in/anamika-jain1/",
    github: "https://github.com/anamikajain",
    instagram: "",
    batch: "2024",
    org: "GDSC, GDG",
    order: 0,
  },
  {
    name: "Anekant Jain",
    role: "AI Engineer & MERN Stack Developer | SIH'23 Winner | CSE Batch 2025",
    era: "The Visionaries",
    bio: "A technical powerhouse known for winning SIH'23 and pushing the boundaries of AI integration within the community projects.",
    skills: ["AI Engineering", "MERN Stack", "Intelligent Systems", "Cloud Computing"],
    image: "/assets/core team/profile/anekant_jain.jpeg",
    color: "#EA4335",
    linkedin: "https://www.linkedin.com/in/anekantjainsagar/",
    github: "https://github.com/Anekantjainsagar",
    instagram: "https://www.instagram.com/ig.anekant",
    batch: "2025",
    org: "GDSC",
    order: 1,
  },
  {
    name: "Shakti Chaturvedi",
    role: "Backend & AI Engineer | AI & Data Science Batch 2025",
    era: "The Visionaries",
    bio: "Specializing in robust backend architectures and AI-driven solutions, helping scale the community's technical infrastructure.",
    skills: ["Python", "AI Chatbots", "Multi-agent Architectures", "Modern Backend Systems", "MLOps"],
    image: "/assets/core team/profile/shakti_chaturvedi.jpg",
    color: "#FBBC05",
    linkedin: "https://www.linkedin.com/in/shakti-chaturvedi-80620b228/",
    github: "https://github.com/shakti2002",
    instagram: "https://www.instagram.com/gdgoc.sati/",
    batch: "2025",
    org: "GDSC",
    order: 2,
  },
  {
    name: "Chehak Sharma",
    role: "Data Engineering at HCLTech | CSE Batch 2025",
    era: "The Visionaries",
    bio: "Hands-on experience in data engineering and full-stack development. Contributing to healthcare data projects through pipeline optimization and SQL efficiency.",
    skills: ["Data Engineering", "Python", "SQL", "MERN Stack", "Cloud Fundamentals"],
    image: "/assets/core team/profile/chehak_sharma.jpg",
    color: "#34A853",
    linkedin: "https://www.linkedin.com/in/chehak-sharma-a44732221",
    github: "https://github.com/chehaksharmaa",
    instagram: "https://instagram.com/chehak.sharmaa",
    batch: "2025",
    org: "GDSC",
    order: 3,
  },
  {
    name: "Ayush Suryavanshi",
    role: "SDE at Prevoyance | IOT Batch 2025",
    era: "The Visionaries",
    bio: "An expert in building scalable software solutions and mentored many juniors in mastering the art of clean code and system design.",
    skills: ["Software Engineering", "System Design", "Node.js", "Scalability", "Agile Methodologies"],
    image: "/assets/core team/profile/ayush _suryavanshi.jpg",
    color: "#4285F4",
    linkedin: "https://www.linkedin.com/in/ayush-suryavanshi/",
    github: "https://github.com/AYUSHSURYAVANSHI",
    instagram: "https://www.instagram.com/__ayush.suryavanshi",
    batch: "2025",
    org: "GDSC",
    order: 4,
  },
  {
    name: "Rajvardhan Singh Gangwar",
    role: "Google Cloud Facilitator | SIH'23 Winner | CSE(BC) Batch 2025",
    era: "The Visionaries",
    bio: "A cloud enthusiast who empowered the community with GCP knowledge and lead teams to victory in national competitions like SIH'23.",
    skills: ["Google Cloud", "Leadership", "Infrastructure as Code", "Python", "Android", "MERN", "Flutter"],
    image: "/assets/core team/profile/rajvardhan.jpeg",
    color: "#EA4335",
    linkedin: "https://www.linkedin.com/in/rajvardhan-singh-gangwar/",
    github: "https://github.com/invictus04",
    instagram: "https://www.instagram.com/yeah.itz_raj",
    batch: "2025",
    org: "GDSC",
    order: 5,
  },
  {
    name: "Monika Basene",
    role: "GDG Lead '25 | Batch 2025",
    era: "The Future Legends",
    bio: "Representing the next generation of leadership, driving the transition to GDG on Campus with a focus on emerging technologies.",
    skills: ["Community Building", "Leadership", "Technology Strategy", "Public Speaking"],
    image: "/assets/core team/profile/monika.jpeg",
    color: "#FBBC05",
    linkedin: "https://www.linkedin.com/in/monika-basene/",
    github: "",
    instagram: "https://instagram.com/monika_basene",
    batch: "2025",
    org: "GDSC",
    order: 6,
  }
];

// ============================================================================
// 2. ORIGINAL EVENTS DATA
// ============================================================================
const originalEvents = [
  {
    slug: "hands-on-workshop-dive-into-computer-vision",
    title: "Hands-on Workshop: Dive into Computer Vision",
    date: "Jan 31, 2026, 11:00 AM – 4:00 PM (GMT+5:30)",
    description: "Join us for an engaging and interactive workshop where you'll explore the exciting world of Computer Vision. This hands-on session will provide you with the foundational skills to understand and implement basic computer vision techniques using popular tools and frameworks. Our experienced instructors will guide you through real-world applications and projects, enabling you to gain practical experience and deepen your understanding of this rapidly evolving field. Don't miss this opportunity to enhance your technical skills and network with fellow technology enthusiasts.",
    location: "Smart Classroom, SATI Vidisha, Civil Lines, Vidisha, 464001",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_400,q_auto:good,w_1200/v1/gcs/platform-data-goog/event_banners/blob_1y9zYit",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hands-on-workshop-dive-into-computer-vision/",
    type: "Workshop",
    year: "2026",
    order: 0,
  },
  {
    slug: "final-showdown-in-hack-verse-hackathon-2026",
    title: "Final Showdown in Hack&Verse Hackathon 2026: Top 10 Teams Pitching",
    date: "Jan 26, 2026, 7:00 – 9:30 PM (GMT+5:30)",
    description: "The Grand Finale of Hack&Verse Hackathon 2026 Has Arrived! After days of intense coding, innovation, and perseverance, the most promising teams from around the world have been selected to present their groundbreaking solutions. In this final showdown, the Top 10 Teams will pitch their projects to a panel of expert judges, showcasing their technical expertise, creativity, and the potential impact of their ideas. Join us for an evening of inspiration, as we celebrate the power of innovation and witness the crowning of the Hack&Verse hackathon champions!",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-final-showdown-in-hackampverse-hackathon-2026-top-10-teams-pitching/",
    type: "Hackathon",
    year: "2026",
    order: 1,
  },
  {
    slug: "ai-tools-prototyping-mastery",
    title: "AI Tools & Prototyping Mastery",
    date: "Jan 18, 2026, 7:30 – 9:00 PM (GMT+5:30)",
    description: "Build Faster. Prototype Smarter. Innovate with AI. As part of Hack&Verse Hackathon 2026, GDG On Campus SATI Vidisha presents an AI Tools & Prototyping Session to help participants transform their ideas into working prototypes efficiently. Experience the cutting-edge AI tools that are revolutionizing development. Learn how to leverage Gemini, Google's most capable AI model, and other AI-driven platforms to speed up your workflow, from brainstorming to deployment.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-ai-tools-amp-prototyping-mastery/",
    type: "Session",
    year: "2026",
    order: 2,
  },
  {
    slug: "hack-verse-hackathon-2026-inaugural-kick-off",
    title: "Hack&Verse Hackathon 2026: Inaugural Kick-off and Orientation Session",
    date: "Jan 13, 2026, 7:00 – 8:30 PM (GMT+5:30)",
    description: "HackVerse Hackathon – Campaign 2 is officially in progress. We invite you to participate in the Kick-off & Orientation Session organized by GDG On Campus SATI Vidisha. Understand the goals, tracks, rules, and guidelines to prepare for an incredible hackathon experience.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hackampverse-hackathon-2026-inaugural-kick-off-and-orientation-session/",
    type: "Hackathon",
    year: "2026",
    order: 3,
  },
  {
    slug: "devfest-bhopal-2025",
    title: "DevFest Bhopal 2025",
    date: "Nov 30, 2025, 9:00 AM – 5:00 PM (GMT+5:30)",
    description: "Join Central India's premier developer festival! Connect with hundreds of developers, designers, and tech enthusiasts for a day of learning, building, and celebrating innovation. Experience expert sessions on Google Cloud, Android, Web, and AI/ML.",
    location: "Courtyard by Marriott Bhopal, DB City Mall, Bhopal, 462011",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/header%20-%201_20251113_003804_0000_178lGpL.png",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-bhopal-presents-devfest-bhopal-2025-1/cohost-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india",
    type: "Conference",
    year: "2025",
    order: 4,
  },
  {
    slug: "genesis-hackathon-final-showdown",
    title: "Genesis Hackathon: Final Showdown",
    date: "Nov 8, 2025, 10:00 AM – 6:00 PM (GMT+5:30)",
    description: "Join us for the ultimate coding battle in the Final Round of the Genesis Hackathon! This is the culminating offline event at SATI Smart Classroom, where you'll experience live coding and problem-solving.",
    location: "Smart Classroom - SATI, Civil Lines, Vidisha, 464001",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-genesis-hackathon-final-showdown/",
    type: "Hackathon",
    year: "2025",
    order: 5,
  },
  {
    slug: "gdg-genesis-hackathon-2025",
    title: "GDG Genesis Hackathon 2025",
    date: "Oct 15, 2025, 11:00 AM – Oct 26, 2025, 11:30 PM (GMT+5:30)",
    description: "Exclusively crafted for 1st-year students at SATI College! Includes Online Ideation, Development Round, and Final Offline Pitching.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-genesis-hackathon-2025/",
    type: "Hackathon",
    year: "2025",
    order: 6,
  },
  {
    slug: "google-cloud-study-jam-kick-off",
    title: "Google Cloud Study Jam Kick-off",
    date: "Oct 5, 2025, 3:00 – 6:00 PM (GMT+5:30)",
    description: "Dive into cloud computing basics with Google Cloud Platform (GCP). Learn how to redeem $400 credits and unlock comprehensive learning pathways.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-google-cloud-study-jam-kick-off/",
    type: "Study Jam",
    year: "2025",
    order: 7,
  },
  {
    slug: "gdg-on-campus-kick-off",
    title: "GDG on Campus Kick-Off: Meet the Core Team and Future Events!",
    date: "Sep 28, 2025, 1:30 – 4:30 PM (GMT+5:30)",
    description: "Inaugural GDG on Campus event at SATI Vidisha! Meet our passionate core team members, learn about our vision, and discover upcoming workshops and events.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-on-campus-kick-off-meet-the-core-team-and-future-events/",
    type: "Kick-off",
    year: "2025",
    order: 8,
  },
  {
    slug: "tech-winter-break-gdgsati-web-development",
    title: "Tech Winter Break GDGSATI: Web Development",
    date: "Dec 22, 2024, 7:00 – 8:30 PM (GMT+5:30)",
    description: "Comprehensive Web Development Roadmap, tips for landing paid internships, and guidance on building impactful projects.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Tech_Winter_Break_Banner_2560x650_mK4NxXu.jpg",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-tech-winter-break-gdgsati-web-development/",
    type: "Workshop",
    year: "2024",
    order: 9,
  },
  {
    slug: "machine-learning-workshop",
    title: "Machine Learning Workshop",
    date: "Nov 9, 2024, 8:00 PM – Nov 13, 2024, 8:00 PM (GMT+5:30)",
    description: "Hands-on workshop introducing core concepts and practical applications of machine learning using popular frameworks.",
    location: "Online",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-machine-learning-workshop/",
    type: "Workshop",
    year: "2024",
    order: 10,
  },
  {
    slug: "cloud-skills-kickoff",
    title: "Cloud Skills Kickoff",
    date: "Oct 20, 2024, 12:00 – 1:00 PM (GMT+5:30)",
    description: "Step-by-step guide to redeeming Google Cloud Skill Boost codes and completing cloud skill badges effectively.",
    location: "Online via Google Meet",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Yellow_SsVplbc.jpg",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-cloud-skills-kickoff/",
    type: "Kick-off",
    year: "2024",
    order: 11,
  },
  {
    slug: "gdgc-info-session-and-gen-ai-study-jam",
    title: "GDGC Info Session and Gen AI Study Jam",
    date: "Sep 28, 2024, 10:30 AM – 2:00 PM (GMT+5:30)",
    description: "Introduction to Google Developer Groups on-campus community, future events, and GenAI hands-on learning roadmap.",
    location: "Samrat Ashok Technological Institute, Civil lines, Vidisha, 464001",
    imageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Green_du73i0o.jpg",
    originalUrl: "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdgc-info-session-and-gen-ai-study-jam/",
    type: "Info Session",
    year: "2024",
    order: 12,
  }
];

// ============================================================================
// 3. ORIGINAL TEAM MEMBERS (LEADS + TECHNICAL + MEDIA + EVENTS + MANAGEMENT)
// ============================================================================
const originalTeam = [
  // --- Core Leads ---
  {
    name: 'Sanidhya Sahu',
    role: 'Organiser',
    subRole: 'IOT - Final Year',
    category: 'lead',
    bio: 'Leading the GDG chapter with a vision to empower developers and foster innovation through community collaboration.',
    image: '/assets/core team/profile/sanidhya.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/sanidhya-sahu/', github: 'https://github.com/isanidhya' },
    skills: ['Leadership', 'Management', 'Public Speaking'],
    order: 0,
  },
  {
    name: 'Pankaj Yadav',
    role: 'Co-organiser',
    subRole: 'IOT - Final Year',
    category: 'lead',
    bio: 'Creative Developer specializing in strategy, operations, and scalable design.',
    image: '/assets/core team/profile/pankaj.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/pankaj-yadav-5998b3249/', github: 'https://github.com/theopendraft', instagram: 'https://www.instagram.com/the_open_draft' },
    skills: ['Strategy', 'Operations', 'Community'],
    order: 1,
  },
  {
    name: 'Anuj Jain',
    role: 'Technical Lead',
    subRole: 'IOT - Final Year',
    category: 'lead',
    bio: 'Overseeing technical projects and guiding the team to build robust, scalable solutions using cutting-edge technologies.',
    image: '/assets/core team/profile/anuj.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/anujjainbatu/', github: 'https://github.com/anujjainbatu' },
    skills: ['Full Stack', 'Cloud', 'Architecture'],
    order: 2,
  },
  {
    name: 'Manraj Gupta',
    role: 'Executive Lead',
    subRole: 'IT - Final Year',
    category: 'lead',
    bio: 'Coordinating between teams to ensure alignment with chapter goals and efficient resource utilization.',
    image: '/assets/core team/profile/manraj.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/manraj-gupta/' },
    skills: ['Leadership', 'Execution', 'Planning'],
    order: 3,
  },

  // --- Technical Team ---
  {
    name: 'Kalp Soni',
    role: 'ML Head',
    subRole: 'IT - Pre Final Year',
    category: 'technical',
    bio: 'Passionate about Machine Learning and AI, leading the team to explore new frontiers in intelligent systems.',
    image: '/assets/core team/profile/kalp.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/kalp-soni-1b3084275/' },
    skills: ['Python', 'TensorFlow', 'AI'],
    order: 4,
  },
  {
    name: 'Nikhil Kushwaha',
    role: 'IOT head',
    subRole: 'EE - Pre Final Year',
    category: 'technical',
    bio: 'Bridging the physical and digital worlds through innovative IoT solutions and hardware hacking.',
    image: '/assets/core team/profile/nikhil.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/nikhil-kushwah-664304218/' },
    skills: ['IoT', 'Arduino', 'Sensors'],
    order: 5,
  },
  {
    name: 'Kaustubh Awasthi',
    role: 'Cloud Head',
    subRole: 'CSE - Pre Final Year',
    category: 'technical',
    bio: 'Architecting cloud-native solutions and promoting scalable infrastructure practices within the community.',
    image: '/assets/core team/profile/kaustubh.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/kawasthi2889/' },
    skills: ['AWS', 'GCP', 'DevOps'],
    order: 6,
  },
  {
    name: 'Shreya Mangal',
    role: 'Technical Lead',
    subRole: 'IT - 2nd Year',
    category: 'technical',
    bio: 'Skills include C, Python, and Web Dev. Deeply interested in DSA and problem-solving.',
    image: '/assets/core team/profile/shreya.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/shreya-mangal', github: 'https://github.com/shreya-4567', instagram: 'https://www.instagram.com/shreyamangal_22' },
    skills: ['Web Dev', 'Frontend', 'React'],
    order: 7,
  },
  {
    name: 'Devanshu Vishwakarma',
    role: 'Technical Lead',
    subRole: 'IT - 2nd Year',
    category: 'technical',
    bio: 'MERN stack developer skilled in MongoDB, Express, Node.js, React.js, and Java.',
    image: '/assets/core team/profile/devanshu.png',
    socials: { linkedin: 'https://www.linkedin.com/in/devanshu-vishwakarma/', github: 'https://github.com/devanshu-2004', instagram: 'https://www.instagram.com/devan.sh04/' },
    skills: ['Mobile Dev', 'Flutter', 'UI/UX'],
    order: 8,
  },
  {
    name: 'Utkarsh Vishwakarma',
    role: 'Technical Lead',
    subRole: 'AIADS - 2nd Year',
    category: 'technical',
    bio: 'Specializing in algorithmic problem solving and competitive programming to tackle complex challenges.',
    image: '/assets/core team/profile/utkarsh.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/utkarsh-vish/', github: 'https://github.com/UtkiVish' },
    skills: ['Algorithms', 'C++', 'Data Structures'],
    order: 9,
  },
  {
    name: 'Deepak Kumar Gupta',
    role: 'Technical Lead',
    subRole: 'IT - 2nd Year',
    category: 'technical',
    bio: 'Passionate CS student with interests in AI/ML, Blockchain, and IoT. Skilled in building innovative solutions.',
    image: '/assets/core team/profile/deepak.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/deepak-kumar-gupta', github: 'https://github.com/deepak004-g', instagram: 'https://www.instagram.com/deepak_02004' },
    skills: ['Software Eng', 'Java', 'Systems'],
    order: 10,
  },
  {
    name: 'Aashutosh Singh Baghel',
    role: 'Technical Lead',
    subRole: 'CSE - 2nd Year',
    category: 'technical',
    bio: 'C/C++, Python and system design enthusiast.',
    image: '/assets/core team/profile/aashutosh.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/aashutosh-singh-baghel', github: 'https://github.com/thunder-thigh', instagram: 'https://instagram.com/aashu.3d' },
    skills: ['C/C++', 'Python', 'Linux'],
    order: 11,
  },
  {
    name: 'Harshwardhan Soni',
    role: 'Technical Lead',
    subRole: 'CSE - 2nd Year',
    category: 'technical',
    bio: 'Enthusiastic about backend systems and database optimization for high-performance applications.',
    image: '',
    socials: {},
    skills: ['Backend', 'Node.js', 'SQL'],
    order: 12,
  },
  {
    name: 'Nakul Chourey',
    role: 'Technical Team',
    subRole: 'CSE(BC) - 1st Year',
    category: 'technical',
    bio: 'Exploring various tech stacks and contributing to open source projects to learn and grow.',
    image: '/assets/core team/profile/nakul.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/nakul-chourey-29i/' },
    skills: ['Development', 'Open Source', 'Git'],
    order: 13,
  },
  {
    name: 'Anushka Rai',
    role: 'Technical Team',
    subRole: 'CSE - 1st Year',
    category: 'technical',
    bio: 'Basic programming in C, Python, Web fundamentals, and DSA.',
    image: '/assets/core team/profile/anushka.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/anushka-rai1606', github: 'https://github.com/nushoncodes', instagram: 'https://www.instagram.com/rai_anushkaa09' },
    skills: ['Coding', 'Problem Solving', 'Tech'],
    order: 14,
  },

  // --- Media & Social Team ---
  {
    name: 'Roshni Rajani',
    role: 'Design Head',
    subRole: 'AIADS - Pre Final Year',
    category: 'social',
    bio: 'Crafting visual stories and ensuring a consistent, appealing brand identity for the chapter.',
    image: '/assets/core team/profile/roshni.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/roshni-rajani/', instagram: 'https://www.instagram.com/iroshnirajani/' },
    skills: ['UI/UX', 'Figma', 'Branding'],
    order: 15,
  },
  {
    name: 'Kazim Sheikh',
    role: 'Social Media Head',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'social',
    bio: 'Engaging our community through creative content strategies and active social media presence.',
    image: '/assets/core team/profile/kazim.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/kazim-sheikh-713287312/', instagram: 'https://www.instagram.com/_kazim.fr/' },
    skills: ['Social Media', 'Marketing', 'Content'],
    order: 16,
  },
  {
    name: 'Ritika Jain',
    role: 'Content & Engagement Head',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'social',
    bio: 'Curating compelling content and fostering meaningful interactions to keep the community vibrant.',
    image: '/assets/core team/profile/ritika.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/ritika-jain17/', instagram: 'https://www.instagram.com/__ri.mi/' },
    skills: ['Content Writing', 'Engagement', 'Storytelling'],
    order: 17,
  },
  {
    name: 'Safal Tiwari',
    role: 'Media Lead',
    subRole: 'IOT - 2nd Year',
    category: 'social',
    bio: 'Capturing moments and creating high-quality visual assets to document our journey.',
    image: '/assets/core team/profile/safal.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/safal-tiwari/', instagram: 'https://www.instagram.com/itz_safal_/', github: 'https://github.com/SAFAL-TIWARI/' },
    skills: ['Photography', 'Editing', 'Media'],
    order: 18,
  },
  {
    name: 'Taufiq Lohar',
    role: 'Media Lead',
    subRole: 'CSE - 2nd Year',
    category: 'social',
    bio: 'Specializing in video production and visual storytelling to highlight chapter achievements.',
    image: '/assets/core team/profile/taufiq.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/taufiq-lohar-3023ab344/' },
    skills: ['Videography', 'Premiere Pro', 'Creativity'],
    order: 19,
  },
  {
    name: 'Saiyed Rehan Ali',
    role: 'Lead Graphic Designer',
    subRole: 'IOT - 2nd Year',
    category: 'social',
    bio: "Lead Graphic Designer for GDG On Campus SATI. Blending art with technology to make complex tech look great and easy to understand.",
    image: '/assets/core team/profile/rehan.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/saiyed-rehan-ali-23b88532b', github: 'https://github.com/Saiyedrehanali-cloud', instagram: 'https://www.instagram.com/rehanali3_' },
    skills: ['Graphic Design', 'Visual Arts', 'Media'],
    order: 20,
  },
  {
    name: 'Ronak Kushwah',
    role: 'Social Media Team',
    subRole: 'AIML - 1st Year',
    category: 'social',
    bio: 'Assisting in managing social channels and analyzing metrics to improve outreach.',
    image: '/assets/core team/profile/ronak.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/vlronak/', instagram: 'https://www.instagram.com/ronak._.kushwah/' },
    skills: ['Analytics', 'Socials', 'Growth'],
    order: 21,
  },

  // --- Events Team ---
  {
    name: 'Vinayak Mawat',
    role: 'Event Lead',
    subRole: 'IOT - 2nd Year',
    category: 'events',
    bio: 'Orchestrating events from conception to execution, ensuring memorable experiences for attendees.',
    image: '/assets/core team/profile/vinayak.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/vinayak-mawat-881011333/', instagram: 'https://www.instagram.com/_vinayak_mawat_/' },
    skills: ['Event Management', 'Planning', 'Coordination'],
    order: 22,
  },
  {
    name: 'Aryaman Sahu',
    role: 'Event Lead',
    subRole: 'IOT - 2nd Year',
    category: 'events',
    bio: 'Event logistics and technical coordination for chapter activities.',
    image: '/assets/core team/profile/aryaman.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/aryamansahu08', github: 'https://github.com/aryamansahu11', instagram: 'https://www.instagram.com/ayushhh.81' },
    skills: ['Logistics', 'Operations', 'Teamwork'],
    order: 23,
  },
  {
    name: 'Dewanshi Pardhi',
    role: 'Event Team',
    subRole: 'AIADS - 1st Year',
    category: 'events',
    bio: 'Supporting event operations and helping to create a welcoming atmosphere for all members.',
    image: '/assets/core team/profile/dewanshi.jpeg',
    socials: {},
    skills: ['Support', 'Organization', 'Volunteering'],
    order: 24,
  },

  // --- Management Team ---
  {
    name: 'Suprabhat Upadhyay',
    role: 'Co-executive head',
    subRole: 'IT - Pre Final Year',
    category: 'management',
    bio: 'Assisting in executive decisions and streamlining operational workflows for better efficiency.',
    image: '/assets/core team/profile/suprabhat.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/suprabhat-upadhyay-ab996031a/', instagram: 'https://www.instagram.com/upadhyay_1409/', github: 'https://github.com/suprabhat1409-art' },
    skills: ['Management', 'Operations', 'Leadership'],
    order: 25,
  },
  {
    name: 'Arpit bansal',
    role: 'Logistics Head',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'management',
    bio: 'Ensuring all resources and materials are available and properly managed for every event.',
    image: '/assets/core team/profile/arpit.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/arpit-bansal-711858293/', instagram: 'https://www.instagram.com/_arppitt._/' },
    skills: ['Logistics', 'Supply Chain', 'Resource Mgmt'],
    order: 26,
  },
  {
    name: 'Danish Khan',
    role: 'Finance & Sponsorship Head',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'management',
    bio: 'Managing chapter finances and building partnerships to sustain and grow our community initiatives.',
    image: '/assets/core team/profile/danish.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/danish-khan-cse/', instagram: 'https://www.instagram.com/danish_khan_7387/' },
    skills: ['Finance', 'Sponsorship', 'Partnerships'],
    order: 27,
  },
  {
    name: 'Dakshesh Jat',
    role: 'Management Head',
    subRole: 'CSE - Pre Final Year',
    category: 'management',
    bio: 'Overseeing general management tasks and ensuring team cohesion and productivity.',
    image: '/assets/core team/profile/dakshesh.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/dakshesh-jat/' },
    skills: ['Administration', 'Team Building', 'Management'],
    order: 28,
  },
  {
    name: 'Deepti Rai',
    role: 'Public Relations Head',
    subRole: 'IT - Pre Final Year',
    category: 'management',
    bio: 'Data analytics, Data Science, ML, and Gen-AI outreach.',
    image: '/assets/core team/profile/deepti.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/deepti-rai-77517a2a2', github: 'https://github.com/Deepti618', instagram: 'https://www.instagram.com/deepti.raii_' },
    skills: ['PR', 'Communication', 'Media Relations'],
    order: 29,
  },
  {
    name: 'Rudransh Rai',
    role: 'Community Outreach Head',
    subRole: 'IT - Pre Final Year',
    category: 'management',
    bio: 'Community outreach and growth lead.',
    image: '/assets/core team/profile/rudransh.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/rudransh-rai-a32426315', instagram: 'https://www.instagram.com/r5anxh' },
    skills: ['Outreach', 'Community Building', 'Networking'],
    order: 30,
  },
  {
    name: 'Akash Tripathi',
    role: 'Google Ambassador',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'management',
    bio: 'Representing GDG on campus and promoting Google technologies to students and peers.',
    image: '/assets/core team/profile/akash.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/akash-tripathi-16b96a239/', instagram: 'https://www.instagram.com/infinityakash97/' },
    skills: ['Ambassadorship', 'Promotion', 'Google Tech'],
    order: 31,
  },
  {
    name: 'Hardik Kumar Sinha',
    role: 'PR & Sponsor',
    subRole: 'AIADS - 2nd Year',
    category: 'management',
    bio: 'Working on securing sponsorships and maintaining good relationships with our partners.',
    image: '/assets/core team/profile/hardik.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/hardik-kumar-sinha/', github: 'https://github.com/hksinha510', instagram: 'https://www.instagram.com/har.dikks/' },
    skills: ['Sponsorship', 'PR', 'Negotiation'],
    order: 32,
  },
  {
    name: 'Shristi tiwari',
    role: 'Management Team',
    subRole: 'AIML - 1st Year',
    category: 'management',
    bio: 'Python learner exploring Machine Learning and AI technologies.',
    image: '/assets/core team/profile/shristi.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/shristi-tiwari-18a85437b', github: 'https://github.com/st0845320-bit', instagram: 'https://www.instagram.com/_shristi_t' },
    skills: ['Administration', 'Support', 'Management'],
    order: 33,
  },
  {
    name: 'Suryansh Gupta',
    role: 'Management Team',
    subRole: 'AIML - 1st Year',
    category: 'management',
    bio: 'Helping to coordinate team activities and maintain organized records for the chapter.',
    image: '/assets/core team/profile/suryansh.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/suryansh08/', instagram: 'https://www.instagram.com/suryansh08_/' },
    skills: ['Coordination', 'Records', 'Organization'],
    order: 34,
  },
  {
    name: 'Megha Singh',
    role: 'PR & Sponsor',
    subRole: 'CSE(BC) - 1st Year',
    category: 'management',
    bio: 'Assisting with public relations efforts and sponsorship drives to support chapter events.',
    image: '/assets/core team/profile/megha.jpeg',
    socials: {},
    skills: ['PR', 'Sponsorship', 'Communication'],
    order: 35,
  }
];

// ============================================================================
// 4. ORIGINAL PROJECTS
// ============================================================================
const originalProjects = [
  {
    title: 'GDG Official Website Portal',
    description: 'The official platform for Google Developer Groups on Campus SATI Vidisha, built with React, Vite, TailwindCSS, Express.js, and MongoDB.',
    techStack: ['React', 'TailwindCSS', 'Express.js', 'MongoDB', 'Framer Motion'],
    links: {
      github: 'https://github.com/SAFAL-TIWARI/GDGoC-website',
      live: 'https://gdgoc-sati.vercel.app/',
      demo: 'https://gdgoc-sati.vercel.app/',
    },
    image: '/assets/projects/web-preview.jpeg',
    order: 0,
  }
];

// ============================================================================
// 5. ORIGINAL GALLERY ALBUMS
// ============================================================================
const originalGallery = [
  {
    title: 'Hack&Verse Hackathon 2026',
    type: 'Hackathon',
    year: '2026',
    coverImage: 'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5',
    images: [
      'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5',
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_400,q_auto:good,w_1200/v1/gcs/platform-data-goog/event_banners/blob_1y9zYit'
    ],
    order: 0,
  },
  {
    title: 'Genesis Hackathon 2025',
    type: 'Hackathon',
    year: '2025',
    coverImage: 'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI',
    images: [
      'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI'
    ],
    order: 1,
  },
  {
    title: 'Google Cloud Study Jam 2025',
    type: 'Cloud Computing',
    year: '2025',
    coverImage: 'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png',
    images: [
      'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png'
    ],
    order: 2,
  }
];

// ============================================================================
// 6. SITE SECTIONS (MEET THE TEAM SECTION CONFIG)
// ============================================================================
const originalMeetTheTeamSection = {
  sectionKey: 'meet_the_team',
  title: 'Meet The Team',
  description: 'The passionate individuals who make everything possible. From coding to event management, our diverse team works together to deliver the best experience.',
  data: {
    cards: [
      {
        id: 'technical',
        title: 'Technical Team',
        description: 'Architects of digital innovation, crafting robust solutions and pioneering future technologies to build a smarter world.',
        image: '/assets/core team/technical_team.jpeg',
      },
      {
        id: 'social',
        title: 'Social Media Team',
        description: 'The digital storytellers, amplifying our voice and connecting with the community through engaging and creative content.',
        image: '/assets/core team/social_team.jpeg',
      },
      {
        id: 'events',
        title: 'Events Team',
        description: 'The masterminds behind the curtain, orchestrating seamless experiences that bring people together and spark inspiration.',
        image: '/assets/core team/events_team.jpeg',
      },
      {
        id: 'management',
        title: 'Marketing & Finance',
        description: 'The strategic engines, driving growth and ensuring sustainable success through smart resource management and outreach.',
        image: '/assets/core team/management_team.jpeg',
      },
    ],
    cta: {
      title: 'Join Our whatsapp community and be the part of it!!',
      description: 'The Nexus of Next, Where Minds Merge to Redefine Tomorrow. be the part of it!!',
      image: '/assets/core team/group_image3.jpeg',
      link: 'https://chat.whatsapp.com/HY4x1jtPfbh6EDh1JPFWda',
    },
  },
};

// ============================================================================
// SAFE & NON-DESTRUCTIVE DATABASE SEEDER (Exported for server.js)
// ============================================================================
export const seedDatabase = async () => {
  try {
    // 1. Alumni: Seed only if empty
    const alumniCount = await Alumni.countDocuments();
    if (alumniCount === 0) {
      await Alumni.insertMany(originalAlumni);
      console.log(`[Seed] Initialized ${originalAlumni.length} alumni.`);
    } else {
      console.log(`[Seed] Alumni already exists (${alumniCount} records). Preserved.`);
    }

    // 2. Events: Seed only if empty
    const eventsCount = await Event.countDocuments();
    if (eventsCount === 0) {
      await Event.insertMany(originalEvents);
      console.log(`[Seed] Initialized ${originalEvents.length} events.`);
    } else {
      console.log(`[Seed] Events already exist (${eventsCount} records). Preserved.`);
    }

    // 3. Team: Seed only if empty
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(originalTeam);
      console.log(`[Seed] Initialized ${originalTeam.length} team members.`);
    } else {
      console.log(`[Seed] Team members already exist (${teamCount} records). Preserved.`);
    }

    // 4. Projects: Seed only if empty
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany(originalProjects);
      console.log(`[Seed] Initialized ${originalProjects.length} projects.`);
    } else {
      console.log(`[Seed] Projects already exist (${projectsCount} records). Preserved.`);
    }

    // 5. Gallery: Seed only if empty
    const galleryCount = await GalleryAlbum.countDocuments();
    if (galleryCount === 0) {
      await GalleryAlbum.insertMany(originalGallery);
      console.log(`[Seed] Initialized ${originalGallery.length} gallery albums.`);
    } else {
      console.log(`[Seed] Gallery albums already exist (${galleryCount} records). Preserved.`);
    }

    // 6. Site Sections (meet_the_team): Seed only if not existing
    const existingSection = await SiteSection.findOne({ sectionKey: 'meet_the_team' });
    if (!existingSection) {
      await SiteSection.create(originalMeetTheTeamSection);
      console.log('[Seed] Initialized "meet_the_team" section configuration.');
    } else {
      console.log('[Seed] "meet_the_team" section already exists. Preserved.');
    }
  } catch (error) {
    console.error('[Seed] Non-critical error during seed check:', error.message);
  }
};

export default seedDatabase;
