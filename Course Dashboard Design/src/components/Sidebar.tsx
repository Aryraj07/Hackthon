import { BookOpen, FileText, Video, ClipboardList, Calendar, BarChart3, Award, FolderOpen, Settings, MapPin, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

const getSidebarItems = (language: string) => [
  { id: 'dashboard', icon: BookOpen, label: 'My Courses' },
  { id: 'learning-path', icon: TrendingUp, label: language ? getTranslation(language, 'myLearningPath') : 'My Learning Path' },
  { id: 'materials', icon: FolderOpen, label: 'Course Materials' },
  { id: 'notes', icon: FileText, label: language ? getTranslation(language, 'notes') : 'Notes' },
  { id: 'lectures', icon: Video, label: 'Recorded Lectures' },
  { id: 'tests', icon: BarChart3, label: language ? getTranslation(language, 'tests') : 'Tests' },
  { id: 'nearby-centers', icon: MapPin, label: language ? getTranslation(language, 'nearbyCenters') : 'Nearby Centers' },
  { id: 'settings', icon: Settings, label: language ? getTranslation(language, 'settings') : 'Settings' },
  { id: 'results', icon: Award, label: 'Results' },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { language } = useLanguage();
  const sidebarItems = getSidebarItems(language);
  return (
    <div className="w-64 bg-gradient-to-b from-purple-50 to-blue-50 border-r border-purple-100 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Access</h3>
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onViewChange(item.id)}
              className={`w-full justify-start gap-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm' 
                  : 'hover:bg-white/60 text-gray-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-white/50 rounded-2xl">
        <h4 className="font-medium text-gray-900 mb-2">Progress Overview</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            12 out of 16 courses completed
          </div>
        </div>
      </div>
    </div>
  );
}