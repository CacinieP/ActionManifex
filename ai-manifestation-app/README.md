# AI Manifestation App Backend

A comprehensive NestJS backend for an AI-powered manifestation and goal tracking application.

## Features

### 🎯 Wish Management
- Create and manage personal wishes with categories (健康/事业/财富/家庭/学习/旅行/爱情/其他)
- AI-powered wish optimization for better expression and detail
- Automatic keyword extraction and categorization
- Progress tracking and visualization

### 🎯 SMART Goal System
- AI-generated SMART goals based on wishes
- Milestone creation and tracking
- Progress monitoring with automatic check-ins
- Goal reordering and prioritization

### 🙏 Gratitude Journal
- Daily gratitude entries with text/image/audio support
- AI-generated inspirational quotes
- Streak tracking and rewards
- Calendar view and sentiment analysis
- Personalized daily prompts

### 🏆 Rewards & Gamification
- Growth points system for various activities
- Achievement badges and milestone rewards
- Streak bonuses (7-day, 30-day, 100-day)
- Virtual rewards and recognition

### 🎨 Vision Boards
- Create visual manifestation boards
- Image integration and AI-generated visuals
- Customizable layouts (grid, collage, timeline)
- Wish-to-vision board integration

## Tech Stack

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI API (simulated)
- **Validation**: Class-validator & Class-transformer
- **Architecture**: Modular with Controllers, Services, Entities

## Project Structure

```
ai-manifestation-app/
├── src/
│   ├── modules/
│   │   ├── user/          # User management
│   │   ├── wishes/        # Wish creation & optimization
│   │   ├── goals/         # SMART goals & milestones
│   │   └── gratitude/     # Gratitude journal
│   ├── entities/          # Database entities
│   ├── dto/              # Data transfer objects
│   ├── ai/               # AI service integration
│   ├── prisma/           # Database service
│   └── app.module.ts     # Main application module
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json
```

## Data Models

### Core Entities
- **User**: User profile and settings
- **Wish**: Personal wishes with AI optimization
- **Goal**: SMART goals and milestones
- **Gratitude**: Daily gratitude entries
- **VisionBoard**: Visual manifestation boards
- **CheckIn**: Progress tracking entries
- **Reward**: Achievement and reward system
- **GrowthPoint**: Points and gamification
- **AIInteraction**: AI service logging

## API Endpoints

### Users
- `POST /users` - Create user
- `GET /users/:id` - Get user profile
- `GET /users/:id/stats` - Get user statistics

### Wishes
- `POST /wishes` - Create wish
- `GET /wishes` - Get user wishes
- `POST /wishes/:id/optimize` - AI optimize wish
- `POST /wishes/:id/generate-image` - Generate wish image

### Goals
- `POST /goals` - Create goal
- `GET /goals` - Get user goals
- `POST /goals/generate-smart` - Generate SMART goals
- `GET /goals/wish/:wishId/progress` - Get goal progress

### Gratitude
- `POST /gratitude` - Create gratitude entry
- `GET /gratitude/stats` - Get gratitude statistics
- `GET /gratitude/calendar` - Get gratitude calendar
- `GET /gratitude/daily-prompt` - Get daily prompt

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your database and API keys
   ```

3. **Database setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the application:**
   ```bash
   npm run start:dev
   ```

## Database Schema

The application uses PostgreSQL with the following main tables:
- Users, Wishes, Goals, Gratitudes, VisionBoards, CheckIns, Rewards, GrowthPoints

## AI Features

### Wish Optimization
- Analyzes wish text for clarity and specificity
- Enhances with sensory details and emotional elements
- Maintains "I already have" manifestation language

### SMART Goal Generation
- Automatically breaks down wishes into actionable steps
- Ensures goals are Specific, Measurable, Achievable, Relevant, Time-bound
- Provides structured framework for achievement

### Image Generation
- Creates visual representations of wishes
- Uses keywords and optimized text for relevance
- Supports vision board creation

### Sentiment Analysis
- Analyzes gratitude entries for mood and themes
- Provides insights into emotional patterns
- Generates personalized content

## Security & Validation

- Input validation with class-validator
- Type-safe data transfer objects
- Prisma ORM for database security
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the AI Manifestation App ecosystem.