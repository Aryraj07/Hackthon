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
  Search, 
  Filter,
  BookOpen,
  PlayCircle,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { VideoPlayer } from './VideoPlayer';

// Mock data for courses and materials
const courses = [
  { id: 1, name: "Machine Learning & AI Bootcamp", code: "ML101" },
  { id: 2, name: "Cybersecurity Fundamentals", code: "CS201" },
  { id: 3, name: "Data Science with Python", code: "DS301" },
  { id: 4, name: "Business Strategy & Leadership", code: "BS401" },
  { id: 7, name: "Full-Stack Web Development", code: "WD501" },
];

const materialTypes = [
  { id: 'notes', name: 'Notes', icon: FileText },
  { id: 'assignments', name: 'Assignments', icon: ClipboardList },
  { id: 'recorded-lectures', name: 'Recorded Lectures', icon: Video },
  { id: 'live-lectures', name: 'Live Lectures', icon: Calendar },
  { id: 'exams', name: 'Exams/Tests', icon: BookOpen },
];

const mockMaterials = {
  notes: [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Comprehensive notes covering the basics of neural networks, including perceptrons, activation functions, and backpropagation.",
      author: "Dr. Sarah Johnson",
      createdAt: "2024-01-15",
      downloadCount: 45,
      fileSize: "2.3 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Data Preprocessing Techniques",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Step-by-step guide for cleaning and preparing data for machine learning models.",
      author: "Dr. Sarah Johnson",
      createdAt: "2024-01-20",
      downloadCount: 38,
      fileSize: "1.8 MB",
      format: "PDF"
    },
    {
      id: 3,
      title: "Network Security Fundamentals",
      courseId: 2,
      courseName: "Cybersecurity Fundamentals",
      description: "Essential concepts in network security, including firewalls, VPNs, and intrusion detection systems.",
      author: "Prof. Michael Chen",
      createdAt: "2024-01-18",
      downloadCount: 52,
      fileSize: "3.1 MB",
      format: "PDF"
    }
  ],
  assignments: [
    {
      id: 1,
      title: "Build a Linear Regression Model",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Create a linear regression model to predict house prices using the provided dataset.",
      dueDate: "2024-02-15",
      status: "submitted",
      grade: 92,
      maxGrade: 100,
      submissionDate: "2024-02-14",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Vulnerability Assessment Report",
      courseId: 2,
      courseName: "Cybersecurity Fundamentals", 
      description: "Conduct a security assessment of a web application and document your findings.",
      dueDate: "2024-02-20",
      status: "pending",
      grade: null,
      maxGrade: 100,
      submissionDate: null,
      instructor: "Prof. Michael Chen"
    },
    {
      id: 3,
      title: "Data Visualization Dashboard",
      courseId: 3,
      courseName: "Data Science with Python",
      description: "Create an interactive dashboard using Python and Plotly to visualize sales data.",
      dueDate: "2024-02-25",
      status: "in-progress",
      grade: null,
      maxGrade: 100,
      submissionDate: null,
      instructor: "Dr. Emily Rodriguez"
    }
  ],
  'recorded-lectures': [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Overview of machine learning concepts, types of learning, and real-world applications.",
      duration: "45:30",
      views: 234,
      uploadDate: "2024-01-10",
      instructor: "Dr. Sarah Johnson",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    },
    {
      id: 2,
      title: "Neural Network Architecture",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Deep dive into neural network structures, layers, and activation functions.",
      duration: "52:15",
      views: 198,
      uploadDate: "2024-01-12",
      instructor: "Dr. Sarah Johnson",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    },
    {
      id: 3,
      title: "Ethical Hacking Methodology",
      courseId: 2,
      courseName: "Cybersecurity Fundamentals",
      description: "Step-by-step approach to ethical hacking and penetration testing.",
      duration: "38:45",
      views: 156,
      uploadDate: "2024-01-15",
      instructor: "Prof. Michael Chen",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
    }
  ],
  'live-lectures': [
    {
      id: 1,
      title: "Advanced Deep Learning Techniques",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Live session covering advanced topics in deep learning including GANs and transformers.",
      scheduledDate: "2024-02-18",
      scheduledTime: "10:00 AM",
      duration: "90 minutes",
      instructor: "Dr. Sarah Johnson",
      maxParticipants: 50,
      registeredParticipants: 42,
      meetingLink: "https://zoom.us/j/1234567890",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Incident Response Workshop",
      courseId: 2,
      courseName: "Cybersecurity Fundamentals",
      description: "Interactive workshop on handling security incidents and creating response plans.",
      scheduledDate: "2024-02-20",
      scheduledTime: "2:00 PM",
      duration: "120 minutes",
      instructor: "Prof. Michael Chen",
      maxParticipants: 30,
      registeredParticipants: 28,
      meetingLink: "https://zoom.us/j/0987654321",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Data Science Career Panel",
      courseId: 3,
      courseName: "Data Science with Python",
      description: "Panel discussion with industry experts about career paths in data science.",
      scheduledDate: "2024-02-12",
      scheduledTime: "6:00 PM",
      duration: "60 minutes",
      instructor: "Dr. Emily Rodriguez",
      maxParticipants: 100,
      registeredParticipants: 87,
      meetingLink: "https://zoom.us/j/1122334455",
      status: "completed"
    }
  ],
  exams: [
    {
      id: 1,
      title: "Machine Learning Fundamentals Quiz",
      courseId: 1,
      courseName: "Machine Learning & AI Bootcamp",
      description: "Test your understanding of basic machine learning concepts and algorithms.",
      type: "quiz",
      questions: 20,
      duration: "45 minutes",
      dueDate: "2024-02-22",
      attempts: 3,
      maxAttempts: 3,
      bestScore: 85,
      maxScore: 100,
      status: "completed",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Cybersecurity Midterm Exam",
      courseId: 2,
      courseName: "Cybersecurity Fundamentals",
      description: "Comprehensive exam covering network security, cryptography, and ethical hacking.",
      type: "exam",
      questions: 50,
      duration: "120 minutes",
      dueDate: "2024-02-28",
      attempts: 0,
      maxAttempts: 1,
      bestScore: null,
      maxScore: 100,
      status: "upcoming",
      instructor: "Prof. Michael Chen"
    },
    {
      id: 3,
      title: "Python Programming Challenge",
      courseId: 3,
      courseName: "Data Science with Python",
      description: "Practical coding challenge to demonstrate Python programming skills.",
      type: "practical",
      questions: 5,
      duration: "180 minutes",
      dueDate: "2024-03-05",
      attempts: 1,
      maxAttempts: 2,
      bestScore: 78,
      maxScore: 100,
      status: "in-progress",
      instructor: "Dr. Emily Rodriguez"
    }
  ]
};

export function CourseMaterials() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedMaterialType, setSelectedMaterialType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('notes');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Filter materials based on selected course, material type, and search query
  const getFilteredMaterials = (materialType: string) => {
    let materials = mockMaterials[materialType as keyof typeof mockMaterials] || [];
    
    if (selectedCourse !== 'all') {
      materials = materials.filter(material => material.courseId === parseInt(selectedCourse));
    }
    
    if (searchQuery) {
      materials = materials.filter(material => 
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return materials;
  };

  const handleAddMaterial = () => {
    toast.success("Material added successfully!");
    setIsAddDialogOpen(false);
  };

  // Click handlers for all interactive elements
  const handleNoteClick = (note: any) => {
    toast.info(`Opening "${note.title}" notes...`);
  };

  const handleDownloadClick = (item: any, type: string) => {
    toast.success(`Downloading ${item.title}...`);
  };

  const handleEditClick = (item: any) => {
    toast.info(`Opening editor for "${item.title}"`);
  };

  const handleAuthorClick = (author: string) => {
    toast.info(`Viewing ${author}'s profile...`);
  };

  const handleCourseClick = (courseName: string) => {
    toast.info(`Navigating to ${courseName}...`);
  };

  const handleStatsClick = (type: string, value: any) => {
    switch(type) {
      case 'downloads':
        toast.info(`${value} users downloaded this material`);
        break;
      case 'views':
        toast.info(`${value} total views - View analytics`);
        break;
      case 'fileSize':
        toast.info(`File details: ${value}`);
        break;
      case 'duration':
        toast.info(`Total duration: ${value}`);
        break;
      case 'questions':
        toast.info(`${value} questions in this ${type === 'quiz' ? 'quiz' : 'exam'}`);
        break;
      case 'attempts':
        toast.info(`${value} attempts used - View attempt history`);
        break;
      default:
        toast.info(`Details: ${value}`);
    }
  };

  const handleDateClick = (date: string, type: string) => {
    switch(type) {
      case 'created':
        toast.info(`Created on ${date} - View history`);
        break;
      case 'due':
        toast.info(`Due date: ${date} - Add to calendar`);
        break;
      case 'scheduled':
        toast.info(`Scheduled for ${date} - Add reminder`);
        break;
      default:
        toast.info(`Date: ${date}`);
    }
  };

  const handleSubmitAssignment = (assignment: any) => {
    toast.success(`Submitting "${assignment.title}"...`);
  };

  const handleViewAssignment = (assignment: any) => {
    toast.info(`Opening assignment: "${assignment.title}"`);
  };

  const handleWatchVideo = (lecture: any) => {
    setSelectedVideo(lecture);
  };

  const handleThumbnailClick = (lecture: any) => {
    setSelectedVideo(lecture);
  };

  const handleJoinLive = (lecture: any) => {
    window.open(lecture.meetingLink, '_blank');
    toast.success(`Joining live session: "${lecture.title}"`);
  };

  const handleWatchRecording = (lecture: any) => {
    toast.info(`Loading recording for "${lecture.title}"`);
  };

  const handleTakeExam = (exam: any) => {
    toast.info(`Starting ${exam.type}: "${exam.title}"`);
  };

  const handleViewResults = (exam: any) => {
    toast.info(`Viewing results for "${exam.title}"`);
  };

  const handleProgressClick = (item: any, type: string) => {
    switch(type) {
      case 'grade':
        toast.info(`Grade details: ${item.grade}/${item.maxGrade} (${Math.round((item.grade/item.maxGrade)*100)}%)`);
        break;
      case 'registration':
        toast.info(`${item.registeredParticipants}/${item.maxParticipants} seats filled`);
        break;
      case 'score':
        toast.info(`Best score: ${item.bestScore}/${item.maxScore} - View detailed breakdown`);
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { color: 'bg-green-100 text-green-700', text: 'Completed' },
      'in-progress': { color: 'bg-blue-100 text-blue-700', text: 'In Progress' },
      'pending': { color: 'bg-yellow-100 text-yellow-700', text: 'Pending' },
      'upcoming': { color: 'bg-purple-100 text-purple-700', text: 'Upcoming' },
      'submitted': { color: 'bg-green-100 text-green-700', text: 'Submitted' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Course Materials</h1>
          <p className="text-muted-foreground">Access and manage all your course materials in one place</p>
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
              <DialogDescription>
                Create a new course material item.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="material-type">Material Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.name}
                      </SelectItem>
                    ))}
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

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedMaterialType} onValueChange={setSelectedMaterialType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Materials" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  {materialTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-muted rounded-xl p-1">
          {materialTypes.map(type => {
            const Icon = type.icon;
            return (
              <TabsTrigger key={type.id} value={type.id} className="rounded-lg">
                <Icon className="w-4 h-4 mr-2" />
                {type.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-6">
          <div className="grid gap-4">
            {getFilteredMaterials('notes').map(note => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => handleNoteClick(note)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-purple-600 cursor-pointer hover:text-purple-700" onClick={(e) => { e.stopPropagation(); handleNoteClick(note); }} />
                        <h3 className="font-semibold text-foreground hover:text-purple-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNoteClick(note); }}>{note.title}</h3>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-purple-50" onClick={(e) => { e.stopPropagation(); handleCourseClick(note.courseName); }}>
                          {note.courseName}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 cursor-pointer hover:text-foreground" onClick={(e) => { e.stopPropagation(); handleNoteClick(note); }}>{note.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="cursor-pointer hover:text-purple-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleAuthorClick(note.author); }}>By {note.author}</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleDateClick(note.createdAt, 'created'); }}>{note.createdAt}</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-green-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleStatsClick('downloads', note.downloadCount); }}>{note.downloadCount} downloads</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-orange-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleStatsClick('fileSize', `${note.fileSize} ${note.format}`); }}>{note.fileSize} {note.format}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDownloadClick(note, 'note'); }}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEditClick(note); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="mt-6">
          <div className="grid gap-4">
            {getFilteredMaterials('assignments').map(assignment => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => handleViewAssignment(assignment)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <ClipboardList className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" onClick={(e) => { e.stopPropagation(); handleViewAssignment(assignment); }} />
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleViewAssignment(assignment); }}>{assignment.title}</h3>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-blue-50" onClick={(e) => { e.stopPropagation(); handleCourseClick(assignment.courseName); }}>
                          {assignment.courseName}
                        </Badge>
                        <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toast.info(`Assignment status: ${assignment.status}`); }}>
                          {getStatusBadge(assignment.status)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 cursor-pointer hover:text-gray-700" onClick={(e) => { e.stopPropagation(); handleViewAssignment(assignment); }}>{assignment.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="cursor-pointer hover:text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleDateClick(assignment.dueDate, 'due'); }}>Due: {assignment.dueDate}</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-purple-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleAuthorClick(assignment.instructor); }}>Instructor: {assignment.instructor}</span>
                        {assignment.grade && (
                          <>
                            <span>•</span>
                            <span className="text-green-600 font-medium cursor-pointer hover:text-green-700 hover:underline" onClick={(e) => { e.stopPropagation(); handleProgressClick(assignment, 'grade'); }}>
                              Grade: {assignment.grade}/{assignment.maxGrade}
                            </span>
                          </>
                        )}
                      </div>
                      {assignment.status === 'submitted' && assignment.grade && (
                        <div className="mb-3">
                          <Progress value={(assignment.grade / assignment.maxGrade) * 100} className="h-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleProgressClick(assignment, 'grade'); }} />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {assignment.status === 'pending' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={(e) => { e.stopPropagation(); handleSubmitAssignment(assignment); }}>
                          <Upload className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewAssignment(assignment); }}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recorded Lectures Tab */}
        <TabsContent value="recorded-lectures" className="mt-6">
          <div className="grid gap-4">
            {getFilteredMaterials('recorded-lectures').map(lecture => (
              <Card key={lecture.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => handleWatchVideo(lecture)}>
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleThumbnailClick(lecture); }}>
                      <img 
                        src={lecture.thumbnail} 
                        alt={lecture.title}
                        className="w-32 h-20 object-cover rounded-lg hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-white/80 hover:text-white cursor-pointer transition-colors hover:scale-110" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-700" onClick={(e) => { e.stopPropagation(); handleWatchVideo(lecture); }} />
                        <h3 className="font-semibold text-gray-900 hover:text-red-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleWatchVideo(lecture); }}>{lecture.title}</h3>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-red-50" onClick={(e) => { e.stopPropagation(); handleCourseClick(lecture.courseName); }}>
                          {lecture.courseName}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3 cursor-pointer hover:text-gray-700" onClick={(e) => { e.stopPropagation(); handleWatchVideo(lecture); }}>{lecture.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleStatsClick('duration', lecture.duration); }}>Duration: {lecture.duration}</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-green-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleStatsClick('views', lecture.views); }}>{lecture.views} views</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-orange-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleDateClick(lecture.uploadDate, 'created'); }}>Uploaded: {lecture.uploadDate}</span>
                        <span>•</span>
                        <span className="cursor-pointer hover:text-purple-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleAuthorClick(lecture.instructor); }}>{lecture.instructor}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); handleWatchVideo(lecture); }}>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDownloadClick(lecture, 'video'); }}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Lectures Tab */}
        <TabsContent value="live-lectures" className="mt-6">
          <div className="grid gap-4">
            {getFilteredMaterials('live-lectures').map(lecture => (
              <Card key={lecture.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => lecture.status === 'upcoming' ? handleJoinLive(lecture) : handleWatchRecording(lecture)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700" onClick={(e) => { e.stopPropagation(); handleDateClick(`${lecture.scheduledDate} at ${lecture.scheduledTime}`, 'scheduled'); }} />
                        <h3 className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); lecture.status === 'upcoming' ? handleJoinLive(lecture) : handleWatchRecording(lecture); }}>{lecture.title}</h3>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-green-50" onClick={(e) => { e.stopPropagation(); handleCourseClick(lecture.courseName); }}>
                          {lecture.courseName}
                        </Badge>
                        <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toast.info(`Live lecture status: ${lecture.status}`); }}>
                          {getStatusBadge(lecture.status)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 cursor-pointer hover:text-gray-700" onClick={(e) => { e.stopPropagation(); lecture.status === 'upcoming' ? handleJoinLive(lecture) : handleWatchRecording(lecture); }}>{lecture.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600" onClick={(e) => { e.stopPropagation(); handleDateClick(`${lecture.scheduledDate} at ${lecture.scheduledTime}`, 'scheduled'); }}>
                          <Calendar className="w-4 h-4" />
                          <span>{lecture.scheduledDate} at {lecture.scheduledTime}</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-orange-600" onClick={(e) => { e.stopPropagation(); handleStatsClick('duration', lecture.duration); }}>
                          <Clock className="w-4 h-4" />
                          <span>{lecture.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600" onClick={(e) => { e.stopPropagation(); handleProgressClick(lecture, 'registration'); }}>
                          <Users className="w-4 h-4" />
                          <span>{lecture.registeredParticipants}/{lecture.maxParticipants} registered</span>
                        </div>
                        <div className="cursor-pointer hover:text-green-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleAuthorClick(lecture.instructor); }}>
                          <span>Instructor: {lecture.instructor}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Progress value={(lecture.registeredParticipants / lecture.maxParticipants) * 100} className="h-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleProgressClick(lecture, 'registration'); }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {lecture.status === 'upcoming' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={(e) => { e.stopPropagation(); handleJoinLive(lecture); }}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Join Live
                        </Button>
                      )}
                      {lecture.status === 'completed' && (
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleWatchRecording(lecture); }}>
                          <Video className="w-4 h-4 mr-2" />
                          Watch Recording
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exams/Tests Tab */}
        <TabsContent value="exams" className="mt-6">
          <div className="grid gap-4">
            {getFilteredMaterials('exams').map(exam => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => exam.status === 'completed' ? handleViewResults(exam) : handleTakeExam(exam)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-5 h-5 text-orange-600 cursor-pointer hover:text-orange-700" onClick={(e) => { e.stopPropagation(); exam.status === 'completed' ? handleViewResults(exam) : handleTakeExam(exam); }} />
                        <h3 className="font-semibold text-gray-900 hover:text-orange-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); exam.status === 'completed' ? handleViewResults(exam) : handleTakeExam(exam); }}>{exam.title}</h3>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-orange-50" onClick={(e) => { e.stopPropagation(); handleCourseClick(exam.courseName); }}>
                          {exam.courseName}
                        </Badge>
                        <Badge className={`text-xs cursor-pointer hover:opacity-80 ${
                          exam.type === 'quiz' ? 'bg-blue-100 text-blue-700' :
                          exam.type === 'exam' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        } border-0`} onClick={(e) => { e.stopPropagation(); toast.info(`This is a ${exam.type}`); }}>
                          {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                        </Badge>
                        <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toast.info(`Exam status: ${exam.status}`); }}>
                          {getStatusBadge(exam.status)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 cursor-pointer hover:text-gray-700" onClick={(e) => { e.stopPropagation(); exam.status === 'completed' ? handleViewResults(exam) : handleTakeExam(exam); }}>{exam.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                        <div className="cursor-pointer hover:text-blue-600" onClick={(e) => { e.stopPropagation(); handleStatsClick('questions', exam.questions); }}>
                          <span>Questions: {exam.questions}</span>
                        </div>
                        <div className="cursor-pointer hover:text-orange-600" onClick={(e) => { e.stopPropagation(); handleStatsClick('duration', exam.duration); }}>
                          <span>Duration: {exam.duration}</span>
                        </div>
                        <div className="cursor-pointer hover:text-red-600" onClick={(e) => { e.stopPropagation(); handleDateClick(exam.dueDate, 'due'); }}>
                          <span>Due: {exam.dueDate}</span>
                        </div>
                        <div className="cursor-pointer hover:text-purple-600" onClick={(e) => { e.stopPropagation(); handleStatsClick('attempts', `${exam.attempts}/${exam.maxAttempts}`); }}>
                          <span>Attempts: {exam.attempts}/{exam.maxAttempts}</span>
                        </div>
                        <div className="cursor-pointer hover:text-green-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleAuthorClick(exam.instructor); }}>
                          <span>Instructor: {exam.instructor}</span>
                        </div>
                        {exam.bestScore && (
                          <div className="cursor-pointer hover:text-emerald-600" onClick={(e) => { e.stopPropagation(); handleProgressClick(exam, 'score'); }}>
                            <span>Best Score: {exam.bestScore}/{exam.maxScore}</span>
                          </div>
                        )}
                      </div>
                      {exam.bestScore && (
                        <div className="mb-3">
                          <Progress value={(exam.bestScore / exam.maxScore) * 100} className="h-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleProgressClick(exam, 'score'); }} />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {exam.status === 'upcoming' && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={(e) => { e.stopPropagation(); handleTakeExam(exam); }}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start {exam.type}
                        </Button>
                      )}
                      {exam.status === 'in-progress' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); handleTakeExam(exam); }}>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      )}
                      {exam.status === 'completed' && (
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewResults(exam); }}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
}