import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Subtitles, 
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface VideoPlayerAdvancedProps {
  videoUrl?: string;
  title?: string;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

export function VideoPlayerAdvanced({ 
  videoUrl, 
  title = "Video Player",
  isLoading,
  hasError,
  onRetry
}: VideoPlayerAdvancedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && !isHovering) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, isHovering]);

  // Video event handlers
  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      setIsMuted(newVolume === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    const time = value[0];
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Loading video...</p>
          <p className="text-sm text-gray-300 mt-1">Please wait while we prepare your content</p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-medium mb-2">Uh oh! We couldn't load this video</h3>
          <p className="text-sm text-gray-300 mb-4">
            Please try refreshing the page or selecting another video.
          </p>
          <Button 
            onClick={onRetry}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video bg-black group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlay}
      />

      {/* Overlay Controls */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Center Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 hover:scale-110"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handlePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleMute}
                >
                  {isMuted || volume[0] === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <div className="w-20">
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Display */}
              <span className="text-sm text-white/90 ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Subtitles */}
              <Button
                variant="ghost"
                size="icon"
                className={`text-white hover:bg-white/20 ${showSubtitles ? 'bg-white/20' : ''}`}
                onClick={() => setShowSubtitles(!showSubtitles)}
              >
                <Subtitles className="w-5 h-5" />
              </Button>

              {/* Playback Speed */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 px-3"
                  >
                    {playbackRate}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <DropdownMenuItem
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={playbackRate === rate ? 'bg-accent' : ''}
                    >
                      {rate}x
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quality */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {['1080p', '720p', '480p', '360p'].map((q) => (
                    <DropdownMenuItem
                      key={q}
                      onClick={() => setQuality(q)}
                      className={quality === q ? 'bg-accent' : ''}
                    >
                      {q}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleFullscreen}
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Title Overlay */}
      <div className="absolute top-4 left-4 right-4">
        <h2 className="text-white font-medium text-lg drop-shadow-lg">{title}</h2>
      </div>
    </div>
  );
}