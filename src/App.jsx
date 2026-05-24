import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseFormPage from "./pages/CourseFormPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";

function RootLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
            {
                path: "/courses",
                element: (
                    <ProtectedRoute>
                        <CoursesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/courses/new",
                element: (
                    <ProtectedRoute>
                        <CourseFormPage />
                    </ProtectedRoute>
                ),
            },
            { path: "/", element: <Navigate to="/courses" replace /> },
            { path: "*", element: <Navigate to="/courses" replace /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}