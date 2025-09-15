export interface TranslationData {
  // Navigation & Common
  dashboard: string;
  courses: string;
  notes: string;
  tests: string;
  profile: string;
  messages: string;
  settings: string;
  search: string;
  logout: string;
  login: string;
  welcome: string;
  
  // Dashboard
  welcomeBack: string;
  learningJourney: string;
  pickUpWhere: string;
  continueLearning: string;
  recommendedCourses: string;
  viewAll: string;
  
  // Course related
  lessons: string;
  instructor: string;
  rating: string;
  price: string;
  enrollNow: string;
  startCourse: string;
  resume: string;
  completed: string;
  inProgress: string;
  videos: string;
  assignments: string;
  overview: string;
  curriculum: string;
  reviews: string;
  watchVideo: string;
  completeAssignment: string;
  viewDetails: string;
  dueDate: string;
  assignment: string;
  
  // Stats
  learningStreak: string;
  certificatesEarned: string;
  studyHours: string;
  keepItUp: string;
  moreToUnlock: string;
  thisWeek: string;
  
  // Profile
  editProfile: string;
  personalInfo: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  save: string;
  cancel: string;
  firstName: string;
  lastName: string;
  profileSettings: string;
  manageAccount: string;
  verifiedAccount: string;
  courses: string;
  certificates: string;
  studyTime: string;
  dayStreak: string;
  personal: string;
  security: string;
  notifications: string;
  privacy: string;
  preferences: string;
  account: string;
  basicInformation: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  saveChanges: string;
  professionalInformation: string;
  jobTitle: string;
  company: string;
  experience: string;
  bio: string;
  learningInterests: string;
  addInterest: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  updatePassword: string;
  accountSecurity: string;
  twoFactor: string;
  twoFactorDesc: string;
  loginAlerts: string;
  loginAlertsDesc: string;
  activeSessions: string;
  currentSession: string;
  mobileApp: string;
  revoke: string;
  active: string;
  notificationPreferences: string;
  emailNotifications: string;
  emailNotificationsDesc: string;
  pushNotifications: string;
  pushNotificationsDesc: string;
  courseReminders: string;
  courseRemindersDesc: string;
  weeklyProgress: string;
  weeklyProgressDesc: string;
  marketingEmails: string;
  marketingEmailsDesc: string;
  privacySettings: string;
  profileVisibility: string;
  public: string;
  private: string;
  friendsOnly: string;
  showProgress: string;
  showProgressDesc: string;
  allowMessages: string;
  allowMessagesDesc: string;
  dataProcessing: string;
  dataProcessingDesc: string;
  appearanceSettings: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  systemPreference: string;
  timezone: string;
  accountManagement: string;
  exportData: string;
  exportDataDesc: string;
  deleteAccount: string;
  deleteAccountDesc: string;
  dangerZone: string;
  
  // Categories
  aiMl: string;
  cyberSecurity: string;
  dataScience: string;
  business: string;
  mba: string;
  webDevelopment: string;
  mobileApp: string;
  cloudComputing: string;
  
  // Learning Path
  myLearningPath: string;
  currentModule: string;
  nextModule: string;
  progress: string;
  timeSpent: string;
  estimatedTime: string;
  
  // Nearby Centers
  nearbyCenters: string;
  findNearby: string;
  studyGroups: string;
  libraries: string;
  coworkingSpaces: string;
  distance: string;
  open: string;
  closed: string;
  getDirections: string;
  
  // Language
  language: string;
  english: string;
  hindi: string;
  gujarati: string;
  
  // Common actions
  yes: string;
  no: string;
  ok: string;
  submit: string;
  close: string;
  next: string;
  previous: string;
  finish: string;
  
  // Video & Assignment specific
  videoLectures: string;
  practiceAssignments: string;
  downloadMaterials: string;
  startAssignment: string;
  submitAssignment: string;
  viewSubmission: string;
  assignmentStatus: string;
  notStarted: string;
  pending: string;
  submitted: string;
  graded: string;
  
  // Help & Feedback
  helpFeedback: string;
  bugReport: string;
  generalFeedback: string;
  featureRequest: string;
  questionHelp: string;
  priority: string;
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  rateExperience: string;
  subject: string;
  detailedDescription: string;
  emailAddress: string;
  submitFeedback: string;
  feedbackSubmitted: string;
  thankYouFeedback: string;
  currentScreen: string;
  contextHelp: string;
  
  // Settings specific
  customizeExperience: string;
  settingUpdated: string;
  settingsReset: string;
}

export const translations: Record<string, TranslationData> = {
  english: {
    // Navigation & Common
    dashboard: "Dashboard",
    courses: "Courses",
    notes: "Notes",
    tests: "Tests",
    profile: "Profile",
    messages: "Messages",
    settings: "Settings",
    search: "Search courses, topics...",
    logout: "Logout",
    login: "Login",
    welcome: "Welcome",
    
    // Dashboard
    welcomeBack: "Welcome back, Priya! 👋",
    learningJourney: "Ready to continue your learning journey? Pick up where you left off.",
    pickUpWhere: "Pick up where you left off",
    continueLearning: "Continue Learning",
    recommendedCourses: "Recommended Courses",
    viewAll: "View All",
    
    // Course related
    lessons: "lessons",
    instructor: "Instructor",
    rating: "Rating",
    price: "Price",
    enrollNow: "Enroll Now",
    startCourse: "Start Course",
    resume: "Resume",
    completed: "Completed",
    inProgress: "In Progress",
    videos: "Videos",
    assignments: "Assignments",
    overview: "Overview",
    curriculum: "Curriculum",
    reviews: "Reviews",
    watchVideo: "Watch Video",
    completeAssignment: "Complete Assignment",
    viewDetails: "View Details",
    dueDate: "Due Date",
    assignment: "Assignment",
    
    // Stats
    learningStreak: "Learning Streak",
    certificatesEarned: "Certificates Earned",
    studyHours: "Study Hours",
    keepItUp: "Keep it up! You're doing great.",
    moreToUnlock: "more to unlock expert badge",
    thisWeek: "this week",
    
    // Profile
    editProfile: "Edit Profile",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    save: "Save",
    cancel: "Cancel",
    firstName: "First Name",
    lastName: "Last Name",
    profileSettings: "Profile Settings",
    manageAccount: "Manage your account information and preferences",
    verifiedAccount: "Verified Account",
    courses: "Courses",
    certificates: "Certificates",
    studyTime: "Study Time",
    dayStreak: "Day Streak",
    personal: "Personal",
    security: "Security",
    notifications: "Notifications",
    privacy: "Privacy",
    preferences: "Preferences",
    account: "Account",
    basicInformation: "Basic Information",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    dateOfBirth: "Date of Birth",
    address: "Address",
    saveChanges: "Save Changes",
    professionalInformation: "Professional Information",
    jobTitle: "Job Title",
    company: "Company",
    experience: "Academic Year / Experience",
    bio: "Bio",
    learningInterests: "Learning Interests",
    addInterest: "+ Add Interest",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    updatePassword: "Update Password",
    accountSecurity: "Account Security",
    twoFactor: "Two-Factor Authentication",
    twoFactorDesc: "Add an extra layer of security",
    loginAlerts: "Login Alerts",
    loginAlertsDesc: "Get notified of new logins",
    activeSessions: "Active Sessions",
    currentSession: "Current Session",
    mobileApp: "Mobile App",
    revoke: "Revoke",
    active: "Active",
    notificationPreferences: "Notification Preferences",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive notifications via email",
    pushNotifications: "Push Notifications",
    pushNotificationsDesc: "Receive push notifications on your device",
    courseReminders: "Course Reminders",
    courseRemindersDesc: "Reminders for course deadlines and schedules",
    weeklyProgress: "Weekly Progress Reports",
    weeklyProgressDesc: "Weekly summary of your learning progress",
    marketingEmails: "Marketing Emails",
    marketingEmailsDesc: "Promotional emails about new courses and offers",
    privacySettings: "Privacy Settings",
    profileVisibility: "Profile Visibility",
    public: "Public",
    private: "Private",
    friendsOnly: "Friends Only",
    showProgress: "Show Learning Progress",
    showProgressDesc: "Allow others to see your course progress",
    allowMessages: "Allow Messages",
    allowMessagesDesc: "Allow other users to send you messages",
    dataProcessing: "Data Processing",
    dataProcessingDesc: "Allow processing of data for personalized experience",
    appearanceSettings: "Appearance Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    systemPreference: "system preference",
    timezone: "Timezone",
    accountManagement: "Account Management",
    exportData: "Export Data",
    exportDataDesc: "Download a copy of all your data",
    deleteAccount: "Delete Account",
    deleteAccountDesc: "Permanently delete your account and all data",
    dangerZone: "Danger Zone",
    
    // Categories
    aiMl: "AI/ML",
    cyberSecurity: "Cyber Security",
    dataScience: "Data Science",
    business: "Business",
    mba: "MBA",
    webDevelopment: "Web Development",
    mobileApp: "Mobile App",
    cloudComputing: "Cloud Computing",
    
    // Learning Path
    myLearningPath: "My Learning Path",
    currentModule: "Current Module",
    nextModule: "Next Module",
    progress: "Progress",
    timeSpent: "Time Spent",
    estimatedTime: "Estimated Time",
    
    // Nearby Centers
    nearbyCenters: "Nearby Learning Centers",
    findNearby: "Find Nearby",
    studyGroups: "Study Groups",
    libraries: "Libraries",
    coworkingSpaces: "Co-working Spaces",
    distance: "Distance",
    open: "Open",
    closed: "Closed",
    getDirections: "Get Directions",
    
    // Language
    language: "Language",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",
    
    // Common actions
    yes: "Yes",
    no: "No",
    ok: "OK",
    submit: "Submit",
    close: "Close",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    
    // Video & Assignment specific
    videoLectures: "Video Lectures",
    practiceAssignments: "Practice Assignments",
    downloadMaterials: "Download Materials",
    startAssignment: "Start Assignment",
    submitAssignment: "Submit Assignment",
    viewSubmission: "View Submission",
    assignmentStatus: "Assignment Status",
    notStarted: "Not Started",
    pending: "Pending",
    submitted: "Submitted",
    graded: "Graded",
    
    // Help & Feedback
    helpFeedback: "Help & Feedback",
    bugReport: "Bug Report",
    generalFeedback: "General Feedback",
    featureRequest: "Feature Request",
    questionHelp: "Question/Help",
    priority: "Priority Level",
    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
    rateExperience: "Rate your experience on this screen",
    subject: "Subject",
    detailedDescription: "Detailed Description",
    emailAddress: "Email Address",
    submitFeedback: "Submit Feedback",
    feedbackSubmitted: "Feedback submitted successfully!",
    thankYouFeedback: "Thank you for helping us improve the platform.",
    currentScreen: "Current Screen Context",
    contextHelp: "This information helps us understand where you experienced the issue.",
    
    // Settings specific
    customizeExperience: "Customize Experience",
    settingUpdated: "Setting Updated",
    settingsReset: "Settings Reset"
  },
  
  hindi: {
    // Navigation & Common
    dashboard: "डैशबोर्ड",
    courses: "कोर्स",
    notes: "नोट्स",
    tests: "टेस्ट",
    profile: "प्रोफाइल",
    messages: "संदेश",
    settings: "सेटिंग्स",
    search: "कोर्स, विषय खोजें...",
    logout: "लॉगआउट",
    login: "लॉगिन",
    welcome: "स्वागत",
    
    // Dashboard
    welcomeBack: "वापसी पर स्वागत, प्रिया! 👋",
    learningJourney: "अपनी सीखने की यात्रा जारी रखने के लिए तैयार हैं? जहाँ छोड़ा था वहाँ से शुरू करें।",
    pickUpWhere: "जहाँ छोड़ा था वहाँ से शुरू करें",
    continueLearning: "सीखना जारी रखें",
    recommendedCourses: "सुझाए गए कोर्स",
    viewAll: "सभी देखें",
    
    // Course related
    lessons: "पाठ",
    instructor: "प्रशिक्षक",
    rating: "रेटिंग",
    price: "मूल्य",
    enrollNow: "अभी दाखिला लें",
    startCourse: "कोर्स शुरू करें",
    resume: "जारी रखें",
    completed: "पूर्ण",
    inProgress: "प्रगति में",
    videos: "वीडियो",
    assignments: "असाइनमेंट",
    overview: "अवलोकन",
    curriculum: "पाठ्यक्रम",
    reviews: "समीक्षा",
    watchVideo: "वीडियो देखें",
    completeAssignment: "असाइनमेंट पूरा करें",
    viewDetails: "विवरण देखें",
    dueDate: "समाप्ति तिथि",
    assignment: "असाइनमेंट",
    
    // Stats
    learningStreak: "सीखने की लय",
    certificatesEarned: "प्राप्त प्रमाण पत्र",
    studyHours: "अध्ययन घंटे",
    keepItUp: "इसे जारी रखें! आप बहुत अच्छा कर रहे हैं।",
    moreToUnlock: "एक्सपर्ट बैज अनलॉक करने के लिए और",
    thisWeek: "इस सप्ताह",
    
    // Profile
    editProfile: "प्रोफाइल संपादित करें",
    personalInfo: "व्यक्तिगत जानकारी",
    name: "नाम",
    email: "ईमेल",
    phone: "फोन",
    location: "स्थान",
    save: "सेव करें",
    cancel: "रद्द करें",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    profileSettings: "प्रोफाइल सेटिंग्स",
    manageAccount: "अपनी खाता जानकारी और प्राथमिकताएं प्रबंधित करें",
    verifiedAccount: "सत्यापित खाता",
    courses: "कोर्स",
    certificates: "प्रमाण पत्र",
    studyTime: "अध्ययन समय",
    dayStreak: "दिन की लय",
    personal: "व्यक्तिगत",
    security: "सुरक्षा",
    notifications: "सूचनाएं",
    privacy: "गोपनीयता",
    preferences: "प्राथमिकताएं",
    account: "खाता",
    basicInformation: "मूलभूत जानकारी",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    saveChanges: "परिवर्तन सेव करें",
    professionalInformation: "पेशेवर जानकारी",
    jobTitle: "नौकरी का शीर्षक",
    company: "कंपनी",
    experience: "शैक्षणिक वर्ष / अनुभव",
    bio: "बायो",
    learningInterests: "सीखने की रुचियां",
    addInterest: "+ रुचि जोड़ें",
    changePassword: "पासवर्ड बदलें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "नया पासवर्ड पुष्टि करें",
    updatePassword: "पासवर्ड अपडेट करें",
    accountSecurity: "खाता सुरक्षा",
    twoFactor: "दो-कारक प्रमाणीकरण",
    twoFactorDesc: "सुरक्षा की एक अतिरिक्त परत जोड़ें",
    loginAlerts: "लॉगिन अलर्ट",
    loginAlertsDesc: "नए लॉगिन की सूचना प्राप्त करें",
    activeSessions: "सक्रिय सत्र",
    currentSession: "वर्तमान सत्र",
    mobileApp: "मोबाइल ऐप",
    revoke: "रद्द करें",
    active: "सक्रिय",
    notificationPreferences: "सूचना प्राथमिकताएं",
    emailNotifications: "ईमेल सूचनाएं",
    emailNotificationsDesc: "ईमेल के माध्यम से सूचनाएं प्राप्त करें",
    pushNotifications: "पुश सूचनाएं",
    pushNotificationsDesc: "अपने डिवाइस पर पुश सूचनाएं प्राप्त करें",
    courseReminders: "कोर्स रिमाइंडर",
    courseRemindersDesc: "कोर्स की समय सीमा और अनुसूची के लिए रिमाइंडर",
    weeklyProgress: "साप्ताहिक प्रगति रिपोर्ट",
    weeklyProgressDesc: "आपकी सीखने की प्रगति का साप्ताहिक सारांश",
    marketingEmails: "मार्केटिंग ईमेल",
    marketingEmailsDesc: "नए कोर्स और ऑफर के बारे में प्रचार ईमेल",
    privacySettings: "गोपनीयता सेटिंग्स",
    profileVisibility: "प्रोफाइल दृश्यता",
    public: "सार्वजनिक",
    private: "निजी",
    friendsOnly: "केवल मित्र",
    showProgress: "सीखने की प्रगति दिखाएं",
    showProgressDesc: "दूसरों को आपकी कोर्स प्रगति देखने की अनुमति दें",
    allowMessages: "संदेश की अनुमति दें",
    allowMessagesDesc: "अन्य उपयोगकर्ताओं को आपको संदेश भेजने की अनुमति दें",
    dataProcessing: "डेटा प्रसंस्करण",
    dataProcessingDesc: "व्यक्तिगत अनुभव के लिए डेटा प्रसंस्करण की अनुमति दें",
    appearanceSettings: "रूप सेटिंग्स",
    theme: "थीम",
    light: "प्रकाश",
    dark: "अंधेरा",
    system: "सिस्टम",
    systemPreference: "सिस्टम प्राथमिकता",
    timezone: "समय क्षेत्र",
    accountManagement: "खाता प्रबंधन",
    exportData: "डेटा निर्यात करें",
    exportDataDesc: "अपने सभी डेटा की एक प्रतिलिपि डाउनलोड करें",
    deleteAccount: "खाता हटाएं",
    deleteAccountDesc: "अपना खाता और सभी डेटा स्थायी रूप से हटाएं",
    dangerZone: "खतरा क्षेत्र",
    
    // Categories
    aiMl: "AI/ML",
    cyberSecurity: "साइबर सुरक्षा",
    dataScience: "डेटा साइंस",
    business: "व्यापार",
    mba: "MBA",
    webDevelopment: "वेब डेवलपमेंट",
    mobileApp: "मोबाइल ऐप",
    cloudComputing: "क्लाउડ कंप्यूटिंग",
    
    // Learning Path
    myLearningPath: "मेरा सीखने का पथ",
    currentModule: "वर्तमान मॉડ्यूल",
    nextModule: "अगला मॉડ्यूल",
    progress: "प्रगति",
    timeSpent: "समय व्यतीत",
    estimatedTime: "अनुमानित समय",
    
    // Nearby Centers
    nearbyCenters: "नजदीकी शिक्षा केंद्र",
    findNearby: "नजदीकी खोजें",
    studyGroups: "अध्ययन समूह",
    libraries: "पुस्तकालय",
    coworkingSpaces: "को-वर्किंग स्पेस",
    distance: "दूरी",
    open: "खुला",
    closed: "बंद",
    getDirections: "दिशा निर्देश",
    
    // Language
    language: "भाषा",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",
    
    // Common actions
    yes: "हाँ",
    no: "नहीं",
    ok: "ठीक है",
    submit: "सबमिट करें",
    close: "बंद करें",
    next: "आगे",
    previous: "पिछला",
    finish: "समाप्त",
    
    // Video & Assignment specific
    videoLectures: "वीडियो व्याख्यान",
    practiceAssignments: "अभ्यास असाइनमेंट",
    downloadMaterials: "सामग्री डाउनलोड करें",
    startAssignment: "असाइनमेंट शुरू करें",
    submitAssignment: "असाइनमेंट जमा करें",
    viewSubmission: "जमा देखें",
    assignmentStatus: "असाइनमेंट स्थिति",
    notStarted: "शुरू नहीं हुआ",
    pending: "लंबित",
    submitted: "जमा किया गया",
    graded: "ग्रेड किया गया",
    
    // Help & Feedback
    helpFeedback: "सहायता और फीडबैक",
    bugReport: "बग रिपोर्ट",
    generalFeedback: "सामान्य फीडबैक",
    featureRequest: "फीचर अनुरोध",
    questionHelp: "प्रश्न/सहायता",
    priority: "प्राथमिकता स्तर",
    priorityLow: "कम",
    priorityMedium: "मध्यम",
    priorityHigh: "उच्च",
    rateExperience: "इस स्क्रीन पर अपने अनुभव को रेट करें",
    subject: "विषय",
    detailedDescription: "विस्तृत विवरण",
    emailAddress: "ईमेल पता",
    submitFeedback: "फीडबैक सबमिट करें",
    feedbackSubmitted: "फीडबैक सफलतापूर्वक सबमिट किया गया!",
    thankYouFeedback: "प्लेटफॉर्म को बेहतर बनाने में मदद के लिए धन्यवाद।",
    currentScreen: "वर्तमान स्क्रीन संदर्भ",
    contextHelp: "यह जानकारी हमें समझने में मदद करती है कि आपने कहाँ समस्या का अनुभव किया।",
    
    // Settings specific
    customizeExperience: "अनुभव का सفار्श",
    settingUpdated: "सेटिंग अपडेट",
    settingsReset: "सेटिंग रीसेट"
  },
  
  gujarati: {
    // Navigation & Common
    dashboard: "ડેશબોર્ડ",
    courses: "કોર્સ",
    notes: "નોટ્સ",
    tests: "ટેસ્ટ",
    profile: "પ્રોફાઇલ",
    messages: "સંદેશા",
    settings: "સેટિંગ્સ",
    search: "કોર્સ, વિષયો શોધો...",
    logout: "લૉગઆઉટ",
    login: "લૉગિન",
    welcome: "સ્વાગત",
    
    // Dashboard
    welcomeBack: "પાછા આવવા બદલ સ્વાગત, પ્રિયા! 👋",
    learningJourney: "તમારી શીખવાની યાત્રા ચાલુ રાખવા તૈયાર છો? જ્યાં છોડ્યું હતું ત્યાંથી શરૂ કરો.",
    pickUpWhere: "જ્યાં છોડ્યું હતું ત્યાંથી શરૂ કરો",
    continueLearning: "શીખવાનું ચાલુ રાખો",
    recommendedCourses: "સૂચવેલા કોર્સ",
    viewAll: "બધું જુઓ",
    
    // Course related
    lessons: "પાઠો",
    instructor: "પ્રશિક્ષક",
    rating: "રેટિંગ",
    price: "કિંમત",
    enrollNow: "હવે નોંધણી કરો",
    startCourse: "કોર્સ શરૂ કરો",
    resume: "ચાલુ રાખો",
    completed: "પૂર્ણ",
    inProgress: "પ્રગતિમાં",
    videos: "વિડીયો",
    assignments: "અસાઇનમેન્ટ",
    overview: "વિહંગાવલોકન",
    curriculum: "અભ્યાસક્રમ",
    reviews: "સમીક્ષા",
    watchVideo: "વિડીયો જુઓ",
    completeAssignment: "અસાઇનમેન્ટ પૂર્ણ કરો",
    viewDetails: "વિગતો જુઓ",
    dueDate: "અંતિમ તારીખ",
    assignment: "અસાઇનમેન્ટ",
    
    // Stats
    learningStreak: "શીખવાની લય",
    certificatesEarned: "મેળવેલા પ્રમાણપત્રો",
    studyHours: "અભ્યાસ કલાકો",
    keepItUp: "આવું જ ચાલુ રાખો! તમે બહુ સારું કરી રહ્યા છો.",
    moreToUnlock: "એક્સપર્ટ બેજ અનલૉક કરવા માટે વધુ",
    thisWeek: "આ અઠવાડિયે",
    
    // Profile
    editProfile: "પ્રોફાઇલ સંપાદિત કરો",
    personalInfo: "વ્યક્તિગત માહિતી",
    name: "નામ",
    email: "ઇમેઇલ",
    phone: "ફોન",
    location: "સ્થાન",
    save: "સેવ કરો",
    cancel: "રદ કરો",
    firstName: "પ્રથમ નામ",
    lastName: "અંતિમ નામ",
    profileSettings: "પ્રોફાઇલ સેટિંગ્સ",
    manageAccount: "તમારી એકાઉન્ટ માહિતી અને પસંદગીઓ મેનેજ કરો",
    verifiedAccount: "ચકાસાયેલ એકાઉન્ટ",
    courses: "કોર્સ",
    certificates: "પ્રમાણપત્રો",
    studyTime: "અભ્યાસ સમય",
    dayStreak: "દિવસની લય",
    personal: "વ્યક્તિગત",
    security: "સુરક્ષા",
    notifications: "સૂચનાઓ",
    privacy: "ગોપનીયતા",
    preferences: "પસંદગીઓ",
    account: "એકાઉન્ટ",
    basicInformation: "મૂળભૂત માહિતી",
    emailAddress: "ઇમેઇલ સરનામું",
    phoneNumber: "ફોન નંબર",
    dateOfBirth: "જન્મ તારીખ",
    address: "સરનામું",
    saveChanges: "ફેરફારો સેવ કરો",
    professionalInformation: "વ્યાવસાયિક માહિતી",
    jobTitle: "નોકરીનું શીર્ષક",
    company: "કંપની",
    experience: "શૈક્ષણિક વર્ષ / અનુભવ",
    bio: "બાયો",
    learningInterests: "શીખવાની રુચિઓ",
    addInterest: "+ રુચિ ઉમેરો",
    changePassword: "પાસવર્ડ બદલો",
    currentPassword: "વર્તમાન પાસવર્ડ",
    newPassword: "નવો પાસવર્ડ",
    confirmPassword: "નવો પાસવર્ડ પુષ્ટિ કરો",
    updatePassword: "પાસવર્ડ અપડેટ કરો",
    accountSecurity: "એકાઉન્ટ સુરક્ષા",
    twoFactor: "બે-પરિબળ પ્રમાણીકરણ",
    twoFactorDesc: "સુરક્ષાનું વધારાનું સ્તર ઉમેરો",
    loginAlerts: "લૉગિન એલર્ટ",
    loginAlertsDesc: "નવા લૉગિનની સૂચના મેળવો",
    activeSessions: "સક્રિય સત્રો",
    currentSession: "વર્તમાન સત્ર",
    mobileApp: "મોબાઇલ એપ",
    revoke: "રદ કરો",
    active: "સક્રિય",
    notificationPreferences: "સૂચના પસંદગીઓ",
    emailNotifications: "ઇમેઇલ સૂચનાઓ",
    emailNotificationsDesc: "ઇમેઇલ દ્વારા સૂચનાઓ મેળવો",
    pushNotifications: "પુશ સૂચનાઓ",
    pushNotificationsDesc: "તમારા ડિવાઇસ પર પુશ સૂચનાઓ મેળવો",
    courseReminders: "કોર્સ રિમાઇન્ડર",
    courseRemindersDesc: "કોર્સની સમયમર્યાદા અને સમયપત્રક માટે રિમાઇન્ડર",
    weeklyProgress: "સાપ્તાહિક પ્રગતિ રિપોર્ટ",
    weeklyProgressDesc: "તમારી શીખવાની પ્રગતિનો સાપ્તાહિક સારાંશ",
    marketingEmails: "માર્કેટિંગ ઇમેઇલ",
    marketingEmailsDesc: "નવા કોર્સ અને ઓફર વિશે પ્રચાર ઇમેઇલ",
    privacySettings: "ગોપનીયતા સેટિંગ્સ",
    profileVisibility: "પ્રોફાઇલ દૃશ્યતા",
    public: "જાહેર",
    private: "ખાનગી",
    friendsOnly: "ફક્ત મિત્રો",
    showProgress: "શીખવાની પ્રગતિ બતાવો",
    showProgressDesc: "અન્યોને તમારી કોર્સ પ્રગતિ જોવાની મંજૂરી આપો",
    allowMessages: "સંદેશાની મંજૂરી આપો",
    allowMessagesDesc: "અન્ય વપરાશકર્તાઓને તમને સંદેશા મોકલવાની મંજૂરી આપો",
    dataProcessing: "ડેટા પ્રોસેસિંગ",
    dataProcessingDesc: "વ્યક્તિગત અનુભવ માટે ડેટા પ્રોસેસિંગની મંજૂરી આપો",
    appearanceSettings: "દેખાવ સેટિંગ્સ",
    theme: "થીમ",
    light: "પ્રકાશ",
    dark: "અંધારું",
    system: "સિસ્ટમ",
    systemPreference: "સિસ્ટમ પસંદગી",
    timezone: "સમય ક્ષેત્ર",
    accountManagement: "એકાઉન્ટ મેનેજમેન્ટ",
    exportData: "ડેટા એક્સપોર્ટ કરો",
    exportDataDesc: "તમારા બધા ડેટાની એક કોપી ડાઉનલોડ કરો",
    deleteAccount: "એકાઉન્ટ ડિલીટ કરો",
    deleteAccountDesc: "તમારું એકાઉન્ટ અને બધો ડેટા કાયમ માટે ડિલીટ કરો",
    dangerZone: "ખતરાનું ક્ષેત્ર",
    
    // Categories
    aiMl: "AI/ML",
    cyberSecurity: "સાયબર સિક્યુરિટી",
    dataScience: "ડેટા સાયન્સ",
    business: "વ્યાપાર",
    mba: "MBA",
    webDevelopment: "વેબ ડેવલપમેન્ટ",
    mobileApp: "મોબાઇલ એપ",
    cloudComputing: "ક્લાઉડ કમ્પ્યુટિંગ",
    
    // Learning Path
    myLearningPath: "મારો શીખવાનો પાથ",
    currentModule: "વર્તમાન મોડ્યુલ",
    nextModule: "આગળનો મોડ્યુલ",
    progress: "પ્રગતિ",
    timeSpent: "વિતાવેલો સમય",
    estimatedTime: "અંદાજિત સમય",
    
    // Nearby Centers
    nearbyCenters: "નજીકના શિક્ષણ કેન્દ્રો",
    findNearby: "નજીકમાં શોધો",
    studyGroups: "અભ્યાસ જૂથો",
    libraries: "પુસ્તકાલયો",
    coworkingSpaces: "કો-વર્કિંગ સ્પેસ",
    distance: "અંતર",
    open: "ખુલ્લું",
    closed: "બંધ",
    getDirections: "દિશાઓ મેળવો",
    
    // Language
    language: "ભાષા",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",
    
    // Common actions
    yes: "હા",
    no: "ના",
    ok: "ઠીક છે",
    submit: "સબમિટ કરો",
    close: "બંધ કરો",
    next: "આગળ",
    previous: "પાછળ",
    finish: "સમાપ્ત",
    
    // Video & Assignment specific
    videoLectures: "વિડિયો વ્યાખ્યાન",
    practiceAssignments: "અભ્યાસ અસાઇનમેન્ટ",
    downloadMaterials: "સામગ્રી ડાઉનલોડ કરો",
    startAssignment: "અસાઇનમેન્ટ શરૂ કરો",
    submitAssignment: "અસાઇનમેન્ટ સબમિટ કરો",
    viewSubmission: "સબમિશન જુઓ",
    assignmentStatus: "અસાઇનમેન્ટ સ્થિતિ",
    notStarted: "શરૂ નથી થયું",
    pending: "બાકી",
    submitted: "સબમિટ કર્યું",
    graded: "ગ્રેડ કર્યું",
    
    // Help & Feedback
    helpFeedback: "મદદ અને ફીડબેક",
    bugReport: "બગ રિપોર્ટ",
    generalFeedback: "સામાન્ય ફીડબેક",
    featureRequest: "ફીચર વિનંતી",
    questionHelp: "પ્રશ્ન/મદદ",
    priority: "પ્રાથમિકતા સ્તર",
    priorityLow: "ઓછી",
    priorityMedium: "મધ્યમ",
    priorityHigh: "ઉચ્ચ",
    rateExperience: "આ સ્ક્રીન પર તમારા અનુભવને રેટ કરો",
    subject: "વિષય",
    detailedDescription: "વિગતવાર વિવરણ",
    emailAddress: "ઇમેઇલ સરનામું",
    submitFeedback: "ફીડબેક સબમિટ કરો",
    feedbackSubmitted: "ફીડબેક સફળતાપૂર્વક સબમિટ થયું!",
    thankYouFeedback: "પ્લેટફોર્મને સુધારવામાં મદદ કરવા બદલ આભાર.",
    currentScreen: "વર્તમાન સ્ક્રીન સંદર્ભ",
    contextHelp: "આ માહિતી અમને સમજવામાં મદદ કરે છે કે તમે ક્યાં સમસ્યાનો અનુભવ કર્યો.",
    
    // Settings specific
    customizeExperience: "અનુભવ કાંચી કરો",
    settingUpdated: "સેટિંગ અપડેટ",
    settingsReset: "સેટિંગ રીસેટ"
  }
};

export function getTranslation(language: string, key: keyof TranslationData): string {
  try {
    // Ensure language exists in translations
    const validLanguage = translations[language] ? language : 'english';
    return translations[validLanguage]?.[key] || translations.english[key] || key;
  } catch (error) {
    console.warn(`Translation error for key: ${key}, language: ${language}`, error);
    return key; // Return the key as fallback
  }
}