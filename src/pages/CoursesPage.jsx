import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import api from "../api/client";
import { useAuth } from "../auth/AuthContext";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const loadCourses = async () => {
        try {
            const response = await api.get("/api/courses");
            setCourses(response.data);
        } catch (err) {
            setError("No se pudieron cargar los cursos. Verifica el backend o el token.");
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: "linear-gradient(90deg, #283593, #3949ab)",
                }}
            >
                <Toolbar>
                    <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        <MenuBookIcon />
                    </Avatar>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">
                            Gestión de Cursos
                        </Typography>

                        <Typography variant="caption" sx={{ opacity: 0.85 }}>
                            Aplicación React + API REST
                        </Typography>
                    </Box>

                    <Typography sx={{ mr: 2 }}>
                        {user?.username}
                    </Typography>

                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>
                <Box
                    sx={{
                        mb: 4,
                        p: 4,
                        borderRadius: 4,
                        background:
                            "linear-gradient(135deg, rgba(40,53,147,0.08), rgba(255,143,0,0.12))",
                    }}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={2}
                    >
                        <Box>
                            <Typography variant="h4">
                                Cursos disponibles
                            </Typography>

                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Consulta los cursos registrados y crea nuevos cursos desde el formulario.
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/courses/new")}
                        >
                            Crear curso
                        </Button>
                    </Stack>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {courses.length === 0 && !error && (
                    <Alert severity="info">
                        No hay cursos registrados todavía.
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid item xs={12} md={6} lg={4} key={course.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 16px 35px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                        <Avatar sx={{ bgcolor: "primary.main" }}>
                                            <MenuBookIcon />
                                        </Avatar>

                                        <Box>
                                            <Typography variant="h6">
                                                {course.name}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Código: {course.code}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            minHeight: 48,
                                            mb: 2,
                                        }}
                                    >
                                        {course.description || "Sin descripción registrada."}
                                    </Typography>

                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        <Chip
                                            label={`${course.credits} créditos`}
                                            color="primary"
                                            variant="outlined"
                                        />

                                        <Chip
                                            icon={<PersonIcon />}
                                            label={course.teacher?.firstName || "Sin profesor"}
                                            variant="outlined"
                                        />

                                        <Chip
                                            icon={<GroupsIcon />}
                                            label={`${course.students?.length || 0} estudiantes`}
                                            variant="outlined"
                                        />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}