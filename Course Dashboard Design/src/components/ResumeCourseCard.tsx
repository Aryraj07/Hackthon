import { Play, Clock, BookOpen, ArrowRight, Target, BarChart3, CheckCircle, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../App';
import { getTranslation } from './translations';
import { useEffect, useState } from 'react';

interface ResumeCourseCardProps {
  onContinueLearning: (courseId?: number, videoId?: number, tab?: string) => void;
  onViewFullPath: () => void;
}

export function ResumeCourseCard({ onContinueLearning, onViewFullPath }: ResumeCourseCardProps) {
  const { language } = useLanguage();
  const [userProgress, setUserProgress] = useState({
    percentage: 67,
    completedVideos: 8,
    totalVideos: 12,
    currentModule: 'Neural Networks & Deep Learning',
    timeRemaining: '2h 30m',
    nextVideo: 'Convolutional Neural Networks Implementation'
  });

  // Load actual progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('course_progress_1');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        const completedVideos = progress.completedVideos?.length || 0;
        const totalVideos = 5; // Based on course 1 videos
        const percentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
        
        setUserProgress(prev => ({
          ...prev,
          percentage,
          completedVideos,
          totalVideos,
        }));
      } catch (error) {
        console.log('Error parsing progress:', error);
      }
    }
  }, []);

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 rounded-2xl overflow-hidden mb-8 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium opacity-90">
                  {language ? getTranslation(language, 'continueLearning') : 'Continue Learning'}
                </span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {userProgress.percentage}% {language ? getTranslation(language, 'completed') : 'Completed'}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Machine Learning Fundamentals</h3>
            <p className="text-purple-100 mb-4">
              {language ? getTranslation(language, 'pickUpWhere') : 'Pick up where you left off'} - {userProgress.currentModule}
            </p>
            
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{userProgress.timeRemaining} remaining</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Video {userProgress.completedVideos} of {userProgress.totalVideos}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span className="text-sm">{userProgress.totalVideos - userProgress.completedVideos} videos left</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{language ? getTranslation(language, 'progress') : 'Progress'}</span>
                <span>{userProgress.percentage}%</span>
              </div>
              <Progress value={userProgress.percentage} className="h-2 bg-white/20" />
            </div>

            {/* Next video preview */}
            {userProgress.nextVideo && userProgress.percentage < 100 && (
              <div className="mb-4 p-3 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <Play className="w-3 h-3" />
                  <span className="opacity-90">Next up:</span>
                  <span className="font-medium">{userProgress.nextVideo}</span>
                </div>
              </div>
            )}

            {/* Achievement notification */}
            {userProgress.percentage >= 50 && userProgress.percentage < 100 && (
              <div className="mb-4 p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-3 h-3" />
                  <span>🎉 Great progress! You're halfway through the course!</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => onContinueLearning(1, userProgress.completedVideos + 1, 'videos')}
                className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl flex-1 font-medium"
              >
                <Play className="w-4 h-4 mr-2" />
                {userProgress.percentage === 100 
                  ? 'Review Course' 
                  : language 
                  ? getTranslation(language, 'continueLearning') 
                  : 'Continue Learning'
                }
              </Button>
              <Button 
                onClick={onViewFullPath}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-xl"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {language ? getTranslation(language, 'myLearningPath') : 'My Learning Path'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="ml-8 hidden md:block">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1518818608552-195ed130cdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NTY0OTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Course preview"
                className="w-32 h-32 rounded-xl object-cover"
              />
              {/* Progress overlay */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{userProgress.percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}