import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ScrollArea } from './ui/scroll-area';

interface Video {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  videos: Video[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  modules: Module[];
}

interface CourseCurriculumProps {
  course: Course;
  currentVideoId: number;
  completedVideos: Set<number>;
  onVideoSelect: (videoId: number) => void;
}

export function CourseCurriculum({ 
  course, 
  currentVideoId, 
  completedVideos, 
  onVideoSelect 
}: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    // Initially expand the module containing the current video
    new Set(course.modules.filter(module => 
      module.videos.some(video => video.id === currentVideoId)
    ).map(module => module.id))
  );

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getModuleProgress = (module: Module) => {
    const completedCount = module.videos.filter(video => completedVideos.has(video.id)).length;
    return {
      completed: completedCount,
      total: module.videos.length,
      percentage: Math.round((completedCount / module.videos.length) * 100)
    };
  };

  const getTotalDuration = (videos: Video[]) => {
    // Simple calculation - in real app, you'd parse and sum durations
    return `${videos.length * 15}m`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-card-foreground mb-1">Course Content</h2>
        <p className="text-sm text-muted-foreground">
          {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.videos.length, 0)} lectures
        </p>
      </div>

      {/* Curriculum List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {course.modules.map((module) => {
            const progress = getModuleProgress(module);
            const isExpanded = expandedModules.has(module.id);
            
            return (
              <Collapsible
                key={module.id}
                open={isExpanded}
                onOpenChange={() => toggleModule(module.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-accent/50 rounded-lg mb-1"
                  >
                    <div className="flex items-start gap-3 flex-1 text-left">
                      <div className="mt-0.5">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm text-card-foreground truncate">
                            {module.title}
                          </h3>
                          {progress.completed === progress.total && (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{progress.completed}/{progress.total} lessons</span>
                          <span>•</span>
                          <span>{getTotalDuration(module.videos)}</span>
                          {progress.percentage > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">{progress.percentage}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="ml-4 border-l border-border pl-3 pb-2">
                  <div className="space-y-1">
                    {module.videos.map((video) => {
                      const isCurrentVideo = video.id === currentVideoId;
                      const isCompleted = completedVideos.has(video.id);
                      
                      return (
                        <Button
                          key={video.id}
                          variant={isCurrentVideo ? "secondary" : "ghost"}
                          className={`w-full justify-start p-3 h-auto rounded-lg transition-all ${
                            isCurrentVideo 
                              ? 'bg-primary/10 border border-primary/20 shadow-sm' 
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => onVideoSelect(video.id)}
                        >
                          <div className="flex items-start gap-3 flex-1 text-left">
                            <div className="mt-0.5 flex-shrink-0">
                              {isCurrentVideo ? (
                                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                  <Play className="w-2 h-2 text-primary-foreground fill-current" />
                                </div>
                              ) : isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Play className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`text-sm truncate ${
                                  isCurrentVideo 
                                    ? 'font-medium text-primary' 
                                    : 'font-normal text-card-foreground'
                                }`}>
                                  {video.title}
                                </h4>
                                {isCurrentVideo && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    Now Playing
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{video.duration}</span>
                                {isCompleted && (
                                  <>
                                    <span>•</span>
                                    <span className="text-green-600">Completed</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="p-4 border-t bg-muted/30">
        <div className="text-center">
          <div className="text-sm font-medium text-card-foreground mb-1">
            Overall Progress
          </div>
          <div className="text-xs text-muted-foreground">
            {completedVideos.size} of {course.modules.reduce((acc, m) => acc + m.videos.length, 0)} lessons completed
          </div>
          <div className="mt-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(completedVideos.size / course.modules.reduce((acc, m) => acc + m.videos.length, 0)) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}