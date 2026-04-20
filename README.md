TaskFlow — Full Stack Task Management System
A clean, modern task management system built with Laravel (REST API) and React (SPA), developed as part of the Qtec Solution Limited technical assessment.

🚀 Live Demo

Frontend: https://qtec-task-manager.vercel.app
Backend API: https://qtec-task-manager-backend.vercel.app


📁 Project Structure
task-manager/
├── backend/                          # Laravel 11 REST API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── TaskController.php    # CRUD with search & filter
│   │   │   ├── Requests/
│   │   │   │   └── TaskRequest.php       # Form validation
│   │   │   └── Resources/
│   │   │       └── TaskResource.php      # JSON response shaping
│   │   └── Models/
│   │       └── Task.php                  # Eloquent model with scopes
│   ├── database/
│   │   ├── migrations/                   # Task schema
│   │   ├── factories/                    # TaskFactory for testing
│   │   └── seeders/                      # Sample data seeder
│   ├── routes/
│   │   └── api.php                       # API resource routes
│   └── tests/
│       ├── Feature/
│       │   └── TaskApiTest.php           # Feature tests
│       └── Unit/
│           └── TaskModelTest.php         # Unit tests
└── frontend/                         # React Application
    ├── src/
    │   ├── components/
    │   │   ├── ui/                       # Reusable primitives
    │   │   │   ├── Button.jsx
    │   │   │   ├── Input.jsx
    │   │   │   └── Badge.jsx
    │   │   ├── TaskCard.jsx              # Individual task card
    │   │   ├── TaskForm.jsx              # Create/edit form
    │   │   ├── TaskBoard.jsx             # Kanban board layout
    │   │   ├── SearchBar.jsx             # Debounced search
    │   │   └── FilterDropdown.jsx        # Animated filter dropdown
    │   ├── services/
    │   │   └── taskService.js            # Axios API integration layer
    │   ├── hooks/
    │   │   ├── useDebounce.js            # Debounce hook for search
    │   │   └── useTasks.js               # Task data fetching hook
    │   └── pages/
    │       └── Home.jsx                  # Main page
    └── .env                              # API base URL config

🛠️ Technologies Used
Backend
TechnologyPurposeLaravel 11PHP framework for REST APIPHP 8.2Server-side languageMySQLProduction databaseSQLiteLocal development databaseLaravel API ResourcesConsistent JSON response formattingLaravel Form RequestsValidation layerPHPUnitTesting framework
Frontend
TechnologyPurposeReact 18UI frameworkViteBuild tool and dev serverTailwind CSSUtility-first stylingAxiosHTTP client for API callsGoogle Fonts (Syne + DM Sans)Typography

⚙️ Setup Instructions
Prerequisites

PHP 8.2+
Composer
Node.js 18+
npm
MySQL or SQLite


Backend Setup
bash# 1. Navigate to backend
cd task-manager/backend

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Configure database in .env
# For SQLite (easiest):
DB_CONNECTION=sqlite
# then create the file:
touch database/database.sqlite

# For MySQL:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=your_password

# 6. Run migrations and seed sample data
php artisan migrate --seed

# 7. Start the development server
php artisan serve
Backend runs at: http://127.0.0.1:8000

Frontend Setup
bash# 1. Navigate to frontend
cd task-manager/frontend

# 2. Install dependencies
npm install

# 3. Create environment file
# Create .env file and add:
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# 4. Start development server
npm run dev
Frontend runs at: http://localhost:5173

Running Tests
bashcd task-manager/backend

# Run all tests
php artisan test

# Run only feature tests
php artisan test --testsuite=Feature

# Run only unit tests
php artisan test --testsuite=Unit

🌐 API Endpoints
MethodEndpointDescriptionGET/api/tasksGet all tasks (supports search & filter)POST/api/tasksCreate a new taskGET/api/tasks/{id}Get a single taskPUT/api/tasks/{id}Update a taskDELETE/api/tasks/{id}Delete a task
Query Parameters for GET /api/tasks
ParameterTypeDescriptionsearchstringSearch by title or descriptionstatusstringFilter by pending, in_progress, completedprioritystringFilter by low, medium, high
Example Response
json{
  "data": [
    {
      "id": 1,
      "title": "Build task manager frontend",
      "description": "React SPA with kanban board",
      "status": "in_progress",
      "priority": "high",
      "due_date": "2026-04-22",
      "created_at": "2026-04-19 10:00:00"
    }
  ],
  "stats": {
    "total": 15,
    "pending": 6,
    "in_progress": 5,
    "completed": 4
  }
}

✅ Features

Kanban Board — Tasks organized in three columns: Pending, In Progress, Completed
Create Tasks — Add tasks with title, description, status, priority and due date
Edit Tasks — Update any task details via modal form
Delete Tasks — Remove tasks with confirmation
Search — Debounced real-time search by title or description
Filter — Filter tasks by status and priority
Stats Dashboard — Live count of tasks by status
Overdue Indicator — Visual warning for past-due tasks
Responsive UI — Clean dark theme with smooth interactions


🧪 Testing Approach
Feature Tests (TaskApiTest.php)
Tests all API endpoints end-to-end:

✅ Can list all tasks with correct JSON structure
✅ Can create a task with valid data
✅ Cannot create a task without a title
✅ Cannot create a task with invalid status
✅ Can update a task
✅ Can delete a task
✅ Search returns filtered results
✅ Status filter returns correct tasks

Unit Tests (TaskModelTest.php)
Tests the Task model in isolation:

✅ Fillable fields are correctly defined
✅ Pending scope returns only pending tasks
✅ Completed scope returns only completed tasks
✅ Search scope matches title correctly

Testing Strategy

Used RefreshDatabase trait for test isolation
In-memory SQLite for fast test execution
TaskFactory for generating realistic test data
Tested both happy paths and validation failures


💡 Decisions & Assumptions
Architecture

Separated frontend and backend into a monorepo for clean separation of concerns and independent deployability
RESTful API with Laravel API Resources for consistent, predictable JSON responses
React SPA for smooth user experience without page reloads

Backend Decisions

API Resources used to control exactly what data is exposed — keeps responses clean and consistent
Form Requests used for validation — keeps controllers thin and validation reusable
Model Scopes (pending(), inProgress(), completed(), search()) keep query logic readable and reusable
SQLite for local dev — zero configuration needed, fast setup
MySQL for production — more reliable for production workloads

Frontend Decisions

useDebounce hook — prevents API calls on every keystroke during search, waits 400ms after user stops typing
useTasks hook — encapsulates all data fetching logic, keeps components clean
Kanban board layout — makes task status visually intuitive at a glance
Dark theme — modern, professional aesthetic with Syne + DM Sans typography
Hover-reveal actions — keeps cards clean, shows edit/delete only on hover
Modal form — avoids page navigation, keeps context while editing

Assumptions

No user authentication required for this assessment
Single-user system (no multi-tenancy)
Tasks belong to no specific project or category
Due date is optional


Author
Nazibul Haque
Full Stack Laravel Developer
