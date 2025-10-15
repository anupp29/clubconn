"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Edit,
  FileText,
  UserCheck,
  Award,
  Target,
  Megaphone,
  HandHeart,
  Handshake,
  ImageIcon,
  Download,
  TrendingUp,
  DollarSign,
  Star,
  Quote,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  Trophy,
} from "lucide-react"
import React from "react"

const eventData = {
  // CSI Events
  "techfest-2024": {
    slug: "techfest-2024",
    title: "CSI Tech Summit 2025",
    description:
      "Annual technical festival featuring workshops, competitions, hackathons, and guest lectures from industry experts. A celebration of technology and innovation.",
    date: "2025-11-15",
    time: "9:00 AM - 6:00 PM",
    location: "KKWIEER Campus",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Showcase latest technological innovations and trends",
      "Provide platform for students to demonstrate technical skills",
      "Foster collaboration between students and industry professionals",
      "Inspire innovation through competitions and workshops",
    ],
    learnings: [
      "Hands-on experience with emerging technologies",
      "Project management and event organization skills",
      "Networking with industry professionals and peers",
      "Problem-solving through competitive programming",
    ],
    speakers: [
      {
        name: "Dr. Amit Verma",
        designation: "Chief Technology Officer, Tech Mahindra",
        bio: "Dr. Verma has over 20 years of experience in software development and digital transformation. He has led multiple large-scale technology initiatives and is passionate about mentoring young talent.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/amitverma",
        topics: ["Digital Transformation", "Future of Technology"],
      },
      {
        name: "Ms. Kavya Reddy",
        designation: "Senior Software Engineer, Google",
        bio: "Kavya is a full-stack developer specializing in cloud technologies and distributed systems. She has contributed to several open-source projects and regularly speaks at tech conferences.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/kavyareddy",
        topics: ["Cloud Computing", "System Design"],
      },
    ],
    agenda: [
      { time: "9:00 AM", activity: "Registration & Inauguration Ceremony", duration: "60 min" },
      { time: "10:00 AM", activity: "Keynote: Future of Technology", duration: "90 min" },
      { time: "11:30 AM", activity: "Technical Workshops - Session 1", duration: "90 min" },
      { time: "1:00 PM", activity: "Lunch Break & Networking", duration: "60 min" },
      { time: "2:00 PM", activity: "Hackathon Kickoff & Competitions", duration: "180 min" },
      { time: "5:00 PM", activity: "Prize Distribution & Closing Ceremony", duration: "60 min" },
    ],
    capacity: 300,
    registered: 285,
    attended: 268,
    status: "completed",
    clubSlug: "csi",
    clubName: "Computer Society of India",
    eventReport: {
      highlights: [
        "Successfully organized 15+ technical events and competitions",
        "268 students participated from 12 different colleges",
        "Distributed prizes worth ₹1,50,000 to competition winners",
        "Conducted 8 hands-on workshops on emerging technologies",
        "Secured sponsorships from 6 leading tech companies",
      ],
      statistics: {
        registrations: 285,
        attendance: 268,
        attendanceRate: 94,
        satisfactionScore: 4.8,
        certificatesIssued: 268,
        speakerRating: 4.9,
      },
      financials: {
        budget: 500000,
        expenses: 475000,
        sponsorships: 350000,
        registrationFees: 200000,
      },
      testimonials: [
        {
          name: "Arjun Malhotra",
          year: "Third Year, CSE",
          feedback:
            "TechFest 2024 was an incredible experience! The hackathon challenged me to think creatively, and the workshops were extremely informative. Met amazing people and learned so much!",
          rating: 5,
        },
        {
          name: "Priya Deshmukh",
          year: "Final Year, IT",
          feedback:
            "Best technical fest I've attended! The organization was flawless, speakers were inspiring, and the competitions were well-designed. Definitely coming back next year!",
          rating: 5,
        },
        {
          name: "Rohan Kapoor",
          year: "Second Year, CSE",
          feedback:
            "Amazing event with great learning opportunities. The cloud computing workshop was particularly helpful for my ongoing project. Thank you CSI team!",
          rating: 4,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Inauguration ceremony with chief guest" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Hackathon in full swing" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Cloud computing workshop session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Coding competition finals" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Prize distribution ceremony" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Group photo with all participants" },
      ],
      team: [
        {
          name: "Rahul Sharma",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning, coordination, and execution",
        },
        {
          name: "Priya Patel",
          role: "Logistics Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue management, catering, and material procurement",
        },
        {
          name: "Amit Kumar",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Technical setup, AV equipment, and IT support",
        },
        {
          name: "Sneha Desai",
          role: "Marketing Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Promotions, social media, and registrations",
        },
        {
          name: "Karan Singh",
          role: "Sponsorship Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Corporate outreach and sponsorship management",
        },
        {
          name: "Anjali Mehta",
          role: "Volunteer Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Managing volunteers and on-ground support",
        },
      ],
      impactMetrics: [
        { label: "Total Participants", value: "268", icon: Users },
        { label: "Satisfaction Rate", value: "94%", icon: Star },
        { label: "Competitions Held", value: "15", icon: Trophy },
        { label: "Industry Partners", value: "6", icon: Handshake },
      ],
    },
  },

  // Debuggers Club Events
  "equinox-2024": {
    slug: "equinox-2024",
    title: "Code Debug Marathon",
    description:
      "Debuggers' Club flagship annual technical festival featuring multiple competitions, workshops, and cultural events. A perfect blend of technical excellence and creative expression.",
    date: "2025-11-22",
    time: "9:00 AM - 8:00 PM",
    location: "Computer Lab A",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Provide platform for showcasing technical and non-technical talents",
      "Foster holistic development through diverse competitions",
      "Create networking opportunities with industry and peers",
      "Celebrate innovation and creativity in all forms",
    ],
    learnings: [
      "Event management and organizational skills",
      "Technical problem-solving and debugging techniques",
      "Public speaking and presentation skills",
      "Team collaboration and leadership",
    ],
    speakers: [
      {
        name: "Mr. Sanjay Mehta",
        designation: "VP Engineering, Infosys",
        bio: "Sanjay has 18 years of experience in software engineering and has led teams building enterprise-scale applications. He is passionate about debugging methodologies and code quality.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/sanjaymehta",
        topics: ["Debugging Best Practices", "Code Quality"],
      },
      {
        name: "Dr. Anita Kulkarni",
        designation: "Professor, IIT Bombay",
        bio: "Dr. Kulkarni specializes in software engineering and has published over 50 research papers. She is known for her work on automated debugging tools.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/anitakulkarni",
        topics: ["Software Engineering", "Automated Testing"],
      },
    ],
    agenda: [
      { time: "9:00 AM", activity: "Registration & Opening Ceremony", duration: "60 min" },
      { time: "10:00 AM", activity: "Technical Competitions Begin", duration: "120 min" },
      { time: "12:00 PM", activity: "Keynote Session", duration: "90 min" },
      { time: "1:30 PM", activity: "Lunch Break", duration: "60 min" },
      { time: "2:30 PM", activity: "Workshops & Cultural Events", duration: "180 min" },
      { time: "5:30 PM", activity: "Finals & Performances", duration: "120 min" },
      { time: "7:30 PM", activity: "Prize Distribution & Closing", duration: "30 min" },
    ],
    capacity: 400,
    registered: 378,
    attended: 352,
    status: "completed",
    clubSlug: "debuggers",
    clubName: "Debuggers' Club",
    eventReport: {
      highlights: [
        "Successfully organized 20+ technical and cultural events",
        "352 participants from 15 colleges across the state",
        "Distributed prizes worth ₹2,00,000",
        "10 hands-on workshops on various technologies",
        "Cultural performances by 8 different groups",
      ],
      statistics: {
        registrations: 378,
        attendance: 352,
        attendanceRate: 93,
        satisfactionScore: 4.9,
        certificatesIssued: 352,
        speakerRating: 4.8,
      },
      financials: {
        budget: 600000,
        expenses: 580000,
        sponsorships: 400000,
        registrationFees: 250000,
      },
      testimonials: [
        {
          name: "Vikram Joshi",
          year: "Final Year, CSE",
          feedback:
            "Equinox 2024 exceeded all expectations! The perfect blend of technical competitions and cultural events. The debugging competition was particularly challenging and fun!",
          rating: 5,
        },
        {
          name: "Neha Kulkarni",
          year: "Third Year, IT",
          feedback:
            "Amazing organization and variety of events. Loved the workshops and the cultural performances. Debuggers Club really knows how to put on a great show!",
          rating: 5,
        },
        {
          name: "Aditya Rao",
          year: "Second Year, CSE",
          feedback:
            "My first Equinox and it was incredible! Met so many talented people and learned a lot. The keynote session was very inspiring. Can't wait for next year!",
          rating: 5,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Grand opening ceremony" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Debugging competition in action" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Workshop on software testing" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Cultural performance" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Prize distribution ceremony" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Team photo with all winners" },
      ],
      team: [
        {
          name: "Vikram Joshi",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning and execution",
        },
        {
          name: "Neha Kulkarni",
          role: "Vice Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Coordination and logistics support",
        },
        {
          name: "Aditya Rao",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Technical competitions and workshops",
        },
        {
          name: "Pooja Sharma",
          role: "Cultural Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Cultural events and performances",
        },
        {
          name: "Karan Patel",
          role: "PR Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Marketing and public relations",
        },
        {
          name: "Divya Nair",
          role: "Secretary",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Documentation and administration",
        },
      ],
      impactMetrics: [
        { label: "Total Participants", value: "352", icon: Users },
        { label: "Satisfaction Rate", value: "93%", icon: Star },
        { label: "Events Conducted", value: "20+", icon: Trophy },
        { label: "Colleges Participated", value: "15", icon: Handshake },
      ],
    },
  },

  // More events for other clubs...
  "design-sprint-2024": {
    slug: "design-sprint-2024",
    title: "UI/UX Design Workshop",
    description:
      "48-hour intensive design challenge where teams solve real-world problems through design thinking and rapid prototyping.",
    date: "2025-11-28",
    time: "9:00 AM (Day 1) - 5:00 PM (Day 2)",
    location: "Design Studio",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Apply design thinking methodology to real problems",
      "Develop rapid prototyping skills",
      "Foster collaboration in multidisciplinary teams",
      "Create user-centric design solutions",
    ],
    learnings: [
      "Design thinking process and frameworks",
      "User research and persona development",
      "Wireframing and prototyping techniques",
      "Presentation and pitching skills",
    ],
    speakers: [
      {
        name: "Mr. Rahul Desai",
        designation: "Lead UX Designer, Adobe",
        bio: "Rahul has 12 years of experience in UX design and has worked on products used by millions. He specializes in design systems and user research.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/rahuldesai",
        topics: ["UX Design", "Design Systems"],
      },
    ],
    agenda: [
      { time: "Day 1 - 9:00 AM", activity: "Problem Statement & Team Formation", duration: "120 min" },
      { time: "Day 1 - 11:00 AM", activity: "User Research & Ideation", duration: "180 min" },
      { time: "Day 1 - 2:00 PM", activity: "Wireframing & Prototyping", duration: "240 min" },
      { time: "Day 2 - 9:00 AM", activity: "Prototype Refinement", duration: "240 min" },
      { time: "Day 2 - 1:00 PM", activity: "Final Presentations", duration: "180 min" },
      { time: "Day 2 - 4:00 PM", activity: "Judging & Prize Distribution", duration: "60 min" },
    ],
    capacity: 80,
    registered: 76,
    attended: 72,
    status: "completed",
    clubSlug: "desoc",
    clubName: "DESOC",
    eventReport: {
      highlights: [
        "18 teams created innovative design solutions",
        "72 participants worked on 6 real-world problem statements",
        "Mentorship from 5 industry design professionals",
        "Best prototypes showcased in college exhibition",
        "Winners received internship opportunities",
      ],
      statistics: {
        registrations: 76,
        attendance: 72,
        attendanceRate: 95,
        satisfactionScore: 4.7,
        certificatesIssued: 72,
        speakerRating: 4.9,
      },
      financials: {
        budget: 150000,
        expenses: 142000,
        sponsorships: 100000,
        registrationFees: 60000,
      },
      testimonials: [
        {
          name: "Arjun Deshmukh",
          year: "Third Year, CSE",
          feedback:
            "The Design Sprint was intense but incredibly rewarding! Learned so much about design thinking and got to work with an amazing team. The mentorship was invaluable!",
          rating: 5,
        },
        {
          name: "Isha Reddy",
          year: "Final Year, IT",
          feedback:
            "Best design event I've participated in! The problem statements were challenging and relevant. Loved the hands-on approach and the feedback from industry mentors.",
          rating: 5,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Teams brainstorming solutions" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Wireframing session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Prototype presentations" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Mentor feedback session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Winning team celebration" },
        { url: "/placeholder.svg?height=400&width=600", caption: "All participants group photo" },
      ],
      team: [
        {
          name: "Arjun Deshmukh",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning and execution",
        },
        {
          name: "Isha Reddy",
          role: "Design Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Design challenges and mentor coordination",
        },
        {
          name: "Siddharth Iyer",
          role: "Technical Support",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Software setup and technical assistance",
        },
        {
          name: "Kavya Menon",
          role: "Logistics Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue setup and materials management",
        },
      ],
      impactMetrics: [
        { label: "Teams Formed", value: "18", icon: Users },
        { label: "Satisfaction Rate", value: "95%", icon: Star },
        { label: "Prototypes Created", value: "18", icon: Trophy },
        { label: "Industry Mentors", value: "5", icon: Handshake },
      ],
    },
  },

  // Phoenix Club Events
  "phoenix-codefest-2024": {
    slug: "phoenix-codefest-2024",
    title: "AI & Data Science Symposium",
    description:
      "Annual coding competition hosted by the Phoenix Club, focusing on algorithmic challenges and problem-solving.",
    date: "2025-12-05",
    time: "10:00 AM - 4:00 PM",
    location: "Auditorium",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Enhance algorithmic thinking and problem-solving skills",
      "Provide a competitive platform for coders",
      "Introduce participants to competitive programming best practices",
    ],
    learnings: [
      "Efficient algorithm design",
      "Data structures implementation",
      "Debugging and code optimization",
      "Time management under pressure",
    ],
    speakers: [
      {
        name: "Mr. Rohan Gupta",
        designation: "Software Engineer, Meta",
        bio: "Rohan is a competitive programmer with multiple accolades. He is currently working at Meta on performance optimization.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/rohangupta",
        topics: ["Competitive Programming", "Algorithm Optimization"],
      },
    ],
    agenda: [
      { time: "10:00 AM", activity: "Registration & Welcome", duration: "30 min" },
      { time: "10:30 AM", activity: "Competition Round 1", duration: "90 min" },
      { time: "12:00 PM", activity: "Lunch Break", duration: "60 min" },
      { time: "1:00 PM", activity: "Competition Round 2", duration: "90 min" },
      { time: "2:30 PM", activity: "Code Analysis & Review", duration: "60 min" },
      { time: "3:30 PM", activity: "Prize Distribution & Closing", duration: "30 min" },
    ],
    capacity: 150,
    registered: 135,
    attended: 128,
    status: "completed",
    clubSlug: "phoenix",
    clubName: "Phoenix Club (AIDS)",
    eventReport: {
      highlights: [
        "Conducted two challenging rounds of algorithmic problems",
        "128 participants tested their coding skills",
        "Top 3 winners received cash prizes and certificates",
        "Code analysis session provided valuable insights",
      ],
      statistics: {
        registrations: 135,
        attendance: 128,
        attendanceRate: 95,
        satisfactionScore: 4.6,
        certificatesIssued: 128,
        speakerRating: 4.7,
      },
      financials: {
        budget: 80000,
        expenses: 75000,
        sponsorships: 50000,
        registrationFees: 30000,
      },
      testimonials: [
        {
          name: "Siddharth Rao",
          year: "Third Year, CSE",
          feedback:
            "Phenomenal coding competition! The problems were tough but solvable. The code analysis session was extremely helpful for improving my approach.",
          rating: 5,
        },
        {
          name: "Ananya Sharma",
          year: "Second Year, IT",
          feedback:
            "My first competitive programming event, and it was a great learning experience. The organizers were very supportive.",
          rating: 4,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Participants intensely coding" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Code analysis session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Prize winners with organizers" },
      ],
      team: [
        {
          name: "Siddharth Rao",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Event planning and execution",
        },
        {
          name: "Ananya Sharma",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Problem setting and technical support",
        },
        {
          name: "Vikram Singh",
          role: "Logistics",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue and resource management",
        },
      ],
      impactMetrics: [
        { label: "Participants", value: "128", icon: Users },
        { label: "Satisfaction Rate", value: "95%", icon: Star },
        { label: "Rounds Completed", value: "2", icon: Trophy },
        { label: "Cash Prizes Awarded", value: "₹30,000", icon: DollarSign },
      ],
    },
  },

  // MIBCS Club Events
  "data-science-summit-2024": {
    slug: "data-science-summit-2024",
    title: "Blockchain & Security Hackathon",
    description:
      "An event dedicated to exploring the latest trends, tools, and applications in Data Science and Artificial Intelligence.",
    date: "2025-12-12",
    time: "9:30 AM - 5:00 PM",
    location: "Innovation Lab",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Educate on the impact of Data Science and AI",
      "Showcase cutting-edge research and industry applications",
      "Facilitate networking among students, researchers, and professionals",
      "Inspire future careers in data-driven fields",
    ],
    learnings: [
      "Machine learning algorithms and their applications",
      "Big data analytics techniques",
      "Ethical considerations in AI",
      "Career paths in data science",
    ],
    speakers: [
      {
        name: "Dr. Priya Sharma",
        designation: "AI Researcher, Google AI",
        bio: "Dr. Sharma leads a research team at Google AI focusing on natural language processing and deep learning models.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/priyasharma",
        topics: ["AI", "Machine Learning", "NLP"],
      },
      {
        name: "Mr. Vikram Kapoor",
        designation: "Data Scientist, Microsoft",
        bio: "Vikram has extensive experience in building predictive models and analyzing large datasets for business insights.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/vikramkapoor",
        topics: ["Data Analytics", "Predictive Modeling"],
      },
    ],
    agenda: [
      { time: "9:30 AM", activity: "Registration & Welcome Coffee", duration: "30 min" },
      { time: "10:00 AM", activity: "Keynote: The Future of AI", duration: "60 min" },
      { time: "11:00 AM", activity: "Panel Discussion: AI in Industry", duration: "90 min" },
      { time: "12:30 PM", activity: "Lunch Break & Networking", duration: "60 min" },
      { time: "1:30 PM", activity: "Technical Sessions on ML & Big Data", duration: "150 min" },
      { time: "4:00 PM", activity: "Q&A and Closing Remarks", duration: "30 min" },
    ],
    capacity: 200,
    registered: 190,
    attended: 185,
    status: "completed",
    clubSlug: "mibcs",
    clubName: "ML, IoT, Blockchain & CyberSec",
    eventReport: {
      highlights: [
        "Insightful keynote on the future of AI",
        "Engaging panel discussion with industry experts",
        "185 participants gained knowledge on ML and Big Data",
        "Excellent networking opportunities",
        "Positive feedback on speaker quality",
      ],
      statistics: {
        registrations: 190,
        attendance: 185,
        attendanceRate: 97,
        satisfactionScore: 4.8,
        certificatesIssued: 185,
        speakerRating: 4.9,
      },
      financials: {
        budget: 150000,
        expenses: 140000,
        sponsorships: 100000,
        registrationFees: 70000,
      },
      testimonials: [
        {
          name: "Anjali Iyer",
          year: "Final Year, IT",
          feedback:
            "The summit was very informative, especially the sessions on machine learning. The speakers were knowledgeable and inspiring. Great networking event!",
          rating: 5,
        },
        {
          name: "Rohit Patil",
          year: "Third Year, CSE",
          feedback:
            "The keynote by Dr. Sharma was eye-opening. Understanding the practical applications of AI was very beneficial. Highly recommend this event.",
          rating: 5,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Keynote session by Dr. Priya Sharma" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Panel discussion on AI in industry" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Participants engaged in sessions" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Networking during lunch break" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Group photo with speakers and attendees" },
      ],
      team: [
        {
          name: "Anjali Iyer",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning and execution",
        },
        {
          name: "Rohit Patil",
          role: "Speaker Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Inviting and managing speakers",
        },
        {
          name: "Sonia Desai",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "AV setup and technical support",
        },
        {
          name: "Aditya Kumar",
          role: "Marketing Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Promotions and registration",
        },
      ],
      impactMetrics: [
        { label: "Attendees", value: "185", icon: Users },
        { label: "Satisfaction Rate", value: "97%", icon: Star },
        { label: "Topics Covered", value: "5+", icon: Trophy },
        { label: "Industry Speakers", value: "2", icon: Handshake },
      ],
    },
  },

  // MESA Club Events
  "robotics-challenge-2024": {
    slug: "robotics-challenge-2024",
    title: "Robotics Challenge 2024",
    description: "A competition where teams design, build, and program robots to perform specific tasks.",
    date: "2024-04-20",
    time: "9:00 AM - 5:00 PM",
    location: "Mechanical Engineering Lab",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Promote interest in robotics and automation",
      "Develop practical engineering and programming skills",
      "Encourage teamwork and problem-solving",
      "Showcase innovative robot designs",
    ],
    learnings: [
      "Robot design and fabrication",
      "Microcontroller programming",
      "Sensor integration",
      "Autonomous navigation and control",
    ],
    speakers: [
      {
        name: "Dr. Ravi Prakash",
        designation: "Professor, Robotics, IIT Madras",
        bio: "Dr. Prakash is a leading expert in robotics and control systems, with extensive research in autonomous robots.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/raviprakash",
        topics: ["Robotics", "Control Systems"],
      },
    ],
    agenda: [
      { time: "9:00 AM", activity: "Team Registration & Robot Inspection", duration: "90 min" },
      { time: "10:30 AM", activity: "Qualifying Rounds", duration: "180 min" },
      { time: "1:30 PM", activity: "Lunch Break", duration: "60 min" },
      { time: "2:30 PM", activity: "Final Rounds", duration: "120 min" },
      { time: "4:30 PM", activity: "Prize Distribution & Closing", duration: "30 min" },
    ],
    capacity: 100,
    registered: 95,
    attended: 90,
    status: "completed",
    clubSlug: "mesa",
    clubName: "MESA",
    eventReport: {
      highlights: [
        "15 teams participated with their custom-built robots",
        "Robots demonstrated impressive capabilities in task completion",
        "Hands-on experience in robot building and programming",
        "Awards for Best Design, Best Programming, and Overall Winner",
      ],
      statistics: {
        registrations: 95,
        attendance: 90,
        attendanceRate: 95,
        satisfactionScore: 4.7,
        certificatesIssued: 90,
        speakerRating: 4.8,
      },
      financials: {
        budget: 120000,
        expenses: 115000,
        sponsorships: 80000,
        registrationFees: 50000,
      },
      testimonials: [
        {
          name: "Manish Gupta",
          year: "Final Year, Mechanical",
          feedback:
            "This challenge pushed our engineering skills to the limit. Building and programming our robot was a fantastic learning experience. Loved the competition!",
          rating: 5,
        },
        {
          name: "Pooja Verma",
          year: "Third Year, ECE",
          feedback:
            "It was exciting to see so many innovative robot designs. The collaboration between teams was also great to witness.",
          rating: 4,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Robots in action during the challenge" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Teams inspecting their robots" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Winner's announcement" },
      ],
      team: [
        {
          name: "Manish Gupta",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning",
        },
        {
          name: "Pooja Verma",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Robot rules and technical support",
        },
        {
          name: "Sandeep Singh",
          role: "Logistics",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue and equipment management",
        },
      ],
      impactMetrics: [
        { label: "Participating Teams", value: "15", icon: Users },
        { label: "Satisfaction Rate", value: "95%", icon: Star },
        { label: "Awards Given", value: "3", icon: Trophy },
        { label: "Innovation Showcased", value: "Impressive", icon: Lightbulb },
      ],
    },
  },

  // FOSS Club Events
  "foss-meetup-2024": {
    slug: "foss-meetup-2024",
    title: "Open Source Contribution Drive",
    description:
      "A gathering for enthusiasts of Free and Open Source Software to discuss, share, and learn about FOSS technologies.",
    date: "2025-12-18",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Promote FOSS culture and adoption",
      "Facilitate knowledge sharing among FOSS users and developers",
      "Discuss current trends and future of FOSS",
      "Encourage contributions to open-source projects",
    ],
    learnings: [
      "Understanding of FOSS philosophy and licensing",
      "Hands-on experience with FOSS tools and distributions",
      "Benefits of contributing to open-source",
      "Networking with FOSS community members",
    ],
    speakers: [
      {
        name: "Mr. Anand Kumar",
        designation: "Core Contributor, Linux Kernel",
        bio: "Anand is a long-time contributor to the Linux kernel and a strong advocate for FOSS.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/anandkumar",
        topics: ["Linux", "Open Source Development"],
      },
      {
        name: "Ms. Megha Singh",
        designation: "FOSS Advocate",
        bio: "Megha actively promotes FOSS in educational institutions and organizes community events.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/meghasingh",
        topics: ["FOSS Community", "Open Source Contribution"],
      },
    ],
    agenda: [
      { time: "2:00 PM", activity: "Welcome & Introduction to FOSS", duration: "45 min" },
      { time: "2:45 PM", activity: "Talk 1: The Linux Ecosystem", duration: "45 min" },
      { time: "3:30 PM", activity: "Tea Break & Networking", duration: "30 min" },
      { time: "4:00 PM", activity: "Talk 2: Contributing to Open Source", duration: "45 min" },
      { time: "4:45 PM", activity: "Q&A and Closing", duration: "15 min" },
    ],
    capacity: 120,
    registered: 110,
    attended: 105,
    status: "completed",
    clubSlug: "foss",
    clubName: "FOSS KKWIEER",
    eventReport: {
      highlights: [
        "Engaging talks on Linux and open-source contribution",
        "105 participants fostered a deeper understanding of FOSS",
        "Valuable insights from experienced FOSS community members",
        "Strong emphasis on community building and collaboration",
      ],
      statistics: {
        registrations: 110,
        attendance: 105,
        attendanceRate: 95,
        satisfactionScore: 4.7,
        certificatesIssued: 105,
        speakerRating: 4.8,
      },
      financials: {
        budget: 50000,
        expenses: 45000,
        sponsorships: 30000,
        registrationFees: 0, // FOSS events are often free
      },
      testimonials: [
        {
          name: "Rohan Mehta",
          year: "Third Year, CSE",
          feedback:
            "This meetup was a great way to connect with other FOSS enthusiasts. Anand Kumar's talk on Linux was very informative. I'm motivated to contribute to an open-source project now.",
          rating: 5,
        },
        {
          name: "Priya Singh",
          year: "Second Year, IT",
          feedback:
            "Learned a lot about the FOSS philosophy and how to get started with contributing. The speakers were very approachable.",
          rating: 4,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Anand Kumar presenting on Linux" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Networking session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Group photo of attendees" },
      ],
      team: [
        {
          name: "Rohan Mehta",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Event planning and execution",
        },
        {
          name: "Priya Singh",
          role: "Speaker Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Inviting and managing speakers",
        },
        {
          name: "Amit Verma",
          role: "Logistics",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue and refreshments management",
        },
      ],
      impactMetrics: [
        { label: "Attendees", value: "105", icon: Users },
        { label: "Satisfaction Rate", value: "95%", icon: Star },
        { label: "FOSS Topics Covered", value: "3+", icon: Trophy },
        { label: "Community Growth", value: "Encouraged", icon: Handshake },
      ],
    },
  },

  // ISTE Club Events
  "edutech-conference-2024": {
    slug: "edutech-conference-2024",
    title: "EduTech Conference 2024",
    description:
      "A conference exploring the intersection of education and technology, featuring discussions on innovative teaching methods and digital learning tools.",
    date: "2024-05-20",
    time: "9:00 AM - 4:00 PM",
    location: "Conference Hall, Admin Block",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Explore innovative educational technologies",
      "Discuss the future of digital learning",
      "Share best practices in tech-enabled teaching",
      "Foster collaboration between educators and technologists",
    ],
    learnings: [
      "Effective use of digital tools in classrooms",
      "Personalized learning strategies",
      "Online assessment techniques",
      "Emerging trends in EdTech",
    ],
    speakers: [
      {
        name: "Dr. Sunita Rao",
        designation: "Dean of Education Technology, University of Delhi",
        bio: "Dr. Rao is a renowned expert in educational technology and has published extensively on digital learning.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/sunitarao",
        topics: ["EdTech", "Digital Learning", "Pedagogy"],
      },
      {
        name: "Mr. Rajeev Kapoor",
        designation: "CEO, Edutech Solutions",
        bio: "Rajeev leads a company developing innovative digital learning platforms for K-12 education.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/rajeevkapoor",
        topics: ["EdTech Platforms", "Learning Management Systems"],
      },
    ],
    agenda: [
      { time: "9:00 AM", activity: "Registration & Breakfast", duration: "60 min" },
      { time: "10:00 AM", activity: "Keynote: The Future of EdTech", duration: "60 min" },
      { time: "11:00 AM", activity: "Panel Discussion: Innovations in Digital Teaching", duration: "90 min" },
      { time: "12:30 PM", activity: "Lunch Break", duration: "60 min" },
      { time: "1:30 PM", activity: "Breakout Sessions: Tools & Techniques", duration: "120 min" },
      { time: "3:30 PM", activity: "Closing Remarks & Networking", duration: "30 min" },
    ],
    capacity: 150,
    registered: 140,
    attended: 135,
    status: "completed",
    clubSlug: "iste",
    clubName: "ISTE",
    eventReport: {
      highlights: [
        "Insightful discussions on the future of educational technology",
        "Practical workshops on digital learning tools",
        "135 educators and technologists connected",
        "Best practices for integrating technology in education shared",
      ],
      statistics: {
        registrations: 140,
        attendance: 135,
        attendanceRate: 96,
        satisfactionScore: 4.8,
        certificatesIssued: 135,
        speakerRating: 4.9,
      },
      financials: {
        budget: 100000,
        expenses: 95000,
        sponsorships: 70000,
        registrationFees: 40000,
      },
      testimonials: [
        {
          name: "Pooja Sharma",
          year: "Educator",
          feedback:
            "This conference was incredibly valuable. The sessions on digital learning tools were particularly helpful, and I gained new ideas to implement in my classroom.",
          rating: 5,
        },
        {
          name: "Amit Patel",
          year: "EdTech Developer",
          feedback:
            "It was great to connect with educators and understand their needs. The panel discussion provided excellent insights into the current EdTech landscape.",
          rating: 5,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Keynote address on EdTech trends" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Panel discussion on digital teaching" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Workshop session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Networking and collaboration" },
      ],
      team: [
        {
          name: "Pooja Sharma",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning",
        },
        {
          name: "Amit Patel",
          role: "Speaker Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Inviting and managing speakers",
        },
        {
          name: "Neha Gupta",
          role: "Logistics",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue and catering management",
        },
      ],
      impactMetrics: [
        { label: "Attendees", value: "135", icon: Users },
        { label: "Satisfaction Rate", value: "96%", icon: Star },
        { label: "Topics Covered", value: "4+", icon: Trophy },
        { label: "Collaboration", value: "Facilitated", icon: Handshake },
      ],
    },
  },

  // Placeholder event from original code
  c2c: {
    slug: "c2c",
    title: "CSI Monthly Meetup - January",
    description:
      "A comprehensive workshop designed to bridge the gap between campus life and corporate expectations. Learn essential skills, industry insights, and professional etiquette.",
    date: "2026-01-10",
    time: "10:00 AM - 5:00 PM",
    location: "Seminar Hall",
    banner: "/placeholder.svg?height=400&width=1200",
    objectives: [
      "Understand corporate culture and expectations",
      "Develop professional communication skills",
      "Learn resume building and interview techniques",
      "Network with industry professionals",
    ],
    learnings: [
      "Professional email writing and communication",
      "Corporate etiquette and workplace behavior",
      "Time management and productivity techniques",
      "Building a strong professional network",
    ],
    speakers: [
      {
        name: "Dr. Rajesh Kumar",
        designation: "Senior HR Manager, TCS",
        bio: "With over 15 years of experience in talent acquisition and development, Dr. Kumar has helped thousands of students transition into successful corporate careers. He specializes in behavioral training and soft skills development.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/rajeshkumar",
        topics: ["Corporate Culture", "Professional Communication"],
      },
      {
        name: "Ms. Priya Sharma",
        designation: "Leadership Coach, Infosys",
        bio: "A certified leadership coach specializing in early career development and professional skills training. She has conducted over 200 workshops across India.",
        photo: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/priyasharma",
        topics: ["Resume Building", "Interview Techniques"],
      },
    ],
    agenda: [
      { time: "10:00 AM", activity: "Registration & Welcome Coffee", duration: "30 min" },
      { time: "10:30 AM", activity: "Opening Ceremony & Introduction", duration: "30 min" },
      { time: "11:00 AM", activity: "Session 1: Understanding Corporate Culture", duration: "90 min" },
      { time: "12:30 PM", activity: "Lunch Break & Networking", duration: "60 min" },
      { time: "1:30 PM", activity: "Session 2: Professional Communication Skills", duration: "90 min" },
      { time: "3:00 PM", activity: "Tea Break & Networking", duration: "30 min" },
      { time: "3:30 PM", activity: "Session 3: Resume Building & Interview Prep", duration: "90 min" },
      { time: "5:00 PM", activity: "Q&A and Closing Ceremony", duration: "30 min" },
    ],
    capacity: 100,
    registered: 87,
    attended: 82,
    status: "completed",
    clubSlug: "csi",
    clubName: "Computer Society of India",
    // Past event report data
    eventReport: {
      highlights: [
        "Successfully conducted 3 intensive sessions with industry experts",
        "82 students gained practical insights into corporate expectations",
        "Live resume review sessions with personalized feedback",
        "Mock interview rounds with real-time evaluation",
        "Networking session with 5 corporate professionals",
      ],
      statistics: {
        registrations: 87,
        attendance: 82,
        attendanceRate: 94,
        satisfactionScore: 4.7,
        certificatesIssued: 82,
        speakerRating: 4.8,
      },
      financials: {
        budget: 25000,
        expenses: 22500,
        sponsorships: 15000,
        registrationFees: 10000,
      },
      testimonials: [
        {
          name: "Aarav Patel",
          year: "Final Year, CSE",
          feedback:
            "This workshop completely changed my perspective on corporate life. The resume building session was incredibly helpful, and I got my resume reviewed by industry experts!",
          rating: 5,
        },
        {
          name: "Diya Sharma",
          year: "Third Year, IT",
          feedback:
            "The speakers were amazing! Dr. Kumar's insights on corporate culture were eye-opening. I feel much more confident about my upcoming placements now.",
          rating: 5,
        },
        {
          name: "Rohan Mehta",
          year: "Final Year, CSE",
          feedback:
            "Excellent organization and content. The mock interview session helped me identify my weak points. Highly recommend for anyone preparing for placements!",
          rating: 4,
        },
      ],
      photos: [
        { url: "/placeholder.svg?height=400&width=600", caption: "Opening ceremony with Dr. Rajesh Kumar" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Students engaged in resume building session" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Mock interview rounds in progress" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Networking session with industry professionals" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Group photo with all participants" },
        { url: "/placeholder.svg?height=400&width=600", caption: "Certificate distribution ceremony" },
      ],
      team: [
        {
          name: "Rahul Sharma",
          role: "Event Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Overall event planning and execution",
        },
        {
          name: "Priya Patel",
          role: "Logistics Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Venue management, catering, and materials",
        },
        {
          name: "Amit Kumar",
          role: "Technical Lead",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "AV equipment, presentations, and tech support",
        },
        {
          name: "Sneha Desai",
          role: "Marketing Head",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Promotions, social media, and registrations",
        },
        {
          name: "Vikram Singh",
          role: "Volunteer Coordinator",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Managing volunteers and on-ground support",
        },
        {
          name: "Anjali Mehta",
          role: "Registration Desk",
          photo: "/placeholder.svg?height=100&width=100",
          responsibilities: "Check-in, attendance, and certificate distribution",
        },
      ],
      impactMetrics: [
        { label: "Students Trained", value: "82", icon: Users },
        { label: "Satisfaction Rate", value: "94%", icon: Star },
        { label: "Placement Ready", value: "78", icon: Trophy },
        { label: "Industry Connections", value: "5", icon: Handshake },
      ],
    },
  },
}

export default function EventPage({ params }: { params: { slug: string; eventSlug: string } }) {
  const event = eventData[params.eventSlug as keyof typeof eventData]

  if (!event) {
    notFound()
  }

  const isUpcoming = event.status === "upcoming"
  const isCompleted = event.status === "completed"
  const report = event.eventReport

  const [activeTab, setActiveTab] = React.useState<"rsvp" | "proposals" | "volunteers" | "sponsors">("rsvp")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container relative py-12 md:py-16">
          <div className="mb-6">
            <Link
              href={`/clubs/${params.slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {event.clubName || "Club"}
            </Link>
          </div>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm border border-primary/20">
              <Calendar className="h-3 w-3" />
              {event.clubName} • {isUpcoming ? "UPCOMING EVENT" : isCompleted ? "PAST EVENT" : "ONGOING EVENT"}
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              {event.title}
            </h1>

            <p className="mb-8 text-xl text-muted-foreground text-pretty">{event.description}</p>

            {/* Event Details */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>
                  {isCompleted ? `${event.attended} Attended` : `${event.registered} / ${event.capacity} Registered`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {isUpcoming && (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href={`/clubs/${params.slug}/${event.slug}/rsvp`}>
                      <UserCheck className="mr-2 h-5 w-5" />
                      RSVP Form
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className="shadow-sm hover:shadow-md transition-shadow border-purple-500/50 text-purple-600 hover:bg-purple-500/10 bg-transparent"
                  >
                    <Link href={`/clubs/${params.slug}/${event.slug}/proposals`}>
                      <Megaphone className="mr-2 h-5 w-5" />
                      Call for Proposals
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className="shadow-sm hover:shadow-md transition-shadow border-green-500/50 text-green-600 hover:bg-green-500/10 bg-transparent"
                  >
                    <Link href={`/clubs/${params.slug}/${event.slug}/volunteers`}>
                      <HandHeart className="mr-2 h-5 w-5" />
                      Call for Volunteers
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className="shadow-sm hover:shadow-md transition-shadow border-amber-500/50 text-amber-600 hover:bg-amber-500/10 bg-transparent"
                  >
                    <Link href={`/clubs/${params.slug}/${event.slug}/sponsors`}>
                      <Handshake className="mr-2 h-5 w-5" />
                      Call for Sponsors
                    </Link>
                  </Button>
                </>
              )}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
              >
                <Link href={`/clubs/${params.slug}/${event.slug}/edit`}>
                  <Edit className="mr-2 h-5 w-5" />
                  Edit Event
                </Link>
              </Button>
              {isCompleted && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
                >
                  <Link href={`/clubs/${params.slug}/${event.slug}/report`}>
                    <FileText className="mr-2 h-5 w-5" />
                    Submit Report
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {isUpcoming && (
        <section className="border-b border-border">
          <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Tab Navigation */}
              <div className="mb-8 flex flex-wrap gap-2 border-b border-border">
                <button
                  onClick={() => setActiveTab("rsvp")}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === "rsvp"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UserCheck className="inline-block mr-2 h-4 w-4" />
                  RSVP Form
                </button>
                <button
                  onClick={() => setActiveTab("proposals")}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === "proposals"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Megaphone className="inline-block mr-2 h-4 w-4" />
                  Call for Proposals
                </button>
                <button
                  onClick={() => setActiveTab("volunteers")}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === "volunteers"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <HandHeart className="inline-block mr-2 h-4 w-4" />
                  Call for Volunteers
                </button>
                <button
                  onClick={() => setActiveTab("sponsors")}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === "sponsors"
                      ? "border-amber-600 text-amber-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Handshake className="inline-block mr-2 h-4 w-4" />
                  Call for Sponsors
                </button>
              </div>

              {/* Tab Content */}
              <div className="rounded-xl border border-border bg-card p-8">
                {activeTab === "rsvp" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Register for {event.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form below to register for this event. You'll receive a confirmation email with event
                      details.
                    </p>
                    <Button size="lg" asChild className="w-full md:w-auto">
                      <Link href={`/clubs/${params.slug}/${event.slug}/rsvp`}>
                        Go to RSVP Form
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                )}

                {activeTab === "proposals" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Submit Your Proposal</h3>
                    <p className="text-muted-foreground mb-6">
                      We're looking for speakers and presenters! Submit your proposal to share your knowledge and
                      expertise.
                    </p>
                    <Button size="lg" asChild className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">
                      <Link href={`/clubs/${params.slug}/${event.slug}/proposals`}>
                        Submit Proposal
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                )}

                {activeTab === "volunteers" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Volunteer with Us</h3>
                    <p className="text-muted-foreground mb-6">
                      Help make this event a success! Join our volunteer team and gain valuable experience.
                    </p>
                    <Button size="lg" asChild className="w-full md:w-auto bg-green-600 hover:bg-green-700">
                      <Link href={`/clubs/${params.slug}/${event.slug}/volunteers`}>
                        Apply as Volunteer
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                )}

                {activeTab === "sponsors" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
                    <p className="text-muted-foreground mb-6">
                      Support this event and gain visibility among our community. Multiple sponsorship tiers available.
                    </p>
                    <Button size="lg" asChild className="w-full md:w-auto bg-amber-600 hover:bg-amber-700">
                      <Link href={`/clubs/${params.slug}/${event.slug}/sponsors`}>
                        View Sponsorship Options
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {isCompleted && report ? (
        <>
          {/* Executive Summary */}
          <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{event.title} - Event Report</h2>
                    <p className="text-sm text-muted-foreground">Organized by {event.clubName}</p>
                  </div>
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                  {report.impactMetrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    )
                  })}
                </div>

                {/* Key Highlights */}
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Key Highlights</h3>
                  </div>
                  <ul className="space-y-3">
                    {report.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Statistics */}
          <section className="border-b border-border">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Event Statistics</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Attendance Stats */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-lg font-bold mb-4">Attendance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Registrations</span>
                        <span className="text-2xl font-bold">{report.statistics.registrations}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Actual Attendance</span>
                        <span className="text-2xl font-bold">{report.statistics.attendance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Attendance Rate</span>
                        <span className="text-2xl font-bold text-green-600">{report.statistics.attendanceRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Certificates Issued</span>
                        <span className="text-2xl font-bold">{report.statistics.certificatesIssued}</span>
                      </div>
                    </div>
                  </div>

                  {/* Satisfaction Stats */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-lg font-bold mb-4">Satisfaction Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Overall Satisfaction</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{report.statistics.satisfactionScore}</span>
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Speaker Rating</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{report.statistics.speakerRating}</span>
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground mb-2">Rating Distribution</div>
                        <div className="flex gap-1">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex-1">
                              <div className="h-20 bg-muted rounded flex items-end">
                                <div className="w-full bg-primary rounded" style={{ height: `${rating * 20}%` }} />
                              </div>
                              <div className="text-xs text-center mt-1">{rating}★</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Summary */}
          <section className="border-b border-border">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Financial Summary</h2>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-green-600">Revenue</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sponsorships</span>
                          <span className="text-xl font-bold">₹{report.financials.sponsorships.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Registration Fees</span>
                          <span className="text-xl font-bold">
                            ₹{report.financials.registrationFees.toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-border flex justify-between items-center">
                          <span className="font-bold">Total Revenue</span>
                          <span className="text-2xl font-bold text-green-600">
                            ₹{(report.financials.sponsorships + report.financials.registrationFees).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4 text-red-600">Expenses</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Budget</span>
                          <span className="text-xl font-bold">₹{report.financials.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Actual Expenses</span>
                          <span className="text-xl font-bold">₹{report.financials.expenses.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 border-t border-border flex justify-between items-center">
                          <span className="font-bold">Net Surplus</span>
                          <span className="text-2xl font-bold text-green-600">
                            ₹
                            {(
                              report.financials.sponsorships +
                              report.financials.registrationFees -
                              report.financials.expenses
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Objectives & Learnings */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Objectives</h2>
                </div>
                <ul className="space-y-3">
                  {event.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Key Learnings</h2>
                </div>
                <ul className="space-y-3">
                  {event.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="border-b border-border bg-muted/20">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold">Speakers & Guests</h2>
            <div className="grid gap-6">
              {event.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${speaker.photo})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
                      <p className="text-primary font-medium mb-4">{speaker.designation}</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">{speaker.bio}</p>
                      {speaker.topics && (
                        <div className="flex flex-wrap gap-2">
                          {speaker.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold">Event Agenda</h2>
            <div className="space-y-3">
              {event.agenda.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">{item.time}</span>
                      <span className="text-xs text-muted-foreground">({item.duration})</span>
                    </div>
                    <div className="text-lg font-medium">{item.activity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isCompleted && report && (
        <>
          {/* Participant Testimonials */}
          <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Participant Feedback</h2>
                </div>

                <div className="grid gap-6">
                  {report.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="mb-4 flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4 italic">
                        "{testimonial.feedback}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.year}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Event Photos Gallery */}
          <section className="border-b border-border">
            <div className="container py-12 md:py-16">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Event Gallery</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {report.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="group relative aspect-video rounded-xl overflow-hidden bg-muted border border-border hover:shadow-xl transition-all"
                    >
                      <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium px-4 text-center">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download All Photos
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Certificates */}
          <section className="border-b border-border">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Certificates</h2>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Certificate Distribution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Certificates of participation have been issued to all {report.statistics.certificatesIssued}{" "}
                      attendees who completed the workshop. Each certificate includes the participant's name, event
                      details, and is digitally signed by the organizing committee.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate Template
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate List
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Organizing Team */}
          <section className="py-12 md:py-16">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                <h2 className="mb-8 text-3xl font-bold">Organizing Team</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {report.team.map((member, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 overflow-hidden">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${member.photo})` }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{member.name}</h3>
                          <p className="text-sm text-primary font-medium">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.responsibilities}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
