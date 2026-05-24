import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await login(username, password);
            navigate("/courses");
        } catch (err) {
            setError("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #283593 0%, #3949ab 45%, #ff8f00 100%)",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Container maxWidth="sm">
                <Card>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ textAlign: "center" }} mb={3}>
                            <Avatar
                                sx={{
                                    width: 70,
                                    height: 70,
                                    bgcolor: "primary.main",
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                <SchoolIcon fontSize="large" />
                            </Avatar>

                            <Typography variant="h4">
                                Cursos App
                            </Typography>

                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Inicia sesión para gestionar los cursos
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="Usuario"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                label="Contraseña"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<LockOutlinedIcon />}
                                sx={{ mt: 3, py: 1.3 }}
                            >
                                Iniciar sesión
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: "#f5f5f5",
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Usuario de prueba:
                            </Typography>

                            <Typography variant="body2">
                                <strong>admin</strong> / <strong>admin123</strong>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
