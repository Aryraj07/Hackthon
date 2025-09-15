import { useState, useMemo } from 'react';
import { Search, Filter, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CategoryTabs } from './CategoryTabs';
import { CourseCard } from './CourseCard';
import { useLanguage } from '../App';

const coursesData = [
  {
    id: 1,
    title: "Complete Machine Learning & AI Bootcamp",
    instructor: "Dr. Sarah Johnson",
    lessons: 45,
    duration: "12h 30m",
    rating: 4.8,
    students: 15420,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI/ML",
    categoryId: "ai",
    price: "₹2,999"
  },
  {
    id: 2,
    title: "Cybersecurity Fundamentals & Ethical Hacking",
    instructor: "Prof. Michael Chen",
    lessons: 38,
    duration: "18h 45m",
    rating: 4.7,
    students: 8930,
    thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cyber Security",
    categoryId: "cyber",
    price: "₹3,499"
  },
  {
    id: 3,
    title: "Data Science with Python & R",
    instructor: "Dr. Emily Rodriguez",
    lessons: 52,
    duration: "20h 15m",
    rating: 4.9,
    students: 12350,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Data Science",
    categoryId: "data",
    price: "FREE"
  },
  {
    id: 4,
    title: "Business Strategy & Leadership",
    instructor: "James Wilson MBA",
    lessons: 28,
    duration: "14h 20m",
    rating: 4.6,
    students: 6780,
    thumbnail: "https://images.unsplash.com/photo-1518818608552-195ed130cdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NTY0OTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Business",
    categoryId: "business",
    price: "FREE"
  },
  {
    id: 19,
    title: "Introduction to Classical Piano",
    instructor: "Maria Soprano",
    lessons: 24,
    duration: "8h 30m",
    rating: 4.9,
    students: 3420,
    thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwaWFubyUyMG11c2ljJTIwY2xhc3NpY2FsfGVufDF8fHx8MTc1Njc5NTEyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Music",
    categoryId: "music",
    price: "₹2,999"
  }
];

interface CourseDiscoveryProps {
  onCourseClick: (courseId: number) => void;
  onBack: () => void;
}

export function CourseDiscovery({ onCourseClick, onBack }: CourseDiscoveryProps) {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = useMemo(() => {
    let courses = activeCategory === 'all' 
      ? coursesData 
      : coursesData.filter(course => course.categoryId === activeCategory);

    if (searchQuery) {
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return courses;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Discover Skills</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive course catalog and find the perfect learning path for you.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses, instructors, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-foreground">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Courses'}
          </h2>
          <p className="text-muted-foreground">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="animate-in fade-in duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CourseCard
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                lessons={course.lessons}
                duration={course.duration}
                rating={course.rating}
                students={course.students}
                thumbnail={course.thumbnail}
                category={course.category}
                price={course.price}
                onClick={onCourseClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse different categories.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="rounded-xl"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Featured Section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Can't find what you're looking for?
          </h3>
          <p className="text-muted-foreground">
            Explore our personalized learning paths or contact our education consultants.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onBack()}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            View Learning Paths
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl border-purple-200 hover:bg-purple-50"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}