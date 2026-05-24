import api from "../api/client.js";

export async function listCourses() {
    const response = await api.get("/api/courses");
    return response.data;
}

export async function createCourse(course) {
    const response = await api.post("/api/courses", course);
    return response.data;
}