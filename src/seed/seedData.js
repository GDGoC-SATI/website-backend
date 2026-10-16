import dns from 'dns';
if (process.platform === 'win32' && !process.env.VERCEL) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore DNS override errors
  }
}

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
    image: "/assets/core_team/profile/anamika.jpg",
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
    image: "/assets/core_team/profile/anekant_jain.jpeg",
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
    image: "/assets/core_team/profile/shakti_chaturvedi.jpg",
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
    image: "/assets/core_team/profile/chehak_sharma.jpg",
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
    image: "/assets/core_team/profile/ayush _suryavanshi.jpg",
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
    image: "/assets/core_team/profile/rajvardhan.jpeg",
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
    image: "/assets/core_team/profile/monika.jpeg",
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
    "slug": "hands-on-workshop-dive-into-computer-vision",
    "title": "Hands-on Workshop: Dive into Computer Vision",
    "date": "Jan 31, 2026, 11:00 AM – 4:00 PM (GMT+5:30)",
    "description": "Join us for an engaging and interactive workshop where you'll explore the exciting world of Computer Vision. This hands-on session will provide you with the foundational skills to understand and implement basic computer vision techniques using popular tools and frameworks. Our experienced instructors will guide you through real-world applications and projects, enabling you to gain practical experience and deepen your understanding of this rapidly evolving field. Don't miss this opportunity to enhance your technical skills and network with fellow technology enthusiasts.",
    "location": "Smart Classroom, SATI Vidisha, Civil Lines, Vidisha, 464001",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_400,q_auto:good,w_1200/v1/gcs/platform-data-goog/event_banners/blob_1y9zYit",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hands-on-workshop-dive-into-computer-vision/",
    "type": "Workshop",
    "year": "2026",
    "status": "Planning",
    "timeline": [],
    "order": 0
  },
  {
    "slug": "hack-verse-hackathon-2026",
    "title": "Hack&Verse Hackathon 2026",
    "date": "Jan 13 – Jan 26, 2026",
    "description": "\n🚀 Campaign Highlights & Structure:\n• Stage 1: Inaugural Kick-off & Orientation — Introduction to hackathon tracks, rules, guidelines, team building, and live community Q&A.\n• Stage 2: AI Tools & Prototyping Workshop — Hands-on session leveraging Google Gemini and AI-assisted workflows to accelerate development speed.\n• Stage 3: The Grand Finale — Top 10 shortlisted finalist teams pitch live to expert judges to crown the Hack&Verse champions.\n\n💡 Key Tracks:\n• Generative AI & Intelligent Agents\n• Next-Gen Web & Distributed Cloud Solutions\n• Smart Campus & College Utilities\n• Healthcare, Sustainability & Social Good\n\n🏆 Perks & Recognition:\n• Attractive cash prize pool & champion trophies for top podium teams\n• Official certificates & exclusive Google Developer swag kits\n• Direct mentorship and incubation support from senior alumni and industry leads",
    "location": "Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hackampverse-hackathon-2026-inaugural-kick-off-and-orientation-session/",
    "type": "Hackathon",
    "year": "2026",
    "status": "Planning",
    "timeline": [
      {
        "id": "hack-verse-hackathon-2026-inaugural-kick-off",
        "title": "Hack&Verse Hackathon 2026: Inaugural Kick-off and Orientation Session",
        "cardTitle": "Inaugural Kick-off and Orientation Session",
        "date": "Jan 13, 2026, 7:00 – 8:30 PM (GMT+5:30)",
        "phase": "Stage 01 • Inauguration & Orientation",
        "location": "Online",
        "description": "🚀 HackVerse Hackathon – Campaign 2 is officially launched! GDG On Campus SATI Vidisha invites you to the Kick-off & Orientation Session covering hackathon goals, problem tracks, submission criteria, team building strategies, and a live Q&A with the organizing team.",
        "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
        "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hackampverse-hackathon-2026-inaugural-kick-off-and-orientation-session/",
        "status": "Completed"
      },
      {
        "id": "ai-tools-prototyping-mastery",
        "title": "AI Tools & Prototyping Mastery",
        "cardTitle": "AI Tools & Prototyping Mastery",
        "date": "Jan 18, 2026, 7:30 – 9:00 PM (GMT+5:30)",
        "phase": "Stage 02 • Technical Hands-on Session",
        "location": "Online",
        "description": "Build Faster. Prototype Smarter. Innovate with AI. An intensive technical session focused on leveraging Google Gemini, AI-driven prototyping platforms, and best practices to accelerate code development, optimize logic, and create production-ready prototypes for the hackathon.",
        "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
        "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-ai-tools-amp-prototyping-mastery/",
        "status": "Completed"
      },
      {
        "id": "final-showdown-in-hack-verse-hackathon-2026",
        "title": "Final Showdown in Hack&Verse Hackathon 2026: Top 10 Teams Pitching",
        "cardTitle": "Final Showdown: Top 10 Teams Pitching",
        "date": "Jan 26, 2026, 7:00 – 9:30 PM (GMT+5:30)",
        "phase": "Stage 03 • Grand Finale",
        "location": "Online",
        "description": "The Grand Finale of Hack&Verse Hackathon 2026! After days of rigorous coding, mentoring, and refinement, the Top 10 teams pitch their groundbreaking solutions to a distinguished panel of industry judges, demonstrating live demos and answering jury cross-examinations to determine the champions.",
        "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
        "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-final-showdown-in-hackampverse-hackathon-2026-top-10-teams-pitching/",
        "status": "Completed"
      }
    ],
    "order": 1
  },
  {
    "slug": "devfest-bhopal-2025",
    "title": "DevFest Bhopal 2025",
    "date": "Nov 30, 2025, 9:00 AM – 5:00 PM (GMT+5:30)",
    "description": "Join Central India's premier developer festival! Connect with hundreds of developers, designers, and tech enthusiasts for a day of learning, building, and celebrating innovation. DevFest Bhopal 2025 brings the world's largest developer festival to the heart of Madhya Pradesh! Join us in the City of Lakes where heritage meets technology, connecting hundreds of developers, designers, and tech enthusiasts. Experience a day filled with expert-led sessions on Google Cloud, Android, Web technologies, and AI/ML, alongside networking opportunities and hands-on demonstrations.",
    "location": "Courtyard by Marriott Bhopal, DB City Mall, Bhopal, 462011",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/header%20-%201_20251113_003804_0000_178lGpL.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-bhopal-presents-devfest-bhopal-2025-1/cohost-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india",
    "type": "Conference",
    "year": "2025",
    "status": "Planning",
    "timeline": [],
    "order": 2
  },
  {
    "slug": "genesis-hackathon",
    "title": "Genesis Hackathon",
    "date": "Oct 15 – Nov 8, 2025",
    "description": "🚀 Journey & Competition Structure:\n• Round 1 & 2: Online Ideation & Development — Assemble teams, select challenge problem statements, and build functional prototypes with mentorship from senior GDG leads.\n• Grand Finale: Offline Live Pitching — Culminating pitch showdown held in the SATI Smart Classroom, where shortlisted finalists demo their projects before a panel of expert judges.\n\n💡 Key Domains:\n• Web & Mobile Application Development\n• Smart Campus Utilities & Automation Tools\n• Artificial Intelligence & Machine Learning Innovation\n• Open Innovation Track for Creative Solutions\n\n🏆 Perks & Recognition:\n• Winner awards and commemorative champion trophies\n• Certificate of achievement recognized by GDG on Campus SATI\n• Google Developer merchandise, goodie kits, and chapter spotlight",
    "location": "Smart Classroom, SATI Vidisha & Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-genesis-hackathon-2025/",
    "type": "Hackathon",
    "year": "2025",
    "status": "Planning",
    "timeline": [
      {
        "id": "gdg-genesis-hackathon-2025",
        "title": "GDG Genesis Hackathon 2025",
        "cardTitle": "GDG Genesis Hackathon 2025",
        "date": "Oct 15, 2025, 11:00 AM – Oct 26, 2025, 11:30 PM (GMT+5:30)",
        "phase": "Round 01 & 02 • Ideation & Development",
        "location": "Online",
        "description": "Join us for the 'GDG Genesis Hackathon 2025,' an exhilarating journey exclusively crafted for the innovative minds of 1st-year students at SATI College! Kickstart your tech adventure with our multi-stage challenge: Online Ideation Phase to assemble teams and submit proposals, followed by the Development Round to bring concepts to life through active coding.",
        "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
        "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-genesis-hackathon-2025/",
        "status": "Completed"
      },
      {
        "id": "genesis-hackathon-final-showdown",
        "title": "Genesis Hackathon: Final Showdown",
        "cardTitle": "Genesis Hackathon: Final Showdown",
        "date": "Nov 8, 2025, 10:00 AM – 6:00 PM (GMT+5:30)",
        "phase": "Grand Finale • Offline Live Pitching",
        "location": "Smart Classroom - SATI, Civil Lines, Vidisha, 464001",
        "description": "Join us for the ultimate coding battle in the Final Round of the Genesis Hackathon! This is the culminating offline event, where shortlisted finalists experience the thrill of live coding and problem-solving in the Smart Classroom at SATI, showcasing their solutions to a panel of expert judges.",
        "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
        "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-genesis-hackathon-final-showdown/",
        "status": "Completed"
      }
    ],
    "order": 3
  },
  {
    "slug": "google-cloud-study-jam-kick-off",
    "title": "Google Cloud Study Jam Kick-off",
    "date": "Oct 5, 2025, 3:00 – 6:00 PM (GMT+5:30)",
    "description": "Join us for the Google Cloud Study Jam Kick-off event at Samrat Ashok Technological Institute! Dive into the basics of Google Cloud Platform (GCP) as we guide you through an exciting journey of cloud computing. Learn how to redeem your referral code for $400 credits and unlock comprehensive modules to advance your skills. Access essential documents, explore resources, and find out how to get your questions answered. This is the perfect opportunity to begin your cloud journey and connect with like-minded peers. Don't miss out—sign up now, harness the power of the cloud, and elevate your learning experience!",
    "location": "Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-google-cloud-study-jam-kick-off/",
    "type": "Study Jam",
    "year": "2025",
    "status": "Planning",
    "timeline": [],
    "order": 4
  },
  {
    "slug": "gdg-on-campus-kick-off",
    "title": "GDG on Campus Kick-Off: Meet the Core Team and Future Events!",
    "date": "Sep 28, 2025, 1:30 – 4:30 PM (GMT+5:30)",
    "description": "Join us for the inaugural GDG on Campus event at Samrat Ashok Technological Institute, Vidisha! This special gathering is designed to introduce you to the dynamic world of Google Developer Groups within our college. Meet our passionate core team members, learn about our vision, and discover the exciting array of events, workshops, and hackathons we have planned for the upcoming year. Whether you're a beginner or an experienced developer, this kick-off session is the perfect opportunity to network, grow your skills, and become part of a vibrant tech community. Let's build, learn, and innovate together!",
    "location": "Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-on-campus-kick-off-meet-the-core-team-and-future-events/",
    "type": "Kick-off",
    "year": "2025",
    "status": "Planning",
    "timeline": [],
    "order": 5
  },
  {
    "slug": "tech-winter-break-gdgsati-web-development",
    "title": "Tech Winter Break GDGSATI: Web Development",
    "date": "Dec 22, 2024, 7:00 – 8:30 PM (GMT+5:30)",
    "description": "🚀 Join Us for an Exciting Virtual Workshop on Web Development! 🗓 Date: 22nd December ⏰ Time: 7:00 PM (IST) 🎙 Hosted by: GDG Web Lead. What You'll Learn: Comprehensive Web Development Roadmap, Tips for Navigating Your Tech Journey, Insights on Landing Paid Internships, Guidance on Building Impactful Web Projects, And so much more! 📌 Don't miss this opportunity to level up your skills and kickstart your career in tech. Whether you're a beginner or looking to advance your knowledge, this session is the perfect opportunity to level up your skills.",
    "location": "Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Tech_Winter_Break_Banner_2560x650_mK4NxXu.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-tech-winter-break-gdgsati-web-development/",
    "type": "Workshop",
    "year": "2024",
    "status": "Planning",
    "timeline": [],
    "order": 6
  },
  {
    "slug": "machine-learning-workshop",
    "title": "Machine Learning Workshop",
    "date": "Nov 9, 2024, 8:00 PM – Nov 13, 2024, 8:00 PM (GMT+5:30)",
    "description": "Are you curious about machine learning and how it's shaping the future of technology? Join us for an engaging, hands-on workshop designed to introduce you to the core concepts and practical applications of machine learning. Whether you're a beginner or have some experience, this session will provide you with the tools and knowledge to start building your own models. Discover how to leverage machine learning to solve real-world problems, explore popular frameworks, and learn from experts in the field. Don't miss this opportunity to advance your skills and network with other tech enthusiasts!",
    "location": "Online",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-machine-learning-workshop/",
    "type": "Workshop",
    "year": "2024",
    "status": "Planning",
    "timeline": [],
    "order": 7
  },
  {
    "slug": "cloud-skills-kickoff",
    "title": "Cloud Skills Kickoff",
    "date": "Oct 20, 2024, 12:00 – 1:00 PM (GMT+5:30)",
    "description": "Date and Time: 20th October at 12 PM. Platform: Google Meet. Hosted by: GDG on Campus, Samrat Ashok Technological Institute, Vidisha, MP. Event Highlights: Step-by-step guide to redeeming Google Cloud Skill Boost codes. Instructions on how to complete labs effectively. Key rules and timelines for lab completion. Expert tips and live support throughout the session.",
    "location": "Online via Google Meet",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Yellow_SsVplbc.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-cloud-skills-kickoff/",
    "type": "Kick-off",
    "year": "2024",
    "status": "Planning",
    "timeline": [],
    "order": 8
  },
  {
    "slug": "gdgc-info-session-and-gen-ai-study-jam",
    "title": "GDGC Info Session and Gen AI Study Jam",
    "date": "Sep 28, 2024, 10:30 AM – 2:00 PM (GMT+5:30)",
    "description": "The Info Session introduced students to the Google Developer Groups (GDG) on-campus community, fostering engagement in tech and future events. The session also provided details about the soon-to-launch GenAI Study Jam, offering hands-on learning with Generative AI tools and techniques, encouraging participants to explore AI-driven innovation and skill development.",
    "location": "Samrat Ashok Technological Institute, Civil lines, Vidisha, 464001",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Green_du73i0o.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdgc-info-session-and-gen-ai-study-jam/",
    "type": "Info Session",
    "year": "2024",
    "status": "Planning",
    "timeline": [],
    "order": 9
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
    image: '/assets/core_team/profile/sanidhya.jpeg',
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
    image: '/assets/core_team/profile/pankaj.jpeg',
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
    image: '/assets/core_team/profile/anuj.jpeg',
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
    image: '/assets/core_team/profile/manraj.jpeg',
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
    image: '/assets/core_team/profile/kalp.jpeg',
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
    image: '/assets/core_team/profile/nikhil.jpeg',
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
    image: '/assets/core_team/profile/kaustubh.jpeg',
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
    image: '/assets/core_team/profile/shreya.jpeg',
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
    image: '/assets/core_team/profile/devanshu.png',
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
    image: '/assets/core_team/profile/utkarsh.jpg',
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
    image: '/assets/core_team/profile/deepak.jpg',
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
    image: '/assets/core_team/profile/aashutosh.jpeg',
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
    image: '/assets/core_team/profile/nakul.jpeg',
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
    image: '/assets/core_team/profile/anushka.jpg',
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
    image: '/assets/core_team/profile/roshni.jpeg',
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
    image: '/assets/core_team/profile/kazim.jpeg',
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
    image: '/assets/core_team/profile/ritika.jpeg',
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
    image: '/assets/core_team/profile/safal.jpeg',
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
    image: '/assets/core_team/profile/taufiq.jpeg',
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
    image: '/assets/core_team/profile/rehan.jpeg',
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
    image: '/assets/core_team/profile/ronak.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/vlronak/', instagram: 'https://www.instagram.com/ronak._.kushwah/' },
    skills: ['Analytics', 'Socials', 'Growth'],
    order: 21,
  },

  // --- Events Team ---
  {
    name: 'Suprabhat Upadhyay',
    role: 'Co-executive head',
    subRole: 'IT - Pre Final Year',
    category: 'management',
    bio: 'Assisting in executive decisions and streamlining operational workflows for better efficiency.',
    image: '/assets/core_team/profile/suprabhat.jpeg',
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
    image: '/assets/core_team/profile/arpit.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/arpit-bansal-711858293/', instagram: 'https://www.instagram.com/_arppitt._/' },
    skills: ['Logistics', 'Supply Chain', 'Resource Mgmt'],
    order: 26,
  },
  {
    name: 'Dakshesh Jat',
    role: 'Management Head',
    subRole: 'CSE - Pre Final Year',
    category: 'management',
    bio: 'Overseeing general management tasks and ensuring team cohesion and productivity.',
    image: '/assets/core_team/profile/dakshesh.jpg',
    socials: { linkedin: 'https://www.linkedin.com/in/dakshesh-jat/' },
    skills: ['Administration', 'Team Building', 'Management'],
    order: 28,
  },
  {
    name: 'Vinayak Mawat',
    role: 'Event Lead',
    subRole: 'IOT - 2nd Year',
    category: 'events',
    bio: 'Orchestrating events from conception to execution, ensuring memorable experiences for attendees.',
    image: '/assets/core_team/profile/vinayak.jpg',
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
    image: '/assets/core_team/profile/aryaman.jpg',
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
    image: '/assets/core_team/profile/dewanshi.jpeg',
    socials: {},
    skills: ['Support', 'Organization', 'Volunteering'],
    order: 24,
  },

  // --- Management Team ---
  
  {
    name: 'Danish Khan',
    role: 'Finance & Sponsorship Head',
    subRole: 'CSE(BC) - Pre Final Year',
    category: 'management',
    bio: 'Managing chapter finances and building partnerships to sustain and grow our community initiatives.',
    image: '/assets/core_team/profile/danish.jpeg',
    socials: { linkedin: 'https://www.linkedin.com/in/danish-khan-cse/', instagram: 'https://www.instagram.com/danish_khan_7387/' },
    skills: ['Finance', 'Sponsorship', 'Partnerships'],
    order: 27,
  },
  
  {
    name: 'Deepti Rai',
    role: 'Public Relations Head',
    subRole: 'IT - Pre Final Year',
    category: 'management',
    bio: 'Data analytics, Data Science, ML, and Gen-AI outreach.',
    image: '/assets/core_team/profile/deepti.jpeg',
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
    image: '/assets/core_team/profile/rudransh.jpeg',
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
    image: '/assets/core_team/profile/akash.jpeg',
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
    image: '/assets/core_team/profile/hardik.jpg',
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
    image: '/assets/core_team/profile/shristi.jpeg',
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
    image: '/assets/core_team/profile/suryansh.jpeg',
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
    image: '/assets/core_team/profile/megha.jpeg',
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
        image: '/assets/core_team/technical_team.jpeg',
      },
      {
        id: 'social',
        title: 'Social Media Team',
        description: 'The digital storytellers, amplifying our voice and connecting with the community through engaging and creative content.',
        image: '/assets/core_team/social_team.jpeg',
      },
      {
        id: 'events',
        title: 'Events Team',
        description: 'The masterminds behind the curtain, orchestrating seamless experiences that bring people together and spark inspiration.',
        image: '/assets/core_team/events_team.jpeg',
      },
      {
        id: 'management',
        title: 'Marketing & Finance',
        description: 'The strategic engines, driving growth and ensuring sustainable success through smart resource management and outreach.',
        image: '/assets/core_team/management_team.jpeg',
      },
    ],
    cta: {
      title: 'Join Our whatsapp community and be the part of it!!',
      description: 'The Nexus of Next, Where Minds Merge to Redefine Tomorrow. be the part of it!!',
      image: '/assets/core_team/group_image3.jpeg',
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

