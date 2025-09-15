import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { HelpCircle, MessageSquare, Bug, Lightbulb, Star, Send, BookOpen } from 'lucide-react';
import { useLanguage } from '../App';
import { getTranslation } from './translations';
import { toast } from 'sonner@2.0.3';
import { HelpCenter } from './HelpCenter';

interface HelpFeedbackProps {
  currentView: string;
  currentContext?: {
    courseId?: number;
    videoId?: number;
    tab?: string;
    courseName?: string;
  };
  helpCenterOpen?: boolean;
  onHelpCenterChange?: (open: boolean) => void;
}

interface FeedbackData {
  type: 'bug' | 'feedback' | 'feature' | 'question';
  priority: 'low' | 'medium' | 'high';
  subject: string;
  description: string;
  email: string;
  rating?: number;
}

export function HelpFeedback({ 
  currentView, 
  currentContext, 
  helpCenterOpen = false, 
  onHelpCenterChange 
}: HelpFeedbackProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    type: 'feedback',
    priority: 'medium',
    subject: '',
    description: '',
    email: '',
    rating: undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHelpCenterToggle = (open: boolean) => {
    if (onHelpCenterChange) {
      onHelpCenterChange(open);
    }
  };

  const getViewDisplayName = (view: string) => {
    const viewNames = {
      dashboard: getTranslation(language, 'dashboard') || 'Dashboard',
      'course-detail': 'Course Details',
      notes: 'Notes',
      tests: 'Tests',
      profile: 'Profile Settings',
      payments: 'Payments',
      materials: 'Course Materials',
      'course-management': 'Course Management',
      certificates: 'Certificates',
      'test-records': 'Test Records',
      messages: 'Messages',
      notifications: 'Notifications',
      lectures: 'Recorded Lectures',
      'learning-path': 'Learning Path',
      'nearby-centers': 'Nearby Learning Centers'
    };
    return viewNames[view as keyof typeof viewNames] || view;
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'feature': return <Lightbulb className="w-4 h-4" />;
      case 'question': return <HelpCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const contextInfo = {
        view: currentView,
        viewName: getViewDisplayName(currentView),
        timestamp: new Date().toISOString(),
        ...currentContext
      };

      // In a real app, this would be sent to your support system
      console.log('Feedback submitted:', {
        ...feedbackData,
        context: contextInfo
      });

      toast.success('Feedback submitted successfully!', {
        description: 'Thank you for helping us improve the platform.',
      });

      // Reset form
      setFeedbackData({
        type: 'feedback',
        priority: 'medium',
        subject: '',
        description: '',
        email: '',
        rating: undefined
      });
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to submit feedback', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFeedbackData(prev => ({ ...prev, rating: star }))}
            className={`p-1 rounded transition-colors ${
              (feedbackData.rating || 0) >= star
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Floating Help Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          size="sm"
          onClick={() => handleHelpCenterToggle(true)}
          className="rounded-full w-12 h-12 p-0 shadow-lg bg-green-600 hover:bg-green-700 text-white"
          title="Help Center (Ctrl+H)"
        >
          <BookOpen className="w-5 h-5" />
        </Button>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-full w-12 h-12 p-0 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
              title="Send Feedback"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Help & Feedback
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Context */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Current Screen Context</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                📍 {getViewDisplayName(currentView)}
              </Badge>
              {currentContext?.courseName && (
                <Badge variant="outline">
                  📚 {currentContext.courseName}
                </Badge>
              )}
              {currentContext?.tab && (
                <Badge variant="outline">
                  📋 {currentContext.tab}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              This information helps us understand where you experienced the issue.
            </p>
          </div>

          {/* Feedback Type */}
          <div className="space-y-3">
            <Label>What type of feedback is this?</Label>
            <RadioGroup
              value={feedbackData.type}
              onValueChange={(value) => setFeedbackData(prev => ({ ...prev, type: value as any }))}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug" className="flex items-center gap-2 cursor-pointer">
                  <Bug className="w-4 h-4 text-red-500" />
                  Bug Report
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="feedback" id="feedback" />
                <Label htmlFor="feedback" className="flex items-center gap-2 cursor-pointer">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  General Feedback
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="feature" id="feature" />
                <Label htmlFor="feature" className="flex items-center gap-2 cursor-pointer">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Feature Request
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="question" id="question" />
                <Label htmlFor="question" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-green-500" />
                  Question/Help
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <Label>Priority Level</Label>
            <RadioGroup
              value={feedbackData.priority}
              onValueChange={(value) => setFeedbackData(prev => ({ ...prev, priority: value as any }))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-600">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-yellow-600">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-red-600">High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Rating (for feedback type) */}
          {feedbackData.type === 'feedback' && (
            <div className="space-y-3">
              <Label>Rate your experience on this screen</Label>
              {renderStarRating()}
            </div>
          )}

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Brief summary of your feedback"
              value={feedbackData.subject}
              onChange={(e) => setFeedbackData(prev => ({ ...prev, subject: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Detailed Description
              <span className="text-xs text-muted-foreground ml-1">
                (Please describe what happened, what you expected, or your suggestion)
              </span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your feedback. Include steps to reproduce if reporting a bug."
              value={feedbackData.description}
              onChange={(e) => setFeedbackData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address
              <span className="text-xs text-muted-foreground ml-1">(for follow-up)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={feedbackData.email}
              onChange={(e) => setFeedbackData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
      </div>

      {/* Help Center Modal */}
      <HelpCenter 
        isOpen={helpCenterOpen}
        onClose={() => handleHelpCenterToggle(false)}
        currentView={currentView}
      />
    </>
  );
}