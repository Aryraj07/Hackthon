import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Book, 
  Award, 
  Settings, 
  Trash2, 
  Download, 
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Edit,
  Save,
  AlertTriangle,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useTheme, useLanguage } from '../App';
import { getTranslation } from './translations';

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, setTheme, actualTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  // User data state
  const [userData, setUserData] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    dateOfBirth: '2001-03-22',
    address: 'Sector 15, Dwarka, New Delhi, India',
    bio: 'Computer Science student passionate about AI/ML and web development. Currently pursuing B.Tech and eager to learn new technologies.',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Computer Science Student',
    company: 'Delhi Technological University',
    experience: 'Student (Final Year)',
    interests: ['Machine Learning', 'Web Development', 'Data Science', 'Cybersecurity', 'Mobile App Development']
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseReminders: true,
    weeklyProgress: true,
    profileVisibility: 'public',
    showProgress: true,
    allowMessages: true,
    dataProcessing: true,
    marketingEmails: false,
    language: 'english',
    timezone: 'asia-kolkata'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSavePersonal = () => {
    toast.success(getTranslation(language, 'personalInfo') + ' updated successfully!');
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData(prev => ({ ...prev, profileImage: e.target?.result as string }));
          toast.success('Profile photo updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated successfully!');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme === 'system' ? getTranslation(language, 'systemPreference') : newTheme} mode!`);
  };

  const handleExportData = () => {
    toast.info('Preparing your data export... This may take a few minutes.');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion initiated. You will receive a confirmation email.');
  };

  const learningStats = {
    coursesCompleted: 8,
    certificatesEarned: 5,
    studyHours: 89,
    currentStreak: 7,
    averageScore: 92,
    favoriteTopic: 'Machine Learning'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{getTranslation(language, 'profileSettings')}</h1>
          <p className="text-muted-foreground">{getTranslation(language, 'manageAccount')}</p>
        </div>
        <Button 
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-red-600 hover:bg-red-700" : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              {getTranslation(language, 'cancel')}
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              {getTranslation(language, 'editProfile')}
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.profileImage} alt="Profile" />
                <AvatarFallback className="text-2xl">{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={handleImageUpload}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  {userData.firstName} {userData.lastName}
                </h2>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  {getTranslation(language, 'verifiedAccount')}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-1">{userData.jobTitle} • {userData.company}</p>
              <p className="text-muted-foreground/80 text-sm mb-4">{userData.email}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border dark:border-purple-800/30">
                  <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{learningStats.coursesCompleted}</div>
                  <div className="text-xs text-muted-foreground">{getTranslation(language, 'courses')}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border dark:border-blue-800/30">
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{learningStats.certificatesEarned}</div>
                  <div className="text-xs text-muted-foreground">{getTranslation(language, 'certificates')}</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border dark:border-green-800/30">
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">{learningStats.studyHours}h</div>
                  <div className="text-xs text-muted-foreground">{getTranslation(language, 'studyTime')}</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border dark:border-orange-800/30">
                  <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">{learningStats.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">{getTranslation(language, 'dayStreak')}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-muted rounded-xl p-1">
          <TabsTrigger value="personal" className="rounded-lg">
            <User className="w-4 h-4 mr-2" />
            {getTranslation(language, 'personal')}
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">
            <Shield className="w-4 h-4 mr-2" />
            {getTranslation(language, 'security')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">
            <Bell className="w-4 h-4 mr-2" />
            {getTranslation(language, 'notifications')}
          </TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-lg">
            <Lock className="w-4 h-4 mr-2" />
            {getTranslation(language, 'privacy')}
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-lg">
            <Settings className="w-4 h-4 mr-2" />
            {getTranslation(language, 'preferences')}
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {getTranslation(language, 'account')}
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'basicInformation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{getTranslation(language, 'firstName')}</Label>
                    <Input 
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{getTranslation(language, 'lastName')}</Label>
                    <Input 
                      id="lastName"
                      value={userData.lastName}
                      onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">{getTranslation(language, 'emailAddress')}</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">{getTranslation(language, 'phoneNumber')}</Label>
                  <Input 
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dob">{getTranslation(language, 'dateOfBirth')}</Label>
                  <Input 
                    id="dob"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={(e) => setUserData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">{getTranslation(language, 'address')}</Label>
                  <Input 
                    id="address"
                    value={userData.address}
                    onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleSavePersonal} className="w-full bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {getTranslation(language, 'saveChanges')}
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'professionalInformation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">{getTranslation(language, 'jobTitle')}</Label>
                  <Input 
                    id="jobTitle"
                    value={userData.jobTitle}
                    onChange={(e) => setUserData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">{getTranslation(language, 'company')}</Label>
                  <Input 
                    id="company"
                    value={userData.company}
                    onChange={(e) => setUserData(prev => ({ ...prev, company: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">{getTranslation(language, 'experience')}</Label>
                  <Select 
                    value={userData.experience} 
                    onValueChange={(value) => setUserData(prev => ({ ...prev, experience: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First Year Student">First Year Student</SelectItem>
                      <SelectItem value="Second Year Student">Second Year Student</SelectItem>
                      <SelectItem value="Third Year Student">Third Year Student</SelectItem>
                      <SelectItem value="Student (Final Year)">Student (Final Year)</SelectItem>
                      <SelectItem value="Recent Graduate">Recent Graduate</SelectItem>
                      <SelectItem value="0-1 years">0-1 years experience</SelectItem>
                      <SelectItem value="1-3 years">1-3 years experience</SelectItem>
                      <SelectItem value="3-5 years">3-5 years experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bio">{getTranslation(language, 'bio')}</Label>
                  <Textarea 
                    id="bio"
                    value={userData.bio}
                    onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label>{getTranslation(language, 'learningInterests')}</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                        {interest}
                        {isEditing && (
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => {
                              const newInterests = userData.interests.filter((_, i) => i !== index);
                              setUserData(prev => ({ ...prev, interests: newInterests }));
                            }}
                          />
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          const newInterest = prompt('Enter new interest:');
                          if (newInterest) {
                            setUserData(prev => ({ ...prev, interests: [...prev.interests, newInterest] }));
                          }
                        }}
                      >
                        {getTranslation(language, 'addInterest')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'changePassword')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">{getTranslation(language, 'currentPassword')}</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="newPassword">{getTranslation(language, 'newPassword')}</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">{getTranslation(language, 'confirmPassword')}</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handlePasswordChange} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Lock className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'updatePassword')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'accountSecurity')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{getTranslation(language, 'twoFactor')}</div>
                    <div className="text-sm text-gray-600">{getTranslation(language, 'twoFactorDesc')}</div>
                  </div>
                  <Switch 
                    checked={false}
                    onCheckedChange={() => toast.info('2FA setup would be implemented here')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{getTranslation(language, 'loginAlerts')}</div>
                    <div className="text-sm text-gray-600">{getTranslation(language, 'loginAlertsDesc')}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium mb-2">{getTranslation(language, 'activeSessions')}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-foreground">{getTranslation(language, 'currentSession')}</div>
                        <div className="text-xs text-muted-foreground">Chrome on Windows • Mumbai, India</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        {getTranslation(language, 'active')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium text-sm text-foreground">{getTranslation(language, 'mobileApp')}</div>
                        <div className="text-xs text-muted-foreground">iOS App • Last active 2 hours ago</div>
                      </div>
                      <Button size="sm" variant="outline">
                        {getTranslation(language, 'revoke')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{getTranslation(language, 'notificationPreferences')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'emailNotifications')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'emailNotificationsDesc')}</div>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'pushNotifications')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'pushNotificationsDesc')}</div>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'courseReminders')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'courseRemindersDesc')}</div>
                </div>
                <Switch 
                  checked={settings.courseReminders}
                  onCheckedChange={(checked) => handleSettingChange('courseReminders', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'weeklyProgress')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'weeklyProgressDesc')}</div>
                </div>
                <Switch 
                  checked={settings.weeklyProgress}
                  onCheckedChange={(checked) => handleSettingChange('weeklyProgress', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'marketingEmails')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'marketingEmailsDesc')}</div>
                </div>
                <Switch 
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{getTranslation(language, 'privacySettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>{getTranslation(language, 'profileVisibility')}</Label>
                <Select 
                  value={settings.profileVisibility} 
                  onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">{getTranslation(language, 'public')}</SelectItem>
                    <SelectItem value="private">{getTranslation(language, 'private')}</SelectItem>
                    <SelectItem value="friends">{getTranslation(language, 'friendsOnly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'showProgress')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'showProgressDesc')}</div>
                </div>
                <Switch 
                  checked={settings.showProgress}
                  onCheckedChange={(checked) => handleSettingChange('showProgress', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'allowMessages')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'allowMessagesDesc')}</div>
                </div>
                <Switch 
                  checked={settings.allowMessages}
                  onCheckedChange={(checked) => handleSettingChange('allowMessages', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{getTranslation(language, 'dataProcessing')}</div>
                  <div className="text-sm text-gray-600">{getTranslation(language, 'dataProcessingDesc')}</div>
                </div>
                <Switch 
                  checked={settings.dataProcessing}
                  onCheckedChange={(checked) => handleSettingChange('dataProcessing', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'appearanceSettings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{getTranslation(language, 'theme')}</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('light')}
                      className="flex items-center gap-2"
                    >
                      <Sun className="w-4 h-4" />
                      {getTranslation(language, 'light')}
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('dark')}
                      className="flex items-center gap-2"
                    >
                      <Moon className="w-4 h-4" />
                      {getTranslation(language, 'dark')}
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('system')}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="w-4 h-4" />
                      {getTranslation(language, 'system')}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>{getTranslation(language, 'language')}</Label>
                  <Select 
                    value={language} 
                    onValueChange={(value: 'english' | 'hindi' | 'gujarati') => setLanguage(value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">{getTranslation(language, 'english')}</SelectItem>
                      <SelectItem value="hindi">{getTranslation(language, 'hindi')}</SelectItem>
                      <SelectItem value="gujarati">{getTranslation(language, 'gujarati')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{getTranslation(language, 'timezone')}</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (EST)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation(language, 'accountManagement')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{getTranslation(language, 'exportData')}</div>
                      <div className="text-sm text-gray-600">{getTranslation(language, 'exportDataDesc')}</div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">{getTranslation(language, 'dangerZone')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="font-medium text-red-900 dark:text-red-100">{getTranslation(language, 'deleteAccount')}</div>
                      <div className="text-sm text-red-700 dark:text-red-300">{getTranslation(language, 'deleteAccountDesc')}</div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}