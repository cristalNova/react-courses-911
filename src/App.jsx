import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";
import CourseFormPage from "./pages/CourseFormPage";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter basename="/iaslab/compu2/911">
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

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
            </Routes>
        </BrowserRouter>
    );
}