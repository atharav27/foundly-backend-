# Foundly Backend

A production-ready NestJS backend application for the Foundly platform with comprehensive features including authentication, database management, caching, queuing, and more.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with refresh tokens, role-based access control
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 🚀 **Caching** - Redis-based caching with cache-manager
- 📬 **Queue Management** - Bull for background job processing
- 📧 **Email Service** - AWS SES integration with Handlebars templates
- 📦 **File Storage** - AWS S3 integration for file uploads
- 📝 **API Documentation** - Swagger/OpenAPI auto-generated docs
- 🔍 **Logging** - Structured logging with Pino
- 🛡️ **Security** - Helmet, CORS, rate limiting with Throttler
- 🏥 **Health Checks** - Terminus for service health monitoring
- 🐛 **Error Tracking** - Sentry integration for production
- ✅ **Testing** - Jest with E2E and unit tests
- 📦 **Code Quality** - ESLint, Prettier, Husky, Lint-staged

## Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5.5
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis with ioredis
- **Queue**: Bull with Redis
- **Authentication**: Passport JWT
- **Password Hashing**: Argon2
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest with SWC
- **Logging**: Pino
- **AWS Services**: S3, SES, SNS

## Prerequisites

- Node.js >= 20.0.0
- Yarn >= 1.22.0
- PostgreSQL
- Redis
- AWS Account (for S3, SES, SNS)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foundly-backend
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and configure your environment variables.

4. **Setup database**
   ```bash
   # Generate Prisma Client
   yarn generate
   
   # Run migrations
   yarn migrate
   
   # Optional: Open Prisma Studio
   yarn studio
   ```

## Running the Application

### Development
```bash
# Watch mode
yarn dev

# Regular mode
yarn start

# Debug mode
yarn debug
```

### Production
```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

## API Documentation

Once the application is running in development mode, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000/api/v1

## Available Scripts

### Development
- `yarn dev` - Start development server with watch mode
- `yarn start` - Start development server
- `yarn debug` - Start in debug mode

### Building
- `yarn build` - Build the application
- `yarn start:prod` - Start production server

### Database
- `yarn generate` - Generate Prisma Client
- `yarn migrate` - Run database migrations
- `yarn migrate:prod` - Run migrations in production
- `yarn studio` - Open Prisma Studio

### Code Quality
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn test` - Run tests
- `yarn test:debug` - Run tests in debug mode

### Utilities
- `yarn update:package` - Update all packages

## Project Structure

```
foundly-backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── common/                # Shared utilities
│   │   ├── decorators/        # Custom decorators
│   │   ├── filters/           # Exception filters
│   │   ├── guards/            # Auth guards
│   │   └── interceptors/      # Request/response interceptors
│   ├── config/                # Configuration files
│   │   ├── app.config.ts
│   │   ├── aws.config.ts
│   │   ├── cache.config.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── queue.config.ts
│   │   ├── sentry.config.ts
│   │   └── throttle.config.ts
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication module
│   │   ├── health/            # Health check module
│   │   ├── prisma/            # Prisma module
│   │   └── users/             # Users module
│   ├── shared/                # Shared services
│   │   ├── services/
│   │   │   ├── email.service.ts
│   │   │   ├── queue.service.ts
│   │   │   └── s3.service.ts
│   │   └── shared.module.ts
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── test/                      # Test files
│   ├── jest.json              # Jest configuration
│   └── app.e2e-spec.ts        # E2E tests
├── .env.example               # Environment variables template
├── .eslintrc.js               # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── commitlint.config.js       # Commit lint configuration
├── nest-cli.json              # NestJS CLI configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/me` - Update current user profile
- `PATCH /api/v1/users/:id` - Update user (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Health
- `GET /api/v1/health` - Health check endpoint

## Database Schema

The application uses Prisma with the following main models:

- **User** - User accounts with authentication
- **Profile** - Extended user profile information
- **RefreshToken** - JWT refresh tokens
- **EmailTemplate** - Email templates for notifications
- **AuditLog** - System audit logs

## Environment Variables

See `env.example` for all required environment variables:

- **Application**: NODE_ENV, PORT, API_PREFIX
- **Database**: DATABASE_URL
- **JWT**: JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN
- **Redis**: REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB
- **AWS**: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
- **S3**: AWS_S3_BUCKET, AWS_S3_URL
- **SES**: AWS_SES_FROM_EMAIL, AWS_SES_FROM_NAME
- **Sentry**: SENTRY_DSN, SENTRY_ENVIRONMENT
- **Rate Limiting**: THROTTLE_TTL, THROTTLE_LIMIT
- **CORS**: CORS_ORIGIN
- **URLs**: FRONTEND_URL, BACKEND_URL

## Testing

```bash
# Run all tests
yarn test

# Run tests in debug mode
yarn test:debug
```

## Code Quality

The project uses ESLint and Prettier for code quality:

```bash
# Lint code
yarn lint

# Format code
yarn format
```

Husky is configured to run lint-staged on pre-commit.

## Security Features

- **Helmet** - Sets secure HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Throttler to prevent abuse
- **JWT Authentication** - Secure token-based auth
- **Argon2** - Strong password hashing
- **Input Validation** - class-validator for DTO validation
- **SQL Injection Protection** - Prisma parameterized queries

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure all environment variables
3. Run database migrations: `yarn migrate:prod`
4. Build the application: `yarn build`
5. Start the server: `yarn start:prod`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the Foundly team or open an issue in the repository.

## Acknowledgments

Built with NestJS and the amazing TypeScript ecosystem.
