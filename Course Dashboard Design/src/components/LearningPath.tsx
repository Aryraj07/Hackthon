import { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, Lock, ArrowRight, Target, Award, BarChart3, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  completed: boolean;
  currentLesson?: number;
  totalLessons?: number;
  locked: boolean;
  type: 'video' | 'reading' | 'quiz' | 'project';
}

interface LearningPathData {
  courseId: number;
  courseTitle: string;
  instructor: string;
  totalProgress: number;
  timeSpent: string;
  estimatedTimeRemaining: string;
  currentModuleId: number;
  modules: Module[];
  achievements: string[];
  streak: number;
}

const mockLearningPath: LearningPathData = {
  courseId: 1,
  courseTitle: "Complete Web Development Bootcamp",
  instructor: "Dr. Angela Yu",
  totalProgress: 45,
  timeSpent: "32h 15m",
  estimatedTimeRemaining: "38h 30m",
  currentModuleId: 3,
  modules: [
    {
      id: 1,
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML structure and semantic markup",
      duration: "2h 30m",
      lessons: 8,
      completed: true,
      locked: false,
      type: 'video'
    },
    {
      id: 2,
      title: "CSS Styling & Layouts",
      description: "Master CSS properties, flexbox, and grid systems",
      duration: "3h 15m",
      lessons: 12,
      completed: true,
      locked: false,
      type: 'video'
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      description: "Variables, functions, and DOM manipulation",
      duration: "4h 45m",
      lessons: 15,
      completed: false,
      currentLesson: 7,
      totalLessons: 15,
      locked: false,
      type: 'video'
    },
    {
      id: 4,
      title: "React Framework",
      description: "Components, state management, and hooks",
      duration: "6h 30m",
      lessons: 20,
      completed: false,
      locked: false,
      type: 'video'
    },
    {
      id: 5,
      title: "Backend with Node.js",
      description: "Server-side JavaScript and API development",
      duration: "5h 20m",
      lessons: 18,
      completed: false,
      locked: true,
      type: 'video'
    },
    {
      id: 6,
      title: "Final Project",
      description: "Build a full-stack web application",
      duration: "8h 00m",
      lessons: 1,
      completed: false,
      locked: true,
      type: 'project'
    }
  ],
  achievements: ["First Steps", "HTML Master", "CSS Pro"],
  streak: 7
};

interface LearningPathProps {
  onStartLesson: (moduleId: number, lessonId?: number) => void;
  onBack: () => void;
}

export function LearningPath({ onStartLesson, onBack }: LearningPathProps) {
  const [learningPath, setLearningPath] = useState<LearningPathData>(mockLearningPath);
  const { language } = useLanguage();

  const getModuleIcon = (type: string, completed: boolean, locked: boolean) => {
    if (locked) return <Lock className="w-5 h-5 text-muted-foreground" />;
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    
    switch (type) {
      case 'video': return <Play className="w-5 h-5 text-blue-500" />;
      case 'reading': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'quiz': return <BarChart3 className="w-5 h-5 text-orange-500" />;
      case 'project': return <Target className="w-5 h-5 text-red-500" />;
      default: return <Play className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleContinueFromCurrent = () => {
    const currentModule = learningPath.modules.find(m => m.id === learningPath.currentModuleId);
    if (currentModule) {
      onStartLesson(currentModule.id, currentModule.currentLesson);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-accent/50"
          >
            ← {getTranslation(language, 'dashboard')}
          </Button>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {getTranslation(language, 'myLearningPath')}
          </h1>
          <p className="text-muted-foreground">
            Track your progress and continue where you left off
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Learning Path */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Overview */}
          <Card className="shadow-sm border-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{learningPath.courseTitle}</span>
                <Badge variant="secondary" className="bg-white/80">
                  {learningPath.totalProgress}% {getTranslation(language, 'completed')}
                </Badge>
              </CardTitle>
              <CardDescription>
                {getTranslation(language, 'instructor')}: {learningPath.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={learningPath.totalProgress} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {getTranslation(language, 'timeSpent')}: {learningPath.timeSpent}
                  </span>
                  <span className="text-muted-foreground">
                    {getTranslation(language, 'estimatedTime')}: {learningPath.estimatedTimeRemaining}
                  </span>
                </div>
                <Button 
                  onClick={handleContinueFromCurrent}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'continueLearning')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Course Modules</h2>
            
            {learningPath.modules.map((module, index) => (
              <Card 
                key={module.id} 
                className={`border transition-all duration-200 hover:shadow-md ${
                  module.id === learningPath.currentModuleId 
                    ? 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/20' 
                    : 'border-border hover:border-purple-200'
                } ${module.locked ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border">
                        {getModuleIcon(module.type, module.completed, module.locked)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">
                            {index + 1}. {module.title}
                          </h3>
                          {module.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              {getTranslation(language, 'completed')}
                            </Badge>
                          )}
                          {module.id === learningPath.currentModuleId && !module.completed && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              {getTranslation(language, 'inProgress')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.duration}
                          </span>
                          <span>{module.lessons} {getTranslation(language, 'lessons')}</span>
                          {module.currentLesson && (
                            <span>
                              {getTranslation(language, 'progress')}: {module.currentLesson}/{module.totalLessons}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {module.currentLesson && (
                        <div className="text-right mr-4">
                          <Progress 
                            value={(module.currentLesson / (module.totalLessons || 1)) * 100} 
                            className="h-1 w-16"
                          />
                          <span className="text-xs text-muted-foreground">
                            {Math.round((module.currentLesson / (module.totalLessons || 1)) * 100)}%
                          </span>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => onStartLesson(module.id, module.currentLesson)}
                        disabled={module.locked}
                        variant={module.id === learningPath.currentModuleId ? "default" : "outline"}
                        size="sm"
                        className={module.id === learningPath.currentModuleId 
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                          : ""
                        }
                      >
                        {module.completed ? 'Review' : module.currentLesson ? 'Continue' : 'Start'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Progress Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{learningPath.totalProgress}%</span>
              </div>
              <Progress value={learningPath.totalProgress} className="h-2" />
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Modules Completed</span>
                  <span className="font-medium">
                    {learningPath.modules.filter(m => m.completed).length}/{learningPath.modules.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{getTranslation(language, 'learningStreak')}</span>
                  <span className="font-medium flex items-center gap-1">
                    🔥 {learningPath.streak} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{getTranslation(language, 'timeSpent')}</span>
                  <span className="font-medium">{learningPath.timeSpent}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {learningPath.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="justify-center p-2">
                    🏆 {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-sm mb-1">{getTranslation(language, 'currentModule')}</h4>
                <p className="text-sm text-muted-foreground">
                  {learningPath.modules.find(m => m.id === learningPath.currentModuleId)?.title}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-sm mb-1">{getTranslation(language, 'nextModule')}</h4>
                <p className="text-sm text-muted-foreground">
                  {learningPath.modules.find(m => m.id === learningPath.currentModuleId + 1)?.title || 'Course Complete!'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}