# Quick Start Guide

Get up and running with Foundly backend in minutes!

## Prerequisites Check

```bash
node --version  # Should be >= 20.0.0
yarn --version  # Should be >= 1.22.0
```

## Installation (5 minutes)

```bash
# 1. Install dependencies
yarn install

# 2. Setup environment
cp env.example .env
# Edit .env with your database URL and secrets

# 3. Start PostgreSQL and Redis (using Docker)
docker-compose up -d postgres redis

# 4. Setup database
yarn generate
yarn migrate

# 5. Start the application
yarn dev
```

## Verify Setup

Visit these URLs:
- **API Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

## Test the API

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@foundly.com",
    "password": "securePassword123",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@foundly.com",
    "password": "securePassword123"
  }'
```

Copy the `accessToken` from the response.

### 3. Get Profile

```bash
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Common Commands

```bash
# Development
yarn dev              # Start with hot-reload
yarn start            # Start without hot-reload
yarn debug            # Start in debug mode

# Database
yarn generate         # Generate Prisma Client
yarn migrate          # Run migrations
yarn studio           # Open Prisma Studio

# Code Quality
yarn lint             # Lint code
yarn format           # Format code
yarn test             # Run tests

# Production
yarn build            # Build application
yarn start:prod       # Start production server
```

## Docker Quick Start

To run everything with Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down
```

## Project Structure Overview

```
src/
├── common/           # Shared utilities (guards, filters, decorators)
├── config/           # Configuration files
├── modules/          # Feature modules
│   ├── auth/         # Authentication
│   ├── users/        # User management
│   ├── health/       # Health checks
│   └── prisma/       # Database service
├── shared/           # Shared services (email, S3, queue)
├── app.module.ts     # Root module
└── main.ts           # Entry point
```

## Available Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout

### Users
- `GET /api/v1/users` - List users (Admin)
- `GET /api/v1/users/me` - Get profile
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/me` - Update profile
- `PATCH /api/v1/users/:id` - Update user (Admin)
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Health
- `GET /api/v1/health` - Health check

## Environment Variables

Minimum required for development:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://foundly:foundly_password@localhost:5432/foundly?schema=public"
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-change-in-production
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Troubleshooting

### Can't connect to database
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres
```

### Can't connect to Redis
```bash
# Check if Redis is running
docker-compose ps

# Restart Redis
docker-compose restart redis
```

### Port 3000 already in use
```bash
# Change PORT in .env to 3001 or another available port
```

### Prisma errors
```bash
# Regenerate Prisma Client
yarn generate

# Reset database (WARNING: deletes all data)
yarn prisma migrate reset
```

## Next Steps

1. **Explore API**: Visit http://localhost:3000/api/docs
2. **Read Full Documentation**: See README.md
3. **Detailed Setup**: See SETUP_GUIDE.md
4. **Create Your First Module**: 
   ```bash
   nest generate module modules/your-module
   nest generate controller modules/your-module
   nest generate service modules/your-module
   ```

## Need Help?

- 📖 Check the full README.md
- 📚 Visit API docs at /api/docs
- 🔧 See detailed SETUP_GUIDE.md
- 💬 Open an issue on GitHub

Happy coding! 🚀
