import { useState } from 'react';
import { Bell, Award, MessageCircle, BookOpen, Clock, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../App';

interface Notification {
  id: number;
  type: 'achievement' | 'message' | 'course' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  courseId?: number;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'achievement',
    title: 'Certificate Earned!',
    message: 'Congratulations! You have earned a certificate for "Introduction to Machine Learning"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message from Dr. Rajesh Kumar',
    message: 'Your assignment submission has been reviewed. Great work on the data analysis!',
    time: '4 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'course',
    title: 'New Course Available',
    message: 'Advanced Python Programming is now available. Enroll now to get early bird discount!',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Assignment Due Soon',
    message: 'Your Data Structures assignment is due in 2 days. Don\'t forget to submit!',
    time: '2 days ago',
    read: false,
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Learning Streak',
    message: 'Amazing! You\'ve maintained a 7-day learning streak. Keep it up!',
    time: '3 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'message',
    title: 'New Message from Prof. Anjali Sharma',
    message: 'The recorded lecture for Chapter 5 has been uploaded. Check it out!',
    time: '1 week ago',
    read: true,
  },
];

export function Notifications() {
  const { actualTheme } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'course':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated with your learning progress and important updates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {unreadCount} Unread
          </Badge>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              className="hover:bg-purple-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          onClick={() => setFilter('all')}
          className={filter === 'all' 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
            : 'hover:bg-purple-50'
          }
        >
          All Notifications ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'ghost'}
          onClick={() => setFilter('unread')}
          className={filter === 'unread' 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
            : 'hover:bg-purple-50'
          }
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-sm border p-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No notifications
            </h3>
            <p className="text-muted-foreground">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card rounded-2xl shadow-sm border p-6 transition-all duration-200 hover:shadow-md ${
                !notification.read 
                  ? actualTheme === 'dark' 
                    ? 'border-purple-400/30 bg-purple-900/10' 
                    : 'border-purple-200 bg-purple-50/50'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-1">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
                        )}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="hover:bg-purple-50 text-purple-600"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      {notifications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-card-foreground">Total</h3>
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-semibold text-blue-600 mb-1">
              {notifications.length}
            </div>
            <p className="text-sm text-muted-foreground">All notifications</p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-card-foreground">Achievements</h3>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-semibold text-yellow-600 mb-1">
              {notifications.filter(n => n.type === 'achievement').length}
            </div>
            <p className="text-sm text-muted-foreground">Certificates & badges</p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-card-foreground">Messages</h3>
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-semibold text-green-600 mb-1">
              {notifications.filter(n => n.type === 'message').length}
            </div>
            <p className="text-sm text-muted-foreground">From instructors</p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-card-foreground">Reminders</h3>
              <Clock className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-semibold text-red-600 mb-1">
              {notifications.filter(n => n.type === 'reminder').length}
            </div>
            <p className="text-sm text-muted-foreground">Assignments & deadlines</p>
          </div>
        </div>
      )}
    </div>
  );
}