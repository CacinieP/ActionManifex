// Database Schema for AI Manifestation App

// Users Collection
{
  _id: ObjectId,
  email: String,
  password: String,
  name: String,
  avatar: String,
  preferences: {
    language: String,
    theme: String,
    notifications: Boolean
  },
  stats: {
    totalWishes: Number,
    completedMilestones: Number,
    gratitudeStreak: Number,
    energyPoints: Number,
    level: Number
  },
  createdAt: Date,
  updatedAt: Date
}

// Wishes Collection
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  optimizedDescription: String,
  category: String, // 健康/事业/财富/关系/成长/其他
  tags: [String],
  status: String, // active/completed/paused
  priority: Number, // 1-5
  targetDate: Date,
  visionBoard: [{
    type: String, // image/ai_generated
    url: String,
    prompt: String,
    position: { x: Number, y: Number },
    size: { width: Number, height: Number }
  }],
  aiOptimizations: {
    emotionalWords: [String],
    scenarios: [String],
    affirmations: [String]
  },
  createdAt: Date,
  updatedAt: Date
}

// Milestones Collection
{
  _id: ObjectId,
  wishId: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  order: Number,
  isSmart: {
    specific: Boolean,
    measurable: Boolean,
    achievable: Boolean,
    relevant: Boolean,
    timeBound: Boolean
  },
  targetDate: Date,
  completedDate: Date,
  checkIns: [{
    date: Date,
    type: String, // text/image/audio
    content: String,
    mediaUrl: String,
    mood: String,
    notes: String
  }],
  rewards: {
    energyPoints: Number,
    badges: [String],
    affirmations: [String]
  },
  createdAt: Date,
  updatedAt: Date
}

// Gratitude Entries Collection
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  entries: [{
    type: String, // text/image/audio
    content: String,
    mediaUrl: String,
    tags: [String],
    mood: String
  }],
  aiResponse: {
    affirmation: String,
    encouragement: String,
    insight: String
  },
  reflection: String,
  createdAt: Date,
  updatedAt: Date
}

// AI Interactions Collection
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // wish_optimization/milestone_creation/feedback/consultation
  input: Object,
  output: Object,
  satisfaction: Number, // 1-5
  feedback: String,
  createdAt: Date
}

// Rewards & Achievements Collection
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // badge/level_up/energy_points/streak
  title: String,
  description: String,
  icon: String,
  value: Number,
  criteria: Object,
  earnedAt: Date,
  notified: Boolean
}

// Growth Tree Collection (Gratitude Visualization)
{
  _id: ObjectId,
  userId: ObjectId,
  level: Number,
  totalDays: Number,
  currentStreak: Number,
  longestStreak: Number,
  branches: [{
    day: Number,
    entryCount: Number,
    mood: String,
    achievements: [String]
  }],
  createdAt: Date,
  updatedAt: Date
}

// Notifications Collection
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // milestone_reminder/gratitude_prompt/achievement/encouragement
  title: String,
  message: String,
  scheduledFor: Date,
  sent: Boolean,
  read: Boolean,
  actionUrl: String,
  createdAt: Date
}