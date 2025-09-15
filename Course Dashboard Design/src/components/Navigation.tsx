import { useState } from 'react';
import { Search, Home, Bell, Settings, MessageCircle, ChevronDown, FileText, Video, ClipboardList, Calendar, BarChart3, Award, FolderOpen, LogOut } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../App';
import { getTranslation } from './translations';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const quickAccessItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'materials', icon: FolderOpen, label: 'Course Materials' },
  { id: 'notes', icon: FileText, label: 'Notes' },
  { id: 'lectures', icon: Video, label: 'Lectures' },
  { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
  { id: 'tests', icon: BarChart3, label: 'Tests' },
  { id: 'results', icon: Award, label: 'Results' },
];

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  userEmail?: string;
}

export function Navigation({ activeView, onViewChange, onLogout, userEmail }: NavigationProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { language } = useLanguage();

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };
  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo, Navigation and Search */}
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-foreground">LearnHub</h1>
          
          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => onViewChange('course-discovery')}
                  className="rounded-xl hover:bg-purple-50 font-medium"
                >
                  Courses
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-xl hover:bg-purple-50">
                  Quick Access
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-2">
                    <div className="grid grid-cols-2 gap-1">
                      {quickAccessItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeView === item.id;
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => onViewChange(item.id)}
                            className={`flex items-center gap-3 justify-start p-3 rounded-xl transition-all duration-200 ${
                              isActive 
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                                : 'hover:bg-purple-50 text-gray-700'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={language ? getTranslation(language, 'search') : 'Search courses, instructors...'}
              className="pl-10 w-96 rounded-2xl bg-muted border-0 focus:ring-2 focus:ring-purple-500 focus:bg-background"
            />
          </div>
        </div>

        {/* Right side - Language, Icons and Profile */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange('dashboard')}
            className={`p-2 rounded-xl transition-all duration-200 ${
              activeView === 'dashboard' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                : 'hover:bg-purple-50'
            }`}
          >
            <Home className={`w-5 h-5 ${activeView === 'dashboard' ? 'text-white' : 'text-gray-600'}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange('messages')}
            className={`p-2 rounded-xl relative transition-all duration-200 ${
              activeView === 'messages' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                : 'hover:bg-purple-50'
            }`}
          >
            <MessageCircle className={`w-5 h-5 ${activeView === 'messages' ? 'text-white' : 'text-gray-600'}`} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange('notifications')}
            className={`p-2 rounded-xl relative transition-all duration-200 ${
              activeView === 'notifications' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                : 'hover:bg-purple-50'
            }`}
          >
            <Bell className={`w-5 h-5 ${activeView === 'notifications' ? 'text-white' : 'text-gray-600'}`} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange('profile')}
            className={`p-2 rounded-xl transition-all duration-200 ${
              activeView === 'profile' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                : 'hover:bg-purple-50'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeView === 'profile' ? 'text-white' : 'text-gray-600'}`} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-purple-50 rounded-xl p-2 transition-all duration-200">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    PS
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-foreground">xyz shishya</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-lg">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">xyz shishya</p>
                <p className="text-xs text-muted-foreground">{userEmail || 'priya.sharma@example.com'}</p>
              </div>
              <DropdownMenuItem 
                className="rounded-lg cursor-pointer hover:bg-purple-50 transition-colors duration-200"
                onClick={() => onViewChange('profile')}
              >
                <Settings className="w-4 h-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg cursor-pointer hover:bg-purple-50 transition-colors duration-200"
                onClick={() => onViewChange('settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg cursor-pointer hover:bg-purple-50 transition-colors duration-200"
                onClick={() => onViewChange('certificates')}
              >
                <Award className="w-4 h-4 mr-2" />
                My Certificates
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="rounded-lg text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {language ? getTranslation(language, 'logout') : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}