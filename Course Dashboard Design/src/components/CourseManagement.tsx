import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  FileText, 
  Upload, 
  Video, 
  Calendar, 
  ClipboardList, 
  Download, 
  Plus, 
  BookOpen,
  PlayCircle,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  TrendingUp,
  Award,
  Target,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Import chart components
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock enrollment data
const enrollmentData = {
  1: { enrolled: true, enrollmentDate: '2024-01-15', progress: 75 },
  2: { enrolled: true, enrollmentDate: '2024-01-20', progress: 60 },
  3: { enrolled: false, enrollmentDate: null, progress: 0 },
  4: { enrolled: true, enrollmentDate: '2024-01-10', progress: 90 },
  7: { enrolled: false, enrollmentDate: null, progress: 0 },
  8: { enrolled: true, enrollmentDate: '2024-01-25', progress: 45 },
};

// Mock course data
const courses = {
  1: {
    id: 1,
    name: "Complete Machine Learning & AI Bootcamp",
    instructor: "Dr. Sarah Johnson",
    code: "ML101",
    description: "Master the fundamentals of Machine Learning and Artificial Intelligence"
  },
  2: {
    id: 2,
    name: "Cybersecurity Fundamentals & Ethical Hacking",
    instructor: "Prof. Michael Chen",
    code: "CS201",
    description: "Learn to protect systems and networks from digital attacks"
  },
  3: {
    id: 3,
    name: "Data Science with Python & R",
    instructor: "Dr. Emily Rodriguez",
    code: "DS301",
    description: "Comprehensive data science course covering Python and R programming"
  }
};

// Mock performance data for pie charts
const performanceData = {
  1: {
    assignments: [
      { name: 'Completed', value: 8, fill: '#22c55e' },
      { name: 'Pending', value: 2, fill: '#f59e0b' },
      { name: 'Overdue', value: 1, fill: '#ef4444' }
    ],
    tests: [
      { name: 'Excellent (90-100%)', value: 3, fill: '#22c55e' },
      { name: 'Good (70-89%)', value: 4, fill: '#3b82f6' },
      { name: 'Fair (50-69%)', value: 2, fill: '#f59e0b' },
      { name: 'Poor (<50%)', value: 1, fill: '#ef4444' }
    ],
    overall: [
      { name: 'Completed', value: 75, fill: '#22c55e' },
      { name: 'Remaining', value: 25, fill: '#e5e7eb' }
    ]
  },
  2: {
    assignments: [
      { name: 'Completed', value: 6, fill: '#22c55e' },
      { name: 'Pending', value: 3, fill: '#f59e0b' },
      { name: 'Overdue', value: 0, fill: '#ef4444' }
    ],
    tests: [
      { name: 'Excellent (90-100%)', value: 2, fill: '#22c55e' },
      { name: 'Good (70-89%)', value: 3, fill: '#3b82f6' },
      { name: 'Fair (50-69%)', value: 1, fill: '#f59e0b' },
      { name: 'Poor (<50%)', value: 0, fill: '#ef4444' }
    ],
    overall: [
      { name: 'Completed', value: 60, fill: '#3b82f6' },
      { name: 'Remaining', value: 40, fill: '#e5e7eb' }
    ]
  }
};

// Course-specific materials data
const courseNotes = {
  1: [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      description: "Comprehensive notes covering the basics of neural networks.",
      author: "Dr. Sarah Johnson",
      createdAt: "2024-01-15",
      fileSize: "2.3 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Data Preprocessing Techniques", 
      description: "Step-by-step guide for cleaning and preparing data.",
      author: "Dr. Sarah Johnson",
      createdAt: "2024-01-20",
      fileSize: "1.8 MB",
      format: "PDF"
    }
  ],
  2: [
    {
      id: 3,
      title: "Network Security Fundamentals",
      description: "Essential concepts in network security and firewalls.",
      author: "Prof. Michael Chen",
      createdAt: "2024-01-18",
      fileSize: "3.1 MB",
      format: "PDF"
    }
  ]
};

const courseLectures = {
  1: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Overview of machine learning concepts and applications.",
      duration: "45:30",
      views: 234,
      uploadDate: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    }
  ],
  2: [
    {
      id: 2,
      title: "Ethical Hacking Methodology",
      description: "Step-by-step approach to ethical hacking.",
      duration: "38:45",
      views: 156,
      uploadDate: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    }
  ]
};

const courseAssignments = {
  1: [
    {
      id: 1,
      title: "Build a Linear Regression Model",
      description: "Create a linear regression model to predict house prices.",
      dueDate: "2024-02-15",
      status: "submitted",
      grade: 92,
      maxGrade: 100
    }
  ],
  2: [
    {
      id: 2,
      title: "Vulnerability Assessment Report",
      description: "Conduct a security assessment of a web application.",
      dueDate: "2024-02-20",
      status: "pending",
      grade: null,
      maxGrade: 100
    }
  ]
};

const courseLiveSchedule = {
  1: [
    {
      id: 1,
      title: "Advanced Deep Learning Techniques",
      description: "Live session covering GANs and transformers.",
      scheduledDate: "2024-02-18",
      scheduledTime: "10:00 AM",
      duration: "90 minutes",
      maxParticipants: 50,
      registeredParticipants: 42,
      status: "upcoming"
    }
  ],
  2: [
    {
      id: 2,
      title: "Incident Response Workshop",
      description: "Interactive workshop on handling security incidents.",
      scheduledDate: "2024-02-20", 
      scheduledTime: "2:00 PM",
      duration: "120 minutes",
      maxParticipants: 30,
      registeredParticipants: 28,
      status: "upcoming"
    }
  ]
};

const courseTests = {
  1: [
    {
      id: 1,
      title: "Machine Learning Fundamentals Quiz",
      description: "Test your understanding of basic ML concepts.",
      type: "quiz",
      questions: 20,
      duration: "45 minutes",
      dueDate: "2024-02-22",
      attempts: 2,
      maxAttempts: 3,
      bestScore: 85,
      maxScore: 100,
      status: "completed"
    }
  ],
  2: [
    {
      id: 2,
      title: "Cybersecurity Midterm Exam",
      description: "Comprehensive exam covering network security.",
      type: "exam", 
      questions: 50,
      duration: "120 minutes",
      dueDate: "2024-02-28",
      attempts: 0,
      maxAttempts: 1,
      bestScore: null,
      maxScore: 100,
      status: "upcoming"
    }
  ]
};

interface CourseManagementProps {
  courseId: number;
  onBack: () => void;
}

export function CourseManagement({ courseId, onBack }: CourseManagementProps) {
  const [activeTab, setActiveTab] = useState('notes');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const course = courses[courseId as keyof typeof courses];
  const enrollment = enrollmentData[courseId as keyof typeof enrollmentData];
  const notes = courseNotes[courseId as keyof typeof courseNotes] || [];
  const lectures = courseLectures[courseId as keyof typeof courseLectures] || [];
  const assignments = courseAssignments[courseId as keyof typeof courseAssignments] || [];
  const liveSchedule = courseLiveSchedule[courseId as keyof typeof courseLiveSchedule] || [];
  const tests = courseTests[courseId as keyof typeof courseTests] || [];
  const performance = performanceData[courseId as keyof typeof performanceData];

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-purple-50 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  const handleAddMaterial = () => {
    toast.success("Material added successfully!");
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { color: 'bg-green-100 text-green-700', text: 'Completed' },
      'pending': { color: 'bg-yellow-100 text-yellow-700', text: 'Pending' },
      'upcoming': { color: 'bg-purple-100 text-purple-700', text: 'Upcoming' },
      'submitted': { color: 'bg-green-100 text-green-700', text: 'Submitted' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.color} border-0`}>{config.text}</Badge>;
  };

  const renderPieChart = (data: any[], title: string) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  // Show enrollment required message for non-enrolled users
  if (!enrollment.enrolled) {
    return (
      <div className="max-w-6xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6 hover:bg-purple-50 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl shadow-sm border p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enrollment Required</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You need to be enrolled in <strong>{course.name}</strong> to access the course management features.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" className="hover:bg-purple-50 rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{course.name}</h1>
            <p className="text-gray-600">{course.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>Instructor: {course.instructor}</span>
              <span>•</span>
              <span>Course Code: {course.code}</span>
              <span>•</span>
              <span>Progress: {enrollment.progress}%</span>
            </div>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
              <DialogDescription>Create a new course material for {course.name}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="material-type">Material Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="lectures">Recorded Lecture</SelectItem>
                    <SelectItem value="assignments">Assignment</SelectItem>
                    <SelectItem value="live">Live Lecture</SelectItem>
                    <SelectItem value="tests">Test/Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter material title" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <Button onClick={handleAddMaterial} className="w-full">
                Create Material
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Course Progress</h3>
            <Badge className="bg-blue-100 text-blue-700 border-0">
              {enrollment.progress}% Complete
            </Badge>
          </div>
          <Progress value={enrollment.progress} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">
            Enrolled on {enrollment.enrollmentDate} • Keep up the great work!
          </p>
        </CardContent>
      </Card>

      {/* Material Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="notes" className="rounded-lg">
            <FileText className="w-4 h-4 mr-2" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="lectures" className="rounded-lg">
            <Video className="w-4 h-4 mr-2" />
            Lectures
          </TabsTrigger>
          <TabsTrigger value="assignments" className="rounded-lg">
            <ClipboardList className="w-4 h-4 mr-2" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="live" className="rounded-lg">
            <Calendar className="w-4 h-4 mr-2" />
            Live Sessions
          </TabsTrigger>
          <TabsTrigger value="tests" className="rounded-lg">
            <BookOpen className="w-4 h-4 mr-2" />
            Tests
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-lg">
            <BarChart3 className="w-4 h-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-6">
          <div className="space-y-4">
            {notes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Notes Available</h3>
                  <p className="text-gray-600">Course notes will appear here when available.</p>
                </CardContent>
              </Card>
            ) : (
              notes.map(note => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <h3 className="font-semibold text-gray-900">{note.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{note.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {note.author}</span>
                          <span>•</span>
                          <span>{note.createdAt}</span>
                          <span>•</span>
                          <span>{note.fileSize} {note.format}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Recorded Lectures Tab */}
        <TabsContent value="lectures" className="mt-6">
          <div className="space-y-4">
            {lectures.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Recorded Lectures</h3>
                  <p className="text-gray-600">Recorded lectures will appear here when available.</p>
                </CardContent>
              </Card>
            ) : (
              lectures.map(lecture => (
                <Card key={lecture.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={lecture.thumbnail} 
                          alt={lecture.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-8 h-8 text-white/80 hover:text-white cursor-pointer transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Video className="w-5 h-5 text-red-600" />
                          <h3 className="font-semibold text-gray-900">{lecture.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{lecture.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Duration: {lecture.duration}</span>
                          <span>•</span>
                          <span>{lecture.views} views</span>
                          <span>•</span>
                          <span>Uploaded: {lecture.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="mt-6">
          <div className="space-y-4">
            {assignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Assignments</h3>
                  <p className="text-gray-600">Course assignments will appear here when available.</p>
                </CardContent>
              </Card>
            ) : (
              assignments.map(assignment => (
                <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <ClipboardList className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>Due: {assignment.dueDate}</span>
                          {assignment.grade && (
                            <>
                              <span>•</span>
                              <span className="text-green-600 font-medium">
                                Grade: {assignment.grade}/{assignment.maxGrade}
                              </span>
                            </>
                          )}
                        </div>
                        {assignment.status === 'submitted' && assignment.grade && (
                          <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-2" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        {assignment.status === 'pending' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Live Sessions Tab */}
        <TabsContent value="live" className="mt-6">
          <div className="space-y-4">
            {liveSchedule.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Live Sessions</h3>
                  <p className="text-gray-600">Scheduled live sessions will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              liveSchedule.map(session => (
                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-gray-900">{session.title}</h3>
                          {getStatusBadge(session.status)}
                        </div>
                        <p className="text-gray-600 mb-3">{session.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{session.scheduledDate} at {session.scheduledTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{session.registeredParticipants}/{session.maxParticipants} registered</span>
                          </div>
                        </div>
                        <Progress value={(session.registeredParticipants / session.maxParticipants) * 100} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        {session.status === 'upcoming' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Join Live
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Tests Tab */}
        <TabsContent value="tests" className="mt-6">
          <div className="space-y-4">
            {tests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No Tests Available</h3>
                  <p className="text-gray-600">Course tests and exams will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              tests.map(test => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="w-5 h-5 text-orange-600" />
                          <h3 className="font-semibold text-gray-900">{test.title}</h3>
                          <Badge className={`text-xs ${
                            test.type === 'quiz' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                          } border-0`}>
                            {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                          </Badge>
                          {getStatusBadge(test.status)}
                        </div>
                        <p className="text-gray-600 mb-3">{test.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                          <div>Questions: {test.questions}</div>
                          <div>Duration: {test.duration}</div>
                          <div>Due: {test.dueDate}</div>
                          <div>Attempts: {test.attempts}/{test.maxAttempts}</div>
                        </div>
                        {test.bestScore && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Best Score: {test.bestScore}/{test.maxScore}</span>
                              <span>{Math.round((test.bestScore / test.maxScore) * 100)}%</span>
                            </div>
                            <Progress value={(test.bestScore / test.maxScore) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {test.status === 'upcoming' && test.attempts < test.maxAttempts && (
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Start {test.type === 'quiz' ? 'Quiz' : 'Exam'}
                          </Button>
                        )}
                        {test.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Results Tab - Only shows for enrolled courses */}
        <TabsContent value="results" className="mt-6">
          {performance ? (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Performance Analytics</h2>
                <p className="text-gray-600">Your progress and performance in {course.name}</p>
              </div>
              
              {/* Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {renderPieChart(performance.assignments, 'Assignment Status')}
                {renderPieChart(performance.tests, 'Test Performance')}
                {renderPieChart(performance.overall, 'Overall Progress')}
              </div>

              {/* Performance Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 mb-1">{enrollment.progress}%</div>
                    <p className="text-sm text-gray-600">Course Progress</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 mb-1">
                      {tests.reduce((sum, test) => sum + (test.bestScore || 0), 0) / tests.length || 0}%
                    </div>
                    <p className="text-sm text-gray-600">Average Test Score</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 mb-1">
                      {assignments.filter(a => a.status === 'submitted').length}
                    </div>
                    <p className="text-sm text-gray-600">Completed Assignments</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 mb-1">A-</div>
                    <p className="text-sm text-gray-600">Current Grade</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Performance Data</h3>
                <p className="text-gray-600">Complete assignments and tests to see your performance analytics.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}