import { useState, useMemo, useCallback } from 'react';
import { Play, Search, Filter, Clock, Calendar, BookOpen, Eye, Download, Bookmark, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { VideoPlayer } from './VideoPlayer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { useTheme } from '../App';

interface Lecture {
  id: number;
  title: string;
  courseTitle: string;
  instructor: string;
  duration: string; // in format "HH:MM:SS"
  uploadDate: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  watchProgress: number; // percentage watched
  isBookmarked: boolean;
  transcriptAvailable: boolean;
  downloadable: boolean;
  views: number;
  tags: string[];
}

const mockLectures: Lecture[] = [
  {
    id: 1,
    title: 'Introduction to Neural Networks',
    courseTitle: 'Deep Learning Fundamentals',
    instructor: 'Dr. Rajesh Kumar',
    duration: '1:45:30',
    uploadDate: '2024-12-15',
    description: 'Comprehensive introduction to neural networks, covering perceptrons, activation functions, and basic architectures.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'AI/ML',
    difficulty: 'Beginner',
    watchProgress: 75,
    isBookmarked: true,
    transcriptAvailable: true,
    downloadable: true,
    views: 1245,
    tags: ['Neural Networks', 'Deep Learning', 'AI', 'Python']
  },
  {
    id: 2,
    title: 'Advanced JavaScript Concepts',
    courseTitle: 'Modern Web Development',
    instructor: 'Mr. Arjun Patel',
    duration: '2:15:45',
    uploadDate: '2024-12-10',
    description: 'Deep dive into closures, promises, async/await, and modern JavaScript features.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'Web Development',
    difficulty: 'Advanced',
    watchProgress: 100,
    isBookmarked: false,
    transcriptAvailable: true,
    downloadable: false,
    views: 892,
    tags: ['JavaScript', 'ES6+', 'Promises', 'Async Programming']
  },
  {
    id: 3,
    title: 'Data Structures: Trees and Graphs',
    courseTitle: 'Computer Science Fundamentals',
    instructor: 'Prof. Anjali Sharma',
    duration: '1:30:20',
    uploadDate: '2024-12-08',
    description: 'Comprehensive coverage of tree and graph data structures with practical implementations.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'Programming',
    difficulty: 'Intermediate',
    watchProgress: 45,
    isBookmarked: true,
    transcriptAvailable: false,
    downloadable: true,
    views: 567,
    tags: ['Data Structures', 'Algorithms', 'Trees', 'Graphs', 'C++']
  },
  {
    id: 4,
    title: 'Digital Marketing Analytics',
    courseTitle: 'Marketing Strategy',
    instructor: 'Ms. Priya Singh',
    duration: '1:20:15',
    uploadDate: '2024-12-05',
    description: 'Learn to analyze marketing campaigns using Google Analytics and other tools.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'Marketing',
    difficulty: 'Intermediate',
    watchProgress: 0,
    isBookmarked: false,
    transcriptAvailable: true,
    downloadable: true,
    views: 234,
    tags: ['Analytics', 'Google Analytics', 'Marketing', 'ROI']
  },
  {
    id: 5,
    title: 'Python for Data Science',
    courseTitle: 'Data Science Bootcamp',
    instructor: 'Dr. Vikram Gupta',
    duration: '2:45:30',
    uploadDate: '2024-12-01',
    description: 'Complete introduction to Python libraries for data science including NumPy, Pandas, and Matplotlib.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'Data Science',
    difficulty: 'Beginner',
    watchProgress: 60,
    isBookmarked: true,
    transcriptAvailable: true,
    downloadable: false,
    views: 1567,
    tags: ['Python', 'Data Science', 'NumPy', 'Pandas', 'Matplotlib']
  },
  {
    id: 6,
    title: 'Cybersecurity Fundamentals',
    courseTitle: 'Information Security',
    instructor: 'Mr. Rohit Mehta',
    duration: '1:55:40',
    uploadDate: '2024-11-28',
    description: 'Essential cybersecurity concepts including encryption, network security, and threat assessment.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'Cyber Security',
    difficulty: 'Beginner',
    watchProgress: 25,
    isBookmarked: false,
    transcriptAvailable: false,
    downloadable: true,
    views: 789,
    tags: ['Cybersecurity', 'Encryption', 'Network Security', 'Threats']
  },
  {
    id: 7,
    title: 'Business Intelligence with Power BI',
    courseTitle: 'Business Analytics',
    instructor: 'Ms. Kavita Agarwal',
    duration: '2:10:25',
    uploadDate: '2024-11-25',
    description: 'Learn to create interactive dashboards and reports using Microsoft Power BI.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'Business',
    difficulty: 'Intermediate',
    watchProgress: 90,
    isBookmarked: true,
    transcriptAvailable: true,
    downloadable: true,
    views: 445,
    tags: ['Power BI', 'Business Intelligence', 'Dashboards', 'Analytics']
  },
  {
    id: 8,
    title: 'React Hooks Deep Dive',
    courseTitle: 'Advanced React Development',
    instructor: 'Mr. Suresh Patel',
    duration: '1:35:15',
    uploadDate: '2024-11-20',
    description: 'Master React Hooks including useState, useEffect, useContext, and custom hooks.',
    thumbnail: '/api/placeholder/400/225',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'Web Development',
    difficulty: 'Advanced',
    watchProgress: 0,
    isBookmarked: false,
    transcriptAvailable: true,
    downloadable: false,
    views: 623,
    tags: ['React', 'Hooks', 'useState', 'useEffect', 'Frontend']
  }
];

export function RecordedLectures() {
  const { actualTheme } = useTheme();
  const [lectures, setLectures] = useState(mockLectures);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [showBookmarked, setShowBookmarked] = useState(false);

  // Filter lectures
  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecture.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecture.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecture.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || lecture.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lecture.difficulty === selectedDifficulty;
    const matchesBookmark = !showBookmarked || lecture.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  const categories = [...new Set(lectures.map(l => l.category))];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const toggleBookmark = (lectureId: number) => {
    setLectures(prev => prev.map(lecture => 
      lecture.id === lectureId 
        ? { ...lecture, isBookmarked: !lecture.isBookmarked }
        : lecture
    ));
  };

  const formatDuration = (duration: string) => {
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  // Statistics
  const totalLectures = lectures.length;
  const completedLectures = lectures.filter(l => l.watchProgress === 100).length;
  const totalWatchTime = lectures.reduce((acc, lecture) => {
    const parts = lecture.duration.split(':');
    return acc + parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }, 0);
  const bookmarkedCount = lectures.filter(l => l.isBookmarked).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Recorded Lectures
        </h1>
        <p className="text-muted-foreground">
          Access your course lectures anytime, anywhere
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Total Lectures</h3>
            <Play className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            {totalLectures}
          </div>
          <p className="text-sm text-muted-foreground">Available videos</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-semibold text-green-600 mb-1">
            {completedLectures}
          </div>
          <p className="text-sm text-muted-foreground">Watched completely</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Watch Time</h3>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-semibold text-purple-600 mb-1">
            {Math.round(totalWatchTime / 60)}h
          </div>
          <p className="text-sm text-muted-foreground">Total content</p>
        </div>
        
        <div className="bg-card rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-card-foreground">Bookmarked</h3>
            <Bookmark className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold text-orange-600 mb-1">
            {bookmarkedCount}
          </div>
          <p className="text-sm text-muted-foreground">Saved for later</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search lectures, courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-2xl"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 rounded-2xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-40 rounded-2xl">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant={showBookmarked ? "default" : "outline"}
          onClick={() => setShowBookmarked(!showBookmarked)}
          className={showBookmarked 
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl" 
            : "hover:bg-purple-50 rounded-2xl"
          }
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Bookmarked
        </Button>
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="bg-card rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <img
                src={lecture.thumbnail}
                alt={lecture.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-black"
                      onClick={() => setSelectedLecture(lecture)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                    <DialogHeader className="p-6 pb-2">
                      <DialogTitle>{selectedLecture?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedLecture && (
                      <div className="px-6 pb-6">
                        <VideoPlayer
                          video={{
                            id: selectedLecture.id,
                            title: selectedLecture.title,
                            courseId: selectedLecture.id, // Using lecture id as course id for now
                            courseName: selectedLecture.courseTitle,
                            description: selectedLecture.description,
                            duration: selectedLecture.duration,
                            views: selectedLecture.views,
                            uploadDate: selectedLecture.uploadDate,
                            instructor: selectedLecture.instructor,
                            thumbnail: selectedLecture.thumbnail
                          }}
                          onClose={() => setSelectedLecture(null)}
                        />
                        <div className="mt-4">
                          <p className="text-muted-foreground mb-2">
                            {selectedLecture.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedLecture.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(lecture.duration)}
              </div>
              
              {/* Progress Bar */}
              {lecture.watchProgress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50">
                  <div 
                    className={`h-1 ${getProgressColor(lecture.watchProgress)}`}
                    style={{ width: `${lecture.watchProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-card-foreground line-clamp-2 flex-1">
                  {lecture.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(lecture.id)}
                  className="p-1 hover:bg-purple-50 ml-2"
                >
                  <Bookmark 
                    className={`w-4 h-4 ${lecture.isBookmarked ? 'fill-purple-500 text-purple-500' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{lecture.courseTitle}</p>
              <p className="text-sm text-muted-foreground mb-4">by {lecture.instructor}</p>
              
              <div className="flex items-center justify-between mb-4">
                <Badge className={getDifficultyColor(lecture.difficulty)}>
                  {lecture.difficulty}
                </Badge>
                <Badge variant="outline">
                  {lecture.category}
                </Badge>
              </div>

              {lecture.watchProgress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{lecture.watchProgress}%</span>
                  </div>
                  <Progress value={lecture.watchProgress} className="h-2" />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {lecture.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(lecture.uploadDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {lecture.transcriptAvailable && (
                  <Badge variant="outline" className="text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Transcript
                  </Badge>
                )}
                {lecture.downloadable && (
                  <Badge variant="outline" className="text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLectures.length === 0 && (
        <div className="bg-card rounded-2xl shadow-sm border p-12 text-center">
          <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No lectures found
          </h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || showBookmarked
              ? "Try adjusting your filters to find more lectures."
              : "No recorded lectures available yet."
            }
          </p>
        </div>
      )}
    </div>
  );
}