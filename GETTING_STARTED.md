# 🚀 Getting Started with Foundly Backend

Welcome to your production-ready NestJS backend! This guide will get you up and running in minutes.

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
yarn install
```

### Step 2: Configure Environment
```bash
# Copy the environment template
cp env.example .env
```

Edit `.env` and set at minimum:
```env
DATABASE_URL="postgresql://foundly:foundly_password@localhost:5432/foundly?schema=public"
JWT_SECRET=change-this-to-a-secure-random-string
JWT_REFRESH_SECRET=change-this-to-another-secure-random-string
```

### Step 3: Start Services
```bash
# Using Docker (Recommended)
docker-compose up -d postgres redis

# Wait 10 seconds for services to start...
```

### Step 4: Setup Database
```bash
yarn generate
yarn migrate
```

### Step 5: Start the Application
```bash
yarn dev
```

🎉 **Done!** Visit http://localhost:3000/api/docs

---

## 📚 What You Get

### ✅ Complete Backend System
- **Authentication** - JWT with refresh tokens
- **Authorization** - Role-based access control
- **Database** - PostgreSQL with Prisma ORM
- **Caching** - Redis integration
- **Queue System** - Background job processing
- **Email Service** - AWS SES ready
- **File Storage** - AWS S3 ready
- **API Docs** - Swagger/OpenAPI
- **Logging** - Structured with Pino
- **Security** - Helmet, CORS, rate limiting
- **Health Checks** - Monitor service status
- **Testing** - Jest configured
- **Docker** - Full containerization

### 📁 Project Structure
```
foundly-backend/
├── src/
│   ├── modules/        # Feature modules (auth, users, health)
│   ├── common/         # Shared utilities
│   ├── config/         # Configuration
│   ├── shared/         # Shared services
│   ├── app.module.ts   # Root module
│   └── main.ts         # Entry point
├── prisma/
│   └── schema.prisma   # Database schema
├── test/               # Test files
└── [config files]      # ESLint, Prettier, Docker, etc.
```

---

## 🔥 Try It Out

### 1. Check Health
```bash
curl http://localhost:3000/api/v1/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@foundly.com",
    "password": "SecurePass123!",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@foundly.com",
    "password": "SecurePass123!"
  }'
```

Copy the `accessToken` from the response.

### 4. Get Your Profile
```bash
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 🎯 Available Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/refresh` | Refresh access token | ❌ |
| POST | `/logout` | Logout user | ✅ |

### Users (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List all users | ✅ Admin |
| GET | `/me` | Get current profile | ✅ |
| GET | `/:id` | Get user by ID | ✅ |
| PATCH | `/me` | Update profile | ✅ |
| PATCH | `/:id` | Update user | ✅ Admin |
| DELETE | `/:id` | Delete user | ✅ Admin |

### Health (`/api/v1/health`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Health check | ❌ |

---

## 🛠️ Common Commands

### Development
```bash
yarn dev              # Start with hot-reload
yarn start            # Start development
yarn debug            # Debug mode
```

### Database
```bash
yarn generate         # Generate Prisma Client
yarn migrate          # Run migrations
yarn studio           # Open Prisma Studio (GUI)
```

### Code Quality
```bash
yarn lint             # Lint code
yarn format           # Format code
yarn test             # Run tests
```

### Production
```bash
yarn build            # Build app
yarn start:prod       # Start production
```

### Docker
```bash
docker-compose up -d              # Start all services
docker-compose logs -f app        # View app logs
docker-compose down               # Stop all services
```

---

## 🎨 Swagger Documentation

Visit http://localhost:3000/api/docs for:
- ✅ Interactive API testing
- ✅ Request/response schemas
- ✅ Try endpoints directly in browser
- ✅ Authentication testing

---

## 📊 Database Management

### Prisma Studio
```bash
yarn studio
```
Opens a GUI at http://localhost:5555 to:
- View all data
- Edit records
- Run queries
- Manage relationships

### Create Migration
```bash
# After editing schema.prisma
yarn migrate
```

---

## 🔐 User Roles

The system includes 3 roles:
- **USER** - Default role (can manage own profile)
- **ADMIN** - Full system access
- **MODERATOR** - Moderate users (future feature)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env to 3001
```

### Cannot Connect to Database
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres
```

### Cannot Connect to Redis
```bash
# Check if Redis is running
docker-compose ps

# Restart Redis
docker-compose restart redis
```

### Prisma Errors
```bash
# Regenerate Prisma Client
yarn generate

# Reset database (⚠️ DELETES ALL DATA)
yarn prisma migrate reset
```

---

## 📖 Documentation

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **QUICK_START.md** - Quick reference commands
- **PROJECT_SUMMARY.md** - Project overview
- **FILES_CREATED.md** - File listing

---

## 🚀 Next Steps

### 1. Explore the API
Visit http://localhost:3000/api/docs and try the endpoints

### 2. Understand the Code
- Check `src/modules/auth` for authentication logic
- Check `src/modules/users` for user management
- Check `src/common` for shared utilities

### 3. Create Your First Feature
```bash
# Generate a new module
nest generate module modules/posts
nest generate controller modules/posts
nest generate service modules/posts

# Add to app.module.ts imports
```

### 4. Add Business Logic
Edit the generated service to add your logic

### 5. Test Your Feature
Write tests in `*.spec.ts` files

---

## 💡 Pro Tips

### Hot Reload
Changes are automatically reflected when using `yarn dev`

### Debug Mode
Use `yarn debug` and attach VS Code debugger (F5)

### Prisma Studio
Always keep it open in a separate terminal for easy data viewing

### Swagger UI
Use it to test endpoints - it's faster than Postman

### Git Hooks
Pre-commit hooks will lint and format your code automatically

---

## 🔥 Production Deployment

### Using Docker
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual Deployment
```bash
# Build
yarn build

# Run migrations
yarn migrate:prod

# Start
yarn start:prod
```

---

## 🎓 Learning Resources

- **NestJS**: https://docs.nestjs.com
- **Prisma**: https://www.prisma.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## ✅ Checklist

Before you start coding:
- [ ] Dependencies installed (`yarn install`)
- [ ] Environment configured (`.env` file)
- [ ] PostgreSQL running
- [ ] Redis running
- [ ] Database migrated
- [ ] Application running
- [ ] Swagger docs accessible
- [ ] Health check passing

---

## 🎉 You're Ready!

Your production-ready backend is now set up and running. Start building your amazing features!

**Need help?** Check the other documentation files or open an issue.

**Happy Coding! 🚀**
