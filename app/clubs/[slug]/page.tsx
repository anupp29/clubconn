import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  Award,
  Linkedin,
  Instagram,
  ArrowLeft,
  Edit,
  MapPin,
  Mail,
  Clock,
  Target,
  Eye,
} from "lucide-react"

const clubsData = {
  csi: {
    id: "csi",
    name: "Computer Society of India",
    shortName: "CSI",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH1ZZdNzAfyxA/company-logo_100_100/B56ZiXY4IWHMAU-/0/1754886539197/csi_kkwieer_logo?e=1762387200&v=beta&t=gYuZHd1gC94yXf0tJhTZisDrJJl_uvTnLUDHyCZPv3k",
    tagline: "Empowering Innovation Through Technology",
    description:
      "The Computer Society of India (CSI) at KKWIEER is dedicated to empowering students through technology and innovation. We provide a platform where ideas meet execution, fostering a community of tech enthusiasts who are passionate about learning and growing together.",
    mission:
      "To create a vibrant ecosystem where students can explore emerging technologies, collaborate with industry experts, and participate in national-level events that shape the future of computing.",
    vision:
      "To be the leading student organization that bridges the gap between academic learning and industry requirements, producing skilled professionals ready for the tech industry.",
    founded: "2015",
    linkedin: "https://in.linkedin.com/company/csi-kkwieer",
    instagram: "https://www.instagram.com/csi_kkwieer/",
    email: "csi@kkwieer.edu.in",
    stats: {
      participants: 250,
      events: 24,
      teamSize: 15,
    },
    history: [
      {
        year: "2015",
        event: "CSI KKWIEER Chapter Founded",
        description: "Established as the official student chapter of Computer Society of India.",
      },
      {
        year: "2017",
        event: "First National Conference",
        description: "Organized our first national-level technical conference with 500+ participants.",
      },
      {
        year: "2019",
        event: "Industry Partnership Program",
        description: "Launched partnerships with leading tech companies for workshops and internships.",
      },
      {
        year: "2022",
        event: "Innovation Lab Launch",
        description: "Inaugurated dedicated innovation lab for student projects and research.",
      },
      {
        year: "2024",
        event: "Best Chapter Award",
        description: "Received CSI National Best Student Chapter Award for outstanding contributions.",
      },
    ],
    committee: [
      { name: "Rahul Sharma", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Priya Patel", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Amit Kumar", role: "Technical Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sneha Desai", role: "Events Coordinator", image: "/placeholder.svg?height=100&width=100" },
      { name: "Rohan Mehta", role: "Marketing Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Ananya Singh", role: "Treasurer", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "techfest-2024",
        title: "TechFest 2024",
        date: "March 15, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Annual technical festival with workshops, competitions, and guest lectures.",
      },
      {
        slug: "ai-workshop-series",
        title: "AI Workshop Series",
        date: "February 10, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Hands-on workshop on Machine Learning and AI fundamentals.",
      },
      {
        slug: "hackathon-2024",
        title: "Hackathon 2024",
        date: "January 20, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "24-hour coding marathon with industry mentors and exciting prizes.",
      },
      {
        slug: "industry-visit-tech-park",
        title: "Industry Visit - Tech Park",
        date: "December 5, 2023",
        image: "/placeholder.svg?height=300&width=400",
        description: "Educational visit to leading tech companies in the region.",
      },
    ],
    upcomingEvents: [
      {
        slug: "web-dev-bootcamp",
        title: "Web Development Bootcamp",
        date: "April 20, 2025",
        time: "10:00 AM - 5:00 PM",
        location: "Seminar Hall A",
        description: "Comprehensive bootcamp covering modern web development technologies.",
      },
      {
        slug: "cloud-computing-workshop",
        title: "Cloud Computing Workshop",
        date: "May 5, 2025",
        time: "2:00 PM - 6:00 PM",
        location: "Computer Lab 3",
        description: "Learn AWS, Azure, and cloud architecture fundamentals.",
      },
      {
        slug: "tech-talk-future-ai",
        title: "Tech Talk: Future of AI",
        date: "May 15, 2025",
        time: "4:00 PM - 6:00 PM",
        location: "Auditorium",
        description: "Guest lecture by industry expert on AI trends and opportunities.",
      },
    ],
  },
  debuggers: {
    id: "debuggers",
    name: "Debuggers' Club",
    shortName: "Debuggers",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEF8RJes9ghBw/company-logo_200_200/company-logo_200_200/0/1670586536703?e=1762387200&v=beta&t=AimcngHaejppK7cQS00GhtGCU5bF8st9SOeaL6_ppPM",
    tagline: "Debug Your Potential, Code Your Future",
    description:
      "Debuggers' Club provides a comprehensive platform for students to showcase their talents in both technical and non-technical domains. We focus on holistic development through workshops, seminars, and our flagship annual event 'Equinox'.",
    mission:
      "To nurture talent and provide opportunities for students to excel in technical skills while developing soft skills through diverse events and activities.",
    vision:
      "To create well-rounded professionals who can tackle real-world challenges with technical expertise and creative problem-solving abilities.",
    founded: "2007",
    linkedin: "https://in.linkedin.com/company/debuggers-club-kkwieer",
    instagram: "https://www.instagram.com/debuggersclub/",
    email: "debuggers@kkwieer.edu.in",
    stats: {
      participants: 320,
      events: 18,
      teamSize: 12,
    },
    history: [
      {
        year: "2007",
        event: "Club Inception",
        description: "Founded with the vision to create a platform for technical excellence.",
      },
      {
        year: "2010",
        event: "First Equinox Event",
        description: "Launched our flagship annual technical festival.",
      },
      {
        year: "2015",
        event: "500+ Members Milestone",
        description: "Reached significant membership milestone with active participation.",
      },
      {
        year: "2020",
        event: "Virtual Events Initiative",
        description: "Successfully transitioned to online events during pandemic.",
      },
      {
        year: "2023",
        event: "Industry Collaboration",
        description: "Established partnerships with major tech companies for student placements.",
      },
    ],
    committee: [
      { name: "Vikram Joshi", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Neha Kulkarni", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Aditya Rao", role: "Technical Lead", image: "/placeholder.svg?height=100&width=100" },
      { name: "Pooja Sharma", role: "Events Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Karan Patel", role: "PR Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Divya Nair", role: "Secretary", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "equinox-2024",
        title: "Equinox 2024",
        date: "March 25, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Annual flagship technical festival with multiple competitions and workshops.",
      },
      {
        slug: "code-sprint",
        title: "Code Sprint",
        date: "February 18, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Competitive programming event with challenging problem sets.",
      },
      {
        slug: "tech-quiz-championship",
        title: "Tech Quiz Championship",
        date: "January 30, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Inter-college technical quiz competition.",
      },
    ],
    upcomingEvents: [
      {
        slug: "debugging-workshop",
        title: "Debugging Workshop",
        date: "April 25, 2025",
        time: "11:00 AM - 4:00 PM",
        location: "Lab 2",
        description: "Learn advanced debugging techniques and tools.",
      },
      {
        slug: "equinox-2025",
        title: "Equinox 2025",
        date: "May 20, 2025",
        time: "9:00 AM - 6:00 PM",
        location: "Main Campus",
        description: "Our biggest annual technical festival with 20+ events.",
      },
    ],
  },
  desoc: {
    id: "desoc",
    name: "DESOC",
    shortName: "DESOC",
    logo: "https://media.licdn.com/dms/image/v2/D4D03AQEw2mbHXhRKAg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710820747705?e=1762387200&v=beta&t=IiAKyLeuTtGRgVS3rwHhiqOVvGiYkVNySSXSziKAeWg",
    tagline: "Where Design Meets Code",
    description:
      "DESOC empowers students to combine creativity with technology through hands-on projects, workshops, and competitions. We bridge the gap between design thinking and software development.",
    mission:
      "To foster a community where design and development converge, creating innovative solutions through creative problem-solving.",
    vision:
      "To produce designers and developers who understand both aesthetics and functionality, creating user-centric digital experiences.",
    founded: "2019",
    linkedin: "https://www.linkedin.com/company/desoc-kkwieer",
    instagram: "https://www.instagram.com/desoc.kkwieer/",
    email: "desoc@kkwieer.edu.in",
    stats: {
      participants: 180,
      events: 15,
      teamSize: 10,
    },
    history: [
      {
        year: "2019",
        event: "DESOC Founded",
        description: "Established to promote design thinking in computer science education.",
      },
      {
        year: "2020",
        event: "First Design Hackathon",
        description: "Organized inaugural UI/UX design competition.",
      },
      {
        year: "2022",
        event: "Industry Mentorship Program",
        description: "Launched mentorship program with design professionals.",
      },
      {
        year: "2024",
        event: "Design Studio Launch",
        description: "Opened dedicated design studio with latest tools and software.",
      },
    ],
    committee: [
      { name: "Arjun Deshmukh", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Isha Reddy", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Siddharth Iyer", role: "Design Lead", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kavya Menon", role: "Development Lead", image: "/placeholder.svg?height=100&width=100" },
      { name: "Rohan Gupta", role: "Events Coordinator", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "design-sprint-2024",
        title: "Design Sprint 2024",
        date: "March 10, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "48-hour design challenge with real-world problem statements.",
      },
      {
        slug: "uiux-workshop",
        title: "UI/UX Workshop",
        date: "February 5, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Comprehensive workshop on modern UI/UX design principles.",
      },
    ],
    upcomingEvents: [
      {
        slug: "figma-masterclass",
        title: "Figma Masterclass",
        date: "April 30, 2025",
        time: "3:00 PM - 6:00 PM",
        location: "Design Studio",
        description: "Advanced Figma techniques for professional designers.",
      },
      {
        slug: "design-thinking-workshop",
        title: "Design Thinking Workshop",
        date: "May 10, 2025",
        time: "10:00 AM - 5:00 PM",
        location: "Innovation Lab",
        description: "Learn design thinking methodology for problem-solving.",
      },
    ],
  },
  phoenix: {
    id: "phoenix",
    name: "Phoenix Club",
    shortName: "Phoenix",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEc8uYXrvdKrQ/company-logo_100_100/company-logo_100_100/0/1728374269111?e=1762387200&v=beta&t=OhmrWWcQldgSfJtLMkkN--5hZ2zwweDzgyJ9jRXb6JA",
    tagline: "Rising Through AI and Data Science",
    description:
      "Phoenix Club focuses on Artificial Intelligence and Data Science, aiming to revolutionize the tech landscape. We provide hands-on experience with cutting-edge AI technologies and data analytics.",
    mission:
      "To empower students with AI and Data Science skills, preparing them for the future of technology and innovation.",
    vision:
      "To be the premier AI/DS community that produces skilled data scientists and AI engineers ready to tackle real-world challenges.",
    founded: "2020",
    linkedin: "https://www.linkedin.com/company/phoenix-club-kkwieer",
    instagram: "https://www.instagram.com/phoenix_kkw/",
    email: "phoenix@kkwieer.edu.in",
    stats: {
      participants: 200,
      events: 12,
      teamSize: 8,
    },
    history: [
      {
        year: "2020",
        event: "Phoenix Takes Flight",
        description: "Founded to focus on emerging AI and Data Science technologies.",
      },
      {
        year: "2021",
        event: "First AI Hackathon",
        description: "Organized successful AI/ML hackathon with industry participation.",
      },
      {
        year: "2023",
        event: "Research Collaboration",
        description: "Established research partnerships with AI labs and universities.",
      },
      {
        year: "2024",
        event: "Prompt Quest Launch",
        description: "Launched innovative AI prompt engineering competition.",
      },
    ],
    committee: [
      { name: "Aarav Malhotra", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Diya Kapoor", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Aryan Verma", role: "AI Research Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Riya Agarwal", role: "Data Science Lead", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "ai-summit-2024",
        title: "AI Summit 2024",
        date: "March 5, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Conference on latest AI trends and applications.",
      },
      {
        slug: "prompt-quest",
        title: "Prompt Quest",
        date: "February 14, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "AI prompt engineering competition.",
      },
    ],
    upcomingEvents: [
      {
        slug: "deep-learning-workshop",
        title: "Deep Learning Workshop",
        date: "May 1, 2025",
        time: "2:00 PM - 7:00 PM",
        location: "AI Lab",
        description: "Hands-on workshop on neural networks and deep learning.",
      },
      {
        slug: "data-science-bootcamp",
        title: "Data Science Bootcamp",
        date: "May 18, 2025",
        time: "9:00 AM - 6:00 PM",
        location: "Computer Center",
        description: "Intensive bootcamp covering data analysis and visualization.",
      },
    ],
  },
  mibcs: {
    id: "mibcs",
    name: "MIBCS",
    shortName: "MIBCS",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQG7rzLov7ysxw/company-logo_200_200/company-logo_200_200/0/1644348176661?e=1762387200&v=beta&t=o1uHh1yA7mWrbt1CRScqRuL0rl9ib_HuczN2NO4el-o",
    tagline: "Innovating Tomorrow's Technology Today",
    description:
      "MIBCS focuses on emerging technologies including Machine Learning, IoT, Blockchain, and Cyber Security. We provide hands-on experience with cutting-edge technologies shaping the future.",
    mission:
      "To create a community of innovators skilled in emerging technologies, ready to solve complex real-world problems.",
    vision: "To be the leading platform for students to explore and master next-generation technologies.",
    founded: "2018",
    linkedin: "https://in.linkedin.com/company/mibcs-kkwieer",
    instagram: "https://www.instagram.com/mibcs_kkw/",
    email: "mibcs@kkwieer.edu.in",
    stats: {
      participants: 150,
      events: 10,
      teamSize: 9,
    },
    history: [
      {
        year: "2018",
        event: "MIBCS Established",
        description: "Founded under Innovation Centre to focus on emerging tech.",
      },
      {
        year: "2019",
        event: "Blockchain Workshop Series",
        description: "Launched comprehensive blockchain education program.",
      },
      {
        year: "2021",
        event: "IoT Lab Setup",
        description: "Established dedicated IoT laboratory with latest hardware.",
      },
      {
        year: "2023",
        event: "Cyber Security Certification",
        description: "Partnered with industry for cyber security certification programs.",
      },
    ],
    committee: [
      { name: "Harsh Pandey", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Tanvi Shah", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kunal Jain", role: "Blockchain Lead", image: "/placeholder.svg?height=100&width=100" },
      { name: "Shreya Mishra", role: "IoT Coordinator", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "blockchain-summit",
        title: "Blockchain Summit",
        date: "March 12, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Conference on blockchain technology and applications.",
      },
      {
        slug: "iot-hackathon",
        title: "IoT Hackathon",
        date: "February 20, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Build innovative IoT solutions for smart cities.",
      },
    ],
    upcomingEvents: [
      {
        slug: "cyber-security-workshop",
        title: "Cyber Security Workshop",
        date: "April 28, 2025",
        time: "1:00 PM - 6:00 PM",
        location: "Security Lab",
        description: "Learn ethical hacking and penetration testing.",
      },
      {
        slug: "iot-development-bootcamp",
        title: "IoT Development Bootcamp",
        date: "May 12, 2025",
        time: "10:00 AM - 5:00 PM",
        location: "IoT Lab",
        description: "Build IoT projects with Arduino and Raspberry Pi.",
      },
    ],
  },
  mesa: {
    id: "mesa",
    name: "MESA",
    shortName: "MESA",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFNGUBNFutEFw/company-logo_200_200/company-logo_200_200/0/1694096670884?e=1762387200&v=beta&t=hzNot28zSeV7jYQIK_QBxkkLhiyrWPEIrd_Wh2WdzY8",
    tagline: "Engineering Excellence in Mechanical Domain",
    description:
      "MESA represents mechanical engineering students, focusing on both academic excellence and extracurricular development. We bridge theory and practice through workshops, industrial visits, and competitions.",
    mission:
      "To develop well-rounded mechanical engineers through technical knowledge, practical skills, and professional development.",
    vision: "To be the premier mechanical engineering student organization producing industry-ready engineers.",
    founded: "2012",
    instagram: "https://www.instagram.com/mesa_kkwieer/",
    email: "mesa@kkwieer.edu.in",
    stats: {
      participants: 140,
      events: 14,
      teamSize: 11,
    },
    history: [
      {
        year: "2012",
        event: "MESA Founded",
        description: "Established to represent mechanical engineering students.",
      },
      {
        year: "2014",
        event: "First Industrial Visit",
        description: "Organized successful visit to major manufacturing facility.",
      },
      {
        year: "2017",
        event: "CAD/CAM Lab Initiative",
        description: "Launched student-led CAD/CAM training program.",
      },
      {
        year: "2022",
        event: "Industry Partnership",
        description: "Established partnerships with leading manufacturing companies.",
      },
    ],
    committee: [
      { name: "Varun Khanna", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Anjali Rane", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Nikhil Patil", role: "Technical Head", image: "/placeholder.svg?height=100&width=100" },
      { name: "Priyanka Joshi", role: "Events Lead", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "mechfest-2024",
        title: "MechFest 2024",
        date: "March 8, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Annual mechanical engineering festival with competitions.",
      },
      {
        slug: "cad-workshop",
        title: "CAD Workshop",
        date: "February 12, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Hands-on workshop on advanced CAD techniques.",
      },
    ],
    upcomingEvents: [
      {
        slug: "industrial-visit-auto-plant",
        title: "Industrial Visit - Auto Plant",
        date: "May 3, 2025",
        time: "8:00 AM - 5:00 PM",
        location: "Off Campus",
        description: "Visit to automobile manufacturing facility.",
      },
      {
        slug: "robotics-workshop",
        title: "Robotics Workshop",
        date: "May 16, 2025",
        time: "11:00 AM - 4:00 PM",
        location: "Mechanical Lab",
        description: "Build and program mechanical robots.",
      },
    ],
  },
  foss: {
    id: "foss",
    name: "FOSS Club",
    shortName: "FOSS",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHVFE_EClm9xw/img-crop_100/B4DZlHrNNPIgAM-/0/1757844133467?e=1762387200&v=beta&t=lhmvYcKkVYRNvSSxF3lgp_F4wjC0n2a_Oo89CVHP2Bg",
    tagline: "Free and Open Source for Everyone",
    description:
      "FOSS Club promotes Free and Open Source Software culture among students through events, workshops, and networking. We believe in the power of open collaboration and community-driven development.",
    mission: "To spread awareness about FOSS and create a community of contributors to open source projects.",
    vision:
      "To make KKWIEER a hub for open source development and produce active contributors to global FOSS projects.",
    founded: "2021",
    linkedin: "https://www.linkedin.com/company/foss-club-kkwieer",
    instagram: "https://www.instagram.com/foss_kkwieer/",
    email: "foss@kkwieer.edu.in",
    stats: {
      participants: 190,
      events: 16,
      teamSize: 10,
    },
    history: [
      {
        year: "2021",
        event: "FOSS Club Launch",
        description: "Founded to promote open source culture in campus.",
      },
      {
        year: "2022",
        event: "First Hacktoberfest",
        description: "Successfully organized campus Hacktoberfest event.",
      },
      {
        year: "2023",
        event: "FOSS United Partnership",
        description: "Became official FOSS United community partner.",
      },
      {
        year: "2024",
        event: "Open Source Contributions",
        description: "Club members made 500+ contributions to open source projects.",
      },
    ],
    committee: [
      { name: "Aditya Bhosale", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sakshi Pawar", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Pratik Sawant", role: "Technical Lead", image: "/placeholder.svg?height=100&width=100" },
      { name: "Manasi Kulkarni", role: "Community Manager", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "hacktoberfest-2024",
        title: "Hacktoberfest 2024",
        date: "October 15, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Month-long open source contribution event.",
      },
      {
        slug: "docker-workshop",
        title: "Docker Workshop",
        date: "February 25, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Learn containerization with Docker.",
      },
    ],
    upcomingEvents: [
      {
        slug: "git-github-workshop",
        title: "Git & GitHub Workshop",
        date: "April 22, 2025",
        time: "3:00 PM - 6:00 PM",
        location: "Computer Lab 1",
        description: "Master version control with Git and GitHub.",
      },
      {
        slug: "open-source-contribution-drive",
        title: "Open Source Contribution Drive",
        date: "May 8, 2025",
        time: "10:00 AM - 5:00 PM",
        location: "Innovation Lab",
        description: "Contribute to real open source projects with mentorship.",
      },
    ],
  },
  iste: {
    id: "iste",
    name: "ISTE",
    shortName: "ISTE",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGGPJSuDfFlHg/company-logo_200_200/company-logo_200_200/0/1736951134455?e=1762387200&v=beta&t=R5_bJ-8U0hyvcp7n2DyW8yFRGuHxdCGkGJgJ1Nj9rEw",
    tagline: "Advancing Technical Education",
    description:
      "ISTE is a non-profit society dedicated to fostering quality education in engineering and technology. We organize workshops, seminars, and conferences to promote excellence in technical education.",
    mission:
      "To promote quality technical education through continuous learning, faculty development, and student engagement.",
    vision:
      "To be the leading organization for technical education advancement, producing skilled engineers and educators.",
    founded: "2010",
    linkedin: "https://www.linkedin.com/company/iste-kkwieer",
    instagram: "https://www.instagram.com/iste_kkwieer/",
    email: "iste@kkwieer.edu.in",
    stats: {
      participants: 280,
      events: 20,
      teamSize: 14,
    },
    history: [
      {
        year: "2010",
        event: "ISTE Chapter Established",
        description: "Official ISTE student chapter formed at KKWIEER.",
      },
      {
        year: "2013",
        event: "First National Conference",
        description: "Organized successful national-level technical conference.",
      },
      {
        year: "2016",
        event: "Faculty Development Program",
        description: "Launched comprehensive faculty development initiatives.",
      },
      {
        year: "2020",
        event: "Best Chapter Award",
        description: "Received ISTE National Best Student Chapter Award.",
      },
      {
        year: "2023",
        event: "International Collaboration",
        description: "Established international exchange programs with partner institutions.",
      },
    ],
    committee: [
      { name: "Rajesh Kadam", role: "President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Megha Deshmukh", role: "Vice President", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sanket Patil", role: "Secretary", image: "/placeholder.svg?height=100&width=100" },
      { name: "Pallavi Shinde", role: "Treasurer", image: "/placeholder.svg?height=100&width=100" },
      { name: "Akash Jadhav", role: "Events Head", image: "/placeholder.svg?height=100&width=100" },
    ],
    events: [
      {
        slug: "iste-convention-2024",
        title: "ISTE Convention 2024",
        date: "March 20, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Annual convention with technical sessions and workshops.",
      },
      {
        slug: "faculty-development-program",
        title: "Faculty Development Program",
        date: "February 28, 2024",
        image: "/placeholder.svg?height=300&width=400",
        description: "Week-long program for faculty skill enhancement.",
      },
    ],
    upcomingEvents: [
      {
        slug: "technical-seminar-series",
        title: "Technical Seminar Series",
        date: "April 26, 2025",
        time: "2:00 PM - 5:00 PM",
        location: "Auditorium",
        description: "Series of technical talks by industry experts.",
      },
      {
        slug: "student-exchange-program-info",
        title: "Student Exchange Program Info Session",
        date: "May 14, 2025",
        time: "4:00 PM - 6:00 PM",
        location: "Seminar Hall",
        description: "Learn about international exchange opportunities.",
      },
    ],
  },
}

export default function ClubPage({ params }: { params: { slug: string } }) {
  const club = clubsData[params.slug as keyof typeof clubsData]

  if (!club) {
    notFound()
  }

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

        <div className="container relative py-12 md:py-20">
          <div className="mb-6">
            <Link
              href="/clubs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Clubs
            </Link>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* Club Logo */}
            <div className="shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-border bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div
                  className="relative h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${club.logo})` }}
                />
              </div>
            </div>

            {/* Club Info */}
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm border border-primary/20">
                <Award className="h-3 w-3" />
                ACTIVE CLUB
              </div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
                {club.name}
              </h1>
              <p className="mb-6 text-xl text-muted-foreground text-pretty">{club.tagline}</p>

              {/* Stats */}
              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{club.stats.participants}</div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{club.stats.events}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{club.stats.teamSize}</div>
                    <div className="text-xs text-muted-foreground">Team Members</div>
                  </div>
                </div>
              </div>

              {/* Social Links & Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {club.linkedin && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
                  >
                    <Link href={club.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                )}
                {club.instagram && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
                  >
                    <Link href={club.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
                >
                  <Link href={`mailto:${club.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </Button>
                <Button size="sm" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href={`/clubs/${club.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Club
                  </Link>
                </Button>
                <Button size="sm" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href={`/clubs/${club.id}/events/new`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <h2 className="mb-6 text-3xl font-bold">About {club.shortName}</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{club.description}</p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{club.mission}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{club.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <h2 className="mb-8 text-3xl font-bold">Our Journey</h2>
          <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-border md:before:left-[15px]">
            {club.history.map((item, index) => (
              <div key={index} className="relative flex gap-4 md:gap-6">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background md:h-8 md:w-8">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="mb-1 text-sm font-semibold text-primary">{item.year}</div>
                  <h3 className="mb-2 text-lg font-bold">{item.event}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <h2 className="mb-8 text-3xl font-bold">Committee Members</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.committee.map((member, index) => (
              <div key={index} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <h2 className="mb-8 text-3xl font-bold">Past Events</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {club.events.map((event, index) => (
              <Link
                key={index}
                href={`/clubs/${club.id}/${event.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                    View Event Report
                    <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold">Upcoming Events</h2>
          <div className="space-y-4">
            {club.upcomingEvents.map((event, index) => (
              <Link
                key={index}
                href={`/clubs/${club.id}/${event.slug}/rsvp`}
                className="block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 group"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <Button className="shrink-0">
                    Register Now
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
