/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  focusTagline: string;

  // Tabs
  tabOverview: string;
  tabSchedules: string;
  tabAccessibility: string;
  tabAnalytics: string;
  tabSettings: string;

  // Onboarding Wizard
  chooseLanguage: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  setupExplainText: string;
  setupExplainCard: string;
  setupNamePlaceholder: string;
  setupNameLabel: string;
  proceedBtn: string;
  permissionsTitle: string;
  permissionsSubtitle: string;
  permAccessTitle: string;
  permAccessDesc: string;
  permAlarmTitle: string;
  permAlarmDesc: string;
  permBatteryTitle: string;
  permBatteryDesc: string;
  grantAllBtn: string;
  backBtn: string;
  initialCommitTitle: string;
  initialCommitSubtitle: string;
  useRecommendedBtn: string;
  preferCustomBtn: string;

  // Dashboard Tab
  currentFocusStatus: string;
  assalamuAlaikum: string;
  greetingDesc: string;
  prayerStreak: string;
  streakDays: string;
  streakMotivationActive: string;
  streakMotivationEmpty: string;
  streakFooter: string;
  upcomingSalahHeader: string;
  scheduledToday: string;
  quietMode: string;
  timeWindow: string;
  lockWarningText: string;
  noSchedulesConfigured: string;
  noSchedulesDesc: string;
  lockFooterText: string;
  liveBlockerHeader: string;
  liveBlockerDesc: string;
  testOverlaySection: string;
  testOverlaySubtext: string;
  attendanceMetricsHeader: string;
  todayCompletionGoal: string;
  loggedRatioLabel: string;
  progressDone: string;

  // Schedules Tab
  schedulesTabHeader: string;
  schedulesTabDesc: string;
  automaticPresetHeader: string;
  automaticPresetDesc: string;
  selectClosestCity: string;
  gpsLookupBtn: string;
  gpsActivatedAlert: string;
  activeSchedulesCount: string;
  createCustomBtn: string;
  defineCustomTitle: string;
  cancelBtn: string;
  prayerNameLabel: string;
  lockStartsLabel: string;
  lockEndsLabel: string;
  repeatLabel: string;
  saveScheduleBtn: string;
  noSchedulesSeeded: string;
  noSchedulesSeededDesc: string;
  everyday: string;
  daysCount: string;
  customBadge: string;
  standbyTooltip: string;
  deleteTooltip: string;

  // Accessibility Sandbox / Blocker Simulator
  accessibilityBoxTitle: string;
  accessibilityBoxExplain1: string;
  accessibilityBoxExplain2: string;
  accessibilityGuardStatus: string;
  accessibilityGuardActive: string;
  accessibilityGuardActiveDesc: string;
  accessibilityStandby: string;
  accessibilityStandbyDesc: string;
  simulateBypassTitle: string;
  instagramTag: string;
  tiktokTag: string;
  youtubeTag: string;
  gamingTag: string;
  webTag: string;
  interceptTitle: string;
  interceptDesc: string;
  reelsDescription: string;
  candyScore: string;
  candyLevel: string;
  simCloseBtn: string;
  simScrollNext: string;
  simLikesCount: string;
  simAppsMenu: string;
  simHomeBtn: string;
  simBackBtn: string;
  tapToOpenNotice: string;

  // Active Lock Overlay Screen
  lockActiveStatusBadge: string;
  lockCurrentSessionLabel: string;
  lockUnproductiveWarning: string;
  lockAestheticNotice: string;
  lockEmergencyBypassTitle: string;
  allowedSystemBypassHeader: string;
  flashlightTool: string;
  flashlightDesc: string;
  emergencyCallTool: string;
  emergencyCallDesc: string;
  alarmDismissTool: string;
  alarmDismissDesc: string;
  cameraCaptureTool: string;
  cameraCaptureDesc: string;
  flashlightSimActive: string;
  flashlightSimDesc: string;
  flashlightSimClose: string;
  emergencyCommHeader: string;
  emergencyCommDesc: string;
  emergencyCommDialerBtn: string;
  dialFamilyBtn: string;
  dialCallActionBtn: string;
  disconnectCallBtn: string;
  callingSimulate: string;
  activeCallSimulating: string;
  reflectionTitle: string;
  reflectionDesc: string;
  reflectionPlaceholder: string;
  reflectionError: string;
  returnToPrayerBtn: string;
  confirmBypassBtn: string;
  skipPassageBtn: string;
  rotatesNotice: string;

  // Completion Modals
  completionFormTitle: string;
  completionFormDesc: string;
  optionYes: string;
  optionLater: string;
  optionMissed: string;

  // Statistics & Analytics Tab
  analyticsTitle: string;
  analyticsDesc: string;
  statTotalLogged: string;
  statAccumulated: string;
  statCompletedOnTime: string;
  statSuccessRatio: string;
  statDelayedLater: string;
  statRecoveryRatio: string;
  statMissed: string;
  statAttentionRatio: string;
  weeklyAttendanceTitle: string;
  focusDistributionTitle: string;
  focusDistributionDesc: string;
  emptyDistributionMessage: string;
  chronicledLogTitle: string;
  resetHistoryBtn: string;
  resetConfirmationMessage: string;
  emptyLogMessage: string;
  emptyLogSubtext: string;
  alterStateLabel: string;

  // Settings Tab
  settingsTitle: string;
  settingsDesc: string;
  preferencesHeader: string;
  disableOptimizationDesc: string;
  enableStrictBlocker: string;
  enableStrictBlockerDesc: string;
  preventCasualBypass: string;
  preventCasualBypassDesc: string;
  emergencyToolsHeader: string;
  emergencyToolsSubtext: string;
  flashlightRuleLabel: string;
  flashlightRuleDesc: string;
  dialerRuleLabel: string;
  dialerRuleDesc: string;
  alarmRuleLabel: string;
  alarmRuleDesc: string;
  cameraRuleLabel: string;
  cameraRuleDesc: string;
  aestheticLayoutHeader: string;
  aestheticLayoutDesc: string;
  lightThemeLabel: string;
  darkThemeLabel: string;
  quranConfigHeader: string;
  quranFormatLabel: string;
  quranFormatValue: string;
  displayTranslationLabel: string;
  displayTranslationDesc: string;
  backupSectionHeader: string;
  backupSectionDesc: string;
  exportBackupBtn: string;
  importBackupBtn: string;
  factoryResetBtn: string;
  factoryResetConfirm: string;
  factoryWipeSuccess: string;

  // Contact / Support
  contactHeader: string;
  contactDesc: string;
  contactDeveloper: string;

  // Footer / Common
  offlineSecureBadge: string;
  systemVersionBadge: string;
  copyrightText: string;
  developedBy: string;
  helpingMuslims: string;
  versionLabel: string;

  // Prayers Name Map
  prayerFajr: string;
  prayerDhuhr: string;
  prayerAsr: string;
  prayerMaghrib: string;
  prayerIsha: string;
  prayerTahajjud: string;
  prayerDuha: string;
  prayerCustomFocus: string;

  // New properties for absolute 100% localization
  overlayQuranTitle: string;
  overlayHadithTitle: string;
  overlayDevotionTitle: string;
  overlayEmergencyTitle: string;
  overlayEmergencySubtitle: string;
  sandboxTitle: string;
  gameCandyCrush: string;
  simLaunchOverlay: string;
  simAutoplayReels: string;
  gameCandyTitle: string;
  errorPrayerName: string;
  errorTimesRequired: string;
  errorEndTimeLower: string;
  errorActiveDayRequired: string;
  cityDropdownPlaceholder: string;
  alertGpsFinished: string;
  descFajr: string;
  descDhuhr: string;
  descAsr: string;
  descMaghrib: string;
  descIsha: string;
  descTahajjud: string;
  descDuha: string;
  statChartPrayed: string;
  statLegendCompleted: string;
  statLegendLater: string;
  statLegendFree: string;
  statSpiritualAdvice: string;
  generalPrayerSuffix: string;
  logDateLabel: string;
  logStateCompleted: string;
  logStateLater: string;
  logStateMissed: string;
  tooltipDeleteLog: string;
  languageLabel: string;
  quranTransFormatLabel: string;
  quranFormatArabicOnly: string;
  quranFormatArabicBangla: string;
  quranFormatArabicEnglish: string;
  developerLabel: string;
  emailAddressLabel: string;
  emailActionBtn: string;
  visitActionBtn: string;
  devName: string;
  devEmail: string;
  devFacebook: string;
  devFacebookUrl: string;
  overlayEmergencyGlobal: string;
  overlayEmergencyFamily: string;
  overlayEmergencyPlaceholder: string;
  overlayCameraSimulator: string;
  overlayCameraRetake: string;
  overlayCameraDesc: string;
  overlayAlarmSilenced: string;
  socialFeed1Caption: string;
  socialFeed2Caption: string;
  socialFeed3Caption: string;
  socialFeed1Likes: string;
  socialFeed2Likes: string;
  socialFeed3Likes: string;
  daySun: string;
  dayMon: string;
  dayTue: string;
  dayWed: string;
  dayThu: string;
  dayFri: string;
  daySat: string;
}

export const translations: Record<'en' | 'bn', TranslationDictionary> = {
  en: {
    appName: "Prayer Focus",
    tagline: "Focus on Salah. Disconnect from Distractions.",
    focusTagline: "Focus on Salah. Disconnect.",

    tabOverview: "Overview",
    tabSchedules: "Schedules",
    tabAccessibility: "Accessibility Box",
    tabAnalytics: "Analytics",
    tabSettings: "Settings",

    chooseLanguage: "Choose Your Language",
    welcomeTitle: "Welcome to Prayer Focus",
    welcomeSubtitle: "Focus on Salah. Disconnect from Distractions.",
    setupExplainText: "Many Muslims get distracted by short video reels, notification logs, games, and messaging feeds right before or during sacred Salah window hours, delaying their prayer.",
    setupExplainCard: "Prayer Focus is not a simple notification reminder. It's a self-restricting commitment tool that shields you from modern digital dopamine loops, giving you a quiet, sacred space to stand upright.",
    setupNamePlaceholder: "Enter a greeting nickname...",
    setupNameLabel: "What name would you like to be addressed by?",
    proceedBtn: "Proceed with setup ➔",
    permissionsTitle: "Configure Essential System Permissions",
    permissionsSubtitle: "To reliably lock apps on native Android, our foreground services require standard accessibility, overlay, and optimization exclusion grants.",
    permAccessTitle: "Accessibility Blocker Service",
    permAccessDesc: "Hooks current foreground package to suppress social feeds during active Salah.",
    permAlarmTitle: "Alarm Notification Override",
    permAlarmDesc: "Enforces overlay display instantly even if the device is currently locked.",
    permBatteryTitle: "Battery Optimization Exclusion",
    permBatteryDesc: "Prevents Android system from deep sleeping the scheduler in background.",
    grantAllBtn: "Grant All & Proceed",
    backBtn: "Back",
    initialCommitTitle: "Establish Initial Prayer Commitment",
    initialCommitSubtitle: "Would you like to initialize with standard daily scheduled frames (which you can modify later)?",
    useRecommendedBtn: "Use Recommended Schedules",
    preferCustomBtn: "I prefer custom times",

    currentFocusStatus: "Current Focus Status",
    assalamuAlaikum: "Assalamu Alaikum",
    greetingDesc: "Welcome back to Prayer Focus. You have configured custom schedules to eliminate phone distractions. Ready to connect?",
    prayerStreak: "Prayer Streak",
    streakDays: "Consecutive Days",
    streakMotivationActive: "Excellent consistency! Keep up your daily commitment to stand intact.",
    streakMotivationEmpty: "Establish your first prayer log today to start a focused streak.",
    streakFooter: "Your connection builds habits",
    upcomingSalahHeader: "Upcoming Salah Session",
    scheduledToday: "Scheduled Today",
    quietMode: "Quiet Mode",
    timeWindow: "Time Window",
    lockWarningText: "Your phone will automatically lock when the scheduled time starts. Ensure to activate necessary accessibility grants.",
    noSchedulesConfigured: "No active schedules configured.",
    noSchedulesDesc: "Head to the Schedules tab on top to assign standard prayer times or generate location pre-calculations.",
    lockFooterText: "Lock engages automatically inside Android framework",
    liveBlockerHeader: "Live Blocker Simulation Control",
    liveBlockerDesc: "Don't want to wait until the scheduled hour? Test the full implementation of Prayer Mode immediately by starting a simulated 5-minute lock.",
    testOverlaySection: "Simulate 5-Minute Block Event:",
    testOverlaySubtext: "Interactive: Clicking will display the actual emergency tools and rotating passages.",
    attendanceMetricsHeader: "Salah Attendance Metrics",
    todayCompletionGoal: "Today's Completion Goal",
    loggedRatioLabel: "active prayer sessions successfully logged on time today",
    progressDone: "Progress Done",

    schedulesTabHeader: "Prayer Commitment Schedule",
    schedulesTabDesc: "The lock system evaluates active days and times. When a schedule begins, Prayer Focus automatically restricts distractions so you can stand in prayer uninhibited.",
    automaticPresetHeader: "Automatic Prayer Creator",
    automaticPresetDesc: "Don't want to enter manual times? Choose your city to calculate prayer schedules. You can still modify individual items afterward!",
    selectClosestCity: "Select closest city preset:",
    gpsLookupBtn: "Use GPS-based Location lookup",
    gpsActivatedAlert: "Simulated GPS Location Lookup: Found closest city preset. Loaded calculated schedules!",
    activeSchedulesCount: "Schedules",
    createCustomBtn: "Create Custom Schedule",
    defineCustomTitle: "Define custom lock time",
    cancelBtn: "Cancel",
    prayerNameLabel: "Prayer / Session Name",
    lockStartsLabel: "Lock Starts At",
    lockEndsLabel: "Lock Ends At",
    repeatLabel: "Repeat Everyday or custom weekdays:",
    saveScheduleBtn: "Save Schedule Locked Segment",
    noSchedulesSeeded: "No prayer schedules loaded yet.",
    noSchedulesSeededDesc: "Use the Automatic Creator on the left to quickly establish your daily prayers, or add custom sessions.",
    everyday: "Everyday",
    daysCount: "Days",
    customBadge: "Custom",
    standbyTooltip: "Toggle status",
    deleteTooltip: "Remove segment",

    accessibilityBoxTitle: "Active Blocker & Restriction System",
    accessibilityBoxExplain1: "The native Android version of Prayer Focus utilizes Android's Accessibility Service API and Foreground Services to constantly monitor user focus.",
    accessibilityBoxExplain2: "If a user attempts to launch a distracting application while a scheduled prayer is active, the app automatically intercepts the activity and brings the Prayer Focus Screen right to the foreground. This makes casual bypassing impossible and gently returns focus to worship.",
    accessibilityGuardStatus: "Accessibility Guard Status",
    accessibilityGuardActive: "Salah Restriction Hook Active",
    accessibilityGuardActiveDesc: "Any click on the simulated social platforms below will trigger an immediate Accessibility Intercept.",
    accessibilityStandby: "Normal Standby Mode",
    accessibilityStandbyDesc: "Create a prayer session matching the current local time in the Schedules tab to activate the automatic blocker guardian for live testing! Or tap a simulated app to try it out.",
    simulateBypassTitle: "Simulate Opening distractions:",
    instagramTag: "Feed",
    tiktokTag: "Shorts",
    youtubeTag: "Feed",
    gamingTag: "Gaming Drop",
    webTag: "Browsing",
    interceptTitle: "Accessibility Guard Intercepted",
    interceptDesc: "is blocked during your live scheduled prayer period to prevent digital distractions.",
    reelsDescription: "Endless infinite scrolling feeds can wait. Focus on Salah.",
    candyScore: "High-Score",
    candyLevel: "Candy Level",
    simCloseBtn: "Close App",
    simScrollNext: "Next reel ➜",
    simLikesCount: "Likes",
    simAppsMenu: "Apps",
    simHomeBtn: "Home",
    simBackBtn: "Back",
    tapToOpenNotice: "TAP ANY APP TO OPEN IN SMARTPHONE SIMULATOR",

    lockActiveStatusBadge: "PRAYER ACCESSIBILITY LOCK ACTIVE",
    lockCurrentSessionLabel: "Current Commitment Session",
    lockUnproductiveWarning: "Unproductive apps are blocked until",
    lockAestheticNotice: "Put your phone down, perform Wudu, and stand upright for your communication with Allah, the Supreme Lord.",
    lockEmergencyBypassTitle: "Emergency exit required? Unrestricted system requires deep conscious action.",
    allowedSystemBypassHeader: "Allowed Android System Bypass (Emergency Access)",
    flashlightTool: "Flashlight",
    flashlightDesc: "Bright Panel",
    emergencyCallTool: "Emergency Call",
    emergencyCallDesc: "Essential Dials",
    alarmDismissTool: "Alarm Dismiss",
    alarmDismissDesc: "Silence Alarms",
    cameraCaptureTool: "Camera Capture",
    cameraCaptureDesc: "Instant Snap",
    flashlightSimActive: "Flashlight Simulator Active",
    flashlightSimDesc: "The entire screen is illuminated at maximum brightness.",
    flashlightSimClose: "Click anywhere to turn off",
    emergencyCommHeader: "Emergency Communication",
    emergencyCommDesc: "Essential contacts remain accessible. You can dial any number or quickly choose simulated services:",
    emergencyCommDialerBtn: "Dial Emergency (911)",
    dialFamilyBtn: "Family Guardian",
    dialCallActionBtn: "Call Number",
    disconnectCallBtn: "Disconnect call",
    callingSimulate: "Calling",
    activeCallSimulating: "Simulating urgent connection...",
    reflectionTitle: "Self-Discipline Reflection Filter",
    reflectionDesc: "Prayer Focus is a self-commitment contract. Before temporarily unlocking your device, write down your sincere reason to help prevent casual scrolling.",
    reflectionPlaceholder: "Sincere reflection: 'The reason I absolutely need to leave my prayer concentration right now is...'",
    reflectionError: "Please write a sincere reflection (minimum 15 characters). Salah is your top priority.",
    returnToPrayerBtn: "Return to Prayer",
    confirmBypassBtn: "Confirm & Bypass",
    skipPassageBtn: "Skip",
    rotatesNotice: "Rotates periodically or browse manually",

    completionFormTitle: "Did you complete your Salah?",
    completionFormDesc: "You committed to disconnect during this prayer. Logging your outcome supports visual streaks and analytics.",
    optionYes: "Yes, I prayed on time",
    optionLater: "Prayed later / delayed",
    optionMissed: "I missed this one",

    analyticsTitle: "Salah Analytics Dashboard",
    analyticsDesc: "Visual completion rates for custom logged sessions. Track daily performance and streaks to motivate consistency in your spiritual journey.",
    statTotalLogged: "Total Sessions Logged",
    statAccumulated: "Accumulated metrics",
    statCompletedOnTime: "Completed On Time",
    statSuccessRatio: "success ratios",
    statDelayedLater: "Prayed Delayed (Later)",
    statRecoveryRatio: "recovery efforts",
    statMissed: "Missed Sessions",
    statAttentionRatio: "attention required",
    weeklyAttendanceTitle: "Weekly Attendance trends",
    focusDistributionTitle: "Focus distribution",
    focusDistributionDesc: "Performance breakdown analyzed per individual Prayer session:",
    emptyDistributionMessage: "Complete some sessions to preview individual ratios here.",
    chronicledLogTitle: "Chronicled Log Actions",
    resetHistoryBtn: "Reset History Logs",
    resetConfirmationMessage: "Do you really want to discard your entire offline history log? This cannot be undone.",
    emptyLogMessage: "Log is currently empty.",
    emptyLogSubtext: "Complete simulated lock sessions or tap 'Confirm & Bypass' to gather logs.",
    alterStateLabel: "Alter State:",

    settingsTitle: "System Preferences",
    settingsDesc: "Configure security strictness thresholds, language presets, and authorize emergency tools accessible within the lock overlay.",
    preferencesHeader: "Symmetric Security Framework",
    disableOptimizationDesc: "Let the application run without restrictions in the background",
    enableStrictBlocker: "Enable Strict Launcher Interception",
    enableStrictBlockerDesc: "Intercepts background activities using accessibility simulator",
    preventCasualBypass: "Prevent Casual Decoupled Bypassing",
    preventCasualBypassDesc: "Demands a written self-reflection quiz to temporarily leave a session",
    emergencyToolsHeader: "Emergency White-Listed Utility Rules",
    emergencyToolsSubtext: "Authorize specific background actions eligible during an active full-screen Salah lock.",
    flashlightRuleLabel: "Screen Flashlight Simulator",
    flashlightRuleDesc: "Flashes entire screen at maximum white brightness of client-side pixels",
    dialerRuleLabel: "Emergency Outward Dialer",
    dialerRuleDesc: "Allowed quick call shortcuts to critical relatives/guardians",
    alarmRuleLabel: "Active Alarm Silence Overlay",
    alarmRuleDesc: "Silences and dismisses loud ringing alarms without forcing unlock",
    cameraRuleLabel: "Convenience Camera Snapshot",
    cameraRuleDesc: "Allows using camera feed strictly for emergency snapshots",
    aestheticLayoutHeader: "Aesthetic Theme Setup",
    aestheticLayoutDesc: "Select standard light display layouts, or standard deep dark slate profiles.",
    lightThemeLabel: "Quiet Light Mode",
    darkThemeLabel: "Spiritual Dark Slate",
    quranConfigHeader: "Noble Quran Presets",
    quranFormatLabel: "Script Format:",
    quranFormatValue: "Original Arabic (Classical Uthmani)",
    displayTranslationLabel: "Render Translation under Quran Card",
    displayTranslationDesc: "Renders high accuracy translations on lock screen",
    backupSectionHeader: "Database Backups & Restore Simulation",
    backupSectionDesc: "Simulate full backup of your schedules, logs, and preferences to JSON, or restore default configurations securely.",
    exportBackupBtn: "Export JSON Backup",
    importBackupBtn: "Import / Seed Demo Data",
    factoryResetBtn: "Wipe and Factory Reset settings",
    factoryResetConfirm: "Factory Reset? This cleans all coordinates, preferences, logs, and custom timings completely and reverts to system setup.",
    factoryWipeSuccess: "Local Storage wiped! Reverted configuration variables to factory standards.",

    // Contact / Support
    contactHeader: "Contact & Support",
    contactDesc: "For feedback, suggestions, or bug reports, feel free to reach out.",
    contactDeveloper: "Developer: Engr MD Kawser Ahmd",

    offlineSecureBadge: "OFFLINE SECURE",
    systemVersionBadge: "SYSTEM VERSION v1.0 (MVP)",
    copyrightText: "© 2026 Prayer Focus. All rights reserved.",
    developedBy: "Developed by: Engr MD Kawser Ahmd",
    helpingMuslims: "Helping Muslims stay focused during Salah and reduce digital distractions.",
    versionLabel: "Version 1.0 (MVP)",

    prayerFajr: "Fajr",
    prayerDhuhr: "Dhuhr",
    prayerAsr: "Asr",
    prayerMaghrib: "Maghrib",
    prayerIsha: "Isha",
    prayerTahajjud: "Tahajjud",
    prayerDuha: "Duha",
    prayerCustomFocus: "Focus Session",

    // New English Localizations
    overlayQuranTitle: "📖 Noble Quran",
    overlayHadithTitle: "🤲 Authentic Hadith",
    overlayDevotionTitle: "💡 Serene Reminder",
    overlayEmergencyTitle: "Emergency exit required?",
    overlayEmergencySubtitle: "Unrestricted system requires deep conscious action.",
    sandboxTitle: "Accessibility Service Sandbox",
    gameCandyCrush: "Candy Crush",
    simLaunchOverlay: "Launching Prayer focus overlays...",
    simAutoplayReels: "Auto-playing reels...",
    gameCandyTitle: "Candy Crush Surge",
    errorPrayerName: "Please provide a descriptive prayer name.",
    errorTimesRequired: "Start and End times are required.",
    errorEndTimeLower: "The end time must exceed the start time.",
    errorActiveDayRequired: "Please select at least one active day.",
    cityDropdownPlaceholder: "--- Choose standard City ---",
    alertGpsFinished: "GPS lookup finished! Calculated closest city coordinates.",
    descFajr: "(Dawn)",
    descDhuhr: "(Noon)",
    descAsr: "(Afternoon)",
    descMaghrib: "(Sunset)",
    descIsha: "(Night)",
    descTahajjud: "(Vigil)",
    descDuha: "(Forenoon)",
    statChartPrayed: "Prayed",
    statLegendCompleted: "Completed",
    statLegendLater: "Remaining/Later",
    statLegendFree: "Free Slots",
    statSpiritualAdvice: "Habituating daily routines eliminates friction",
    generalPrayerSuffix: "Salah",
    logDateLabel: "Logged Date:",
    logStateCompleted: "✓ Completed",
    logStateLater: "⏳ Prayed Later",
    logStateMissed: "✗ Missed",
    tooltipDeleteLog: "Delete log",
    languageLabel: "Language Settings",
    quranTransFormatLabel: "Quran Translation Display Format:",
    quranFormatArabicOnly: "1. Original Arabic Only",
    quranFormatArabicBangla: "2. Arabic + English/Bangla Translation",
    quranFormatArabicEnglish: "3. Arabic + English Translation",
    developerLabel: "Developer",
    emailAddressLabel: "Email Address",
    emailActionBtn: "Email",
    visitActionBtn: "Visit",
    devName: "Engr MD Kawser Ahmd",
    devEmail: "engkawser21@gmail.com",
    devFacebook: "facebook.com/engkawser21",
    devFacebookUrl: "https://www.facebook.com/engkawser21/",
    overlayEmergencyGlobal: "911 (Global Emergency)",
    overlayEmergencyFamily: "Family Guardian",
    overlayEmergencyPlaceholder: "Enter phone number...",
    overlayCameraSimulator: "Camera Access Simulator",
    overlayCameraRetake: "Take another snapshot",
    overlayCameraDesc: "Essential camera tools allowed for general convenience/security during overlay.",
    overlayAlarmSilenced: "Simulated alarm has been silenced.",
    socialFeed1Caption: "Just 5 more minutes of endless scrolling before I pray... 😅",
    socialFeed2Caption: "Leveling up in the latest dungeon! Don't disturb me! 🎮🔥",
    socialFeed3Caption: "Deep frying butter for absolutely no healthy reason at 1 PM...",
    socialFeed1Likes: "128k",
    socialFeed2Likes: "52k",
    socialFeed3Likes: "1.2M",
    daySun: "Su",
    dayMon: "Mo",
    dayTue: "Tu",
    dayWed: "We",
    dayThu: "Th",
    dayFri: "Fr",
    daySat: "Sa"
  },
  bn: {
    appName: "প্রেয়ার ফোকাস",
    tagline: "সালাতে মনোযোগ দিন। মনোযোগ বিঘ্নকারী অ্যাপ থেকে দূরে থাকুন।",
    focusTagline: "নামাজে মনোযোগ দিন। অফলাইন হন।",

    tabOverview: "এক নজরে",
    tabSchedules: "নামাজের সময়সূচী",
    tabAccessibility: "অ্যাক্সেসিবিলিটি বক্স",
    tabAnalytics: "বিশ্লেষণ ও পরিসংখ্যান",
    tabSettings: "সেটিংস",

    chooseLanguage: "আপনার ভাষা নির্বাচন করুন",
    welcomeTitle: "প্রেয়ার ফোকাস-এ আপনাকে স্বাগতম",
    welcomeSubtitle: "সালাতে মনোযোগ দিন। মনোযোগ বিঘ্নকারী উপাদান থেকে দূর থাকুন।",
    setupExplainText: "অনেক সময় সামাজিক যোগাযোগ মাধ্যম, ছোট ভিডিও, গেম এবং বার্তার কারণে পবিত্র সালাতের সময় নষ্ট হয় এবং নামাজে বিলম্ব বা অবহেলা তৈরি হয়।",
    setupExplainCard: "প্রেয়ার ফোকাস কোনো সাধারণ নামাজের অ্যালার্ম নয়। এটি একটি কঠোর নিয়মানুবর্তী অঙ্গীকার ব্যবস্থা, যা আপনাকে সমস্ত ডিজিটাল আকর্ষণ থেকে রক্ষা করে সালাতে নিবিষ্ট হতে সাহায্য করে।",
    setupNamePlaceholder: "আপনার ডাকনাম লিখুন...",
    setupNameLabel: "আপনাকে কোন নামে সম্বোধন করা হবে?",
    proceedBtn: "পরবর্তী ধাপে যান ➔",
    permissionsTitle: "প্রয়োজনীয় সিস্টেম পারমিশন অনুমোদন করুন",
    permissionsSubtitle: "অ্যান্ড্রয়েড সিস্টেমে অ্যাপ্লিকেশন লক সঠিকভাবে সচল রাখতে অ্যাক্সেসিবিলিটি এবং ব্যাকগ্রাউন্ড সার্ভিসের পারমিশন প্রয়োজন।",
    permAccessTitle: "অ্যাক্সেসিবিলিটি ব্লকার সার্ভিস",
    permAccessDesc: "সালাতের নির্ধারিত সময়ে মনোযোগ বিপথগামীকারী অ্যাপগুলোর ব্যবহার ব্লক করে রাখে।",
    permAlarmTitle: "অ্যালার্ম নোটিফিকেশন ওভারলে",
    permAlarmDesc: "ফোন লক থাকলেও তাৎক্ষণিকভাবে নামাজের পর্দা সবার উপরে প্রদর্শন করা নিশ্চিত করে।",
    permBatteryTitle: "ব্যাটারি অপ্টিমাইজেশন নিষ্ক্রিয়তা",
    permBatteryDesc: "ব্যাকগ্রাউন্ডে নামাজের সময়সূচী নির্ধারণকারী প্রসেসটি বন্ধ হতে বাধা দেয়।",
    grantAllBtn: "সব পারমিশন অনুমোদন করুন",
    backBtn: "পূর্ববর্তী",
    initialCommitTitle: "নামাজের প্রাথমিক সূচী নির্ধারণ",
    initialCommitSubtitle: "আপনি কি সাধারণ দৈনিক নামাজের সময়সূচী অনুযায়ী ফোন লক সচল করতে চান? (সব সময় পরিবর্তনযোগ্য)",
    useRecommendedBtn: "প্রস্তাবিত সময়সূচী ব্যবহার করুন",
    preferCustomBtn: "আমি ম্যানুয়ালি সেট করতে চাই",

    currentFocusStatus: "চলতি মনোযোগের স্থিতি",
    assalamuAlaikum: "আসসালামু আলাইকুম",
    greetingDesc: "প্রেয়ার ফোকাস-এ আপনাকে স্বাগতম। আপনি ফোন থেকে দূরে থেকে ইবাদতে সময় দেওয়ার জন্য নামাজের সূচী নির্ধারণ করেছেন। আপনি কি প্রস্তুত?",
    prayerStreak: "নামাজের ধারাবাহিকতা",
    streakDays: "টানা দিন সংখ্যা",
    streakMotivationActive: "চমৎকার ধারাবাহিকতা! আপনার সালাত আদায়ের এই মহান সংকল্প বজায় রাখুন।",
    streakMotivationEmpty: "আজই আপনার প্রথম সালাত সম্পাদন রেকর্ড করে ধারাবাহিকতা শুরু করুন।",
    streakFooter: "আপনার প্রতিটি প্রয়াস আধ্যাত্মিক অভ্যাস গড়ে তোলে",
    upcomingSalahHeader: "পরবর্তী নামাজ সেশন",
    scheduledToday: "আজকের জন্য নির্ধারিত",
    quietMode: "শান্ত মোড সচল",
    timeWindow: "সময়সীমা",
    lockWarningText: "ঠিক এই সময় শুরু হওয়া মাত্র আপনার মোবাইল স্বয়ংক্রিয়ভাবে ব্লক হয়ে যাবে। দয়া করে প্রয়োজনীয় পারমিশন সচল রাখবেন।",
    noSchedulesConfigured: "কোনো নামাজের সময়সূচী সচল নেই।",
    noSchedulesDesc: "উপরে নামাজের সময়সূচী ট্যাবে গিয়ে সময় নির্ধারণ করুন অথবা জিপিএস ব্যবহার করে গণনা করে নিন।",
    lockFooterText: "মোবাইল লক অ্যান্ড্রয়েড ফ্রেমওয়ার্ক দ্বারা স্বয়ংক্রিয়ভাবে নিয়ন্ত্রিত হচ্ছে",
    liveBlockerHeader: "অ্যাপ ব্লকার সিমুলেশন পরীক্ষা",
    liveBlockerDesc: "পরবর্তী নামাজের ওয়াক্ত আসার আগে অ্যাপ লক দেখতে কেমন দেখাবে তা পরীক্ষা করতে চান? ৫ মিনিটের একটি ডেমো লক সচল করে দেখুন।",
    testOverlaySection: "৫ মিনিটের লক পরীক্ষা সচল করুন:",
    testOverlaySubtext: "ইন্টারেক্টিভ: এখানে ক্লিক করলে জরুরি যোগাযোগ টুল এবং মন শান্তকারী পবিত্র আয়াত চালু হবে।",
    attendanceMetricsHeader: "সালাত আদায়ের পরিসংখ্যান",
    todayCompletionGoal: "আজকের পূরণ লক্ষ্য",
    loggedRatioLabel: "টি নামাজের সেশন আজ সফলভাবে সম্পাদন রেকর্ড করা হয়েছে",
    progressDone: "সম্পাদনের অগ্রগতি",

    schedulesTabHeader: "নামাজের কঠোর অঙ্গীকার সময়সূচী",
    schedulesTabDesc: "সিস্টেমটি নির্ধারিত দিন ও ওয়াক্ত অনুযায়ী সচল হয়ে যায়। সালাতের সময় শুরু হলে এটি মনোযোগ হ্রাসকারী সকল অ্যাপ ব্লক করে দেয় যাতে আপনি একাগ্রতার সাথে সালাত আদায় করতে পারেন।",
    automaticPresetHeader: "স্বয়ংক্রিয় নামাজের ওয়াক্ত নির্ধারক",
    automaticPresetDesc: "ম্যানুয়ালি নামাজের সময় দিতে চান না? আপনার নিকটবর্তী শহরটি নির্বাচন করলেই নামাজের ওয়াক্ত গণনা হয়ে যাবে। আপনি পরবর্তীতে চাইলে যেকোনো সময় এটি বদলাতে পারবেন!",
    selectClosestCity: "নিকটবর্তী শহর নির্বাচন করুন:",
    gpsLookupBtn: "জিপিএস অবস্থান ব্যবহার করে ওয়াক্ত খুঁজুন",
    gpsActivatedAlert: "জিপিএস অবস্থান পাওয়া গেছে: আপনার নিকটবর্তী শহরের ওয়াক্ত লোড করা হয়েছে!",
    activeSchedulesCount: "সময়সূচী তালিকা",
    createCustomBtn: "নতুন নামাজের ওয়াক্ত যোগ করুন",
    defineCustomTitle: "ম্যানুয়াল লক সময় নির্ধারণ করুন",
    cancelBtn: "বাতিল",
    prayerNameLabel: "নামাজ বা সেশনের নাম",
    lockStartsLabel: "লক শুরু হবে",
    lockEndsLabel: "লক শেষ হবে",
    repeatLabel: "দিন নির্বাচন করুন (দৈনিক বা নির্দিষ্ট দিনসমূহ):",
    saveScheduleBtn: "নামাজের জন্য সময় লক সেভ করুন",
    noSchedulesSeeded: "কোনো নামাজের সময়সূচী পাওয়া যায়নি।",
    noSchedulesSeededDesc: "বামে স্বয়ংক্রিয় শহর তালিকা থেকে অথবা নিজের ইচ্ছে অনুযায়ী নামাজের সময় নির্ধারণ করুন।",
    everyday: "প্রতিদিন",
    daysCount: "দিন",
    customBadge: "কাস্টম",
    standbyTooltip: "সচল বা নিষ্ক্রিয় করুন",
    deleteTooltip: "সময়সূচী মুছে ফেলুন",

    accessibilityBoxTitle: "অ্যাক্টিভ ব্লকার ও রেস্ট্রিকশন পদ্ধতি",
    accessibilityBoxExplain1: "প্রেয়ার ফোকাস-এর অ্যান্ড্রয়েড সংস্করণটি মোবাইলের অ্যাক্সেসিবিলিটি সার্ভিস এবং ব্যাকগ্রাউন্ড সার্ভিস ব্যবহার করে ব্যবহারকারীর মনোযোগ পর্যবেক্ষণ করে।",
    accessibilityBoxExplain2: "সালাতের নির্ধারিত সময়ে ব্যবহারকারী ফেসবুক, টিকটক, ইউটিউব বা অন্য কোনো মনোযোগ ভঙ্গকারী অ্যাপ চালু করার চেষ্টা করলে, সার্ভিসটি তাৎক্ষণিকভাবে সেটি বন্ধ করে সালাতের পূর্ণ ওভারলে স্ক্রিন সামনে নিয়ে আসে। এর ফলে নামাজে বিলম্ব করার সুযোগ থাকে না।",
    accessibilityGuardStatus: "অ্যাক্সেসিবিলিটি গার্ডের অবস্থা",
    accessibilityGuardActive: "সালাত কড়া রেস্ট্রিকশন সচল",
    accessibilityGuardActiveDesc: "নিচের যেকোনো সিমুলেটেড সোশ্যাল অ্যাপে ক্লিক করলে অ্যাক্সেসিবিলিটি গার্ড তাৎক্ষণিকভাবে অ্যাপ লক চালূ করবে।",
    accessibilityStandby: "স্বাভাবিক স্ট্যান্ডবাই মোড",
    accessibilityStandbyDesc: "পরীক্ষা করার জন্য নামাজের সময়সূচী ট্যাবে গিয়ে বর্তমান সময়ের সাথে মিল রেখে একটি ওয়াক্ত যোগ করুন অথবা নিচের যেকোনো অ্যাপ চালু করে সিমুলেশন দেখুন।",
    simulateBypassTitle: "মনোযোগ ভঙ্গকারী অ্যাপ চালু করে দেখুন:",
    instagramTag: "ফিড",
    tiktokTag: "শর্টস",
    youtubeTag: "ভিডিও ফিড",
    gamingTag: "দোপামিন গেম",
    webTag: "ব্রাউজিং",
    interceptTitle: "অ্যাক্সেসিবিলিটি গার্ড লক করেছে",
    interceptDesc: "সালাতের নির্ধারিত সময়ে মোবাইল অপব্যবহার রোধে এই অ্যাপটি সাময়িকভাবে ব্লক করা হয়েছে।",
    reelsDescription: "অনন্ত স্ক্রল বা ভিডিও দেখার চেয়ে নামাজে দাঁড়ানোই উত্তম।",
    candyScore: "সর্বোচ্চ স্কোর",
    candyLevel: "ক্যান্ডি লেভেল",
    simCloseBtn: "অ্যাপ বন্ধ করুন",
    simScrollNext: "পরবর্তী ভিডিও ➜",
    simLikesCount: "লাইক",
    simAppsMenu: "অ্যাপস",
    simHomeBtn: "হোম",
    simBackBtn: "পিছনে",
    tapToOpenNotice: "যেকোনো আইকনে ক্লিক করে ফোন সিমুলেটর চালু করুন",

    lockActiveStatusBadge: "নামাজের অ্যাক্সেসিবিলিটি লক সচল আছে",
    lockCurrentSessionLabel: "চলতি নামাজ সেশন",
    lockUnproductiveWarning: "অবান্তর অ্যাপসমূহ ব্যবহার বন্ধ থাকবে সময় পর্যন্ত:",
    lockAestheticNotice: "আপনার মোবাইল পাশে রাখুন, সুন্দরভাবে ওজু সম্পন্ন করুন এবং বিশ্বজগতের প্রতিপালক মহান আল্লাহর সামনে সালাতে দাঁড়ান।",
    lockEmergencyBypassTitle: "জরুরিভাবে মোবাইল আনলক করতে চান? এর জন্য গভীর মনোযোগসহ সঠিক আত্মপর্যবেক্ষণ লিখতে হবে।",
    allowedSystemBypassHeader: "অনুমোদিত অ্যান্ড্রয়েড সিস্টেম রুলস (জরুরি অ্যাক্সেস)",
    flashlightTool: "ফ্ল্যাশলাইট",
    flashlightDesc: "উজ্জ্বল স্ক্রিন",
    emergencyCallTool: "জরুরি কল",
    emergencyCallDesc: "পারিবারিক ডায়াল",
    alarmDismissTool: "অ্যালার্ম বন্ধ",
    alarmDismissDesc: "শোরগোল কমানো",
    cameraCaptureTool: "ক্যামেরা স্ন্যাপ",
    cameraCaptureDesc: "তাৎক্ষণিক ছবি",
    flashlightSimActive: "ফ্ল্যাশলাইট সিমুলেটর সচল",
    flashlightSimDesc: "মোবাইলের স্ক্রিন সর্বোচ্চ সাদা আলো ছড়াবে যাতে জরুরি প্রয়োজনে টর্চ হিসেবে কাজ করে।",
    flashlightSimClose: "বন্ধ করতে যেকোনো জায়গায় ক্লিক করুন",
    emergencyCommHeader: "জরুরি যোগাযোগ ব্যবস্থা",
    emergencyCommDesc: "নামাজের লকেও জরুরি যোগাযোগ ব্যবস্থা সচল থাকে। আপনি চাইলে নিচের নাম্বারে কল করতে পারবেন:",
    emergencyCommDialerBtn: "জরুরি কল (৯১১)",
    dialFamilyBtn: "বাবা/মা অথবা অভিভাবক",
    dialCallActionBtn: "ডায়াল করুন",
    disconnectCallBtn: "লাইন কেটে দিন",
    callingSimulate: "কল করা হচ্ছে",
    activeCallSimulating: "জরুরি যোগাযোগ স্থাপন করা হচ্ছে...",
    reflectionTitle: "আত্মরক্ষা ও সচেতনতা পর্যালোচনা ফিল্টার",
    reflectionDesc: "প্রেয়ার ফোকাস একটি আত্ম-অঙ্গীকার চুক্তি। তাড়াহুড়ো করে কিংবা ঝোঁকের মাথায় মোবাইল নিয়ে স্ক্রল করতে যাওয়ার বদলে, সালাত ছেড়ে বের হওয়ার যৌক্তিক কারণটি নিচে লিখুন।",
    reflectionPlaceholder: "সৎ আত্মপর্যালোচনা: 'এই মুহূর্তে অত্যন্ত জরুরি যে কারণে আমি আমার সালাতের একাগ্রতা ও নামাজ বর্জন করছি তা হলো...'",
    reflectionError: "দয়া করে একটি যৌক্তিক কারণ লিখুন (সর্বনিম্ন ১৫টি অক্ষর)। সালাত আপনার জীবনের সর্বোচ্চ অগ্রাধিকার হওয়া উচিত।",
    returnToPrayerBtn: "সালাতে ফিরে যান",
    confirmBypassBtn: "নিশ্চিত করুন ও আনলক করুন",
    skipPassageBtn: "পরবর্তী বাণী",
    rotatesNotice: "বাণীগুলো এখানে স্বয়ংক্রিয়ভাবে পরিবর্তিত হচ্ছে",

    completionFormTitle: "আপনি কি নামাজ আদায় করেছেন?",
    completionFormDesc: "আপনি প্রতিজ্ঞা করেছিলেন নামাজের এই নির্ধারিত সময়ে মোবাইল ব্যবহার করবেন না। আপনার অনুভূতি বা অগ্রগতি লিপিবদ্ধ করুন।",
    optionYes: "হ্যাঁ, আমি নামাজ আদায় করেছি",
    optionLater: "পরে আদায় করব/করছি",
    optionMissed: "এই ওয়াক্তটি মিস হয়েছে",

    analyticsTitle: "সালাত ট্র্যাকিং ও বিশ্লেষণ",
    analyticsDesc: "কাস্টম আদায়কৃত নামাজের রেকর্ডের গ্রাফ ও পরিসংখ্যান। আপনার আত্মিক অগ্রগতি বৃদ্ধি করতে আপনার ধারাবাহিকতা ট্র্যাক করুন।",
    statTotalLogged: "মোট নামাজ রেকর্ড করা হয়েছে",
    statAccumulated: "জমাকৃত সামগ্রিক ডেটা",
    statCompletedOnTime: "ওয়াক্তমত আদায়কৃত",
    statSuccessRatio: "সাফল্যের সর্বোচ্চ হার",
    statDelayedLater: "দেরিতে নামাজ আদায়",
    statRecoveryRatio: "দেরিতে আদায়ের চেষ্টা",
    statMissed: "নামাজ কাজা বা মিস",
    statAttentionRatio: "মনোযোগ বৃদ্ধি প্রয়োজন",
    weeklyAttendanceTitle: "সাপ্তাহিক নামাজ আদায়ের অনুপাত",
    focusDistributionTitle: "সালাতের একাগ্রতা বণ্টন",
    focusDistributionDesc: "প্রতিটি নামাজের ওয়াক্ত অনুযায়ী আপনার নিষ্ঠা ও একাগ্রতার হার:",
    emptyDistributionMessage: "এখানে বিস্তারিত গ্রাফ বা বণ্টন দেখতে কিছু ওয়াক্ত সম্পাদন সম্পন্ন করুন।",
    chronicledLogTitle: "পূর্ববর্তী দিনের সামগ্রিক ইতিহাস",
    resetHistoryBtn: "পূর্বের ট্র্যাকিং ডেটা মুছুন",
    resetConfirmationMessage: "আপনি কি সত্যি আপনার পূর্বে সংরক্ষিত পুরো নামাজের ইতিহাস মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা যাবে না।",
    emptyLogMessage: "ইতিহাস রের্কড খালি আছে।",
    emptyLogSubtext: "সালাতের নির্ধারিত সময়ে নামাজ সম্পাদন বা বাইপাস করার মাধ্যমে ডেটা তৈরি করুন।",
    alterStateLabel: "অবস্থা পরিবর্তন করুন:",

    settingsTitle: "পদ্ধতিগত কনফিগারেশন",
    settingsDesc: "অ্যাপের কঠোরতা, ভাষা সেটিংস এবং সালাতের লকের মাঝে জরুরি ব্যবহারের টুলগুলো সচল বা নিষ্ক্রিয় করুন।",
    preferencesHeader: "কঠোর নিরাপত্তা ফ্রেমওয়ার্ক",
    disableOptimizationDesc: "অ্যাপ্লিকেশনটি ব্যাকগ্রাউন্ডে যেন নির্বিঘ্নে সচল থাকে তা নিশ্চিত করুন",
    enableStrictBlocker: "কঠোর স্ক্রিন ওভারলে গার্ড",
    enableStrictBlockerDesc: "নির্ধারিত নামাজের সময় অ্যাপ ওপেন করতে বাধা দেয়",
    preventCasualBypass: "সহজে বাইপাস বন্ধ করা",
    preventCasualBypassDesc: "নামাজের লকের বাইরে যেতে লিখিত আত্মপর্যালোচনা বাধ্য করে",
    emergencyToolsHeader: "জরুরি অ্যাক্সেসের জন্য অনুমোদিত টুলস",
    emergencyToolsSubtext: "নামাজের লক সচল থাকাকালীন যেকোনো জরুরি পরিস্থিতিতে নিচের কোন কোন টুলের ব্যবহার অনুমোদন করতে চান তা ঠিক করুন।",
    flashlightRuleLabel: "হোয়াইট ফ্ল্যাশলাইট সিমুলেটর",
    flashlightRuleDesc: "জরুরি প্রয়োজনে অন্ধকারে সর্বোচ্চ উজ্জ্বলতা দেয়",
    dialerRuleLabel: "জরুরি ডায়ালার ও কলিং",
    dialerRuleDesc: "জরুরি সেবা বা আপনজনদের কাছে কল করার সুবিধা রাখে",
    alarmRuleLabel: "নামাজের লকে অ্যালার্ম বন্ধ করার ওভারলে",
    alarmRuleDesc: "মোবাইল আনলক না করেই অ্যালার্ম বন্ধ করতে দেয়",
    cameraRuleLabel: "জরুরি ক্যামেরা ক্যাপচার ব্যবস্থা",
    cameraRuleDesc: "তাৎক্ষণিক যেকোনো ছবি তোলার ব্যবস্থা রাখে",
    aestheticLayoutHeader: "থিম ও ডিসপ্লে সেটিংস",
    aestheticLayoutDesc: "শান্ত ও সাধারণ উজ্জ্বল হালকা থিম অথবা গভীর আধ্যাত্মিক ডার্ক স্লেট থিম নির্বাচন করুন।",
    lightThemeLabel: "শান্ত লাইট মোড",
    darkThemeLabel: "আধ্যাত্মিক ডার্ক স্লেট থিম",
    quranConfigHeader: "কুরআনের বাণী সেটিংস",
    quranFormatLabel: "লিপির ধরন:",
    quranFormatValue: "মূল আরবি (ক্লাসিক্যাল উসমানী স্ক্রিপ্ট)",
    displayTranslationLabel: "কুরআনের অনুবাদ প্রদর্শন করুন",
    displayTranslationDesc: "লকের মাঝে আরবির ঠিক নিচে বাংলায় অনুবাদ দেখাবে",
    backupSectionHeader: "ব্যাকআপ ফাইল সংরক্ষণ ও পুনরায় ইনস্টল",
    backupSectionDesc: "আপনার তৈরি করা নামাজের রুটিন এবং ট্র্যাকিং ডেটা সুরক্ষিত ফরম্যাটে ব্যাকআপ নিন অথবা লোড করুন।",
    exportBackupBtn: "JSON ব্যাকআপ রিডিং ফাইল ডাউনলোড",
    importBackupBtn: "ডেমো ডেটা লোড করুন (পরীক্ষার জন্য)",
    factoryResetBtn: "সব সেটিংস মুছে নতুন করে শুরু করুন",
    factoryResetConfirm: "আপনি কি অ্যাপলকে সব সেটিংস এবং রুটিন মুছে ফ্যাক্টরি ডিফল্ট করতে চান?",
    factoryWipeSuccess: "সফলভাবে পূর্বের সব সেটিংস ও নামাজের রুটিন মুছে ফেলা হয়েছে!",

    // Contact / Support
    contactHeader: "যোগাযোগ ও সহায়তা (Contact & Support)",
    contactDesc: "আপনার মতামত, পরামর্শ বা যেকোনো ত্রুটির রিপোর্ট পাঠাতে নির্দ্বিধায় যোগাযোগ করুন।",
    contactDeveloper: "ডেভেলপার: ইঞ্জি. মোঃ কাওসার আহমেদ (Engr MD Kawser Ahmd)",

    offlineSecureBadge: "অফলাইন এবং শতভাগ নিরাপদ",
    systemVersionBadge: "সংস্করণ v1.0 (এমভিপি)",
    copyrightText: "© ২০২৬ প্রেয়ার ফোকাস। সর্বস্বত্ব সংরক্ষিত।",
    developedBy: "ডেভেলপড বাই: ইঞ্জি. মোঃ কাওসার আহমেদ (Engr MD Kawser Ahmd)",
    helpingMuslims: "সালাতের সময় মুসলমানদের মনোযোগী রাখতে এবং ডিজিটাল বিভ্রান্তি কমাতে সাহায্য করছে।",
    versionLabel: "সংস্করণ ১.০ (এমভিপি)",

    prayerFajr: "ফজর",
    prayerDhuhr: "যোহর",
    prayerAsr: "আসর",
    prayerMaghrib: "মাগরিব",
    prayerIsha: "এশা",
    prayerTahajjud: "তাহাজ্জুদ",
    prayerDuha: "দোহা",
    prayerCustomFocus: "কাস্টম ফোকাস সেশন",

    // New Bangla Localizations
    overlayQuranTitle: "📖 কুরআনুল কারীম",
    overlayHadithTitle: "🤲 সহীহ হাদীস",
    overlayDevotionTitle: "💡 আত্মিক বাণী",
    overlayEmergencyTitle: "জরুরি প্রস্থান প্রয়োজন?",
    overlayEmergencySubtitle: "অর্গুলার লক ভাঙতে আত্ম-সচেতনতা ফিল্টার অতিক্রম করুন।",
    sandboxTitle: "অ্যাক্সেসিবিলিটি সার্ভিস কুঠুরি",
    gameCandyCrush: "ক্যান্ডি ক্রাশ",
    simLaunchOverlay: "লক ওভারলে স্ক্রিন চালু হচ্ছে...",
    simAutoplayReels: "অটোপ্লে শর্টস চলছে...",
    gameCandyTitle: "ক্যান্ডি ক্রাশ ডোপামিন",
    errorPrayerName: "দয়া করে একটি সঠিক নামাজের নাম দিন।",
    errorTimesRequired: "শুরু এবং শেষ সময় নেওয়া আবশ্যক।",
    errorEndTimeLower: "শেষ সময় অবশ্যই শুরু সময়ের চেয়ে বেশি হতে হবে।",
    errorActiveDayRequired: "দয়া করে কমপক্ষে একটি সক্রিয় দিন নির্বাচন করুন।",
    cityDropdownPlaceholder: "--- নিকটবর্তী শহর ---",
    alertGpsFinished: "জিপিএস গণনা সমাপ্ত! আপনার নিকটবর্তী জিপিএস শহর লোড হয়েছে।",
    descFajr: "(উষা)",
    descDhuhr: "(দুপুর)",
    descAsr: "(বিকাল)",
    descMaghrib: "(সূর্যাস্ত)",
    descIsha: "(রাত্রিকাল)",
    descTahajjud: "(শেষ রাত)",
    descDuha: "(পূর্বাহ্ন)",
    statChartPrayed: "আদায় করা হয়েছে",
    statLegendCompleted: "ওয়াক্তমত সম্পন্ন হয়েছে",
    statLegendLater: "দেরি হয়েছে / পরে",
    statLegendFree: "ফ্রি স্লট",
    statSpiritualAdvice: "নিয়মিত সালাত আদায় আত্মিক ও মানসিক প্রশান্তি বাড়ায়",
    generalPrayerSuffix: "সালাত",
    logDateLabel: "লগ করার তারিখ:",
    logStateCompleted: "✓ আদায় করা হয়েছে",
    logStateLater: "⏳ পরে আদায় করেছি",
    logStateMissed: "✗ মিস হয়েছে",
    tooltipDeleteLog: "লগ মুছুন",
    languageLabel: "ভাষা সেটিংস",
    quranTransFormatLabel: "কুরআনের বাণী অনুবাদ প্রদর্শনীর প্রকার:",
    quranFormatArabicOnly: "১. শুধুমাত্র মূল আরবি (Arabic Only)",
    quranFormatArabicBangla: "২. আরবি + বাংলা অনুবাদ",
    quranFormatArabicEnglish: "৩. আরবি + ইংরেজি অনুবাদ (Arabic + English)",
    developerLabel: "ডেভেলপার",
    emailAddressLabel: "ইমেইল এড্রেস",
    emailActionBtn: "ইমেইল করুন",
    visitActionBtn: "ভিজিট করুন",
    devName: "ইঞ্জি. মোঃ কাওসার আহমেদ (Engr MD Kawser Ahmd)",
    devEmail: "engkawser21@gmail.com",
    devFacebook: "facebook.com/engkawser21",
    devFacebookUrl: "https://www.facebook.com/engkawser21/",
    overlayEmergencyGlobal: "৯১১ (জরুরি সেবা)",
    overlayEmergencyFamily: "পারিবারিক অভিভাবক",
    overlayEmergencyPlaceholder: "ফোন নাম্বার লিখুন...",
    overlayCameraSimulator: "জরুরি ক্যামেরা স্ন্যাপশট",
    overlayCameraRetake: "আবার ছবি তুলুন",
    overlayCameraDesc: "জরুরি প্রয়োজনে ছবি তোলার সুবিধার জন্য ক্যামেরা সচল।",
    overlayAlarmSilenced: "অ্যালার্ম সাময়িকভাবে স্তব্ধ করা হয়েছে।",
    socialFeed1Caption: "নামাজ পড়ার আগে আর মাত্র ৫ মিনিট স্ক্রল করে নিই... 😅",
    socialFeed2Caption: "নতুন গেমের লেভেল পার করছি! কেউ ডিস্টার্ব করবেন না! 🎮🔥",
    socialFeed3Caption: "দুপুর ১ টায় একদম স্বাস্থ্যকর নয় এমন সব খাবার বানিয়ে ভাইরাল হওয়া...",
    socialFeed1Likes: "১২৮k",
    socialFeed2Likes: "৫২k",
    socialFeed3Likes: "১.২M",
    daySun: "রবি",
    dayMon: "সোম",
    dayTue: "মঙ্গল",
    dayWed: "বুধ",
    dayThu: "বৃহ",
    dayFri: "শুক্র",
    daySat: "শনি"
  }
};

export function getPrayerName(idOrName: string, lang: 'en' | 'bn'): string {
  const dict = translations[lang];
  const cleaned = idOrName.toLowerCase();
  if (cleaned.includes('fajr')) return dict.prayerFajr;
  if (cleaned.includes('dhuhr')) return dict.prayerDhuhr;
  if (cleaned.includes('asr')) return dict.prayerAsr;
  if (cleaned.includes('maghrib')) return dict.prayerMaghrib;
  if (cleaned.includes('isha')) return dict.prayerIsha;
  if (cleaned.includes('tahajjud')) return dict.prayerTahajjud;
  if (cleaned.includes('duha')) return dict.prayerDuha;
  if (cleaned.includes('focus') || cleaned.includes('custom')) return dict.prayerCustomFocus;
  return idOrName;
}
