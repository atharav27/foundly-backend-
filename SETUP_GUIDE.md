# Foundly Backend - Setup Guide

This guide will help you set up the Foundly backend application from scratch.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (version 20.0.0 or higher)
- **Yarn** (version 1.22.0 or higher)
- **PostgreSQL** (version 14 or higher)
- **Redis** (version 7 or higher)
- **Git**

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd foundly-backend

# Install dependencies
yarn install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your configuration
# For Windows: notepad .env
# For Mac/Linux: nano .env
```

**Minimum required configuration for development:**

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/foundly?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Database Setup

#### Option A: Using Local PostgreSQL

```bash
# Start PostgreSQL service
# Windows: It should auto-start if installed
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE foundly;
\q

# Run migrations
yarn generate
yarn migrate
```

#### Option B: Using Docker

```bash
# Start PostgreSQL and Redis with Docker Compose
docker-compose up -d postgres redis

# Wait a few seconds for services to start

# Run migrations
yarn generate
yarn migrate
```

### 4. Redis Setup

#### Option A: Using Local Redis

```bash
# Start Redis service
# Windows: Use Redis for Windows or WSL
# Mac: brew services start redis
# Linux: sudo systemctl start redis
```

#### Option B: Using Docker

Redis is already included in the docker-compose.yml file. Just run:

```bash
docker-compose up -d redis
```

### 5. Initialize Husky (Git Hooks)

```bash
# Initialize git hooks
yarn prepare
```

### 6. Verify Installation

```bash
# Check Prisma
yarn generate

# Check if all services are reachable
# This will fail if Redis or PostgreSQL are not running
```

## Running the Application

### Development Mode

```bash
# Start the application in watch mode
yarn dev
```

The application should now be running at:
- **API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

### Testing the Setup

1. **Health Check**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```

2. **Register a User**
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "firstName": "Test",
       "lastName": "User"
     }'
   ```

3. **Login**
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## Common Issues and Solutions

### Issue: Cannot connect to PostgreSQL

**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure the database exists: `psql -U postgres -c "CREATE DATABASE foundly;"`

### Issue: Cannot connect to Redis

**Solution:**
- Verify Redis is running
- Check REDIS_HOST and REDIS_PORT in .env file
- Test connection: `redis-cli ping` (should return PONG)

### Issue: Prisma errors

**Solution:**
```bash
# Regenerate Prisma Client
yarn generate

# Reset database (WARNING: Deletes all data)
yarn prisma migrate reset
```

### Issue: Port already in use

**Solution:**
- Change PORT in .env file to another value (e.g., 3001)
- Or find and kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3000 | xargs kill
  ```

## AWS Services Setup (Optional)

For production features like email sending and file uploads:

### 1. Create AWS Account

Sign up at https://aws.amazon.com/

### 2. Setup S3

```bash
# Create S3 bucket
aws s3 mb s3://foundly-bucket --region us-east-1

# Configure CORS (create cors.json)
# Then apply: aws s3api put-bucket-cors --bucket foundly-bucket --cors-configuration file://cors.json
```

### 3. Setup SES

```bash
# Verify email address
aws ses verify-email-identity --email-address noreply@foundly.com --region us-east-1

# For production, move out of sandbox mode
```

### 4. Create IAM User

1. Go to IAM Console
2. Create new user with programmatic access
3. Attach policies: AmazonS3FullAccess, AmazonSESFullAccess
4. Save Access Key ID and Secret Access Key
5. Add to .env file

## Prisma Studio

To visually manage your database:

```bash
yarn studio
```

This opens Prisma Studio at http://localhost:5555

## Next Steps

1. **Explore API Documentation**: Visit http://localhost:3000/api/docs
2. **Run Tests**: `yarn test`
3. **Create Your First Module**: Use NestJS CLI
   ```bash
   nest generate module modules/your-module
   nest generate service modules/your-module
   nest generate controller modules/your-module
   ```
4. **Read the Main README**: Check README.md for full documentation

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Prisma
- REST Client
- Docker

### Useful Commands

```bash
# Format code
yarn format

# Lint code
yarn lint

# Run tests
yarn test

# Update packages
yarn update:package

# View logs in development
# Logs are automatically displayed in console
```

## Production Deployment

See the main README.md for production deployment instructions.

## Getting Help

- Check the main README.md
- Review API documentation at /api/docs
- Check Prisma documentation: https://www.prisma.io/docs
- Check NestJS documentation: https://docs.nestjs.com

## Troubleshooting Checklist

- [ ] Node.js version >= 20.0.0
- [ ] Yarn installed
- [ ] PostgreSQL running
- [ ] Redis running
- [ ] .env file configured
- [ ] Database created
- [ ] Migrations run
- [ ] Dependencies installed
- [ ] No port conflicts

If all items are checked and you still have issues, please open an issue on GitHub.
