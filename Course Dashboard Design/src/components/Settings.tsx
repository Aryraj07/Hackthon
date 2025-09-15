import { useState, useEffect } from 'react';
import { useTheme, useLanguage } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { getTranslation } from './translations';
import { 
  Monitor, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Eye, 
  Volume2, 
  Zap, 
  Shield, 
  Clock,
  BookOpen,
  Accessibility,
  Download,
  Wifi,
  Battery
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsState {
  // Display Settings
  animations: boolean;
  autoPlayVideos: boolean;
  showThumbnails: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  
  // Learning Settings
  autoSaveNotes: boolean;
  studyReminders: boolean;
  learningPace: 'slow' | 'normal' | 'fast';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyStreakReminders: boolean;
  courseUpdates: boolean;
  
  // Privacy Settings
  shareProgress: boolean;
  anonymousAnalytics: boolean;
  
  // Performance Settings
  videoQuality: 'auto' | 'low' | 'medium' | 'high';
  preloadContent: boolean;
  offlineMode: boolean;
  
  // Audio Settings
  volume: number;
  playbackSpeed: number;
}

const defaultSettings: SettingsState = {
  animations: true,
  autoPlayVideos: true,
  showThumbnails: true,
  reducedMotion: false,
  highContrast: false,
  autoSaveNotes: true,
  studyReminders: true,
  learningPace: 'normal',
  difficultyLevel: 'intermediate',
  emailNotifications: true,
  pushNotifications: true,
  studyStreakReminders: true,
  courseUpdates: true,
  shareProgress: true,
  anonymousAnalytics: true,
  videoQuality: 'auto',
  preloadContent: true,
  offlineMode: false,
  volume: 80,
  playbackSpeed: 1.0,
};

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appSettings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success(getTranslation(language, 'settingUpdated'), {
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} has been updated`,
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('appSettings');
    toast.success(getTranslation(language, 'settingsReset'), {
      description: 'All settings have been reset to default values',
    });
  };

  const exportSettings = () => {
    const data = JSON.stringify({ theme, language, ...settings }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learnhub-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Settings exported successfully');
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            {getTranslation(language, 'settings')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {getTranslation(language, 'customizeExperience')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={resetSettings}>
            Reset All
          </Button>
        </div>
      </div>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Appearance & Display
          </CardTitle>
          <CardDescription>
            Customize how the application looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <ThemeIcon className="w-4 h-4" />
                Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color scheme
              </p>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred language
              </p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="gujarati">ગુજરાતી</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Display Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth animations and transitions
                </p>
              </div>
              <Switch
                checked={settings.animations}
                onCheckedChange={(checked) => updateSetting('animations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-play Videos</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically start playing videos when loaded
                </p>
              </div>
              <Switch
                checked={settings.autoPlayVideos}
                onCheckedChange={(checked) => updateSetting('autoPlayVideos', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Thumbnails</Label>
                <p className="text-sm text-muted-foreground">
                  Display preview thumbnails for videos
                </p>
              </div>
              <Switch
                checked={settings.showThumbnails}
                onCheckedChange={(checked) => updateSetting('showThumbnails', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Learning Preferences
          </CardTitle>
          <CardDescription>
            Customize your learning experience and study habits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Learning Pace */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Learning Pace</Label>
              <p className="text-sm text-muted-foreground">
                How fast do you prefer to learn new concepts?
              </p>
            </div>
            <Select 
              value={settings.learningPace} 
              onValueChange={(value: 'slow' | 'normal' | 'fast') => updateSetting('learningPace', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">
                  <div className="flex items-center gap-2">
                    🐢 Slow
                  </div>
                </SelectItem>
                <SelectItem value="normal">
                  <div className="flex items-center gap-2">
                    🚶 Normal
                  </div>
                </SelectItem>
                <SelectItem value="fast">
                  <div className="flex items-center gap-2">
                    🏃 Fast
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Difficulty Level */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Difficulty Level</Label>
              <p className="text-sm text-muted-foreground">
                Your current skill level for course recommendations
              </p>
            </div>
            <Select 
              value={settings.difficultyLevel} 
              onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => updateSetting('difficultyLevel', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">
                  <Badge variant="secondary">Beginner</Badge>
                </SelectItem>
                <SelectItem value="intermediate">
                  <Badge variant="default">Intermediate</Badge>
                </SelectItem>
                <SelectItem value="advanced">
                  <Badge variant="destructive">Advanced</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Learning Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-save Notes</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your notes as you type
                </p>
              </div>
              <Switch
                checked={settings.autoSaveNotes}
                onCheckedChange={(checked) => updateSetting('autoSaveNotes', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Study Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders to continue your learning journey
                </p>
              </div>
              <Switch
                checked={settings.studyReminders}
                onCheckedChange={(checked) => updateSetting('studyReminders', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio & Video Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-600" />
            Audio & Video
          </CardTitle>
          <CardDescription>
            Control playback and quality settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Default Volume</Label>
              <span className="text-sm text-muted-foreground">{settings.volume}%</span>
            </div>
            <Slider
              value={[settings.volume]}
              onValueChange={([value]) => updateSetting('volume', value)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Playback Speed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Default Playback Speed</Label>
              <span className="text-sm text-muted-foreground">{settings.playbackSpeed}x</span>
            </div>
            <Slider
              value={[settings.playbackSpeed]}
              onValueChange={([value]) => updateSetting('playbackSpeed', value)}
              min={0.5}
              max={2.0}
              step={0.25}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Video Quality */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Video Quality</Label>
              <p className="text-sm text-muted-foreground">
                Choose default video quality for optimal experience
              </p>
            </div>
            <Select 
              value={settings.videoQuality} 
              onValueChange={(value: 'auto' | 'low' | 'medium' | 'high') => updateSetting('videoQuality', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="low">Low (360p)</SelectItem>
                <SelectItem value="medium">Medium (720p)</SelectItem>
                <SelectItem value="high">High (1080p)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-600" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive updates and reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive course updates via email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get instant notifications on your device
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Study Streak Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Daily reminders to maintain your learning streak
              </p>
            </div>
            <Switch
              checked={settings.studyStreakReminders}
              onCheckedChange={(checked) => updateSetting('studyStreakReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Course Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new content is added to your courses
              </p>
            </div>
            <Switch
              checked={settings.courseUpdates}
              onCheckedChange={(checked) => updateSetting('courseUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your data and privacy preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Share Learning Progress</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your course completion and achievements
              </p>
            </div>
            <Switch
              checked={settings.shareProgress}
              onCheckedChange={(checked) => updateSetting('shareProgress', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Anonymous Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the platform with anonymous usage data
              </p>
            </div>
            <Switch
              checked={settings.anonymousAnalytics}
              onCheckedChange={(checked) => updateSetting('anonymousAnalytics', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Performance
          </CardTitle>
          <CardDescription>
            Optimize app performance for your device and connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                Preload Content
              </Label>
              <p className="text-sm text-muted-foreground">
                Download course content in advance for smoother experience
              </p>
            </div>
            <Switch
              checked={settings.preloadContent}
              onCheckedChange={(checked) => updateSetting('preloadContent', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Offline Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable offline access to downloaded content
              </p>
            </div>
            <Switch
              checked={settings.offlineMode}
              onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-purple-600" />
            Accessibility
          </CardTitle>
          <CardDescription>
            Make the app more accessible and comfortable for your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions for sensitivity
              </p>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting('highContrast', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings Export Info */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Settings are automatically saved and synced across your devices when you're signed in.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}