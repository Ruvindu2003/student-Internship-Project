# Student Internship Project

A comprehensive Angular application for managing student internships with role-based access control.

## Project Structure

### Models (`src/app/model/`)
- **`user.model.ts`** - Defines user-related interfaces:
  - `User` - User entity with id, username, and role
  - `LoginRequest` - Login credentials
  - `RegisterRequest` - Registration data
  - `AuthResponse` - Authentication response

- **`internship.model.ts`** - Defines internship-related interfaces:
  - `InternshipPost` - Internship posting entity
  - `CreatePostRequest` - Data for creating new posts
  - `Application` - Student application entity
  - `ApplyRequest` - Data for applying to internships

### Services (`src/app/services/`)
- **`auth.service.ts`** - Authentication and user management:
  - User session management
  - Role-based access control
  - Login/logout functionality
  - User state persistence

- **`api.service.ts`** - HTTP API communication:
  - Authentication endpoints
  - Admin operations (user/post management)
  - Company operations (post creation/management)
  - Student operations (application management)

- **`auth.guard.ts`** - Route protection:
  - `AuthGuard` - General authentication guard
  - `StudentGuard` - Student-specific route protection
  - `CompanyGuard` - Company-specific route protection
  - `AdminGuard` - Admin-specific route protection

### Components (`src/app/components/`)
- **`login/`** - User authentication
- **`register/`** - User registration
- **`student-dashboard/`** - Student interface for browsing and applying to internships
- **`company-dashboard/`** - Company interface for creating and managing internship posts
- **`admin-dashboard/`** - Admin interface for managing users and posts
- **`home-page/`** - Landing page for authenticated users

## Key Relationships

### Authentication Flow
1. User submits login credentials → `LoginComponent`
2. `LoginComponent` calls `ApiService.login()`
3. On success, `AuthService.setCurrentUser()` stores user data
4. User is redirected based on role using route guards

### Role-Based Access Control
- **Students**: Can browse internships, search, filter, and apply
- **Companies**: Can create, view, and manage internship posts
- **Admins**: Can manage all users and posts

### Data Flow
1. **Models** define data structures
2. **Services** handle business logic and API communication
3. **Components** use services to display and interact with data
4. **Guards** protect routes based on authentication and roles

## Features

### Student Features
- Browse available internships
- Search internships by keyword
- Filter by location and duration
- Apply to internships with resume link
- View application status

### Company Features
- Create new internship posts
- View all created posts
- Manage post details

### Admin Features
- View all users and posts
- Delete users and posts
- Monitor system activity

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Navigate to `http://localhost:4200`

## API Endpoints

The application expects a backend API running on `http://localhost:8080/api` with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Admin
- `GET /admin/users` - Get all users
- `GET /admin/posts` - Get all posts
- `DELETE /admin/user/{id}` - Delete user
- `DELETE /admin/post/{id}` - Delete post

### Company
- `POST /company/posts` - Create internship post
- `GET /company/posts` - Get all posts
- `GET /company/posts/search` - Search posts
- `GET /company/posts/filter` - Filter posts

### Student
- `POST /student/applications/apply` - Apply for internship
- `GET /student/applications` - Get student applications

## Security Features

- Route guards prevent unauthorized access
- Role-based component access
- Secure authentication flow
- Input validation and sanitization

## Technologies Used

- **Angular 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Tailwind CSS** - Styling framework
- **Flowbite** - UI components
