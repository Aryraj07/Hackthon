import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Settings, 
  Users, 
  Award,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
}

export function HelpCenter({ isOpen, onClose, currentView }: HelpCenterProps) {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="w-5 h-5" />,
      articles: [
        { title: 'How to navigate the dashboard', id: 'dashboard-nav' },
        { title: 'Setting up your profile', id: 'profile-setup' },
        { title: 'Understanding course enrollment', id: 'enrollment' },
        { title: 'Accessing course materials', id: 'materials' }
      ]
    },
    {
      id: 'courses',
      title: 'Courses & Learning',
      icon: <Video className="w-5 h-5" />,
      articles: [
        { title: 'How to watch videos', id: 'video-watching' },
        { title: 'Submitting assignments', id: 'assignments' },
        { title: 'Taking tests and quizzes', id: 'tests' },
        { title: 'Tracking your progress', id: 'progress' }
      ]
    },
    {
      id: 'account',
      title: 'Account & Settings',
      icon: <Settings className="w-5 h-5" />,
      articles: [
        { title: 'Changing your password', id: 'password' },
        { title: 'Updating personal information', id: 'personal-info' },
        { title: 'Managing notifications', id: 'notifications' },
        { title: 'Language preferences', id: 'language' }
      ]
    },
    {
      id: 'certificates',
      title: 'Certificates & Achievements',
      icon: <Award className="w-5 h-5" />,
      articles: [
        { title: 'How to earn certificates', id: 'earning-certs' },
        { title: 'Downloading certificates', id: 'download-certs' },
        { title: 'Sharing achievements', id: 'share-achievements' },
        { title: 'Certificate verification', id: 'verify-certs' }
      ]
    }
  ];

  const articleContent: Record<string, { title: string; content: string; steps?: string[] }> = {
    'dashboard-nav': {
      title: 'How to navigate the dashboard',
      content: 'The dashboard is your central hub for learning. Here\'s how to navigate it effectively:',
      steps: [
        'Use the sidebar on the left to access different sections like Notes, Tests, and Course Materials',
        'The main area shows your current courses and progress',
        'Click on any course card to access detailed course content',
        'Use the top navigation to access your profile, notifications, and messages',
        'The progress overview at the bottom of the sidebar shows your overall completion status'
      ]
    },
    'profile-setup': {
      title: 'Setting up your profile',
      content: 'A complete profile helps instructors and fellow students connect with you:',
      steps: [
        'Click on your profile picture in the top navigation',
        'Select "Profile Settings" from the dropdown menu',
        'Fill in your personal information including name, bio, and contact details',
        'Upload a professional profile picture',
        'Set your learning preferences and notification settings',
        'Save your changes to update your profile'
      ]
    },
    'enrollment': {
      title: 'Understanding course enrollment',
      content: 'Enrolling in courses gives you access to learning materials and progress tracking:',
      steps: [
        'Browse available courses on the dashboard',
        'Click "Enroll Now" on any course that interests you',
        'Choose your payment method (UPI, card, or bank transfer)',
        'Complete the payment process',
        'Once enrolled, the course will appear in your "My Courses" section',
        'You can access all course materials, videos, and assignments immediately'
      ]
    },
    'materials': {
      title: 'Accessing course materials',
      content: 'Course materials include PDFs, documents, and supplementary resources:',
      steps: [
        'Go to the "Course Materials" section from the sidebar',
        'Select the course you want to access materials for',
        'Browse through different types of materials: PDFs, documents, links',
        'Download materials by clicking the download button',
        'Use the search function to find specific materials quickly',
        'Materials are organized by course modules for easy navigation'
      ]
    },
    'video-watching': {
      title: 'How to watch videos',
      content: 'Our video player offers various features to enhance your learning experience:',
      steps: [
        'Click on any video from your course content',
        'Use playback controls: play/pause, seek, volume, and speed adjustment',
        'Enable closed captions if available',
        'Use the quality selector to adjust video resolution based on your internet speed',
        'Take notes while watching using the notes panel',
        'Your progress is automatically saved and synced across devices'
      ]
    },
    'assignments': {
      title: 'Submitting assignments',
      content: 'Assignments help reinforce your learning and provide practical experience:',
      steps: [
        'Access assignments from your course page or the dedicated Assignments section',
        'Read the assignment instructions carefully',
        'Download any required templates or resources',
        'Complete your work and save it in the specified format',
        'Upload your completed assignment using the submission interface',
        'Check the submission status and await instructor feedback'
      ]
    },
    'tests': {
      title: 'Taking tests and quizzes',
      content: 'Tests help evaluate your understanding and track your progress:',
      steps: [
        'Navigate to the Tests section from the sidebar',
        'Select the test you want to take',
        'Read all instructions before starting',
        'Answer questions within the time limit',
        'Review your answers before submitting',
        'View your results and feedback after completion'
      ]
    },
    'progress': {
      title: 'Tracking your progress',
      content: 'Monitor your learning journey with detailed progress tracking:',
      steps: [
        'View overall progress on the main dashboard',
        'Check individual course progress in each course page',
        'Use the Progress tab in courses for detailed analytics',
        'Track completion of videos, assignments, and tests',
        'Set learning goals and monitor achievement',
        'Export progress reports for your records'
      ]
    },
    'password': {
      title: 'Changing your password',
      content: 'Keep your account secure by regularly updating your password:',
      steps: [
        'Go to Profile Settings from the navigation menu',
        'Click on the "Security" tab',
        'Enter your current password',
        'Type your new password (minimum 8 characters with mixed case and numbers)',
        'Confirm your new password',
        'Click "Update Password" to save changes'
      ]
    },
    'personal-info': {
      title: 'Updating personal information',
      content: 'Keep your profile information current for the best experience:',
      steps: [
        'Access Profile Settings from the top navigation',
        'Click on the "Personal Information" tab',
        'Update fields like name, email, phone number, and address',
        'Upload a new profile picture if desired',
        'Set your preferred language and timezone',
        'Save changes to update your profile'
      ]
    },
    'notifications': {
      title: 'Managing notifications',
      content: 'Customize how and when you receive notifications:',
      steps: [
        'Go to Settings from the sidebar',
        'Select the "Notifications" section',
        'Choose notification types: course updates, assignments, messages',
        'Set delivery preferences: email, SMS, or in-app only',
        'Configure notification timing and frequency',
        'Save your notification preferences'
      ]
    },
    'language': {
      title: 'Language preferences',
      content: 'The platform supports multiple languages for your convenience:',
      steps: [
        'Click on the language selector in the top navigation',
        'Choose from English, Hindi, or Gujarati',
        'The interface will immediately switch to your selected language',
        'All course content and materials respect your language preference',
        'You can change the language at any time',
        'Settings and preferences are saved across sessions'
      ]
    },
    'earning-certs': {
      title: 'How to earn certificates',
      content: 'Certificates recognize your achievements and can boost your career:',
      steps: [
        'Complete all required course modules and lessons',
        'Submit all assignments and achieve passing grades',
        'Pass all required tests and quizzes',
        'Meet the minimum attendance requirements',
        'Complete any final projects or capstone assignments',
        'Certificates are automatically generated upon meeting all requirements'
      ]
    },
    'download-certs': {
      title: 'Downloading certificates',
      content: 'Access and download your earned certificates:',
      steps: [
        'Go to the Certificates section from the sidebar',
        'View all your earned certificates',
        'Click the "Download" button next to any certificate',
        'Choose format: PDF for printing or digital sharing',
        'Certificates include verification codes for authenticity',
        'Share certificates on professional networks like LinkedIn'
      ]
    },
    'share-achievements': {
      title: 'Sharing achievements',
      content: 'Showcase your learning accomplishments to the world:',
      steps: [
        'Access your Certificates section',
        'Click the "Share" button on any certificate',
        'Choose sharing platform: LinkedIn, Facebook, Twitter, or email',
        'Add a personal message to your achievement post',
        'Include the verification link for credibility',
        'Tag the institution or course provider if desired'
      ]
    },
    'verify-certs': {
      title: 'Certificate verification',
      content: 'All certificates include verification features for authenticity:',
      steps: [
        'Each certificate includes a unique verification code',
        'Visit the verification portal on our website',
        'Enter the certificate code to verify authenticity',
        'Verification shows course details, completion date, and grades',
        'Employers can verify certificates using the provided links',
        'Digital certificates are tamper-proof and blockchain-secured'
      ]
    }
  };

  const commonQuestions = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Profile Settings > Security > Change Password to update your password.'
    },
    {
      question: 'Can I download course videos?',
      answer: 'Videos can be watched online. Some courses may offer downloadable materials in the Materials section.'
    },
    {
      question: 'How do I get help with assignments?',
      answer: 'You can contact your instructor through the Messages section or join study groups in Nearby Centers.'
    },
    {
      question: 'Where can I see my progress?',
      answer: 'Your progress is visible on the dashboard and in individual course pages under the Progress tab.'
    }
  ];

  const shortcuts = [
    { key: 'Ctrl + /', action: 'Open search' },
    { key: 'Ctrl + H', action: 'Open help center' },
    { key: 'Ctrl + D', action: 'Go to dashboard' },
    { key: 'Ctrl + P', action: 'Go to profile' },
    { key: 'Ctrl + N', action: 'View notifications' },
    { key: 'Ctrl + M', action: 'View messages' }
  ];

  const contactOptions = [
    {
      type: 'Live Chat',
      description: 'Chat with our support team',
      icon: <MessageCircle className="w-5 h-5" />,
      action: 'Start Chat',
      available: '24/7'
    },
    {
      type: 'Phone Support',
      description: '+91 9876543210',
      icon: <Phone className="w-5 h-5" />,
      action: 'Call Now',
      available: '9 AM - 6 PM IST'
    },
    {
      type: 'Email Support',
      description: 'support@learnhub.com',
      icon: <Mail className="w-5 h-5" />,
      action: 'Send Email',
      available: 'Response in 2-4 hours'
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0 || searchQuery === '');

  const handleClose = () => {
    setSelectedArticle(null); // Reset to article list when closing
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Help Center
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="help" className="h-[60vh]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="help">Help Articles</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="help" className="mt-4">
              <ScrollArea className="h-[50vh]">
                {selectedArticle ? (
                  <div className="space-y-4">
                    {/* Back button */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedArticle(null)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Help Articles
                    </Button>
                    
                    {/* Article content */}
                    {articleContent[selectedArticle] && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">
                          {articleContent[selectedArticle].title}
                        </h2>
                        
                        <p className="text-muted-foreground">
                          {articleContent[selectedArticle].content}
                        </p>
                        
                        {articleContent[selectedArticle].steps && (
                          <div className="space-y-3">
                            <h3 className="font-medium">Step-by-step guide:</h3>
                            <ol className="space-y-2">
                              {articleContent[selectedArticle].steps!.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </span>
                                  <span className="text-sm text-muted-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        <div className="border-t pt-4 mt-6">
                          <p className="text-xs text-muted-foreground">
                            Was this article helpful? You can provide feedback using the feedback button.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <h3 className="font-medium">{category.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {category.articles.length}
                          </Badge>
                        </div>
                        <div className="grid gap-2 ml-7">
                          {category.articles.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => setSelectedArticle(article.id)}
                              className="flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors group"
                            >
                              <span className="text-sm group-hover:text-blue-600 transition-colors">{article.title}</span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="faq" className="mt-4">
              <ScrollArea className="h-[50vh]">
                <div className="space-y-4">
                  {commonQuestions.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="shortcuts" className="mt-4">
              <ScrollArea className="h-[50vh]">
                <div className="space-y-3">
                  <h3 className="font-medium mb-4">Keyboard Shortcuts</h3>
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{shortcut.action}</span>
                      <Badge variant="outline" className="font-mono">
                        {shortcut.key}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <ScrollArea className="h-[50vh]">
                <div className="space-y-4">
                  <h3 className="font-medium mb-4">Get in Touch</h3>
                  {contactOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{option.type}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {option.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-green-600">
                              {option.available}
                            </span>
                            <Button size="sm" variant="outline">
                              {option.action}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}