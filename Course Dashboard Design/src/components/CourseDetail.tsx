import { useState } from 'react';
import { ArrowLeft, Star, Users, Clock, BookOpen, PlayCircle, CheckCircle, Shield, Award, Globe, Download, Video, FileText, Calendar, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentDialog } from './PaymentDialog';
import { VideoPlayer } from './VideoPlayer';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

interface CourseDetailProps {
  courseId: number;
  onBack: () => void;
}

const courseDetails = {
  1: {
    title: "Complete Machine Learning & AI Bootcamp",
    instructor: "Dr. Sarah Johnson",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "PhD in Computer Science from Stanford. 15+ years experience in AI research at Google and Microsoft. Published 50+ research papers.",
    lessons: 45,
    duration: "12h 30m",
    rating: 4.8,
    students: 15420,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI/ML",
    price: 2999,
    originalPrice: 4999,
    isFree: false,
    description: "Master the fundamentals of Machine Learning and Artificial Intelligence with hands-on projects and real-world applications. This comprehensive bootcamp covers everything from basic concepts to advanced neural networks.",
    whatYouLearn: [
      "Understand core machine learning algorithms and when to use them",
      "Build and train neural networks using Python and TensorFlow",
      "Work with real datasets and perform data preprocessing",
      "Implement supervised and unsupervised learning techniques",
      "Create computer vision models for image recognition",
      "Develop natural language processing applications",
      "Deploy machine learning models to production",
      "Apply reinforcement learning to solve complex problems"
    ],
    requirements: [
      "Basic programming knowledge (Python preferred)",
      "High school level mathematics",
      "No prior ML experience required",
      "Computer with internet connection"
    ],
    modules: [
      { title: "Introduction to Machine Learning", lessons: 5, duration: "45m" },
      { title: "Python for Data Science", lessons: 8, duration: "2h 15m" },
      { title: "Data Preprocessing & Visualization", lessons: 6, duration: "1h 30m" },
      { title: "Supervised Learning Algorithms", lessons: 10, duration: "3h 20m" },
      { title: "Unsupervised Learning", lessons: 7, duration: "2h 10m" },
      { title: "Neural Networks & Deep Learning", lessons: 9, duration: "2h 30m" }
    ],
    videos: [
      { id: 1, title: "Introduction to Machine Learning Concepts", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", module: "Introduction to Machine Learning" },
      { id: 2, title: "Setting up Python Environment for ML", duration: "22:45", thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", module: "Python for Data Science" },
      { id: 3, title: "Data Preprocessing Techniques", duration: "18:20", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", module: "Data Preprocessing & Visualization" },
      { id: 4, title: "Linear Regression Implementation", duration: "28:15", thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", module: "Supervised Learning Algorithms" },
      { id: 5, title: "Neural Network Architecture", duration: "35:40", thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", module: "Neural Networks & Deep Learning" }
    ],
    assignments: [
      { id: 1, title: "Basic ML Concepts Quiz", description: "Test your understanding of fundamental machine learning concepts", dueDate: "2024-02-15", status: "completed", points: 100, module: "Introduction to Machine Learning" },
      { id: 2, title: "Python Data Analysis Project", description: "Create a complete data analysis pipeline using Python pandas and numpy", dueDate: "2024-02-20", status: "submitted", points: 150, module: "Python for Data Science" },
      { id: 3, title: "Data Cleaning Assignment", description: "Clean and preprocess a real-world messy dataset", dueDate: "2024-02-25", status: "pending", points: 120, module: "Data Preprocessing & Visualization" },
      { id: 4, title: "Regression Model Implementation", description: "Build and evaluate a linear regression model from scratch", dueDate: "2024-03-01", status: "not_started", points: 200, module: "Supervised Learning Algorithms" },
      { id: 5, title: "Neural Network Project", description: "Design and train a neural network for image classification", dueDate: "2024-03-05", status: "not_started", points: 250, module: "Neural Networks & Deep Learning" }
    ],
    certificate: true,
    level: "Beginner to Advanced"
  },
  2: {
    title: "Cybersecurity Fundamentals & Ethical Hacking",
    instructor: "Prof. Michael Chen",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzU2NDQyMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "CISSP certified cybersecurity expert with 20+ years experience. Former NSA consultant and current professor at MIT.",
    lessons: 38,
    duration: "18h 45m",
    rating: 4.7,
    students: 8930,
    thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cyber Security",
    price: 3499,
    originalPrice: 5999,
    isFree: false,
    description: "Learn to protect systems and networks from digital attacks. Master ethical hacking techniques, penetration testing, and cybersecurity best practices.",
    whatYouLearn: [
      "Identify and assess security vulnerabilities",
      "Perform penetration testing and ethical hacking",
      "Implement network security measures",
      "Understand cryptography and secure communications",
      "Conduct security audits and risk assessments",
      "Respond to security incidents effectively",
      "Secure web applications and databases",
      "Master security frameworks and compliance standards"
    ],
    requirements: [
      "Basic networking knowledge",
      "Understanding of operating systems",
      "No prior security experience required",
      "Virtual machine capability recommended"
    ],
    modules: [
      { title: "Cybersecurity Fundamentals", lessons: 6, duration: "2h 30m" },
      { title: "Network Security", lessons: 8, duration: "4h 15m" },
      { title: "Ethical Hacking Basics", lessons: 7, duration: "3h 20m" },
      { title: "Penetration Testing", lessons: 9, duration: "4h 45m" },
      { title: "Web Application Security", lessons: 8, duration: "3h 55m" }
    ],
    videos: [
      { id: 1, title: "Cybersecurity Landscape Overview", duration: "20:15", thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", module: "Cybersecurity Fundamentals" },
      { id: 2, title: "Network Protocols & Security", duration: "32:20", thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", module: "Network Security" },
      { id: 3, title: "Ethical Hacking Methodology", duration: "25:45", thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", module: "Ethical Hacking Basics" },
      { id: 4, title: "Penetration Testing Tools", duration: "28:30", thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", module: "Penetration Testing" }
    ],
    assignments: [
      { id: 1, title: "Security Risk Assessment", description: "Conduct a comprehensive security risk assessment for a small business", dueDate: "2024-02-18", status: "completed", points: 150, module: "Cybersecurity Fundamentals" },
      { id: 2, title: "Network Security Analysis", description: "Analyze network traffic and identify security vulnerabilities", dueDate: "2024-02-23", status: "pending", points: 180, module: "Network Security" },
      { id: 3, title: "Ethical Hacking Lab", description: "Perform authorized penetration testing on a test environment", dueDate: "2024-02-28", status: "not_started", points: 200, module: "Ethical Hacking Basics" },
      { id: 4, title: "Web App Security Audit", description: "Conduct a security audit of a web application", dueDate: "2024-03-05", status: "not_started", points: 220, module: "Web Application Security" }
    ],
    certificate: true,
    level: "Intermediate"
  },
  3: {
    title: "Data Science with Python & R",
    instructor: "Dr. Emily Rodriguez",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "PhD in Statistics from Harvard. Lead Data Scientist at Netflix with expertise in machine learning and statistical modeling.",
    lessons: 52,
    duration: "20h 15m",
    rating: 4.9,
    students: 12350,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Data Science",
    price: 0,
    originalPrice: 4999,
    isFree: true,
    description: "Comprehensive data science course covering Python and R programming, statistical analysis, and machine learning techniques for real-world applications.",
    whatYouLearn: [
      "Master Python and R for data analysis",
      "Perform statistical analysis and hypothesis testing",
      "Create compelling data visualizations",
      "Build predictive models using machine learning",
      "Work with big data tools and frameworks",
      "Conduct A/B testing and experimental design",
      "Deploy data science solutions to production",
      "Communicate insights effectively to stakeholders"
    ],
    requirements: [
      "Basic mathematics and statistics",
      "No prior programming experience required",
      "Curiosity about data and analytics",
      "Computer with at least 8GB RAM"
    ],
    modules: [
      { title: "Python Programming Basics", lessons: 8, duration: "3h 20m" },
      { title: "R Programming & Statistics", lessons: 10, duration: "4h 15m" },
      { title: "Data Manipulation & Cleaning", lessons: 9, duration: "3h 45m" },
      { title: "Data Visualization", lessons: 8, duration: "2h 50m" },
      { title: "Machine Learning with Python", lessons: 12, duration: "4h 30m" },
      { title: "Advanced Analytics & Big Data", lessons: 5, duration: "1h 35m" }
    ],
    videos: [
      { id: 1, title: "Python Fundamentals for Data Science", duration: "24:30", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", module: "Python Programming Basics" },
      { id: 2, title: "Statistical Analysis with R", duration: "30:15", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", module: "R Programming & Statistics" },
      { id: 3, title: "Data Cleaning Best Practices", duration: "22:40", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", module: "Data Manipulation & Cleaning" },
      { id: 4, title: "Creating Effective Data Visualizations", duration: "26:20", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", module: "Data Visualization" }
    ],
    assignments: [
      { id: 1, title: "Python Data Analysis Exercise", description: "Complete data analysis tasks using Python pandas and numpy", dueDate: "2024-02-20", status: "completed", points: 100, module: "Python Programming Basics" },
      { id: 2, title: "Statistical Hypothesis Testing", description: "Perform statistical tests on provided datasets using R", dueDate: "2024-02-25", status: "pending", points: 130, module: "R Programming & Statistics" },
      { id: 3, title: "Data Cleaning Project", description: "Clean and prepare a messy real-world dataset", dueDate: "2024-03-01", status: "not_started", points: 120, module: "Data Manipulation & Cleaning" },
      { id: 4, title: "Data Visualization Portfolio", description: "Create compelling visualizations for different data types", dueDate: "2024-03-05", status: "not_started", points: 140, module: "Data Visualization" }
    ],
    certificate: true,
    level: "Beginner to Intermediate"
  },
  4: {
    title: "Business Strategy & Leadership",
    instructor: "James Wilson MBA",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzU2NDQyMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "Harvard MBA with 25+ years in executive leadership. Former VP at Apple and current business strategy consultant.",
    lessons: 28,
    duration: "14h 20m",
    rating: 4.6,
    students: 6780,
    thumbnail: "https://images.unsplash.com/photo-1518818608552-195ed130cdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NTY0OTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Business",
    price: 0,
    originalPrice: 2999,
    isFree: true,
    description: "Develop essential business strategy and leadership skills to advance your career and drive organizational success.",
    whatYouLearn: [
      "Develop comprehensive business strategies",
      "Master leadership and team management",
      "Understand financial planning and analysis",
      "Learn strategic decision-making frameworks",
      "Build effective communication skills",
      "Manage organizational change successfully",
      "Create sustainable competitive advantages",
      "Lead high-performing teams"
    ],
    requirements: [
      "Basic business knowledge helpful",
      "No formal business education required",
      "Interest in leadership development",
      "Access to real business scenarios preferred"
    ],
    modules: [
      { title: "Strategic Thinking Fundamentals", lessons: 5, duration: "2h 15m" },
      { title: "Leadership Principles", lessons: 7, duration: "3h 30m" },
      { title: "Financial Strategy", lessons: 6, duration: "2h 45m" },
      { title: "Team Management", lessons: 5, duration: "2h 20m" },
      { title: "Change Management", lessons: 5, duration: "3h 30m" }
    ],
    certificate: true,
    level: "Intermediate"
  },
  7: {
    title: "Full-Stack Web Development Bootcamp",
    instructor: "David Martinez",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzU2NDQyMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "Senior Software Engineer at Google with 12+ years building scalable web applications. Expert in React, Node.js, and modern web technologies.",
    lessons: 68,
    duration: "35h 45m",
    rating: 4.8,
    students: 18750,
    thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Web Development",
    price: 0,
    originalPrice: 5999,
    isFree: true,
    description: "Master modern web development from front-end to back-end. Build real-world applications using React, Node.js, and industry best practices.",
    whatYouLearn: [
      "Build responsive websites with HTML, CSS, and JavaScript",
      "Master React and modern front-end development",
      "Create APIs and backends with Node.js and Express",
      "Work with databases (MongoDB, PostgreSQL)",
      "Implement user authentication and authorization",
      "Deploy applications to cloud platforms",
      "Use Git for version control and collaboration",
      "Apply software engineering best practices"
    ],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "Willingness to learn and practice coding",
      "Computer with internet connection"
    ],
    modules: [
      { title: "HTML & CSS Fundamentals", lessons: 12, duration: "6h 20m" },
      { title: "JavaScript Programming", lessons: 15, duration: "8h 15m" },
      { title: "React Development", lessons: 18, duration: "10h 30m" },
      { title: "Backend with Node.js", lessons: 14, duration: "7h 45m" },
      { title: "Database Integration", lessons: 9, duration: "2h 55m" }
    ],
    certificate: true,
    level: "Beginner to Advanced"
  },
  8: {
    title: "React Native Mobile App Development",
    instructor: "Jessica Park",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "Mobile Development Lead at Airbnb. Built 20+ mobile apps with React Native and published numerous apps on App Store and Google Play.",
    lessons: 41,
    duration: "22h 30m",
    rating: 4.7,
    students: 11420,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2OTE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mobile Development",
    price: 4999,
    originalPrice: 7999,
    isFree: false,
    description: "Build professional mobile applications for iOS and Android using React Native. Learn to create cross-platform apps with native performance.",
    whatYouLearn: [
      "Master React Native fundamentals",
      "Build native mobile app components",
      "Implement navigation and routing",
      "Handle device features (camera, GPS, push notifications)",
      "Connect to APIs and manage state",
      "Optimize app performance",
      "Publish apps to App Store and Google Play",
      "Debug and test mobile applications"
    ],
    requirements: [
      "Basic React knowledge helpful",
      "JavaScript programming experience",
      "Mac computer for iOS development (optional)",
      "Android Studio or Xcode installed"
    ],
    modules: [
      { title: "React Native Basics", lessons: 8, duration: "4h 15m" },
      { title: "Components & Styling", lessons: 10, duration: "5h 30m" },
      { title: "Navigation & State", lessons: 9, duration: "4h 45m" },
      { title: "Native Features", lessons: 8, duration: "4h 20m" },
      { title: "Deployment & Testing", lessons: 6, duration: "3h 40m" }
    ],
    certificate: true,
    level: "Intermediate"
  },
  15: {
    title: "Python Programming for Beginners",
    instructor: "Rachel Adams",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    instructorBio: "Python developer with 8+ years experience. Former software engineer at Microsoft and current Python instructor with over 50,000 students taught.",
    lessons: 32,
    duration: "15h 20m",
    rating: 4.8,
    students: 22340,
    thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Programming",
    price: 0,
    originalPrice: 2999,
    isFree: true,
    description: "Learn Python programming from scratch. Perfect for beginners who want to start their programming journey with one of the most popular languages.",
    whatYouLearn: [
      "Master Python syntax and fundamentals",
      "Work with data types, variables, and functions",
      "Understand object-oriented programming",
      "Handle files and data processing",
      "Build simple applications and games",
      "Use Python libraries and modules",
      "Debug and test Python code",
      "Apply problem-solving techniques"
    ],
    requirements: [
      "No programming experience required",
      "Basic computer skills",
      "Python installed on computer",
      "Enthusiasm to learn programming"
    ],
    modules: [
      { title: "Python Basics", lessons: 8, duration: "3h 20m" },
      { title: "Data Types & Variables", lessons: 6, duration: "2h 45m" },
      { title: "Functions & Modules", lessons: 7, duration: "3h 15m" },
      { title: "Object-Oriented Programming", lessons: 6, duration: "3h 30m" },
      { title: "Projects & Applications", lessons: 5, duration: "2h 30m" }
    ],
    certificate: true,
    level: "Beginner"
  }
};

export function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const { language } = useLanguage();
  
  const course = courseDetails[courseId as keyof typeof courseDetails];
  
  if (!course) {
    return (
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-6 hover:bg-purple-50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (course.isFree) {
      setIsEnrolled(true);
    } else {
      setShowPaymentDialog(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="mb-6 hover:bg-purple-50 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Courses
      </Button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Badge className="bg-purple-100 text-purple-700 rounded-lg mb-3">
              {course.category}
            </Badge>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span>({Math.floor(course.students/10)} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Avatar className="w-12 h-12">
                <AvatarImage src={course.instructorImage} alt={course.instructor} />
                <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Preview Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 shadow-lg rounded-2xl">
            <div className="relative">
              <ImageWithFallback
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <PlayCircle className="absolute inset-0 m-auto w-16 h-16 text-white/80 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            <CardContent className="p-6">
              <div className="mb-6">
                {course.isFree ? (
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">FREE</div>
                    {course.originalPrice > 0 && (
                      <div className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">₹{course.price.toLocaleString('en-IN')}</div>
                    {course.originalPrice > course.price && (
                      <div className="text-sm text-gray-500 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</div>
                    )}
                  </div>
                )}
              </div>

              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Enrolled Successfully!</span>
                  </div>
                  <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700">
                    Continue Learning
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleEnroll}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                </Button>
              )}

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Lifetime access</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Certificate of completion</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-gray-500" />
                  <span>Downloadable resources</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg">{getTranslation(language, 'overview')}</TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-lg">{getTranslation(language, 'curriculum')}</TabsTrigger>
          <TabsTrigger value="videos" className="rounded-lg" disabled={!isEnrolled}>
            <Video className="w-4 h-4 mr-1" />
            {getTranslation(language, 'videos')}
          </TabsTrigger>
          <TabsTrigger value="assignments" className="rounded-lg" disabled={!isEnrolled}>
            <FileText className="w-4 h-4 mr-1" />
            {getTranslation(language, 'assignments')}
          </TabsTrigger>
          <TabsTrigger value="instructor" className="rounded-lg">{getTranslation(language, 'instructor')}</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">{getTranslation(language, 'reviews')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Course Level</span>
                  </div>
                  <span className="text-blue-800">{course.level}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <p className="text-gray-600">
                {course.lessons} lessons • {course.duration} total length
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{module.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{module.lessons} lessons</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                    <Progress value={(index + 1) * 15} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor" className="mt-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={course.instructorImage} alt={course.instructor} />
                  <AvatarFallback className="text-xl">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                  <p className="text-lg text-gray-600 mb-4">{course.instructorBio}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">50+</div>
                      <div className="text-sm text-gray-600">Publications</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">15+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">25k+</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">4.8</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">John Doe</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Excellent course! The instructor explains complex concepts in a very understandable way. 
                      The hands-on projects really helped me apply what I learned."
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Alice Smith</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Amazing content and great structure. I was able to build my first project after completing this course. 
                      Highly recommended for beginners!"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        courseTitle={course.title}
        coursePrice={course.price}
        originalPrice={course.originalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}