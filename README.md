## School Management System - Admin Portal (LocalStorage, React)

This is a beginner-friendly yet industry-standard scaffold for an Admin Dashboard of a School Management System. It uses React (Vite) and keeps data in the browser's `localStorage`.

### Features
- Admin login (credentials: `admin` / `admin123`)
- Dashboard with sections: Students, Teachers, Courses
- CRUD for Students, Teachers, Courses (stored in `localStorage`)
- Admin Profile view/edit (display name)
- Protected routes and logout

### Run locally
```bash
npm install
npm run dev
```

### Project Architecture
- `src/state/AuthContext.jsx`: React context managing admin session via `authService`.
- `src/storage/authService.js`: LocalStorage-backed authentication service.
- `src/storage/repositories.js`: Repositories for students, teachers, courses.
- `src/routes/ProtectedRoute.jsx`: Guards dashboard routes.
- `src/pages/LoginPage.jsx`: Admin login page.
- `src/pages/DashboardLayout.jsx`: Sidebar nav, topbar, logout, nested `Outlet`.
- `src/pages/StudentsPage.jsx`, `TeachersPage.jsx`, `CoursesPage.jsx`: Simple CRUD UIs.
- `src/pages/ProfilePage.jsx`: Edit display name stored in session.
- `src/main.jsx`: Router configuration and provider composition.
- `src/App.jsx`: Root layout that hosts nested routes via `Outlet`.
- `src/App.css`: Basic styles.

See `docs/` for detailed documentation.
