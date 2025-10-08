import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import DashboardLayout from "./component/DashboardLayout";
import Teachers from "./component/Teachers";
import Students from "./component/Students";
import Courses from "./component/Courses";
import Dashboard from "./component/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProfile from "./component/AdminProfile";
import Register from "./component/Register";
import { ThemeProvider } from ".//component/ThemeContext";
import LoginSuccess from "./pages/LoginSuccess";


function App() {
 //                        //Use themeContext for darkMode toggle instead of this method,using props drilling. its messy.

  return (
    <ThemeProvider>

    <div className="App">
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login-success" element={<LoginSuccess />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
               <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
          />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <DashboardLayout >
                <Teachers />
              </DashboardLayout>
            </ProtectedRoute>
          }
          />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
             <DashboardLayout>
                <Courses />
              </DashboardLayout>
            </ProtectedRoute>
          }
          />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
             <DashboardLayout>
                <Students />
              </DashboardLayout>
            </ProtectedRoute>
          }
          />

        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminProfile />
              </DashboardLayout>
            </ProtectedRoute>
          }
          />

        <Route path="/" element={<Login />} />
      </Routes>

      {/* Toast container (keep at bottom of App) */}
      <ToastContainer position="top-center" autoClose={1000} />
        
    </div>
          </ThemeProvider>
  );
}

export default App;
