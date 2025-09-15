import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '../App';

interface ContextualHelpProps {
  currentView: string;
}

interface HelpTip {
  id: string;
  title: string;
  content: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ContextualHelp({ currentView }: ContextualHelpProps) {
  const { language } = useLanguage();
  const [showTip, setShowTip] = useState(false);
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const helpTips: Record<string, HelpTip> = {
    dashboard: {
      id: 'dashboard-tip',
      title: 'Welcome to your Dashboard!',
      content: 'Here you can see your learning progress, resume courses, and discover new content. Click on any course card to start learning.',
    },
    'course-detail': {
      id: 'course-detail-tip',
      title: 'Course Navigation',
      content: 'Use the tabs above to switch between Overview, Videos, and Assignments. Your progress is automatically saved as you complete each section.',
    },
    profile: {
      id: 'profile-tip',
      title: 'Profile Settings',
      content: 'Keep your profile updated for a personalized learning experience. You can change your name, preferences, and security settings here.',
    },
    payments: {
      id: 'payments-tip',
      title: 'Payment Management',
      content: 'Track your course purchases and payment history. UPI payments are instantly processed for immediate course access.',
    },
    notes: {
      id: 'notes-tip',
      title: 'Study Notes',
      content: 'Organize your learning with personal notes. You can create, edit, and categorize notes by subject or course.',
    },
    tests: {
      id: 'tests-tip',
      title: 'Tests & Assessments',
      content: 'Track your quiz scores and test performance. Regular practice helps reinforce your learning.',
    }
  };

  const currentTip = helpTips[currentView];

  useEffect(() => {
    if (currentTip && !dismissedTips.includes(currentTip.id)) {
      const timer = setTimeout(() => {
        setShowTip(true);
      }, 2000); // Show tip after 2 seconds on new screen

      return () => clearTimeout(timer);
    }
  }, [currentView, currentTip, dismissedTips]);

  const handleDismiss = () => {
    if (currentTip) {
      setDismissedTips(prev => [...prev, currentTip.id]);
      setShowTip(false);
    }
  };

  const handleDismissForever = () => {
    if (currentTip) {
      const newDismissed = [...dismissedTips, currentTip.id];
      setDismissedTips(newDismissed);
      localStorage.setItem('dismissedHelpTips', JSON.stringify(newDismissed));
      setShowTip(false);
    }
  };

  // Load dismissed tips from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dismissedHelpTips');
    if (saved) {
      try {
        setDismissedTips(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse dismissed tips:', error);
      }
    }
  }, []);

  if (!showTip || !currentTip) {
    return null;
  }

  return (
    <Card className="fixed bottom-24 right-6 z-40 w-80 shadow-lg border-l-4 border-l-blue-500 animate-in slide-in-from-right-2">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-100 rounded-full mt-1">
            <Lightbulb className="w-4 h-4 text-blue-600" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{currentTip.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentTip.content}
            </p>
            
            {currentTip.action && (
              <Button
                variant="outline"
                size="sm"
                onClick={currentTip.action.onClick}
                className="w-full text-xs h-7"
              >
                {currentTip.action.label}
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            )}
            
            <div className="flex gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-xs h-6 px-2"
              >
                Got it
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismissForever}
                className="text-xs h-6 px-2 text-muted-foreground"
              >
                Don't show again
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}