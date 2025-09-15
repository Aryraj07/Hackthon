import { Star, Users, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  thumbnail: string;
  category: string;
  price?: string;
  onClick?: (courseId: number) => void;
}

export function CourseCard({
  id,
  title,
  instructor,
  lessons,
  duration,
  rating,
  students,
  thumbnail,
  category,
  price,
  onClick
}: CourseCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      className="group hover:shadow-lg transition-all duration-300 rounded-2xl border-0 shadow-sm hover:shadow-purple-100 cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-purple-600 hover:bg-white rounded-lg">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-5">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3">by {instructor}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{students.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-400">({Math.floor(students/10)})</span>
          </div>
          {price && (
            <div className={`font-semibold ${
              price === 'FREE' ? 'text-green-600' : 'text-purple-600'
            }`}>
              {price}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}