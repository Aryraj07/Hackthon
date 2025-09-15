import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Star, Users, Clock, BookOpen, PlayCircle, CheckCircle, Shield, Award, Globe, Download, Video, FileText, Calendar, Eye, ChevronRight, BarChart3, Target, Lock, Plus, MessageCircle, Code, Edit3, Upload, CreditCard } from 'lucide-react';
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
  initialVideoId?: number;
  initialTab?: string;
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
      // Introduction to Machine Learning Module
      { 
        id: 1, 
        title: "Introduction to Machine Learning Concepts", 
        duration: "15:30", 
        thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
        module: "Introduction to Machine Learning",
        price: 199,
        isFree: true 
      },
      { 
        id: 2, 
        title: "Types of Machine Learning - Supervised, Unsupervised, Reinforcement", 
        duration: "18:45", 
        thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
        module: "Introduction to Machine Learning",
        price: 299,
        isFree: false 
      },
      { 
        id: 3, 
        title: "Real-world Applications of Machine Learning", 
        duration: "12:20", 
        thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", 
        module: "Introduction to Machine Learning",
        price: 399,
        isFree: false 
      },

      // Python for Data Science Module
      { 
        id: 4, 
        title: "Setting up Python Environment for ML", 
        duration: "22:45", 
        thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", 
        module: "Python for Data Science",
        price: 499,
        isFree: false 
      },
      { 
        id: 5, 
        title: "Python Libraries: NumPy, Pandas, Matplotlib", 
        duration: "25:30", 
        thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", 
        module: "Python for Data Science",
        price: 599,
        isFree: false 
      },
      { 
        id: 6, 
        title: "Working with Jupyter Notebooks", 
        duration: "16:15", 
        thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", 
        module: "Python for Data Science",
        price: 399,
        isFree: false 
      }
    ],
    assignments: [
      // Introduction to Machine Learning assignments
      { 
        id: 1, 
        title: "Basic ML Concepts Quiz", 
        description: "Test your understanding of fundamental machine learning concepts",
        type: "quiz",
        questions: 15,
        timeLimit: "30 minutes",
        dueDate: "2024-02-15", 
        status: "completed", 
        points: 100, 
        module: "Introduction to Machine Learning",
        difficulty: "Beginner",
        resources: ["Video 1", "Video 2", "Reading Materials"]
      },
      { 
        id: 2, 
        title: "ML Applications Research Project", 
        description: "Research and present 3 real-world machine learning applications with detailed analysis",
        type: "project",
        submissionType: "document",
        maxFileSize: "10MB",
        dueDate: "2024-02-18", 
        status: "not_started", 
        points: 150, 
        module: "Introduction to Machine Learning",
        difficulty: "Intermediate",
        resources: ["Video 3", "Industry Case Studies", "Research Papers"]
      },
      { 
        id: 3, 
        title: "ML Terminology Discussion", 
        description: "Participate in forum discussion about machine learning terminology and concepts",
        type: "discussion",
        minPosts: 3,
        dueDate: "2024-02-20", 
        status: "in_progress", 
        points: 75, 
        module: "Introduction to Machine Learning",
        difficulty: "Beginner",
        resources: ["Course Glossary", "Community Forum"]
      },
      
      // Python for Data Science assignments
      { 
        id: 4, 
        title: "Python Data Analysis Project", 
        description: "Create a complete data analysis pipeline using Python pandas and numpy",
        type: "coding",
        language: "Python",
        submissionType: "code",
        dueDate: "2024-02-25", 
        status: "submitted", 
        points: 200, 
        module: "Python for Data Science",
        difficulty: "Intermediate",
        resources: ["Video 4", "Video 5", "Python Documentation", "Sample Datasets"]
      },
      { 
        id: 5, 
        title: "Jupyter Notebook Practical", 
        description: "Complete hands-on exercises in Jupyter Notebook environment",
        type: "practical",
        submissionType: "notebook",
        dueDate: "2024-02-28", 
        status: "pending", 
        points: 120, 
        module: "Python for Data Science",
        difficulty: "Beginner",
        resources: ["Video 6", "Jupyter Tutorial", "Practice Exercises"]
      },
      { 
        id: 6, 
        title: "Data Visualization Challenge", 
        description: "Create compelling visualizations using matplotlib and seaborn",
        type: "challenge",
        submissionType: "code",
        dueDate: "2024-03-05", 
        status: "not_started", 
        points: 180, 
        module: "Python for Data Science",
        difficulty: "Advanced",
        resources: ["Visualization Libraries", "Best Practices Guide", "Sample Datasets"]
      }
    ],
    certificate: true,
    level: "Beginner to Advanced"
  },
  // Add other courses with videos and assignments...
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
      "Build predictive models using machine learning"
    ],
    requirements: [
      "Basic mathematics and statistics",
      "No prior programming experience required",
      "Curiosity about data and analytics"
    ],
    modules: [
      { title: "Python Programming Basics", lessons: 8, duration: "3h 20m" },
      { title: "R Programming & Statistics", lessons: 10, duration: "4h 15m" },
      { title: "Data Manipulation & Cleaning", lessons: 9, duration: "3h 45m" },
      { title: "Data Visualization", lessons: 8, duration: "2h 50m" }
    ],
    videos: [
      { id: 1, title: "Python Fundamentals for Data Science", duration: "24:30", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", module: "Python Programming Basics", price: 0, isFree: true },
      { id: 2, title: "Statistical Analysis with R", duration: "30:15", thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", module: "R Programming & Statistics", price: 0, isFree: true }
    ],
    assignments: [
      { id: 1, title: "Python Data Analysis Exercise", description: "Complete data analysis tasks using Python pandas and numpy", type: "coding", dueDate: "2024-02-20", status: "completed", points: 100, module: "Python Programming Basics", difficulty: "Beginner" },
      { id: 2, title: "Statistical Hypothesis Testing", description: "Perform statistical tests on provided datasets using R", type: "practical", dueDate: "2024-02-25", status: "pending", points: 130, module: "R Programming & Statistics", difficulty: "Intermediate" }
    ],
    certificate: true,
    level: "Beginner to Intermediate"
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'not_started': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function CourseDetail({ courseId, onBack, initialVideoId, initialTab }: CourseDetailProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showVideoPaymentDialog, setShowVideoPaymentDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [videoEnrollments, setVideoEnrollments] = useState<Set<number>>(new Set());
  const [userProgress, setUserProgress] = useState<{[key: string]: any}>({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set());
  const [enrollmentStep, setEnrollmentStep] = useState<'initial' | 'processing' | 'success' | 'error'>('initial');
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<{[key: number]: any}>({});
  const { language } = useLanguage();
  
  const course = courseDetails[courseId as keyof typeof courseDetails];

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_progress_${courseId}`);
    const savedCompleted = localStorage.getItem(`completed_videos_${courseId}`);
    const savedEnrollment = localStorage.getItem(`enrolled_${courseId}`);
    const savedVideoEnrollments = localStorage.getItem(`video_enrollments_${courseId}`);
    const savedAssignmentSubmissions = localStorage.getItem(`assignment_submissions_${courseId}`);
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    if (savedCompleted) {
      setCompletedVideos(new Set(JSON.parse(savedCompleted)));
    }
    if (savedEnrollment) {
      setIsEnrolled(true);
    }
    if (savedVideoEnrollments) {
      setVideoEnrollments(new Set(JSON.parse(savedVideoEnrollments)));
    }
    if (savedAssignmentSubmissions) {
      setAssignmentSubmissions(JSON.parse(savedAssignmentSubmissions));
    }
  }, [courseId]);

  // Calculate learning progress
  const learningProgress = useMemo(() => {
    if (!course?.videos) return { percentage: 0, completedCount: 0, totalCount: 0 };
    
    const completedCount = completedVideos.size;
    const totalCount = course.videos.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    return { percentage, completedCount, totalCount };
  }, [course?.videos, completedVideos]);

  // Get next video to watch
  const getNextVideo = useCallback(() => {
    if (!course?.videos) return null;
    
    // Find first unwatched video
    const nextVideo = course.videos.find(video => !completedVideos.has(video.id));
    return nextVideo || course.videos[0]; // Return first video if all completed
  }, [course?.videos, completedVideos]);

  // Check if user has access to video
  const hasVideoAccess = useCallback((video: any) => {
    return isEnrolled || video.isFree || videoEnrollments.has(video.id);
  }, [isEnrolled, videoEnrollments]);

  // Handle video enrollment
  const handleVideoEnroll = useCallback(async (video: any) => {
    if (video.isFree) {
      const newVideoEnrollments = new Set(videoEnrollments).add(video.id);
      setVideoEnrollments(newVideoEnrollments);
      localStorage.setItem(`video_enrollments_${courseId}`, JSON.stringify([...newVideoEnrollments]));
      return;
    }
    
    setSelectedVideo(video);
    setShowVideoPaymentDialog(true);
  }, [videoEnrollments, courseId]);

  // Handle video payment success
  const handleVideoPaymentSuccess = useCallback(() => {
    if (selectedVideo) {
      const newVideoEnrollments = new Set(videoEnrollments).add(selectedVideo.id);
      setVideoEnrollments(newVideoEnrollments);
      localStorage.setItem(`video_enrollments_${courseId}`, JSON.stringify([...newVideoEnrollments]));
      setShowVideoPaymentDialog(false);
    }
  }, [selectedVideo, videoEnrollments, courseId]);

  // Handle video completion
  const handleVideoComplete = useCallback((videoId: number) => {
    const newCompletedVideos = new Set(completedVideos).add(videoId);
    setCompletedVideos(newCompletedVideos);
    localStorage.setItem(`completed_videos_${courseId}`, JSON.stringify([...newCompletedVideos]));
    
    // Update progress
    const newProgress = {
      ...userProgress,
      lastWatchedVideo: videoId,
      lastActivity: new Date().toISOString(),
      completedVideos: [...newCompletedVideos]
    };
    setUserProgress(newProgress);
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(newProgress));
  }, [completedVideos, courseId, userProgress]);

  // Enhanced enrollment logic
  const handleEnroll = useCallback(async () => {
    if (enrollmentStep === 'processing' || !course) return;
    
    setEnrollmentStep('processing');
    
    try {
      if (course.isFree) {
        // Simulate API call for free enrollment
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsEnrolled(true);
        setEnrollmentStep('success');
        localStorage.setItem(`enrolled_${courseId}`, 'true');
        localStorage.setItem(`enrollment_date_${courseId}`, new Date().toISOString());
        
        // Initialize progress
        const initialProgress = {
          enrolledDate: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          completedVideos: [],
          currentVideoIndex: 0
        };
        setUserProgress(initialProgress);
        localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(initialProgress));
        
      } else {
        setShowPaymentDialog(true);
        setEnrollmentStep('initial');
      }
    } catch (error) {
      setEnrollmentStep('error');
      setTimeout(() => setEnrollmentStep('initial'), 3000);
    }
  }, [course?.isFree, courseId, enrollmentStep]);

  const handlePaymentSuccess = useCallback(() => {
    setIsEnrolled(true);
    setEnrollmentStep('success');
    setShowPaymentDialog(false);
    localStorage.setItem(`enrolled_${courseId}`, 'true');
    localStorage.setItem(`enrollment_date_${courseId}`, new Date().toISOString());
    
    // Initialize progress
    const initialProgress = {
      enrolledDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      completedVideos: [],
      currentVideoIndex: 0
    };
    setUserProgress(initialProgress);
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(initialProgress));
  }, [courseId]);

  // Continue learning logic
  const handleContinueLearning = useCallback(() => {
    const nextVideo = getNextVideo();
    if (nextVideo) {
      setSelectedVideo(nextVideo);
      setSelectedTab('videos');
    } else {
      // If all videos completed, go to assignments
      setSelectedTab('assignments');
    }
  }, [getNextVideo]);

  // Group videos by module for better organization
  const videosByModule = useMemo(() => {
    if (!course?.videos) return {};
    
    return course.videos.reduce((acc, video) => {
      if (!acc[video.module]) {
        acc[video.module] = [];
      }
      acc[video.module].push(video);
      return acc;
    }, {} as { [key: string]: any[] });
  }, [course?.videos]);

  // Group assignments by module
  const assignmentsByModule = useMemo(() => {
    if (!course?.assignments) return {};
    
    return course.assignments.reduce((acc, assignment) => {
      if (!acc[assignment.module]) {
        acc[assignment.module] = [];
      }
      acc[assignment.module].push(assignment);
      return acc;
    }, {} as { [key: string]: any[] });
  }, [course?.assignments]);

  // Get assignment type icon
  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'project': return <FileText className="w-4 h-4" />;
      case 'coding': return <Code className="w-4 h-4" />;
      case 'discussion': return <MessageCircle className="w-4 h-4" />;
      case 'practical': return <Edit3 className="w-4 h-4" />;
      case 'challenge': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle assignment action
  const handleAssignmentAction = useCallback((assignment: any, action: string) => {
    if (!isEnrolled) return;
    
    setSelectedAssignment(assignment);
    
    // Different actions based on assignment type and status
    if (action === 'start' && assignment.status === 'not_started') {
      // Simulate starting assignment
      const updatedSubmissions = {
        ...assignmentSubmissions,
        [assignment.id]: {
          status: 'in_progress',
          startedAt: new Date().toISOString()
        }
      };
      setAssignmentSubmissions(updatedSubmissions);
      localStorage.setItem(`assignment_submissions_${courseId}`, JSON.stringify(updatedSubmissions));
    }
  }, [isEnrolled, assignmentSubmissions, courseId]);

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
        <div className="bg-card rounded-2xl shadow-sm border p-12 text-center">
          <h2 className="text-2xl font-semibold text-card-foreground mb-2">Course Not Found</h2>
          <p className="text-muted-foreground">The requested course could not be found.</p>
        </div>
      </div>
    );
  }
  
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
            <h1 className="text-3xl font-semibold text-foreground mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
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

            {/* Learning Progress for enrolled students */}
            {isEnrolled && (
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Your Learning Progress</span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">{learningProgress.percentage}% Complete</span>
                  </div>
                  <Progress value={learningProgress.percentage} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>{learningProgress.completedCount} of {learningProgress.totalCount} videos completed</span>
                    <span>{learningProgress.totalCount - learningProgress.completedCount} remaining</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={course.instructorImage} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Meet Your Instructor</h3>
                    <p className="font-medium text-purple-600 mb-2">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="p-6">
              <ImageWithFallback 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              
              {/* Pricing */}
              <div className="mb-4">
                {course.isFree ? (
                  <div className="text-3xl font-bold text-green-600">FREE</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-foreground">₹{course.price.toLocaleString('en-IN')}</span>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Enrollment Buttons */}
              {!isEnrolled ? (
                <Button 
                  onClick={handleEnroll}
                  disabled={enrollmentStep === 'processing'}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {enrollmentStep === 'processing' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {course.isFree ? 'Enrolling...' : 'Processing...'}
                    </div>
                  ) : (
                    course.isFree ? 'Enroll for Free' : 'Enroll Now'
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={handleContinueLearning}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <div className="text-center text-sm text-green-600 font-medium">
                    ✓ Enrolled Successfully
                  </div>
                </div>
              )}

              {/* Course Features */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Video className="w-4 h-4 text-purple-500" />
                  <span>{course.lessons} video lessons</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>{course.duration} total duration</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Download className="w-4 h-4 text-purple-500" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>Lifetime access</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Certificate of completion</span>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <h4 className="font-medium">{module.title}</h4>
                      <p className="text-sm text-muted-foreground">{module.lessons} lessons</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{module.duration}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {selectedVideo ? (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <VideoPlayer 
                    video={selectedVideo}
                    onVideoComplete={handleVideoComplete}
                    isEnrolled={hasVideoAccess(selectedVideo)}
                  />
                </CardContent>
              </Card>
              
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Video List
                </Button>
                
                <div className="flex items-center gap-2">
                  {completedVideos.has(selectedVideo.id) && (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                  {hasVideoAccess(selectedVideo) && (
                    <Badge className="bg-blue-100 text-blue-700">
                      <Eye className="w-3 h-3 mr-1" />
                      Access Granted
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(videosByModule).map(([moduleName, videos]) => (
                <Card key={moduleName}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {moduleName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {videos.map((video) => (
                        <div
                          key={video.id}
                          className="flex items-center gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/50"
                        >
                          <div className="relative">
                            <ImageWithFallback 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-20 h-14 object-cover rounded-lg"
                            />
                            {completedVideos.has(video.id) ? (
                              <CheckCircle className="absolute -top-2 -right-2 w-5 h-5 text-green-500 bg-white rounded-full" />
                            ) : hasVideoAccess(video) ? (
                              <PlayCircle className="absolute inset-0 m-auto w-6 h-6 text-white opacity-80" />
                            ) : (
                              <Lock className="absolute inset-0 m-auto w-6 h-6 text-white opacity-80" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{video.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {video.duration}
                              </span>
                              {!video.isFree && (
                                <span className="flex items-center gap-1">
                                  <CreditCard className="w-3 h-3" />
                                  ₹{video.price}
                                </span>
                              )}
                              {video.isFree && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  FREE
                                </Badge>
                              )}
                            </div>
                            {completedVideos.has(video.id) && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {hasVideoAccess(video) ? (
                              <Button 
                                size="sm"
                                onClick={() => setSelectedVideo(video)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Watch Now
                              </Button>
                            ) : isEnrolled ? (
                              <div className="text-center text-sm text-green-600 font-medium">
                                ✓ Included in Course
                              </div>
                            ) : video.isFree ? (
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleVideoEnroll(video)}
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Watch Free
                              </Button>
                            ) : (
                              <Button 
                                size="sm"
                                onClick={() => handleVideoEnroll(video)}
                                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Buy ₹{video.price}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {course.assignments && course.assignments.length > 0 ? (
            <div className="space-y-6">
              {/* Module Filter */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-sm">Filter by Module:</span>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant={selectedModule === '' ? 'default' : 'outline'}
                        onClick={() => setSelectedModule('')}
                        className="rounded-full"
                      >
                        All Modules
                      </Button>
                      {Object.keys(assignmentsByModule).map((module) => (
                        <Button 
                          key={module}
                          size="sm" 
                          variant={selectedModule === module ? 'default' : 'outline'}
                          onClick={() => setSelectedModule(module)}
                          className="rounded-full"
                        >
                          {module}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assignments by Module */}
              {Object.entries(assignmentsByModule).map(([moduleName, assignments]) => {
                if (selectedModule && selectedModule !== moduleName) return null;
                
                return (
                  <Card key={moduleName}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {moduleName} Assignments
                        <Badge variant="secondary" className="ml-2">
                          {assignments.length} {assignments.length === 1 ? 'Assignment' : 'Assignments'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assignments.map((assignment) => (
                          <div key={assignment.id} className="border rounded-xl p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {getAssignmentTypeIcon(assignment.type)}
                                  <h3 className="font-semibold">{assignment.title}</h3>
                                  <Badge className={getDifficultyColor(assignment.difficulty)}>
                                    {assignment.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                                
                                {/* Assignment Details */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Due: {assignment.dueDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    <span>{assignment.points} points</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{assignment.timeLimit || assignment.type}</span>
                                  </div>
                                  {assignment.questions && (
                                    <div className="flex items-center gap-1">
                                      <FileText className="w-4 h-4" />
                                      <span>{assignment.questions} questions</span>
                                    </div>
                                  )}
                                </div>

                                {/* Assignment Resources */}
                                {assignment.resources && assignment.resources.length > 0 && (
                                  <div className="mb-3">
                                    <span className="text-sm font-medium text-muted-foreground">Resources: </span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {assignment.resources.map((resource, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {resource}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <Badge className={getStatusColor(assignment.status)}>
                                {assignment.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            {/* Assignment Actions */}
                            {isEnrolled ? (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleAssignmentAction(assignment, 'view')}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                
                                {assignment.status === 'not_started' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleAssignmentAction(assignment, 'start')}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                                  >
                                    {getAssignmentTypeIcon(assignment.type)}
                                    <span className="ml-2">Start {assignment.type === 'quiz' ? 'Quiz' : assignment.type === 'coding' ? 'Coding' : 'Assignment'}</span>
                                  </Button>
                                )}
                                
                                {assignment.status === 'in_progress' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleAssignmentAction(assignment, 'continue')}
                                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Continue Working
                                  </Button>
                                )}
                                
                                {assignment.status === 'completed' && (
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAssignmentAction(assignment, 'review')}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Review Submission
                                  </Button>
                                )}
                                
                                {assignment.submissionType && ['document', 'code', 'notebook'].includes(assignment.submissionType) && (
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAssignmentAction(assignment, 'upload')}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload {assignment.submissionType === 'document' ? 'File' : assignment.submissionType === 'code' ? 'Code' : 'Notebook'}
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                <Shield className="w-4 h-4" />
                                <span>Enroll in the course to access assignments and submit your work</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Assignments Yet</h3>
                <p className="text-muted-foreground">Assignments will be added as the course progresses.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground">Be the first to review this course!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      {showPaymentDialog && course && (
        <PaymentDialog
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          courseTitle={course.title}
          price={course.price}
          originalPrice={course.originalPrice}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Video Payment Dialog */}
      {showVideoPaymentDialog && selectedVideo && (
        <PaymentDialog
          isOpen={showVideoPaymentDialog}
          onClose={() => setShowVideoPaymentDialog(false)}
          courseTitle={selectedVideo.title}
          price={selectedVideo.price}
          originalPrice={selectedVideo.price}
          onSuccess={handleVideoPaymentSuccess}
        />
      )}
    </div>
  );
}