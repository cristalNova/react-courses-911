import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseFormPage from "./pages/CourseFormPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <CoursesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/courses/new"
                    element={
                        <ProtectedRoute>
                            <CourseFormPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/courses" replace />} />

                <Route path="*" element={<Navigate to="/courses" replace />} />
            </Routes>
        </BrowserRouter>
    );
}