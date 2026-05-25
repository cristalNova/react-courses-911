import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../api/client";

export default function CourseFormPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        credits: 3,
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await api.post("/api/courses", {
                name: form.name,
                credits: Number(form.credits),
            });

            navigate("/courses");
        } catch (err) {
            if (err.response?.status === 409) {
                setError("Ya existe un curso con ese código.");
            } else if (err.response?.status === 403) {
                setError("No tienes permiso para crear cursos. Usa el usuario admin.");
            } else {
                setError("No se pudo crear el curso. Revisa los datos.");
            }
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 5 }}>
            <Container maxWidth="md">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/courses")}
                    sx={{ mb: 2 }}
                >
                    Volver a cursos
                </Button>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4">
                            Crear nuevo curso
                        </Typography>

                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Información básica del curso a registrar.
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    label="Nombre del curso"
                                    name="name"
                                    fullWidth
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                />

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <TextField
                                        label="Créditos"
                                        name="credits"
                                        type="number"
                                        fullWidth
                                        required
                                        value={form.credits}
                                        onChange={handleChange}
                                    />
                                </Stack>

                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/courses")}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                    >
                                        Guardar curso
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}