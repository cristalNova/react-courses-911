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
        description: "",
        code: "",
        credits: 3,
        teacherId: 2,
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
                description: form.description,
                code: form.code,
                credits: Number(form.credits),
                teacherId: Number(form.teacherId),
            });

            navigate("/courses");
        } catch (err) {
            console.error("Error creando curso:", err);

            if (err.response?.status === 400) {
                setError("Datos inválidos. Revisa nombre, descripción, código y créditos.");
            } else if (err.response?.status === 401) {
                setError("No estás autenticado. Vuelve a iniciar sesión.");
            } else if (err.response?.status === 403) {
                setError("No tienes permiso para crear cursos. Usa el usuario admin.");
            } else if (err.response?.status === 404) {
                setError("No existe el profesor con ese ID.");
            } else if (err.response?.status === 409) {
                setError("Ya existe un curso con ese código.");
            } else {
                setError("No se pudo crear el curso.");
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

                                <TextField
                                    label="Descripción"
                                    name="description"
                                    fullWidth
                                    required
                                    multiline
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                />

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <TextField
                                        label="Código"
                                        name="code"
                                        fullWidth
                                        required
                                        value={form.code}
                                        onChange={handleChange}
                                    />

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

                                <TextField
                                    label="ID del profesor"
                                    name="teacherId"
                                    type="number"
                                    fullWidth
                                    required
                                    value={form.teacherId}
                                    onChange={handleChange}
                                    helperText="Para probar puedes usar 2, que suele ser el profesor creado por defecto."
                                />

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