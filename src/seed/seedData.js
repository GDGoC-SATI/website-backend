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
import User from '../models/User.js';
import ContactQuery from '../models/ContactQuery.js';

// ============================================================================
// 1. ALUMNI DATA (7 records)
// ============================================================================
export const originalAlumni = [
  {
    "name": "Anamika Jain",
    "role": "Lead GDSC at SATI (2023-24) | Coordinator at GDG Bhopal | CSE Batch 2025",
    "era": "The Pioneers",
    "bio": "An impactful leader who spearheaded the transition and growth of the community, fostering a culture of innovation and collaboration.",
    "skills": [
      "Community Management",
      "Leadership",
      "Public Speaking",
      "Event Planning"
    ],
    "image": "/assets/core team/profile/anamika.jpg",
    "color": "#4285F4",
    "linkedin": "https://www.linkedin.com/in/anamika-jain1/",
    "github": "https://github.com/anamikajain",
    "instagram": "",
    "batch": "2024",
    "org": "GDSC, GDG",
    "order": 0
  },
  {
    "name": "Anekant Jain",
    "role": "AI Engineer & MERN Stack Developer | SIH'23 Winner | CSE Batch 2025",
    "era": "The Visionaries",
    "bio": "A technical powerhouse known for winning SIH'23 and pushing the boundaries of AI integration within the community projects.",
    "skills": [
      "AI Engineering",
      "MERN Stack",
      "Intelligent Systems",
      "Cloud Computing"
    ],
    "image": "/assets/core team/profile/anekant_jain.jpeg",
    "color": "#EA4335",
    "linkedin": "https://www.linkedin.com/in/anekantjainsagar/",
    "github": "https://github.com/Anekantjainsagar",
    "instagram": "https://www.instagram.com/ig.anekant",
    "batch": "2025",
    "org": "GDSC",
    "order": 1
  },
  {
    "name": "Shakti Chaturvedi",
    "role": "Backend & AI Engineer | AI & Data Science Batch 2025",
    "era": "The Visionaries",
    "bio": "Specializing in robust backend architectures and AI-driven solutions, helping scale the community's technical infrastructure.",
    "skills": [
      "Python",
      "AI Chatbots",
      "Multi-agent Architectures",
      "Modern Backend Systems",
      "MLOps"
    ],
    "image": "/assets/core team/profile/shakti_chaturvedi.jpg",
    "color": "#FBBC05",
    "linkedin": "https://www.linkedin.com/in/shakti-chaturvedi-80620b228/",
    "github": "https://github.com/shakti2002",
    "instagram": "https://www.instagram.com/gdgoc.sati/",
    "batch": "2025",
    "org": "GDSC",
    "order": 2
  },
  {
    "name": "Chehak Sharma",
    "role": "Data Engineering at HCLTech | CSE Batch 2025",
    "era": "The Visionaries",
    "bio": "Hands-on experience in data engineering and full-stack development. Contributing to healthcare data projects through pipeline optimization and SQL efficiency.",
    "skills": [
      "Data Engineering",
      "Python",
      "SQL",
      "MERN Stack",
      "Cloud Fundamentals"
    ],
    "image": "/assets/core team/profile/chehak_sharma.jpg",
    "color": "#34A853",
    "linkedin": "https://www.linkedin.com/in/chehak-sharma-a44732221",
    "github": "https://github.com/chehaksharmaa",
    "instagram": "https://instagram.com/chehak.sharmaa",
    "batch": "2025",
    "org": "GDSC",
    "order": 3
  },
  {
    "name": "Ayush Suryavanshi",
    "role": "SDE at Prevoyance | IOT Batch 2025",
    "era": "The Visionaries",
    "bio": "An expert in building scalable software solutions and mentored many juniors in mastering the art of clean code and system design.",
    "skills": [
      "Software Engineering",
      "System Design",
      "Node.js",
      "Scalability",
      "Agile Methodologies"
    ],
    "image": "/assets/core team/profile/ayush _suryavanshi.jpg",
    "color": "#4285F4",
    "linkedin": "https://www.linkedin.com/in/ayush-suryavanshi/",
    "github": "https://github.com/AYUSHSURYAVANSHI",
    "instagram": "https://www.instagram.com/__ayush.suryavanshi",
    "batch": "2025",
    "org": "GDSC",
    "order": 4
  },
  {
    "name": "Rajvardhan Singh Gangwar",
    "role": "Google Cloud Facilitator | SIH'23 Winner | CSE(BC) Batch 2025",
    "era": "The Visionaries",
    "bio": "A cloud enthusiast who empowered the community with GCP knowledge and lead teams to victory in national competitions like SIH'23.",
    "skills": [
      "Google Cloud",
      "Leadership",
      "Infrastructure as Code",
      "Python",
      "Android",
      "MERN",
      "Flutter"
    ],
    "image": "/assets/core team/profile/rajvardhan.jpeg",
    "color": "#EA4335",
    "linkedin": "https://www.linkedin.com/in/rajvardhan-singh-gangwar/",
    "github": "https://github.com/invictus04",
    "instagram": "https://www.instagram.com/yeah.itz_raj",
    "batch": "2025",
    "org": "GDSC",
    "order": 5
  },
  {
    "name": "Monika Basene",
    "role": "GDG Lead '25 | Batch 2025",
    "era": "The Future Legends",
    "bio": "Representing the next generation of leadership, driving the transition to GDG on Campus with a focus on emerging technologies.",
    "skills": [
      "Community Building",
      "Leadership",
      "Technology Strategy",
      "Public Speaking"
    ],
    "image": "/assets/core team/profile/monika.jpeg",
    "color": "#FBBC05",
    "linkedin": "https://www.linkedin.com/in/monika-basene/",
    "github": "",
    "instagram": "https://instagram.com/monika_basene",
    "batch": "2025",
    "org": "GDSC",
    "order": 6
  }
];

// ============================================================================
// 2. EVENTS DATA (12 records)
// ============================================================================
export const originalEvents = [
  {
    "slug": "hands-on-workshop-dive-into-computer-vision",
    "title": "Hands-on Workshop: Dive into Computer Vision",
    "date": "Jan 31, 2026, 11:00 AM – 4:00 PM (GMT+5:30)",
    "location": "Smart Classroom, SATI Vidisha",
    "description": "Join us for an engaging and interactive workshop where you'll explore the exciting world of Computer Vision. This hands-on session will provide you with the foundational skills to understand and implement basic computer vision techniques using popular tools and frameworks. Our experienced instructors will guide you through real-world applications and projects, enabling you to gain practical experience and deepen your understanding of this rapidly evolving field. Don't miss this opportunity to enhance your technical skills and network with fellow technology enthusiasts.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_400,q_auto:good,w_1200/v1/gcs/platform-data-goog/event_banners/blob_1y9zYit",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hands-on-workshop-dive-into-computer-vision/",
    "registrationLink": "",
    "type": "Workshop",
    "year": "2026",
    "order": 0,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "devfest-bhopal-2025",
    "title": "DevFest Bhopal 2025",
    "date": "Nov 30, 2025, 9:00 AM – 5:00 PM (GMT+5:30)",
    "location": "Courtyard by Marriott Bhopal, DB City Mall, Bhopal, 462011",
    "description": "Join Central India's premier developer festival! Connect with hundreds of developers, designers, and tech enthusiasts for a day of learning, building, and celebrating innovation. DevFest Bhopal 2025 brings the world's largest developer festival to the heart of Madhya Pradesh! Join us in the City of Lakes where heritage meets technology, connecting hundreds of developers, designers, and tech enthusiasts. Experience a day filled with expert-led sessions on Google Cloud, Android, Web technologies, and AI/ML, alongside networking opportunities and hands-on demonstrations.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/header%20-%201_20251113_003804_0000_178lGpL.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-bhopal-presents-devfest-bhopal-2025-1/cohost-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india",
    "registrationLink": "",
    "type": "Conference",
    "year": "2025",
    "order": 2,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "google-cloud-study-jam-kick-off",
    "title": "Google Cloud Study Jam Kick-off",
    "date": "Oct 5, 2025, 3:00 – 6:00 PM (GMT+5:30)",
    "location": "Online",
    "description": "Join us for the Google Cloud Study Jam Kick-off event at Samrat Ashok Technological Institute! Dive into the basics of Google Cloud Platform (GCP) as we guide you through an exciting journey of cloud computing. Learn how to redeem your referral code for $400 credits and unlock comprehensive modules to advance your skills. Access essential documents, explore resources, and find out how to get your questions answered. This is the perfect opportunity to begin your cloud journey and connect with like-minded peers. Don't miss out—sign up now, harness the power of the cloud, and elevate your learning experience!",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-google-cloud-study-jam-kick-off/",
    "registrationLink": "",
    "type": "Study Jam",
    "year": "2025",
    "order": 4,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "gdg-on-campus-kick-off",
    "title": "GDG on Campus Kick-Off: Meet the Core Team and Future Events!",
    "date": "Sep 28, 2025, 1:30 – 4:30 PM (GMT+5:30)",
    "location": "Online",
    "description": "Join us for the inaugural GDG on Campus event at Samrat Ashok Technological Institute, Vidisha! This special gathering is designed to introduce you to the dynamic world of Google Developer Groups within our college. Meet our passionate core team members, learn about our vision, and discover the exciting array of events, workshops, and hackathons we have planned for the upcoming year. Whether you're a beginner or an experienced developer, this kick-off session is the perfect opportunity to network, grow your skills, and become part of a vibrant tech community. Let's build, learn, and innovate together!",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-on-campus-kick-off-meet-the-core-team-and-future-events/",
    "registrationLink": "",
    "type": "Kick-off",
    "year": "2025",
    "order": 5,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "tech-winter-break-gdgsati-web-development",
    "title": "Tech Winter Break GDGSATI: Web Development",
    "date": "Dec 22, 2024, 7:00 – 8:30 PM (GMT+5:30)",
    "location": "Online",
    "description": "Join Us for an Exciting Virtual Workshop on Web Development! Date: 22nd December Time: 7:00 PM (IST) Hosted by: GDG Web Lead. What You'll Learn: Comprehensive Web Development Roadmap, Tips for Navigating Your Tech Journey, Insights on Landing Paid Internships, Guidance on Building Impactful Web Projects, And so much more! Don't miss this opportunity to level up your skills and kickstart your career in tech. Whether you're a beginner or looking to advance your knowledge, this session is the perfect opportunity to level up your skills.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Tech_Winter_Break_Banner_2560x650_mK4NxXu.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-tech-winter-break-gdgsati-web-development/",
    "registrationLink": "",
    "type": "Workshop",
    "year": "2024",
    "order": 6,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "machine-learning-workshop",
    "title": "Machine Learning Workshop",
    "date": "Nov 9, 2024, 8:00 PM – Nov 13, 2024, 8:00 PM (GMT+5:30)",
    "location": "Online",
    "description": "Are you curious about machine learning and how it's shaping the future of technology? Join us for an engaging, hands-on workshop designed to introduce you to the core concepts and practical applications of machine learning. Whether you're a beginner or have some experience, this session will provide you with the tools and knowledge to start building your own models. Discover how to leverage machine learning to solve real-world problems, explore popular frameworks, and learn from experts in the field. Don't miss this opportunity to advance your skills and network with other tech enthusiasts!",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/GDG_Bevy_DefaultEventBanner_9M7vWqs.png",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-machine-learning-workshop/",
    "registrationLink": "",
    "type": "Workshop",
    "year": "2024",
    "order": 7,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "cloud-skills-kickoff",
    "title": "Cloud Skills Kickoff",
    "date": "Oct 20, 2024, 12:00 – 1:00 PM (GMT+5:30)",
    "location": "Online",
    "description": "Date and Time: 20th October at 12 PM. Platform: Google Meet. Hosted by: GDG on Campus, Samrat Ashok Technological Institute, Vidisha, MP. Event Highlights: Step-by-step guide to redeeming Google Cloud Skill Boost codes. Instructions on how to complete labs effectively. Key rules and timelines for lab completion. Expert tips and live support throughout the session.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Yellow_SsVplbc.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-cloud-skills-kickoff/",
    "registrationLink": "",
    "type": "Kick-off",
    "year": "2024",
    "order": 8,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "gdgc-info-session-and-gen-ai-study-jam",
    "title": "GDGC Info Session and Gen AI Study Jam",
    "date": "Sep 28, 2024, 10:30 AM – 2:00 PM (GMT+5:30)",
    "location": "Online",
    "description": "The Info Session introduced students to the Google Developer Groups (GDG) on-campus community, fostering engagement in tech and future events. The session also provided details about the soon-to-launch GenAI Study Jam, offering hands-on learning with Generative AI tools and techniques, encouraging participants to explore AI-driven innovation and skill development.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/Copy%20of%20GDG23%20Web%20Banner%202560x500%20-%20Green_du73i0o.jpg",
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdgc-info-session-and-gen-ai-study-jam/",
    "registrationLink": "",
    "type": "Info Session",
    "year": "2024",
    "order": 9,
    "status": "Planning",
    "timeline": []
  },
  {
    "slug": "hack-verse-hackathon-2026",
    "date": "Jan 13 – Jan 26, 2026",
    "description": "\nCampaign Highlights & Structure:\n• Stage 1: Inaugural Kick-off & Orientation — Introduction to hackathon tracks, rules, guidelines, team building, and live community Q&A.\n• Stage 2: AI Tools & Prototyping Workshop — Hands-on session leveraging Google Gemini and AI-assisted workflows to accelerate development speed.\n• Stage 3: The Grand Finale — Top 10 shortlisted finalist teams pitch live to expert judges to crown the Hack&Verse champions.\n\nKey Tracks:\n• Generative AI & Intelligent Agents\n• Next-Gen Web & Distributed Cloud Solutions\n• Smart Campus & College Utilities\n• Healthcare, Sustainability & Social Good\n\nPerks & Recognition:\n• Attractive cash prize pool & champion trophies for top podium teams\n• Official certificates & exclusive Google Developer swag kits\n• Direct mentorship and incubation support from senior alumni and industry leads",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_kFQVsV5",
    "location": "Online",
    "order": 1,
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-hackampverse-hackathon-2026-inaugural-kick-off-and-orientation-session/",
    "registrationLink": "",
    "status": "Planning",
    "timeline": [
      {
        "id": "hack-verse-hackathon-2026-inaugural-kick-off",
        "title": "Hack&Verse Hackathon 2026: Inaugural Kick-off and Orientation Session",
        "cardTitle": "Inaugural Kick-off and Orientation Session",
        "date": "Jan 13, 2026, 7:00 – 8:30 PM (GMT+5:30)",
        "phase": "Stage 01 • Inauguration & Orientation",
        "location": "Online",
        "description": "HackVerse Hackathon – Campaign 2 is officially launched! GDG On Campus SATI Vidisha invites you to the Kick-off & Orientation Session covering hackathon goals, problem tracks, submission criteria, team building strategies, and a live Q&A with the organizing team.",
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
    "title": "Hack&Verse Hackathon 2026",
    "type": "Hackathon",
    "year": "2026"
  },
  {
    "slug": "genesis-hackathon",
    "date": "Oct 15 – Nov 8, 2025",
    "description": "Journey & Competition Structure:\n• Round 1 & 2: Online Ideation & Development — Assemble teams, select challenge problem statements, and build functional prototypes with mentorship from senior GDG leads.\n• Grand Finale: Offline Live Pitching — Culminating pitch showdown held in the SATI Smart Classroom, where shortlisted finalists demo their projects before a panel of expert judges.\n\nKey Domains:\n• Web & Mobile Application Development\n• Smart Campus Utilities & Automation Tools\n• Artificial Intelligence & Machine Learning Innovation\n• Open Innovation Track for Creative Solutions\n\nPerks & Recognition:\n• Winner awards and commemorative champion trophies\n• Certificate of achievement recognized by GDG on Campus SATI\n• Google Developer merchandise, goodie kits, and chapter spotlight",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_rVrRqmI",
    "location": "Smart Classroom, SATI Vidisha & Online",
    "order": 3,
    "originalUrl": "https://gdg.community.dev/events/details/google-gdg-on-campus-samrat-ashok-technological-institute-vidisha-india-presents-gdg-genesis-hackathon-2025/",
    "registrationLink": "",
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
    "title": "Genesis Hackathon",
    "type": "Hackathon",
    "year": "2025"
  },
  {
    "slug": "google-cloud-study-learn-2026",
    "title": "Google Cloud Study Learn 2026",
    "date": "Oct 15, 2026, 12:00 AM – Nov 23, 2026, 11:59 PM (GMT+5:30)",
    "location": "Online",
    "description": "What is Google Cloud Learn with Communities?\nIt is a program designed to introduce users to Google Cloud and AI technologies through structured learning, community engagement, and milestone-driven activities.\n\nKey Requirements & Guidelines\n* Google Skills Account: Must be a new account created on or after September 14, 2026, and before form submission. You must provide the correct email address and account link associated with it.\n* Organizer Selection: You must know your GDG/Community Organizer and select the correct name before submitting. Your organizer will be your primary point of contact.\n* Single Enrollment Rule: You can only enroll through one organizer during the campaign. If you submit multiple times with different partners, only your latest submission is considered valid.\n* Platform Access: Successfully signed-up participants receive access to specific pathways on the Google Skills Platform.\n* Automated Validation: All data goes through automated checks. Submissions that do not meet the criteria are automatically rejected with no exceptions.\n\nImportant Deadlines\n* Submission Deadline: October 23 at 11:59 PM IST",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/lydk5lda/image/upload/v1792169165/cloud_study_learn_26.jpg",
    "originalUrl": "https://forms.gle/xpuPeDSCYAXaChbE7",
    "registrationLink": "",
    "type": "Study Jam",
    "year": "2026",
    "status": "Ongoing",
    "timeline": [],
    "order": 0
  },
  {
    "slug": "gdgoc-sati-recruitment-2026",
    "title": "GDGoC SATI Recruitment 2026",
    "date": "Oct 13, 2026, 11:59 PM – Oct 31, 2026, 11:59 PM (GMT+5:30)",
    "location": "Online",
    "description": "GDGoC SATI Vidisha Recruitment 2026 offers an opportunity for curious minds, creators, builders, and doers to learn, collaborate, and contribute to a growing tech community. Students do not need to be experts; what matters is curiosity, a willingness to learn, and the initiative to create something meaningful.\n\nOpen Domains\nTechnical: Web development, app development, Python, AI/ML, and emerging technologies.\n\nManagement: Team coordination, event planning, scheduling, and execution of club activities.\n\nGraphic Designing: Posters, branding, creative designs, and visual communication.\n\nVideo Editing: Reels, promotional videos, and digital storytelling.\n\nContent Writing: Social media content, captions, blogs, copywriting, and storytelling.\n\nPublic Relations: Outreach, partnerships, communication, and community engagement.\n\nEligibility & Important Dates\n*Eligibility: Students from all branches of 1st and 2nd year.\n\n*Registration Deadline: October 22, 2026\n\nTake a few minutes to share who you are, what you love doing, and what you would like to bring to the community. Your journey starts here.",
    "fullDescription": "",
    "imageUrl": "https://res.cloudinary.com/lydk5lda/image/upload/v1792513576/8162bd61-45e2-4c84-831a-812e131692bc.jpg",
    "originalUrl": "https://forms.gle/j69g8RWnpS9KY8E59",
    "registrationLink": "",
    "type": "Kick-off",
    "year": "2026",
    "status": "Ongoing",
    "timeline": [],
    "order": 0
  }
];

// ============================================================================
// 3. TEAM MEMBERS DATA (36 records)
// ============================================================================
export const originalTeam = [
  {
    "name": "Sanidhya Sahu",
    "role": "Organiser",
    "subRole": "IOT - Final Year",
    "category": "lead",
    "bio": "Leading the GDG chapter with a vision to empower developers and foster innovation through community collaboration.",
    "skills": [
      "Leadership",
      "Management",
      "Public Speaking"
    ],
    "image": "/assets/core team/profile/sanidhya.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/sanidhya-sahu/",
      "github": "https://github.com/isanidhya",
      "twitter": "",
      "instagram": ""
    },
    "order": 0
  },
  {
    "name": "Pankaj Yadav",
    "role": "Co-organiser",
    "subRole": "IOT - Final Year",
    "category": "lead",
    "bio": "Creative Developer specializing in strategy, operations, and scalable design.",
    "skills": [
      "Strategy",
      "Operations",
      "Community"
    ],
    "image": "/assets/core team/profile/pankaj.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/pankaj-yadav-5998b3249/",
      "github": "https://github.com/theopendraft",
      "instagram": "https://www.instagram.com/the_open_draft",
      "twitter": ""
    },
    "order": 1
  },
  {
    "name": "Anuj Jain",
    "role": "Technical Lead",
    "subRole": "IOT - Final Year",
    "category": "lead",
    "bio": "Overseeing technical projects and guiding the team to build robust, scalable solutions using cutting-edge technologies.",
    "skills": [
      "Full Stack",
      "Cloud",
      "Architecture"
    ],
    "image": "/assets/core team/profile/anuj.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/anujjainbatu/",
      "github": "https://github.com/anujjainbatu",
      "twitter": "",
      "instagram": ""
    },
    "order": 2
  },
  {
    "name": "Manraj Gupta",
    "role": "Executive Lead",
    "subRole": "IT - Final Year",
    "category": "lead",
    "bio": "Coordinating between teams to ensure alignment with chapter goals and efficient resource utilization.",
    "skills": [
      "Leadership",
      "Execution",
      "Planning"
    ],
    "image": "/assets/core team/profile/manraj.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/manraj-gupta/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 3
  },
  {
    "name": "Kalp Soni",
    "role": "ML Head",
    "subRole": "IT - Pre Final Year",
    "category": "technical",
    "bio": "Passionate about Machine Learning and AI, leading the team to explore new frontiers in intelligent systems.",
    "skills": [
      "Python",
      "TensorFlow",
      "AI"
    ],
    "image": "/assets/core team/profile/kalp.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/kalp-soni-1b3084275/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 4
  },
  {
    "name": "Nikhil Kushwaha",
    "role": "IOT head",
    "subRole": "EE - Pre Final Year",
    "category": "technical",
    "bio": "Bridging the physical and digital worlds through innovative IoT solutions and hardware hacking.",
    "skills": [
      "IoT",
      "Arduino",
      "Sensors"
    ],
    "image": "/assets/core team/profile/nikhil.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/nikhil-kushwah-664304218/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 5
  },
  {
    "name": "Kaustubh Awasthi",
    "role": "Cloud Head",
    "subRole": "CSE - Pre Final Year",
    "category": "technical",
    "bio": "Architecting cloud-native solutions and promoting scalable infrastructure practices within the community.",
    "skills": [
      "AWS",
      "GCP",
      "DevOps"
    ],
    "image": "/assets/core team/profile/kaustubh.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/kawasthi2889/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 6
  },
  {
    "name": "Shreya Mangal",
    "role": "Technical Lead",
    "subRole": "IT - 2nd Year",
    "category": "technical",
    "bio": "Skills include C, Python, and Web Dev. Deeply interested in DSA and problem-solving.",
    "skills": [
      "Web Dev",
      "Frontend",
      "React"
    ],
    "image": "/assets/core team/profile/shreya.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/shreya-mangal",
      "github": "https://github.com/shreya-4567",
      "instagram": "https://www.instagram.com/shreyamangal_22",
      "twitter": ""
    },
    "order": 7
  },
  {
    "name": "Devanshu Vishwakarma",
    "role": "Technical Lead",
    "subRole": "IT - 2nd Year",
    "category": "technical",
    "bio": "MERN stack developer skilled in MongoDB, Express, Node.js, React.js, and Java.",
    "skills": [
      "Mobile Dev",
      "Flutter",
      "UI/UX"
    ],
    "image": "/assets/core team/profile/devanshu.png",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/devanshu-vishwakarma/",
      "github": "https://github.com/devanshu-2004",
      "instagram": "https://www.instagram.com/devan.sh04/",
      "twitter": ""
    },
    "order": 8
  },
  {
    "name": "Utkarsh Vishwakarma",
    "role": "Technical Lead",
    "subRole": "AIADS - 2nd Year",
    "category": "technical",
    "bio": "Specializing in algorithmic problem solving and competitive programming to tackle complex challenges.",
    "skills": [
      "Algorithms",
      "C++",
      "Data Structures"
    ],
    "image": "/assets/core team/profile/utkarsh.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/utkarsh-vish/",
      "github": "https://github.com/UtkiVish",
      "twitter": "",
      "instagram": ""
    },
    "order": 9
  },
  {
    "name": "Deepak Kumar Gupta",
    "role": "Technical Lead",
    "subRole": "IT - 2nd Year",
    "category": "technical",
    "bio": "Passionate CS student with interests in AI/ML, Blockchain, and IoT. Skilled in building innovative solutions.",
    "skills": [
      "Software Eng",
      "Java",
      "Systems"
    ],
    "image": "/assets/core team/profile/deepak.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/deepak-kumar-gupta",
      "github": "https://github.com/deepak004-g",
      "instagram": "https://www.instagram.com/deepak_02004",
      "twitter": ""
    },
    "order": 10
  },
  {
    "name": "Aashutosh Singh Baghel",
    "role": "Technical Lead",
    "subRole": "CSE - 2nd Year",
    "category": "technical",
    "bio": "C/C++, Python and system design enthusiast.",
    "skills": [
      "C/C++",
      "Python",
      "Linux"
    ],
    "image": "/assets/core team/profile/aashutosh.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/aashutosh-singh-baghel",
      "github": "https://github.com/thunder-thigh",
      "instagram": "https://instagram.com/aashu.3d",
      "twitter": ""
    },
    "order": 11
  },
  {
    "name": "Harshwardhan Soni",
    "role": "Technical Lead",
    "subRole": "CSE - 2nd Year",
    "category": "technical",
    "bio": "Enthusiastic about backend systems and database optimization for high-performance applications.",
    "skills": [
      "Backend",
      "Node.js",
      "SQL"
    ],
    "image": "",
    "color": "#4285F4",
    "socials": {
      "linkedin": "",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 12
  },
  {
    "name": "Nakul Chourey",
    "role": "Technical Team",
    "subRole": "CSE(BC) - 1st Year",
    "category": "technical",
    "bio": "Exploring various tech stacks and contributing to open source projects to learn and grow.",
    "skills": [
      "Development",
      "Open Source",
      "Git"
    ],
    "image": "/assets/core team/profile/nakul.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/nakul-chourey-29i/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 13
  },
  {
    "name": "Anushka Rai",
    "role": "Technical Team",
    "subRole": "CSE - 1st Year",
    "category": "technical",
    "bio": "Basic programming in C, Python, Web fundamentals, and DSA.",
    "skills": [
      "Coding",
      "Problem Solving",
      "Tech"
    ],
    "image": "/assets/core team/profile/anushka.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/anushka-rai1606",
      "github": "https://github.com/nushoncodes",
      "instagram": "https://www.instagram.com/rai_anushkaa09",
      "twitter": ""
    },
    "order": 14
  },
  {
    "name": "Roshni Rajani",
    "role": "Design Head",
    "subRole": "AIADS - Pre Final Year",
    "category": "social",
    "bio": "Crafting visual stories and ensuring a consistent, appealing brand identity for the chapter.",
    "skills": [
      "UI/UX",
      "Figma",
      "Branding"
    ],
    "image": "/assets/core team/profile/roshni.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/roshni-rajani/",
      "instagram": "https://www.instagram.com/iroshnirajani/",
      "github": "",
      "twitter": ""
    },
    "order": 15
  },
  {
    "name": "Kazim Sheikh",
    "role": "Social Media Head",
    "subRole": "CSE(BC) - Pre Final Year",
    "category": "social",
    "bio": "Engaging our community through creative content strategies and active social media presence.",
    "skills": [
      "Social Media",
      "Marketing",
      "Content"
    ],
    "image": "/assets/core team/profile/kazim.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/kazim-sheikh-713287312/",
      "instagram": "https://www.instagram.com/_kazim.fr/",
      "github": "",
      "twitter": ""
    },
    "order": 16
  },
  {
    "name": "Ritika Jain",
    "role": "Content & Engagement Head",
    "subRole": "CSE(BC) - Pre Final Year",
    "category": "social",
    "bio": "Curating compelling content and fostering meaningful interactions to keep the community vibrant.",
    "skills": [
      "Content Writing",
      "Engagement",
      "Storytelling"
    ],
    "image": "/assets/core team/profile/ritika.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/ritika-jain17/",
      "instagram": "https://www.instagram.com/__ri.mi/",
      "github": "",
      "twitter": ""
    },
    "order": 17
  },
  {
    "name": "Safal Tiwari",
    "role": "Media Lead",
    "subRole": "IOT - 2nd Year",
    "category": "social",
    "bio": "Capturing moments and creating high-quality visual assets to document our journey.",
    "skills": [
      "Photography",
      "Editing",
      "Media"
    ],
    "image": "/assets/core team/profile/safal.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/safal-tiwari/",
      "github": "https://github.com/SAFAL-TIWARI/",
      "instagram": "https://www.instagram.com/itz_safal_/",
      "twitter": ""
    },
    "order": 18
  },
  {
    "name": "Taufiq Lohar",
    "role": "Media Lead",
    "subRole": "CSE - 2nd Year",
    "category": "social",
    "bio": "Specializing in video production and visual storytelling to highlight chapter achievements.",
    "skills": [
      "Videography",
      "Premiere Pro",
      "Creativity"
    ],
    "image": "/assets/core team/profile/taufiq.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/taufiq-lohar-3023ab344/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 19
  },
  {
    "name": "Saiyed Rehan Ali",
    "role": "Lead Graphic Designer",
    "subRole": "IOT - 2nd Year",
    "category": "social",
    "bio": "Lead Graphic Designer for GDG On Campus SATI. Blending art with technology to make complex tech look great and easy to understand.",
    "skills": [
      "Graphic Design",
      "Visual Arts",
      "Media"
    ],
    "image": "/assets/core team/profile/rehan.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/saiyed-rehan-ali-23b88532b",
      "github": "https://github.com/Saiyedrehanali-cloud",
      "instagram": "https://www.instagram.com/rehanali3_",
      "twitter": ""
    },
    "order": 20
  },
  {
    "name": "Ronak Kushwah",
    "role": "Social Media Team",
    "subRole": "AIML - 1st Year",
    "category": "social",
    "bio": "Assisting in managing social channels and analyzing metrics to improve outreach.",
    "skills": [
      "Analytics",
      "Socials",
      "Growth"
    ],
    "image": "/assets/core team/profile/ronak.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/vlronak/",
      "instagram": "https://www.instagram.com/ronak._.kushwah/",
      "github": "",
      "twitter": ""
    },
    "order": 21
  },
  {
    "name": "Vinayak Mawat",
    "role": "Event Lead",
    "subRole": "IOT - 2nd Year",
    "category": "events",
    "bio": "Orchestrating events from conception to execution, ensuring memorable experiences for attendees.",
    "skills": [
      "Event Management",
      "Planning",
      "Coordination"
    ],
    "image": "/assets/core team/profile/vinayak.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/vinayak-mawat-881011333/",
      "instagram": "https://www.instagram.com/_vinayak_mawat_/",
      "github": "",
      "twitter": ""
    },
    "order": 22
  },
  {
    "name": "Aryaman Sahu",
    "role": "Event Lead",
    "subRole": "IOT - 2nd Year",
    "category": "events",
    "bio": "Event logistics and technical coordination for chapter activities.",
    "skills": [
      "Logistics",
      "Operations",
      "Teamwork"
    ],
    "image": "/assets/core team/profile/aryaman.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/aryamansahu08",
      "github": "https://github.com/aryamansahu11",
      "instagram": "https://www.instagram.com/ayushhh.81",
      "twitter": ""
    },
    "order": 23
  },
  {
    "name": "Dewanshi Pardhi",
    "role": "Event Team",
    "subRole": "AIADS - 1st Year",
    "category": "events",
    "bio": "Supporting event operations and helping to create a welcoming atmosphere for all members.",
    "skills": [
      "Support",
      "Organization",
      "Volunteering"
    ],
    "image": "/assets/core team/profile/dewanshi.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 24
  },
  {
    "name": "Suprabhat Upadhyay",
    "role": "Co-executive head",
    "subRole": "IT - Pre Final Year",
    "category": "management",
    "bio": "Assisting in executive decisions and streamlining operational workflows for better efficiency.",
    "skills": [
      "Management",
      "Operations",
      "Leadership"
    ],
    "image": "/assets/core team/profile/suprabhat.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/suprabhat-upadhyay-ab996031a/",
      "github": "https://github.com/suprabhat1409-art",
      "instagram": "https://www.instagram.com/upadhyay_1409/",
      "twitter": ""
    },
    "order": 25
  },
  {
    "name": "Arpit bansal",
    "role": "Logistics Head",
    "subRole": "CSE(BC) - Pre Final Year",
    "category": "management",
    "bio": "Ensuring all resources and materials are available and properly managed for every event.",
    "skills": [
      "Logistics",
      "Supply Chain",
      "Resource Mgmt"
    ],
    "image": "/assets/core team/profile/arpit.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/arpit-bansal-711858293/",
      "instagram": "https://www.instagram.com/_arppitt._/",
      "github": "",
      "twitter": ""
    },
    "order": 26
  },
  {
    "name": "Danish Khan",
    "role": "Finance & Sponsorship Head",
    "subRole": "CSE(BC) - Pre Final Year",
    "category": "management",
    "bio": "Managing chapter finances and building partnerships to sustain and grow our community initiatives.",
    "skills": [
      "Finance",
      "Sponsorship",
      "Partnerships"
    ],
    "image": "/assets/core team/profile/danish.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/danish-khan-cse/",
      "instagram": "https://www.instagram.com/danish_khan_7387/",
      "github": "",
      "twitter": ""
    },
    "order": 27
  },
  {
    "name": "Dakshesh Jat",
    "role": "Management Head",
    "subRole": "CSE - Pre Final Year",
    "category": "management",
    "bio": "Overseeing general management tasks and ensuring team cohesion and productivity.",
    "skills": [
      "Administration",
      "Team Building",
      "Management"
    ],
    "image": "/assets/core team/profile/dakshesh.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/dakshesh-jat/",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 28
  },
  {
    "name": "Deepti Rai",
    "role": "Public Relations Head",
    "subRole": "IT - Pre Final Year",
    "category": "management",
    "bio": "Data analytics, Data Science, ML, and Gen-AI outreach.",
    "skills": [
      "PR",
      "Communication",
      "Media Relations"
    ],
    "image": "/assets/core team/profile/deepti.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/deepti-rai-77517a2a2",
      "github": "https://github.com/Deepti618",
      "instagram": "https://www.instagram.com/deepti.raii_",
      "twitter": ""
    },
    "order": 29
  },
  {
    "name": "Rudransh Rai",
    "role": "Community Outreach Head",
    "subRole": "IT - Pre Final Year",
    "category": "management",
    "bio": "Community outreach and growth lead.",
    "skills": [
      "Outreach",
      "Community Building",
      "Networking"
    ],
    "image": "/assets/core team/profile/rudransh.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/rudransh-rai-a32426315",
      "instagram": "https://www.instagram.com/r5anxh",
      "github": "",
      "twitter": ""
    },
    "order": 30
  },
  {
    "name": "Akash Tripathi",
    "role": "Google Ambassador",
    "subRole": "CSE(BC) - Pre Final Year",
    "category": "management",
    "bio": "Representing GDG on campus and promoting Google technologies to students and peers.",
    "skills": [
      "Ambassadorship",
      "Promotion",
      "Google Tech"
    ],
    "image": "/assets/core team/profile/akash.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/akash-tripathi-16b96a239/",
      "instagram": "https://www.instagram.com/infinityakash97/",
      "github": "",
      "twitter": ""
    },
    "order": 31
  },
  {
    "name": "Hardik Kumar Sinha",
    "role": "PR & Sponsor",
    "subRole": "AIADS - 2nd Year",
    "category": "management",
    "bio": "Working on securing sponsorships and maintaining good relationships with our partners.",
    "skills": [
      "Sponsorship",
      "PR",
      "Negotiation"
    ],
    "image": "/assets/core team/profile/hardik.jpg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/hardik-kumar-sinha/",
      "github": "https://github.com/hksinha510",
      "instagram": "https://www.instagram.com/har.dikks/",
      "twitter": ""
    },
    "order": 32
  },
  {
    "name": "Shristi tiwari",
    "role": "Management Team",
    "subRole": "AIML - 1st Year",
    "category": "management",
    "bio": "Python learner exploring Machine Learning and AI technologies.",
    "skills": [
      "Administration",
      "Support",
      "Management"
    ],
    "image": "/assets/core team/profile/shristi.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/shristi-tiwari-18a85437b",
      "github": "https://github.com/st0845320-bit",
      "instagram": "https://www.instagram.com/_shristi_t",
      "twitter": ""
    },
    "order": 33
  },
  {
    "name": "Suryansh Gupta",
    "role": "Management Team",
    "subRole": "AIML - 1st Year",
    "category": "management",
    "bio": "Helping to coordinate team activities and maintain organized records for the chapter.",
    "skills": [
      "Coordination",
      "Records",
      "Organization"
    ],
    "image": "/assets/core team/profile/suryansh.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "https://www.linkedin.com/in/suryansh08/",
      "instagram": "https://www.instagram.com/suryansh08_/",
      "github": "",
      "twitter": ""
    },
    "order": 34
  },
  {
    "name": "Megha Singh",
    "role": "PR & Sponsor",
    "subRole": "CSE(BC) - 1st Year",
    "category": "management",
    "bio": "Assisting with public relations efforts and sponsorship drives to support chapter events.",
    "skills": [
      "PR",
      "Sponsorship",
      "Communication"
    ],
    "image": "/assets/core team/profile/megha.jpeg",
    "color": "#4285F4",
    "socials": {
      "linkedin": "",
      "github": "",
      "twitter": "",
      "instagram": ""
    },
    "order": 35
  }
];

// ============================================================================
// 4. PROJECTS DATA (1 records)
// ============================================================================
export const originalProjects = [
  {
    "title": "GDG Official Website Portal",
    "description": "The official platform for Google Developer Groups on Campus SATI Vidisha, built with React, Vite, TailwindCSS, Express.js, and MongoDB.",
    "techStack": [
      "React",
      "TailwindCSS",
      "Express.js",
      "MongoDB",
      "Framer Motion"
    ],
    "links": {
      "github": "https://github.com/SAFAL-TIWARI/GDGoC-website",
      "live": "https://gdgoc-sati.vercel.app/",
      "demo": "https://gdgoc-sati.vercel.app/"
    },
    "image": "/assets/projects/web-preview.jpeg",
    "order": 0
  }
];

// ============================================================================
// 5. GALLERY ALBUMS DATA (6 albums)
// ============================================================================
export const originalGallery = [
  {
    "title": "Google Cloud Study Jams",
    "type": "Study Jams",
    "year": "2025",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791561484/Poster.png",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791556097/IMG_1158.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791555526/IMG20260423164602.jpg.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791557207/WhatsApp_Image_2026-10-09_at_8.16.34_PM.jpg"
    ],
    "order": 0
  },
  {
    "title": "Genesis Hackathon",
    "type": "Hackathon",
    "year": "2025",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791557390/WhatsApp_Image_2026-10-09_at_8.18.48_PM.jpg",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791561104/WhatsApp_Image_2026-10-09_at_9.20.19_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791561035/WhatsApp_Image_2026-10-09_at_9.19.24_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791557445/WhatsApp_Image_2026-10-09_at_8.20.01_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791560911/WhatsApp_Image_2026-10-09_at_9.18.13_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791561143/WhatsApp_Image_2026-10-09_at_9.21.00_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791560858/WhatsApp_Image_2026-10-09_at_9.17.21_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791560796/WhatsApp_Image_2026-10-09_at_9.16.00_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791560735/WhatsApp_Image_2026-10-09_at_8.27.18_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791557849/WhatsApp_Image_2026-10-09_at_8.25.46_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791557689/image.jpg"
    ],
    "order": 0
  },
  {
    "title": "DevFest Bhopal",
    "type": "DevFest",
    "year": "2025",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791563077/WhatsApp_Image_2026-10-09_at_9.54.21_PM.jpg",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791562081/Screenshot_2026-10-09_213738.png",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791562086/WhatsApp_Image_2026-10-09_at_9.36.48_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791562021/WhatsApp_Image_2026-10-09_at_9.35.34_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791561866/WhatsApp_Image_2026-10-09_at_9.33.42_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791561841/WhatsApp_Image_2026-10-09_at_9.31.30_PM.jpg"
    ],
    "order": 0
  },
  {
    "title": "Hack&Verse Hackathon",
    "type": "Hackathon",
    "year": "2026",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791563751/WhatsApp_Image_2026-10-09_at_9.59.19_PM.jpg",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791564433/Screenshot_2026-10-09_221221.png",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791564543/WhatsApp_Image_2026-01-27_at_12.02.33_AM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791564442/Screenshot_2026-10-09_221659.png"
    ],
    "order": 0
  },
  {
    "title": "Cloud Vision Workshop",
    "type": "Workshop",
    "year": "2026",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791566056/WhatsApp_Image_2026-10-09_at_10.43.51_PM.jpg",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791565896/WhatsApp_Image_2026-10-09_at_10.41.04_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791565886/IMG_20260131_144956969.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791566056/WhatsApp_Image_2026-10-09_at_10.43.51_PM.jpg"
    ],
    "order": 0
  },
  {
    "title": "Farewell",
    "type": "Farewell",
    "year": "2026",
    "coverImage": "https://res.cloudinary.com/lydk5lda/image/upload/v1791572272/WhatsApp_Image_2026-10-10_at_12.18.19_AM.jpg",
    "images": [
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791570583/WhatsApp_Image_2026-10-09_at_11.57.20_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791570383/WhatsApp_Image_2026-10-09_at_11.51.54_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791571533/WhatsApp_Image_2026-10-10_at_12.01.29_AM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791570455/WhatsApp_Image_2026-10-09_at_11.56.29_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791572272/WhatsApp_Image_2026-10-10_at_12.18.19_AM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791569288/WhatsApp_Image_2026-10-09_at_11.35.34_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791570028/WhatsApp_Image_2026-10-09_at_11.47.48_PM.jpg",
      "https://res.cloudinary.com/lydk5lda/image/upload/v1791570128/WhatsApp_Image_2026-10-09_at_11.50.02_PM.jpg"
    ],
    "order": 0
  }
];

// ============================================================================
// 6. SITE SECTIONS DATA (4 sections)
// ============================================================================
export const originalSiteSections = [
  {
    "sectionKey": "meet_the_team",
    "title": "Meet The Team",
    "description": "The passionate individuals who make everything possible. From coding to event management, our diverse team works together to deliver the best experience.",
    "data": {
      "cards": [
        {
          "id": "technical",
          "title": "Technical Team",
          "description": "Architects of digital innovation, crafting robust solutions and pioneering future technologies to build a smarter world.",
          "image": "https://res.cloudinary.com/lydk5lda/image/upload/v1791189659/technical_team.jpg"
        },
        {
          "id": "social",
          "title": "Social Media Team",
          "description": "The digital storytellers, amplifying our voice and connecting with the community through engaging and creative content.",
          "image": "https://res.cloudinary.com/lydk5lda/image/upload/v1791189664/social_team.jpg"
        },
        {
          "id": "events",
          "title": "Events Team",
          "description": "The masterminds behind the curtain, orchestrating seamless experiences that bring people together and spark inspiration.",
          "image": "https://res.cloudinary.com/lydk5lda/image/upload/v1791189659/events_team.jpg"
        },
        {
          "id": "management",
          "title": "Marketing & Finance",
          "description": "The strategic engines, driving growth and ensuring sustainable success through smart resource management and outreach.",
          "image": "https://res.cloudinary.com/lydk5lda/image/upload/v1791189665/management_team.jpg"
        }
      ],
      "cta": {
        "title": "Join Our whatsapp community and be the part of it!!",
        "description": "The Nexus of Next, Where Minds Merge to Redefine Tomorrow. be the part of it!!",
        "image": "/assets/core team/group_image3.jpeg",
        "link": "https://chat.whatsapp.com/HY4x1jtPfbh6EDh1JPFWda"
      }
    }
  },
  {
    "sectionKey": "social_media",
    "data": {
      "reels": [
        "DegyQnWkw5q",
        "DewOm4jIy-i",
        "DebRomhoaXL",
        "Dd8SoS5k6DN",
        "DeEdRZYiHgp"
      ],
      "eventsCount": "15+",
      "followers": "200+"
    },
    "description": "",
    "title": "Latest Happenings On Instagram"
  },
  {
    "sectionKey": "who_we_are",
    "data": {
      "communityMembers": 1020,
      "eventsCount": 15
    },
    "description": "",
    "title": "Who We Are"
  },
  {
    "sectionKey": "brand_kit",
    "title": "Brand Kit & Guidelines",
    "description": "Official brand assets, logos, color palettes, typography, merchandise, and design guidelines for GDG on Campus SATI Vidisha.",
    "data": {
      "logos": [
        {
          "id": "gdgoc_sati_logo_black_font_horizontal",
          "name": "GDGoC SATI Logo Horizontal (Black)",
          "category": "Logos",
          "description": "Full horizontal chapter logo lockup for light surfaces.",
          "pngUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_black_font_horizontal.png",
          "svgUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_black_font_horizontal.svg"
        },
        {
          "id": "gdgoc_sati_logo_white_font_horizontal",
          "name": "GDGoC SATI Logo Horizontal (White)",
          "category": "Logos",
          "description": "Full horizontal chapter logo lockup for dark surfaces.",
          "pngUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_white_font_horizontal.png",
          "svgUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_white_font_horizontal.svg"
        },
        {
          "id": "gdgoc_sati_logo_black_font_vertical",
          "name": "GDGoC SATI Logo Vertical (Black)",
          "category": "Logos",
          "description": "Stacked vertical chapter logo lockup for light surfaces.",
          "pngUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_black_font_vertical.png",
          "svgUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_black_font_vertical.svg"
        },
        {
          "id": "gdgoc_sati_logo_white_font_vertical",
          "name": "GDGoC SATI Logo Vertical (White)",
          "category": "Logos",
          "description": "Stacked vertical chapter logo lockup for dark surfaces.",
          "pngUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_white_font_vertical.png",
          "svgUrl": "/assets/brand_kit/logos/gdgoc_sati_logo_white_font_vertical.svg"
        }
      ],
      "icons": [
        {
          "id": "gdgoc_sati_icon",
          "name": "GDGoC SATI Icon",
          "category": "Icons",
          "description": "The iconic Google Developer Groups code brackets symbol in signature Google quad-colors.",
          "pngUrl": "/assets/brand_kit/icon/gdgoc_sati_icon.png",
          "svgUrl": "/assets/brand_kit/icon/gdgoc_sati_icon.svg"
        }
      ],
      "colorPalettes": [
        {
          "id": "core-google",
          "title": "Core Google Colors",
          "description": "The fundamental primary palette of Google Developer Groups on Campus.",
          "colors": [
            { "id": "c-blue", "name": "Blue", "hex": "#4285F4", "rgb": "rgb(66, 133, 244)" },
            { "id": "c-red", "name": "Red", "hex": "#EA4335", "rgb": "rgb(234, 67, 53)" },
            { "id": "c-yellow", "name": "Yellow", "hex": "#FBBC04", "rgb": "rgb(251, 188, 4)" },
            { "id": "c-green", "name": "Green", "hex": "#34A853", "rgb": "rgb(52, 168, 83)" }
          ]
        },
        {
          "id": "halftones",
          "title": "Halftone Accent Tones",
          "description": "Vibrant secondary halftones used for illustrations, highlights, and cards.",
          "colors": [
            { "id": "h-blue", "name": "Halftone Blue", "hex": "#57CAFF", "rgb": "rgb(87, 202, 255)" },
            { "id": "h-red", "name": "Halftone Red", "hex": "#FF7DAF", "rgb": "rgb(255, 125, 175)" },
            { "id": "h-yellow", "name": "Halftone Yellow", "hex": "#FFD427", "rgb": "rgb(255, 212, 39)" },
            { "id": "h-green", "name": "Halftone Green", "hex": "#5CDB6D", "rgb": "rgb(92, 219, 109)" }
          ]
        },
        {
          "id": "pastels",
          "title": "Pastel Background Shades",
          "description": "Gentle pastel washes designed for badges, container fills, and soft tints.",
          "colors": [
            { "id": "p-blue", "name": "Pastel Blue", "hex": "#C3ECF6", "rgb": "rgb(195, 236, 246)" },
            { "id": "p-red", "name": "Pastel Red", "hex": "#F8D8D8", "rgb": "rgb(248, 216, 216)" },
            { "id": "p-yellow", "name": "Pastel Yellow", "hex": "#FFE7A5", "rgb": "rgb(255, 231, 165)" },
            { "id": "p-green", "name": "Pastel Green", "hex": "#CCF6C5", "rgb": "rgb(204, 246, 197)" }
          ]
        },
        {
          "id": "neutrals",
          "title": "Neutrals & Grayscale",
          "description": "High-contrast backgrounds, typography baselines, and surface borders.",
          "colors": [
            { "id": "n-white", "name": "Off-White", "hex": "#F8F9FA", "rgb": "rgb(248, 249, 250)" },
            { "id": "n-slate", "name": "Google Slate", "hex": "#5F6368", "rgb": "rgb(95, 99, 104)" },
            { "id": "n-charcoal", "name": "Dark Charcoal", "hex": "#202124", "rgb": "rgb(32, 33, 36)" },
            { "id": "n-midnight", "name": "Midnight Dark", "hex": "#0F172A", "rgb": "rgb(15, 23, 42)" }
          ]
        }
      ],
      "avatarFrames": [
        { "id": "blue", "name": "Blue", "color": "#4285F4", "src": "/assets/brand_kit/profile_avatar/profile_avatar_blue.png" },
        { "id": "green", "name": "Green", "color": "#34A853", "src": "/assets/brand_kit/profile_avatar/profile_avatar_green.png" },
        { "id": "red", "name": "Red", "color": "#EA4335", "src": "/assets/brand_kit/profile_avatar/profile_avatar_red.png" },
        { "id": "yellow", "name": "Yellow", "color": "#FBBC04", "src": "/assets/brand_kit/profile_avatar/profile_avatar_yellow.png" }
      ],
      "fonts": [
        {
          "id": "google-sans",
          "label": "Google Sans / Plus Jakarta Sans",
          "family": "'Plus Jakarta Sans', 'Google Sans', sans-serif",
          "cdnLink": "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap\" rel=\"stylesheet\">",
          "cssImport": "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');",
          "cssRule": "font-family: 'Plus Jakarta Sans', 'Google Sans', sans-serif;"
        },
        {
          "id": "inter",
          "label": "Inter (UI & Body)",
          "family": "'Inter', sans-serif",
          "cdnLink": "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap\" rel=\"stylesheet\">",
          "cssImport": "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');",
          "cssRule": "font-family: 'Inter', sans-serif;"
        },
        {
          "id": "roboto-mono",
          "label": "Roboto Mono (Code & Badges)",
          "family": "'Roboto Mono', monospace",
          "cdnLink": "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">",
          "cssImport": "@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap');",
          "cssRule": "font-family: 'Roboto Mono', monospace;"
        }
      ],
      "tShirts": {
        "black": {
          "front": "/assets/brand_kit/t_shirts/gdgoc_sati_t_shirt_black_front_2025.png",
          "back": "/assets/brand_kit/t_shirts/gdgoc_sati_t_shirt_black_back_2025.png"
        },
        "white": {
          "front": "/assets/brand_kit/t_shirts/gdgoc_sati_t_shirt_white_front_2025.png",
          "back": "/assets/brand_kit/t_shirts/gdgoc_sati_t_shirt_white_back_2025.png"
        }
      },
      "guidelines": {
        "namingApproved": [
          "Google Developer Groups on Campus SATI - Vidisha",
          "GDG on Campus SATI Vidisha",
          "GDGoC SATI"
        ],
        "namingDeprecated": [
          "GDSC SATI (Deprecated in 2024 by Google)",
          "Google Developers Club SATI",
          "Google Developer Student Clubs SATI"
        ],
        "visualDos": [
          "Maintain clear space equal to bracket symbol height.",
          "Use white logo on dark surfaces and black on light surfaces.",
          "Scale proportionally without stretching or skewing."
        ],
        "visualDonts": [
          "Do not rotate or skew the logo at unapproved angles.",
          "Do not recolor or reorder the bracket pill sequence.",
          "Do not place on busy backgrounds with insufficient contrast."
        ],
        "customGuidelines": []
      }
    }
  },
  {
    "sectionKey": "broadcast_notifications",
    "data": {
      "broadcasts": [
        {
          "id": "reply-6ad291b827c7b3c804cb5e8f-1792186267460",
          "title": "Reply: General Inquiry",
          "category": "Inquiry Response",
          "message": "Dear SAFAL,\n\nThank you for reaching out to GDG on Campus SATI Vidisha. Our core organizing team has reviewed your query and we are happy to assist you.\n\nPlease feel free to connect with our team on our WhatsApp community or reply to this message if you have any follow-up questions.\n\nWarm regards,\nGDG on Campus SATI Core Team",
          "priority": "Important",
          "type": "inquiry_reply",
          "userEmail": "safal28iot051@satiengg.in",
          "createdAt": "2026-10-16T21:31:07.460Z",
          "date": "Oct 17",
          "timestamp": "03:01 AM",
          "author": "GDG SATI Admin"
        },
        {
          "id": "reply-6ad291b827c7b3c804cb5e8f-1792184796678",
          "title": "Reply: General Inquiry",
          "category": "Inquiry Response",
          "message": "Dear SAFAL,\n\nThank you for reaching out to GDG on Campus SATI Vidisha. Our core organizing team has reviewed your query and we are happy to assist you.\n\nPlease feel free to connect with our team on our WhatsApp community or reply to this message if you have any follow-up questions.\n\nWarm regards,\nGDG on Campus SATI Core Team",
          "priority": "Important",
          "type": "inquiry_reply",
          "userEmail": "safal28iot051@satiengg.in",
          "createdAt": "2026-10-16T21:06:36.678Z",
          "date": "Oct 17",
          "timestamp": "02:36 AM",
          "author": "GDG SATI Admin"
        },
        {
          "id": "reply-6ad28c0fb48bf8f7519c87bd-1792184623832",
          "title": "Reply: Collaboration",
          "category": "Inquiry Response",
          "message": "Dear GDG,\n\nThank you for your interest in collaborating with GDG on Campus SATI Vidisha! We are always eager to partner with passionate developers, speakers, and student communities.\n\nPlease share your proposed topic or collaboration outline with us so we can coordinate the next steps.\n\nBest regards,\nGDG SATI Lead",
          "priority": "Important",
          "type": "inquiry_reply",
          "userEmail": "safaltiwari601@gmail.com",
          "createdAt": "2026-10-16T21:03:43.832Z",
          "date": "Oct 17",
          "timestamp": "02:33 AM",
          "author": "GDG SATI Admin"
        },
        {
          "id": "broadcast-1792181189085",
          "title": "Registrations Open for Google Cloud Study Learn 2026! 🚀",
          "category": "Event Update",
          "message": "Empower your cloud and AI journey! Join the Google Cloud Study Learn 2026 program to access structured learning pathways on the Google Skills Platform.\n* Submission Deadline: October 23, 2026, at 11:59 PM IST\n* Key Requirement: Must use a new Google Skills account created on or after September 14, 2026.\n\nSecure your spot now by filling out the Registration Form:  https://forms.gle/xpuPeDSCYAXaChbE7",
          "priority": "Update",
          "type": "broadcast",
          "createdAt": "2026-10-16T20:06:29.085Z",
          "date": "Oct 17",
          "timestamp": "01:36 AM",
          "author": "GDG SATI Admin"
        }
      ]
    },
    "description": "System-wide announcements and updates for all users",
    "title": "Broadcast Notifications"
  }
];

// Backward compatibility for existing code expecting originalMeetTheTeamSection
export const originalMeetTheTeamSection = originalSiteSections.find(s => s.sectionKey === 'meet_the_team') || originalSiteSections[0];
export const originalBrandKitSection = originalSiteSections.find(s => s.sectionKey === 'brand_kit') || originalSiteSections[originalSiteSections.length - 1];
export const originalBrandKit = originalBrandKitSection?.data || {};

// ============================================================================
// 7. USERS DATA (6 accounts including admin)
// ============================================================================
export const originalUsers = [
 
  {
    "name": "GDG SATI Admin",
    "username": "gdgocsati_admin",
    "email": "satigdgoncampus@gmail.com",
    "password": "$2b$10$/HxAUw1xvye6w1Fb3UKmluO4GkTENtisA1cjfq93SSn2T0RACPauG",
    "role": "admin",
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocL6CgffR81hMsQO74frlAAvGqh-9q8m2ICPrcfwueCBjWypiyZG=s96-c",
    "bio": "",
    "socials": {
      "github": "",
      "linkedin": "",
      "twitter": "",
      "instagram": "",
      "website": ""
    },
    "googleId": "102081088974691035642"
  },
  
  
];

// ============================================================================
// 8. CONTACT QUERIES DATA (2 messages)
// ============================================================================
export const originalContactQueries = [
 
];

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

    // 6. Site Sections: Seed each section if not existing, or populate if empty
    for (const section of originalSiteSections) {
      const existingSection = await SiteSection.findOne({ sectionKey: section.sectionKey });
      if (!existingSection) {
        await SiteSection.create(section);
        console.log(`[Seed] Initialized "${section.sectionKey}" section configuration.`);
      } else if (!existingSection.data || (typeof existingSection.data === 'object' && Object.keys(existingSection.data).length === 0)) {
        existingSection.data = section.data;
        if (!existingSection.title && section.title) existingSection.title = section.title;
        if (!existingSection.description && section.description) existingSection.description = section.description;
        await existingSection.save();
        console.log(`[Seed] Populated empty "${section.sectionKey}" section configuration.`);
      } else {
        console.log(`[Seed] "${section.sectionKey}" section already exists. Preserved.`);
      }
    }

    // 7. Users: Seed only if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(originalUsers);
      console.log(`[Seed] Initialized ${originalUsers.length} users.`);
    } else {
      console.log(`[Seed] Users already exist (${userCount} records). Preserved.`);
    }

    // 8. Contact Queries: Seed only if empty
    const queryCount = await ContactQuery.countDocuments();
    if (queryCount === 0) {
      await ContactQuery.insertMany(originalContactQueries);
      console.log(`[Seed] Initialized ${originalContactQueries.length} contact queries.`);
    } else {
      console.log(`[Seed] Contact queries already exist (${queryCount} records). Preserved.`);
    }
  } catch (error) {
    console.error('[Seed] Non-critical error during seed check:', error.message);
  }
};

export default seedDatabase;
