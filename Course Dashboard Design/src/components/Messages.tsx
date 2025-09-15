import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Reply,
  Forward,
  MoreVertical,
  Pin,
  Clock,
  CheckCheck,
  User,
  GraduationCap,
  Users,
  AlertCircle,
  Calendar,
  FileText
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: number;
  sender: string;
  senderType: 'student' | 'teacher' | 'admin' | 'system';
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isPinned: boolean;
  category: 'general' | 'course' | 'assignment' | 'announcement' | 'support';
  courseTitle?: string;
  attachments?: string[];
  priority: 'low' | 'medium' | 'high';
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Dr. Rajesh Kumar",
    senderType: "teacher",
    subject: "Assignment 3: Machine Learning Project Submission",
    preview: "Dear Priya, your project submission deadline is approaching. Please ensure you submit your ML model along with the documentation...",
    content: `Dear Priya,

I hope this message finds you well. I wanted to remind you that the deadline for Assignment 3: Machine Learning Project is approaching on March 25th.

Please ensure you submit:
1. Your trained ML model (pickle file)
2. Complete documentation with methodology
3. Results analysis and conclusions
4. Source code with proper comments

If you need any clarification or face any issues, please don't hesitate to reach out during my office hours (Mon-Wed, 2-4 PM) or schedule a meeting.

Best regards,
Dr. Rajesh Kumar
Professor, Computer Science Department
Delhi Technological University`,
    timestamp: "2024-03-20T10:30:00Z",
    isRead: false,
    isStarred: true,
    isPinned: true,
    category: "assignment",
    courseTitle: "Machine Learning Fundamentals",
    priority: "high"
  },
  {
    id: 2,
    sender: "Prof. Anita Desai",
    senderType: "teacher",
    subject: "Web Development Workshop - Additional Resources",
    preview: "Hi Priya! I've uploaded additional resources for our React.js workshop. The materials include advanced hooks examples...",
    content: `Hi Priya!

I hope you enjoyed our React.js workshop yesterday. I've uploaded additional resources to help you practice:

📚 Resources Added:
- Advanced React Hooks examples
- State management patterns
- Performance optimization techniques
- Real-world project templates

🔗 Access: Check the course materials section
⏰ Next Session: March 25th, 3:00 PM - "Building Full-Stack Applications"

Keep practicing and feel free to ask questions in our discussion forum!

Happy coding! 💻
Prof. Anita Desai
Senior Lecturer, Web Technologies`,
    timestamp: "2024-03-19T15:45:00Z",
    isRead: true,
    isStarred: false,
    isPinned: false,
    category: "course",
    courseTitle: "Full Stack Web Development",
    priority: "medium"
  },
  {
    id: 3,
    sender: "LMS System",
    senderType: "system",
    subject: "Course Certificate Available - Data Science Basics",
    preview: "Congratulations! Your certificate for 'Data Science Basics' is now ready for download...",
    content: `🎉 Congratulations Priya!

Your certificate for "Data Science Basics" is now ready for download.

Course Details:
- Course: Data Science Basics
- Completion Date: March 18, 2024
- Score: 94/100
- Grade: A+

You can download your certificate from the Certificates section in your profile.

Keep up the excellent work and continue your learning journey!

Best regards,
LearnHub LMS System`,
    timestamp: "2024-03-18T12:00:00Z",
    isRead: true,
    isStarred: true,
    isPinned: false,
    category: "announcement",
    priority: "medium"
  },
  {
    id: 4,
    sender: "Dr. Vikram Singh",
    senderType: "teacher",
    subject: "Cybersecurity Lab Session - Important Updates",
    preview: "Students, please note the change in lab timing for this week's cybersecurity practical session...",
    content: `Dear Students,

Important update regarding this week's Cybersecurity Lab Session:

🕐 Time Change: Thursday, March 21st
- Old Time: 2:00 PM - 4:00 PM
- New Time: 3:00 PM - 5:00 PM

📍 Venue: Computer Lab 3 (unchanged)

📋 What to bring:
- Your laptop with Kali Linux installed
- Previous lab notebooks
- Student ID card

This week we'll cover:
- Network vulnerability scanning
- Penetration testing basics
- Security audit reports

See you all there!

Dr. Vikram Singh
Associate Professor, Cybersecurity`,
    timestamp: "2024-03-17T09:15:00Z",
    isRead: false,
    isStarred: false,
    isPinned: false,
    category: "course",
    courseTitle: "Cybersecurity Fundamentals",
    priority: "high"
  },
  {
    id: 5,
    sender: "Academic Office",
    senderType: "admin",
    subject: "Mid-Semester Exam Schedule Released",
    preview: "The mid-semester examination schedule has been released. Please check your exam dates and venues...",
    content: `Dear Students,

The Mid-Semester Examination schedule for March 2024 has been released.

📅 Exam Period: March 25-30, 2024

Your Exam Schedule:
- Machine Learning: March 26, 9:00 AM, Hall A-1
- Web Development: March 27, 2:00 PM, Lab-2
- Cybersecurity: March 28, 11:00 AM, Hall B-3
- Data Science: March 29, 9:00 AM, Hall A-2

📝 Important Notes:
- Arrive 30 minutes before exam time
- Bring student ID and admit card
- Mobile phones not allowed in exam hall
- Results will be published within 10 days

For any queries, contact the Academic Office.

Best wishes for your exams!

Academic Office
Delhi Technological University`,
    timestamp: "2024-03-16T14:20:00Z",
    isRead: true,
    isStarred: false,
    isPinned: true,
    category: "announcement",
    priority: "high"
  },
  {
    id: 6,
    sender: "Sarah Johnson",
    senderType: "student",
    subject: "Study Group for ML Assignment",
    preview: "Hey Priya! A few of us are forming a study group for the Machine Learning assignment. Would you like to join?",
    content: `Hey Priya!

Hope you're doing well! 😊

A few of us from the ML class are forming a study group for Assignment 3. We thought it would be great to collaborate and help each other out.

👥 Group Members:
- Sarah Johnson (me)
- Rahul Gupta
- Meera Patel
- You (hopefully!)

📅 Meeting Schedule:
- Time: Every evening 6-8 PM
- Platform: Google Meet
- Duration: Until assignment submission

We can share resources, discuss concepts, and review each other's code. What do you think?

Let me know if you're interested!

Best,
Sarah Johnson
B.Tech CSE, Final Year`,
    timestamp: "2024-03-15T18:30:00Z",
    isRead: true,
    isStarred: false,
    isPinned: false,
    category: "general",
    priority: "low"
  },
  {
    id: 7,
    sender: "Prof. Arjun Mehta",
    senderType: "teacher",
    subject: "Guest Lecture: AI in Healthcare - Tomorrow 2 PM",
    preview: "Don't miss tomorrow's guest lecture by Dr. Priya Nair from AIIMS on 'AI Applications in Healthcare'...",
    content: `Dear Students,

🎯 Special Guest Lecture Alert!

We have an exciting guest lecture tomorrow that I highly recommend attending:

🏥 Topic: "AI Applications in Healthcare: Current Trends and Future Possibilities"
👨‍⚕�� Speaker: Dr. Priya Nair, Head of Medical Informatics, AIIMS Delhi
📅 Date: March 21, 2024
⏰ Time: 2:00 PM - 3:30 PM
📍 Venue: Main Auditorium
🔗 Online Link: Will be shared 30 minutes before

Dr. Nair is a renowned expert in medical AI and has published over 50 research papers. She'll cover:
- AI in medical diagnosis
- Machine learning in drug discovery
- Ethics in healthcare AI
- Career opportunities in HealthTech

This aligns perfectly with our current coursework and could open new career perspectives for you.

Attendance is optional but highly encouraged!

Prof. Arjun Mehta
Department of Artificial Intelligence`,
    timestamp: "2024-03-14T11:45:00Z",
    isRead: false,
    isStarred: true,
    isPinned: false,
    category: "announcement",
    courseTitle: "AI & Machine Learning",
    priority: "medium"
  }
];

export function Messages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'inbox':
        return matchesSearch;
      case 'starred':
        return matchesSearch && message.isStarred;
      case 'unread':
        return matchesSearch && !message.isRead;
      case 'teachers':
        return matchesSearch && message.senderType === 'teacher';
      case 'announcements':
        return matchesSearch && (message.senderType === 'admin' || message.senderType === 'system');
      default:
        return matchesSearch;
    }
  });

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const toggleStar = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
    toast.success('Message updated');
  };

  const togglePin = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
    toast.success('Message updated');
  };

  const handleSendReply = () => {
    if (replyContent.trim()) {
      toast.success('Reply sent successfully!');
      setReplyContent('');
    }
  };

  const getSenderDisplayName = (message: Message) => {
    return message.senderType === 'teacher' 
      ? `${message.sender} (Teacher)` 
      : message.sender;
  };

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'teacher':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'admin':
        return <User className="w-4 h-4 text-purple-600" />;
      case 'system':
        return <AlertCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      default:
        return 'border-l-gray-300 bg-white dark:bg-card';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-IN');
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred).length;
  const teacherMessages = messages.filter(m => m.senderType === 'teacher').length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Stay connected with your instructors and classmates
          </p>
        </div>
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Compose
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>
                Send a message to your instructors or classmates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="To: Select recipient" />
              <Input placeholder="Subject" />
              <Textarea 
                placeholder="Write your message..."
                className="min-h-[120px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setComposeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success('Message sent successfully!');
                  setComposeOpen(false);
                }}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inbox" className="relative">
                    Inbox
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="starred">
                    Starred
                    {starredCount > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5">
                        {starredCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-1 mt-2">
                  <Button
                    variant={activeTab === 'unread' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('unread')}
                    className="text-xs"
                  >
                    Unread ({unreadCount})
                  </Button>
                  <Button
                    variant={activeTab === 'teachers' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('teachers')}
                    className="text-xs"
                  >
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Teachers ({teacherMessages})
                  </Button>
                  <Button
                    variant={activeTab === 'announcements' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('announcements')}
                    className="text-xs"
                  >
                    Announcements
                  </Button>
                </div>
              </Tabs>
            </CardHeader>
            
            <ScrollArea className="h-[600px]">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredMessages
                    .sort((a, b) => {
                      if (a.isPinned && !b.isPinned) return -1;
                      if (!a.isPinned && b.isPinned) return 1;
                      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                    })
                    .map((message) => (
                      <div
                        key={message.id}
                        onClick={() => {
                          setSelectedMessage(message);
                          markAsRead(message.id);
                        }}
                        className={`p-4 border-l-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                          selectedMessage?.id === message.id 
                            ? 'bg-accent' 
                            : getPriorityColor(message.priority)
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getSenderIcon(message.senderType)}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm truncate ${
                                !message.isRead ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {getSenderDisplayName(message)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(message.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {message.isPinned && <Pin className="w-3 h-3 text-purple-600" />}
                            {message.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            {!message.isRead && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
                          </div>
                        </div>
                        
                        <h4 className={`font-medium text-sm mb-1 line-clamp-1 ${
                          !message.isRead ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {message.subject}
                        </h4>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {message.preview}
                        </p>
                        
                        {message.courseTitle && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {message.courseTitle}
                          </Badge>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`${
                        selectedMessage.senderType === 'teacher' 
                          ? 'bg-blue-100 text-blue-600' 
                          : selectedMessage.senderType === 'admin'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        {getSenderIcon(selectedMessage.senderType)}
                        <h3 className="font-semibold text-foreground">
                          {getSenderDisplayName(selectedMessage)}
                        </h3>
                        {selectedMessage.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedMessage.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(selectedMessage.id)}
                    >
                      <Star className={`w-4 h-4 ${
                        selectedMessage.isStarred 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-muted-foreground'
                      }`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePin(selectedMessage.id)}
                    >
                      <Pin className={`w-4 h-4 ${
                        selectedMessage.isPinned 
                          ? 'text-purple-600' 
                          : 'text-muted-foreground'
                      }`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {selectedMessage.subject}
                  </h2>
                  {selectedMessage.courseTitle && (
                    <Badge variant="outline" className="mb-4">
                      📚 {selectedMessage.courseTitle}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <ScrollArea className="h-[400px]">
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {selectedMessage.content}
                    </div>
                  </div>
                  
                  {selectedMessage.attachments && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Attachments
                      </h4>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground">{attachment}</span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
              
              {/* Reply Section */}
              <div className="border-t p-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder={`Reply to ${getSenderDisplayName(selectedMessage)}...`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Forward className="w-4 h-4 mr-2" />
                        Forward
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendReply}
                      disabled={!replyContent.trim()}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Select a message to read
                </h3>
                <p className="text-muted-foreground">
                  Choose a message from the list to view its contents
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}