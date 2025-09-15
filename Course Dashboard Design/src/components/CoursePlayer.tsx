import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Play, Pause, Volume2, VolumeX, Maximize, Settings, Subtitles, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CourseCurriculum } from './CourseCurriculum';
import { VideoPlayerAdvanced } from './VideoPlayerAdvanced';
import { ContentTabs } from './ContentTabs';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

// Mock course data
const mockCourse = {
  id: 1,
  title: "Complete Machine Learning & AI Bootcamp",
  instructor: "Dr. Sarah Johnson",
  duration: "12 weeks",
  modules: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      videos: [
        { id: 1, title: "What is Machine Learning?", duration: "12:45", completed: true },
        { id: 2, title: "Types of Machine Learning", duration: "15:30", completed: true },
        { id: 3, title: "Setting up Your Environment", duration: "18:20", completed: false }
      ]
    },
    {
      id: 2,
      title: "Neural Networks Fundamentals",
      videos: [
        { id: 4, title: "What is a Neural Network?", duration: "14:15", completed: false },
        { id: 5, title: "Activation Functions", duration: "16:45", completed: false },
        { id: 6, title: "Backpropagation Explained", duration: "22:30", completed: false }
      ]
    },
    {
      id: 3,
      title: "Deep Learning Architectures",
      videos: [
        { id: 7, title: "Convolutional Neural Networks", duration: "20:15", completed: false },
        { id: 8, title: "Recurrent Neural Networks", duration: "18:45", completed: false },
        { id: 9, title: "Transformer Models", duration: "25:30", completed: false }
      ]
    }
  ]
};

const mockVideoContent = {
  1: {
    title: "What is Machine Learning?",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    overview: "In this introductory lesson, we'll explore the fundamental concepts of machine learning, understand what it is, and see how it's used in real-world applications.",
    resources: [
      { name: "Introduction to ML - Slides", type: "PDF", size: "2.5 MB" },
      { name: "Python Setup Guide", type: "PDF", size: "1.2 MB" },
      { name: "Course Notebook", type: "Jupyter", size: "0.8 MB" }
    ]
  },
  2: {
    title: "Types of Machine Learning",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    overview: "Learn about the three main types of machine learning: supervised, unsupervised, and reinforcement learning, with practical examples.",
    resources: [
      { name: "ML Types Comparison", type: "PDF", size: "1.8 MB" },
      { name: "Example Datasets", type: "ZIP", size: "5.2 MB" }
    ]
  },
  3: {
    title: "Setting up Your Environment",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    overview: "Step-by-step guide to setting up your development environment with Python, Jupyter, and essential ML libraries.",
    resources: [
      { name: "Environment Setup Script", type: "Python", size: "0.5 MB" },
      { name: "Requirements.txt", type: "TXT", size: "0.1 MB" }
    ]
  }
};

interface CoursePlayerProps {
  courseId: number;
  initialVideoId?: number;
  onBack: () => void;
}

export function CoursePlayer({ courseId, initialVideoId = 1, onBack }: CoursePlayerProps) {
  const { language } = useLanguage();
  const [currentVideoId, setCurrentVideoId] = useState(initialVideoId);
  const [completedVideos, setCompletedVideos] = useState<Set<number>>(new Set([1, 2]));
  const [autoplay, setAutoplay] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});

  const currentVideo = mockVideoContent[currentVideoId as keyof typeof mockVideoContent];
  const course = mockCourse;

  // Get current video info from curriculum
  const getCurrentVideoInfo = () => {
    for (const module of course.modules) {
      const video = module.videos.find(v => v.id === currentVideoId);
      if (video) return { ...video, moduleTitle: module.title };
    }
    return null;
  };

  const currentVideoInfo = getCurrentVideoInfo();

  // Handle video selection from curriculum
  const handleVideoSelect = (videoId: number) => {
    setCurrentVideoId(videoId);
    setIsVideoLoading(true);
    setVideoError(false);
    setActiveTab('overview');
  };

  // Handle video completion
  const handleMarkComplete = () => {
    if (currentVideoInfo && !completedVideos.has(currentVideoId)) {
      setCompletedVideos(prev => new Set([...prev, currentVideoId]));
      
      // Auto-advance to next video if autoplay is enabled
      if (autoplay) {
        const nextVideo = getNextVideo();
        if (nextVideo) {
          setTimeout(() => {
            setCurrentVideoId(nextVideo.id);
          }, 1000);
        }
      }
    }
  };

  // Get next video in sequence
  const getNextVideo = () => {
    for (const module of course.modules) {
      const currentIndex = module.videos.findIndex(v => v.id === currentVideoId);
      if (currentIndex !== -1) {
        // Next video in same module
        if (currentIndex < module.videos.length - 1) {
          return module.videos[currentIndex + 1];
        }
        // First video of next module
        const moduleIndex = course.modules.findIndex(m => m.id === module.id);
        if (moduleIndex < course.modules.length - 1) {
          return course.modules[moduleIndex + 1].videos[0];
        }
      }
    }
    return null;
  };

  // Simulate video loading
  useEffect(() => {
    setIsVideoLoading(true);
    setVideoError(false);
    
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
      // Simulate occasional loading errors for demo
      if (Math.random() < 0.1) {
        setVideoError(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentVideoId]);

  const handleRetryVideo = () => {
    setVideoError(false);
    setIsVideoLoading(true);
    setTimeout(() => {
      setIsVideoLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-card-foreground">{course.title}</h1>
            <p className="text-sm text-muted-foreground">
              {currentVideoInfo?.moduleTitle} • {currentVideoInfo?.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Autoplay</span>
            <Switch
              checked={autoplay}
              onCheckedChange={setAutoplay}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Course Curriculum Sidebar */}
        <div className="w-80 border-r bg-card">
          <CourseCurriculum
            course={course}
            currentVideoId={currentVideoId}
            completedVideos={completedVideos}
            onVideoSelect={handleVideoSelect}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Video Player Section */}
          <div className="bg-black">
            <VideoPlayerAdvanced
              videoUrl={currentVideo?.videoUrl}
              title={currentVideo?.title}
              isLoading={isVideoLoading}
              hasError={videoError}
              onRetry={handleRetryVideo}
            />
          </div>

          {/* Controls Bar */}
          <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleMarkComplete}
                  disabled={completedVideos.has(currentVideoId)}
                  variant={completedVideos.has(currentVideoId) ? "secondary" : "default"}
                  className="gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedVideos.has(currentVideoId) ? 'Completed' : 'Mark as Complete'}
                </Button>
                
                {completedVideos.has(currentVideoId) && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Completed
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{currentVideoInfo?.duration}</span>
                <span>•</span>
                <span>
                  {completedVideos.size} of {course.modules.reduce((acc, m) => acc + m.videos.length, 0)} videos completed
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Course Progress</span>
                <span>
                  {Math.round((completedVideos.size / course.modules.reduce((acc, m) => acc + m.videos.length, 0)) * 100)}%
                </span>
              </div>
              <Progress 
                value={(completedVideos.size / course.modules.reduce((acc, m) => acc + m.videos.length, 0)) * 100} 
                className="h-2"
              />
            </div>
          </div>

          {/* Content Tabs */}
          <div className="p-6">
            <ContentTabs
              currentVideo={currentVideo}
              videoId={currentVideoId}
              userNotes={userNotes}
              onNotesChange={(notes) => setUserNotes(prev => ({ ...prev, [currentVideoId]: notes }))}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}