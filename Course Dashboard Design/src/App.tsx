import { Payments } from './components/Payments';
import { CourseMaterials } from './components/CourseMaterials';
import { CourseManagement } from './components/CourseManagement';
import { ProfileSettings } from './components/ProfileSettings';
import { Messages } from './components/Messages';
import { Notifications } from './components/Notifications';
import { Certificates } from './components/Certificates';
import { TestRecords } from './components/TestRecords';
import { RecordedLectures } from './components/RecordedLectures';
import { Login } from './components/Login';
import { SessionTimeout } from './components/SessionTimeout';
import { LearningPath } from './components/LearningPath';
import { NearbyLearningCenters } from './components/NearbyLearningCenters';
import { HelpFeedback } from './components/HelpFeedback';
import { ContextualHelp } from './components/ContextualHelp';
import { Settings } from './components/Settings';
import { CourseDiscovery } from './components/CourseDiscovery';

import { useState, useEffect, createContext, useContext } from 'react';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { ResumeCourseCard } from './components/ResumeCourseCard';
import { CoursesSection } from './components/CoursesSection';
import { Notes } from './components/Notes';
import { Tests } from './components/Tests';
import { CourseDetail } from './components/CourseDetailEnhanced';
import { CoursePlayer } from './components/CoursePlayer';
import { Toaster } from './components/ui/sonner';
import { getTranslation } from './components/translations';
import ErrorBoundary from './components/ErrorBoundary';
import { toast } from 'sonner@2.0.3';

// Theme Context
type Theme = 'light' | 'dark' | 'system';
type Language = 'english' | 'hindi' | 'gujarati';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values instead of throwing error during development
    return {
      language: 'english' as Language,
      setLanguage: () => {}
    };
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [managementCourseId, setManagementCourseId] = useState<number | null>(null);
  const [courseTab, setCourseTab] = useState<string>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail');
    }
    return null;
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'english';
    }
    return 'english';
  });

  const [showHelpCenter, setShowHelpCenter] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Calculate actual theme (resolve 'system' to actual theme)
  const actualTheme: 'light' | 'dark' = theme === 'system' ? getSystemTheme() : theme;

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, actualTheme]);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoggingIn(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo authentication - in real app, this would be an API call
      const validCredentials = [
        { email: 'priya.sharma@example.com', password: 'demo123' },
        { email: 'admin@learnhub.com', password: 'admin123' },
        { email: 'student@example.com', password: 'student123' }
      ];
      
      const isValid = validCredentials.some(
        cred => cred.email === email && cred.password === password
      );
      
      if (isValid) {
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        toast.success('Successfully signed in!', {
          description: `Welcome back, ${email.split('@')[0]}!`,
        });
        return true;
      } else {
        toast.error('Invalid credentials', {
          description: 'Please check your email and password and try again.',
        });
        return false;
      }
    } catch (error) {
      toast.error('Login failed', {
        description: 'Something went wrong. Please try again.',
      });
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setActiveView('dashboard'); // Reset to dashboard on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    toast.success('Successfully signed out', {
      description: 'You have been logged out safely.',
    });
  };

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(getSystemTheme());
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'h':
            event.preventDefault();
            setShowHelpCenter(true);
            break;
          case 'd':
            event.preventDefault();
            setActiveView('dashboard');
            break;
          case 'p':
            event.preventDefault();
            setActiveView('profile');
            break;
          case 'n':
            event.preventDefault();
            setActiveView('notifications');
            break;
          case 'm':
            event.preventDefault();
            setActiveView('messages');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCourseClick = (courseId: number, videoId?: number, tab?: string) => {
    setSelectedCourseId(courseId);
    setSelectedVideoId(videoId || null);
    setCourseTab(tab || 'overview');
    // If videoId is provided, go directly to course player
    if (videoId) {
      setActiveView('course-player');
    } else {
      setActiveView('course-detail');
    }
  };

  const handleBackToDashboard = () => {
    setSelectedCourseId(null);
    setSelectedVideoId(null);
    setManagementCourseId(null);
    setCourseTab('overview');
    setActiveView('dashboard');
  };

  const handleCourseManagement = (courseId: number) => {
    setManagementCourseId(courseId);
    setActiveView('course-management');
  };

  const themeContextValue: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
  };

  const languageContextValue: LanguageContextType = {
    language,
    setLanguage,
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    userEmail,
    login,
    logout,
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <ThemeContext.Provider value={themeContextValue}>
          <LanguageContext.Provider value={languageContextValue}>
            <AuthContext.Provider value={authContextValue}>
              <div className="min-h-screen bg-background transition-colors duration-200">
                <Login onLogin={login} isLoading={isLoggingIn} />
                <Toaster />
              </div>
            </AuthContext.Provider>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={themeContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <AuthContext.Provider value={authContextValue}>
          <div className="min-h-screen bg-background transition-colors duration-200">
          <Navigation 
            activeView={activeView} 
            onViewChange={setActiveView} 
            onLogout={logout}
            userEmail={userEmail || undefined}
          />
      
      <div className="flex">
        {/* Only show sidebar when not in course player */}
        {activeView !== 'course-player' && (
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
        )}
        
        <main className={`flex-1 ${activeView !== 'course-player' ? 'p-8' : ''}`}>
          {activeView === 'dashboard' && (
            <div className="max-w-6xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  {getTranslation(language, 'welcomeBack')}
                </h1>
                <p className="text-muted-foreground">
                  {getTranslation(language, 'learningJourney')}
                </p>
              </div>
              
              {/* Resume Course Card */}
              <ResumeCourseCard 
                onContinueLearning={() => {
                  setActiveView('course-detail');
                  setSelectedCourseId(1);
                }}
                onViewFullPath={() => setActiveView('learning-path')}
              />
              
              {/* Recommended Courses Section */}
              <CoursesSection onCourseClick={handleCourseClick} onCourseManage={handleCourseManagement} />
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-card-foreground">{getTranslation(language, 'learningStreak')}</h3>
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div className="text-2xl font-semibold text-purple-600 mb-1">7 days</div>
                  <p className="text-sm text-muted-foreground">{getTranslation(language, 'keepItUp')}</p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-card-foreground">{getTranslation(language, 'certificatesEarned')}</h3>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="text-2xl font-semibold text-blue-600 mb-1">5</div>
                  <p className="text-sm text-muted-foreground">3 {getTranslation(language, 'moreToUnlock')}</p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-card-foreground">{getTranslation(language, 'studyHours')}</h3>
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-600 mb-1">89h</div>
                  <p className="text-sm text-muted-foreground">+6h {getTranslation(language, 'thisWeek')}</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'notes' && <Notes />}

          {activeView === 'tests' && <Tests />}

          {activeView === 'course-detail' && selectedCourseId && (
            <CourseDetail 
              courseId={selectedCourseId} 
              onBack={handleBackToDashboard}
            />
          )}

          {activeView === 'course-player' && selectedCourseId && (
            <CoursePlayer 
              courseId={selectedCourseId} 
              initialVideoId={selectedVideoId || undefined}
              onBack={handleBackToDashboard}
            />
          )}

          {activeView === 'profile' && <ProfileSettings />}

          {activeView === 'payments' && <Payments />}

          {activeView === 'materials' && <CourseMaterials />}

          {activeView === 'messages' && <Messages />}

          {activeView === 'course-management' && managementCourseId && (
            <CourseManagement 
              courseId={managementCourseId} 
              onBack={handleBackToDashboard}
            />
          )}

          {activeView === 'certificates' && <Certificates />}

          {activeView === 'test-records' && <TestRecords />}

          {activeView === 'notifications' && <Notifications />}

          {activeView === 'lectures' && <RecordedLectures />}

          {activeView === 'learning-path' && (
            <LearningPath 
              onStartLesson={(moduleId, lessonId) => {
                setActiveView('course-detail');
                setSelectedCourseId(1);
              }}
              onBack={handleBackToDashboard}
            />
          )}

          {activeView === 'nearby-centers' && <NearbyLearningCenters />}

          {activeView === 'settings' && <Settings />}

          {activeView === 'course-discovery' && (
            <CourseDiscovery 
              onCourseClick={handleCourseClick}
              onBack={handleBackToDashboard}
            />
          )}

          {!['dashboard', 'notes', 'tests', 'course-detail', 'course-player', 'profile', 'payments', 'certificates', 'test-records', 'materials', 'course-management', 'messages', 'notifications', 'lectures', 'learning-path', 'nearby-centers', 'settings', 'course-discovery'].includes(activeView) && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-card rounded-2xl shadow-sm border p-12 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-semibold text-card-foreground mb-2">
                  {activeView.charAt(0).toUpperCase() + activeView.slice(1).replace('-', ' ')}
                </h2>
                <p className="text-muted-foreground">
                  This section is under development. Stay tuned for updates!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
          
          {/* Help & Feedback - Always accessible */}
          <HelpFeedback 
            currentView={activeView}
            currentContext={{
              courseId: selectedCourseId || undefined,
              videoId: selectedVideoId || undefined,
              tab: courseTab,
              courseName: selectedCourseId ? `Course ${selectedCourseId}` : undefined
            }}
            helpCenterOpen={showHelpCenter}
            onHelpCenterChange={setShowHelpCenter}
          />
          
          {/* Contextual Help Tips */}
          <ContextualHelp currentView={activeView} />
          
          <SessionTimeout />
          <Toaster />
          </div>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}