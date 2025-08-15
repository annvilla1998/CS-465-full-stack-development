# Travlr - Full-Stack Travel Booking Application

**Live Production Site:** [https://travlr-j2wt.onrender.com](https://travlr-j2wt.onrender.com)

A comprehensive travel booking application built with Express.js, Angular, and PostgreSQL. This project demonstrates modern full-stack development practices with secure authentication, RESTful APIs, and intuitive design.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Trip Management**: Browse, search, and manage travel packages
- **Reservation System**: Book and manage travel reservations
- **Admin Panel**: Administrative interface for managing trips and users
- **RESTful API**: Well-structured API endpoints for data management

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database
- **Sequelize** - ORM for database operations
- **JSON Web Tokens (JWT)** - Authentication
- **Passport.js** - Authentication middleware

### Frontend
- **Angular 19** - Frontend framework
- **TypeScript** - Programming language
- **Bootstrap** - UI components and styling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory by copying from the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Database Configuration
POSTGRES_URI=postgresql://username:password@localhost:5432/travlr

# Application Configuration
NODE_ENV=development
PORT=3000

# JWT Authentication (Generate secure random strings)
JWT_SECRET=your-super-secure-jwt-secret-key-here
PASSPORT_SECRET=your-super-secure-passport-secret-here
```

**Important**: 
- Replace `username`, `password` with your PostgreSQL credentials
- Generate secure random strings for JWT_SECRET and PASSPORT_SECRET

### 4. Database Setup

#### Create Database
```bash
# Connect to PostgreSQL and create database
psql -U your-username -c "CREATE DATABASE travlr;"
```

#### Run Migrations
```bash
npm run migrate
```

#### Seed Database (Optional)
```bash
npm run seed
```

This will create:
- **Admin User**: `john.doe@test.com` / `123456`
- **Sample Trips**: Three travel packages for testing

### 5. Build Frontend
```bash
npm run build
```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```

This starts both servers concurrently:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:4200

Serves the built application at http://localhost:4200

## 📁 Project Structure

```
travlr/
├── app.js                          # Express application entry point
├── package.json                    # Backend dependencies and scripts
├── .env.example                    # Environment variables template
├── .env                           # Environment variables (create this)
├── app_api/                       # Backend API
│   ├── controllers/               # Route controllers
│   ├── database/                  # Database configuration
│   │   ├── config/               # Database connection settings
│   │   ├── migrations/           # Database schema migrations
│   │   ├── models/               # Sequelize models
│   │   └── seeders/              # Database seed data
│   ├── middleware/               # Custom middleware
│   └── routes/                   # API route definitions
├── frontend/                     # Angular application
│   ├── src/
│   │   ├── app/                  # Angular components and services
│   │   ├── assets/               # Static assets (images, styles)
│   │   └── environment.ts        # Environment configuration
│   ├── angular.json              # Angular CLI configuration
│   └── package.json              # Frontend dependencies
└── bin/
    └── www                       # Server startup script
```

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- **Registration**: New user account creation
- **Login**: Email/password authentication
- **Protected Routes**: Admin-only and user-specific content
- **Token Refresh**: Automatic token management

### Default Admin Account
- **Email**: `john.doe@test.com`
- **Password**: `123456`

## 📚 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create new trip (admin only)
- `PUT /api/trips/:id` - Update trip (admin only)
- `DELETE /api/trips/:id` - Delete trip (admin only)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Reservations
- `GET /api/users/:userId/reservations` - Get user reservations
- `POST /api/users/:userId/reservations` - Create reservation
- `DELETE /api/users/:userId/reservations/:reservationId` - Cancel reservation

---

# Reflection of CS-465 Full-Stack Web Development Class
### April 2025

## Architecture

In this full-stack project, I worked with several frontend technologies that each offered different approaches to web development. Express HTML represents a traditional server-side rendering approach where HTML pages are generated on the server and sent complete to the client. This method is straightforward but requires page reloads for any new content. The Angular SPA represents a more modern architecture where an application loads once and then dynamically rewrites the current page as users interact, instead of loading entirely new pages. The backend used PostgreSQL as its relational database for several strategic reasons. Unlike NoSQL databases, PostgreSQL's ACID compliance and structured schema provide data integrity and consistency that's crucial for financial transactions like booking reservations. The relational model also supports complex queries and relationships between users, trips, and reservations that would be more challenging in a document-based system.

## Functionality

JSON (JavaScript Object Notation) differs from JavaScript in that it's a data format rather than a programming language. While JavaScript provides programming logic and functionality, JSON offers a lightweight way to represent data. JSON serves as the crucial bridge between the frontend and backend in a full-stack application by providing a standardized format for data exchange. When the frontend requests data, the backend retrieves information from the database, formats it as JSON, and sends it to the client, where JavaScript can parse and use it within the application.

Throughout development, I refactored code multiple times to improve functionality and efficiency. One significant instance involved extracting repetitive parts of HTML, using templating strategies to create reusable templates, and injecting them straight into the HTML. In another instance, I created reusable components in Angular that were applied similarly. The benefits of reusable UI components became evident as the project grew in complexity. They not only reduced development time but also ensured consistency across the application.

## Testing

Understanding methods, endpoints, and security is fundamental to full-stack application testing. Methods refer to HTTP verbs (GET, POST, PUT, DELETE) that define the actions performed on resources. Each endpoint is a specific URL that represents a resource or service, responds to these methods differently, and requires distinct testing approaches. For instance, testing a GET endpoint might focus on verifying correct data retrieval with various query parameters, while testing a POST endpoint would validate proper data creation with different payloads. Security adds layers of complexity to API testing. Authentication mechanisms like JSON Web Tokens (JWT) require tests to include proper authorization headers. Security testing also should validate protection against common vulnerabilities such as SQL injection, CSRF attacks, and cross-site scripting.

## Reflection

This course has significantly advanced my professional goals by deepening my understanding of modern full-stack development practices. Despite my prior experience in this field, the curriculum challenged me to critically evaluate architectural decisions rather than applying one-size-fits-all solutions. Most notably, I gained valuable perspective on the nuanced trade-offs between different frontend approaches. I discovered that while single-page applications (SPAs) offer impressive user experiences through fluid interactions, they aren't always the optimal choice for every project scenario. This newfound perspective represents a significant professional maturation, equipping me to make more balanced architectural decisions that consider business requirements, technical constraints, and long-term maintainability. Moving forward, I'm confident that this more nuanced understanding of full-stack development options will enable me to deliver solutions that are not just technically sound but strategically aligned with project goals, which is a valuable skill set that substantially enhances my marketability in today's diverse development landscape.
