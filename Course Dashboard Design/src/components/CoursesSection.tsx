import { useState, useEffect, useMemo, useCallback } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { CourseCard } from './CourseCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, BookOpen } from 'lucide-react';

const coursesData = [
  {
    id: 1,
    title: "Complete Machine Learning & AI Bootcamp",
    instructor: "Dr. Sarah Johnson",
    lessons: 45,
    duration: "12h 30m",
    rating: 4.8,
    students: 15420,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    thumbnail: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    thumbnail: "https://images.unsplash.com/photo-1518818608552-195ed130cdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NTY0OTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Business",
    categoryId: "business",
    price: "FREE"
  },
  {
    id: 5,
    title: "Advanced Neural Networks",
    instructor: "Dr. Alex Thompson",
    lessons: 35,
    duration: "16h 30m",
    rating: 4.8,
    students: 9540,
    thumbnail: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "AI/ML",
    categoryId: "ai",
    price: "₹4,999"
  },
  {
    id: 6,
    title: "Executive MBA Essentials",
    instructor: "Prof. Lisa Anderson",
    lessons: 42,
    duration: "25h 10m",
    rating: 4.7,
    students: 5420,
    thumbnail: "https://images.unsplash.com/photo-1518818608552-195ed130cdf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NTY0OTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "MBA",
    categoryId: "mba",
    price: "₹5,999"
  },
  // Additional courses for "View All"
  {
    id: 7,
    title: "Full-Stack Web Development Bootcamp",
    instructor: "David Martinez",
    lessons: 68,
    duration: "35h 45m",
    rating: 4.8,
    students: 18750,
    thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Web Development",
    categoryId: "web",
    price: "FREE"
  },
  {
    id: 8,
    title: "React Native Mobile App Development",
    instructor: "Jessica Park",
    lessons: 41,
    duration: "22h 30m",
    rating: 4.7,
    students: 11420,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2OTE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Mobile Development",
    categoryId: "mobile",
    price: "₹4,999"
  },
  {
    id: 9,
    title: "Digital Marketing & Social Media Strategy",
    instructor: "Amanda Foster",
    lessons: 33,
    duration: "16h 15m",
    rating: 4.6,
    students: 14230,
    thumbnail: "https://images.unsplash.com/photo-1547621008-d6d6d2e28e81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzU2NjUyOTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Marketing",
    categoryId: "marketing",
    price: "₹2,499"
  },
  {
    id: 10,
    title: "UI/UX Design Masterclass",
    instructor: "Robert Kim",
    lessons: 47,
    duration: "28h 20m",
    rating: 4.9,
    students: 16890,
    thumbnail: "https://images.unsplash.com/photo-1689267166710-3875ccf73d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzU2NzA4Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Design",
    categoryId: "design",
    price: "₹3,999"
  },
  {
    id: 11,
    title: "Cloud Computing with AWS & Azure",
    instructor: "Marcus Johnson",
    lessons: 39,
    duration: "24h 45m",
    rating: 4.8,
    students: 9870,
    thumbnail: "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NzA1NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cloud Computing",
    categoryId: "cloud",
    price: "₹4,999"
  },
  {
    id: 12,
    title: "Blockchain & Cryptocurrency Fundamentals",
    instructor: "Dr. Elena Vasquez",
    lessons: 29,
    duration: "18h 30m",
    rating: 4.5,
    students: 7340,
    thumbnail: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzU2NzA5OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Blockchain",
    categoryId: "blockchain",
    price: "₹3,499"
  },
  {
    id: 13,
    title: "Advanced Project Management (PMP)",
    instructor: "Carol Thompson",
    lessons: 36,
    duration: "21h 15m",
    rating: 4.7,
    students: 12560,
    thumbnail: "https://images.unsplash.com/photo-1627634771105-08a3a12ad228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHRlYW18ZW58MXx8fHwxNzU2NzMxMzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Project Management",
    categoryId: "project",
    price: "₹4,499"
  },
  {
    id: 14,
    title: "Financial Planning & Investment Analysis",
    instructor: "William Zhang",
    lessons: 44,
    duration: "26h 40m",
    rating: 4.6,
    students: 8930,
    thumbnail: "https://images.unsplash.com/photo-1638481826540-7710b13f7d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwaW52ZXN0bWVudCUyMHRyYWRpbmd8ZW58MXx8fHwxNzU2NzM1NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Finance",
    categoryId: "finance",
    price: "₹4,999"
  },
  {
    id: 15,
    title: "Python Programming for Beginners",
    instructor: "Rachel Adams",
    lessons: 32,
    duration: "15h 20m",
    rating: 4.8,
    students: 22340,
    thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY3MzU0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Programming",
    categoryId: "programming",
    price: "FREE"
  },
  {
    id: 16,
    title: "Advanced SQL & Database Management",
    instructor: "Dr. Kevin Liu",
    lessons: 37,
    duration: "19h 50m",
    rating: 4.7,
    students: 10450,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1MjUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Data Science",
    categoryId: "data",
    price: "₹3,999"
  },
  {
    id: 17,
    title: "DevOps & Continuous Integration",
    instructor: "Tom Wilson",
    lessons: 43,
    duration: "27h 30m",
    rating: 4.6,
    students: 7890,
    thumbnail: "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NzA1NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "DevOps",
    categoryId: "devops",
    price: "₹4,499"
  },
  {
    id: 18,
    title: "Game Development with Unity",
    instructor: "Alex Rivera",
    lessons: 51,
    duration: "32h 15m",
    rating: 4.8,
    students: 13560,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2OTE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Game Development",
    categoryId: "game",
    price: "₹5,999"
  },
  {
    id: 19,
    title: "Introduction to Classical Piano",
    instructor: "Maria Soprano",
    lessons: 24,
    duration: "8h 30m",
    rating: 4.9,
    students: 3420,
    thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMG11c2ljJTIwY2xhc3NpY2FsfGVufDF8fHx8MTc1Njc5NTEyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Music",
    categoryId: "music",
    price: "₹2,999"
  }
];

// Mock enrollment data to determine which courses are enrolled
const enrolledCourses = [1, 2, 4, 8]; // Course IDs that user is enrolled in

interface CoursesSectionProps {
  onCourseClick: (courseId: number, videoId?: number, tab?: string) => void;
  onCourseManage: (courseId: number) => void;
}

export function CoursesSection({ onCourseClick, onCourseManage }: CoursesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCourses, setShowAllCourses] = useState(false);

  const filteredCourses = useMemo(() => {
    return activeCategory === 'all' 
      ? coursesData 
      : coursesData.filter(course => course.categoryId === activeCategory);
  }, [activeCategory]);

  // Show only first 6 courses initially, or all if "View all" is clicked
  const displayedCourses = useMemo(() => {
    return showAllCourses ? filteredCourses : filteredCourses.slice(0, 6);
  }, [showAllCourses, filteredCourses]);

  const handleViewAllClick = useCallback(() => {
    setShowAllCourses(!showAllCourses);
  }, [showAllCourses]);

  // Reset showAllCourses when category changes
  useEffect(() => {
    setShowAllCourses(false);
  }, [activeCategory]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Recommended Courses</h2>
        <Button 
          variant="ghost" 
          onClick={handleViewAllClick}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl"
        >
          {showAllCourses ? 'Show less' : `View all (${filteredCourses.length})`}
        </Button>
      </div>
      
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course, index) => (
          <div 
            key={course.id} 
            className="animate-in fade-in duration-300 relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Enrollment badge for enrolled courses */}
            {enrolledCourses.includes(course.id) && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-100 text-green-700 border-0">
                  Enrolled
                </Badge>
              </div>
            )}
            
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
            
            {/* Manage Course button for enrolled courses */}
            {enrolledCourses.includes(course.id) && (
              <div className="absolute bottom-4 right-4 z-10">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCourseManage?.(course.id);
                  }}
                  className="bg-white/90 text-purple-600 hover:bg-white border border-purple-200 rounded-xl shadow-sm"
                  variant="outline"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredCourses.length > 6 && (
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            {showAllCourses 
              ? `Showing all ${filteredCourses.length} courses` 
              : `Showing 6 of ${filteredCourses.length} courses`}
          </p>
        </div>
      )}
    </div>
  );
}