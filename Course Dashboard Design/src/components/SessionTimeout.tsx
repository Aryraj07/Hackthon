import { useEffect, useState } from 'react';
import { useAuth } from '../App';
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
import { toast } from 'sonner@2.0.3';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout

export function SessionTimeout() {
  const { isAuthenticated, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      setLastActivity(Date.now());
      setShowWarning(false);
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Check for timeout every minute
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;

      if (timeSinceActivity >= SESSION_TIMEOUT) {
        logout();
        toast.error('Session expired', {
          description: 'You have been signed out due to inactivity.',
        });
      } else if (timeSinceActivity >= SESSION_TIMEOUT - WARNING_TIME && !showWarning) {
        setShowWarning(true);
      }
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated, lastActivity, showWarning, logout]);

  const extendSession = () => {
    setLastActivity(Date.now());
    setShowWarning(false);
    toast.success('Session extended', {
      description: 'Your session has been extended.',
    });
  };

  const handleLogout = () => {
    logout();
    setShowWarning(false);
  };

  if (!isAuthenticated) return null;

  return (
    <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Timeout Warning</AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in 5 minutes due to inactivity. 
            Would you like to extend your session?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLogout}>
            Sign Out
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={extendSession}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Extend Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}