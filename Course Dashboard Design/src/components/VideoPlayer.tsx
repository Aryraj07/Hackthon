import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  X,
  FileText,
  Download,
  Share,
  Clock,
  Eye,
  CheckCircle,
  Award
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function VideoPlayer({ src, title, onClose, onComplete, isCompleted = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hasWatched90Percent, setHasWatched90Percent] = useState(false);

  // Memoized event handlers to prevent unnecessary re-renders
  const updateTime = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      setCurrentTime(currentTime);
      
      // Check if user has watched 90% of the video to mark as complete
      if (!hasWatched90Percent && duration > 0 && currentTime / duration >= 0.9) {
        setHasWatched90Percent(true);
        if (onComplete && !isCompleted) {
          onComplete();
          toast.success('🎉 Video completed! Great job!', {
            description: 'Your progress has been saved.',
          });
        }
      }
    }
  }, [hasWatched90Percent, onComplete, isCompleted]);

  const updateDuration = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => {
      if (onComplete && !isCompleted) {
        onComplete();
        toast.success('🎉 Video completed! Great job!');
      }
    });

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [updateTime, updateDuration, onComplete, isCompleted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleTimeChange = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video || !Array.isArray(value) || value.length === 0) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video || !Array.isArray(value) || value.length === 0) return;
    
    const newVolume = value[0];
    video.volume = newVolume / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    const container = document.getElementById('video-container');
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const skipTime = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  }, [duration]);

  const changePlaybackSpeed = useCallback((speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    toast.success(`Playback speed set to ${speed}x`);
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Video link copied to clipboard!');
  }, []);

  const handleDownload = useCallback(() => {
    toast.info('Download started... This may take a few minutes.');
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="w-full">
      <Card className="rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-muted border-b">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-semibold text-foreground">{title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isCompleted && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Notes
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <div 
            id="video-container"
            className="w-full aspect-video relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-contain"
              onClick={togglePlay}
            />
            
            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full w-16 h-16"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                {/* Progress Bar */}
                <div className="w-full">
                  <div className="relative">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={1}
                      onValueChange={handleTimeChange}
                      className="w-full"
                    />
                    {/* Progress indicator for completion */}
                    {progressPercentage >= 90 && !hasWatched90Percent && (
                      <div className="absolute -top-8 right-0 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Almost done! 🎉
                      </div>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    <Button variant="ghost" size="sm" onClick={() => skipTime(-10)} className="text-white hover:bg-white/20">
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" onClick={() => skipTime(10)} className="text-white hover:bg-white/20">
                      <SkipForward className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <div className="w-20">
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={100}
                          step={1}
                          onValueChange={handleVolumeChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Playback Speed */}
                    <select 
                      value={playbackSpeed}
                      onChange={(e) => changePlaybackSpeed(Number(e.target.value))}
                      className="bg-black/50 text-white border border-white/30 rounded px-2 py-1 text-sm"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>

                    <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Progress: {progressPercentage.toFixed(1)}% watched
              </div>
              {isCompleted && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {formatTime(duration - currentTime)} remaining
            </div>
          </div>
          
          {progressPercentage >= 90 && !isCompleted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Award className="w-4 h-4" />
                <span className="font-medium">Great progress! You've watched most of this video.</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}