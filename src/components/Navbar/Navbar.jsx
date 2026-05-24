import {useNavigate} from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePermission } from "../../hooks/usePermission";

const Navbar = () => {

    const { user, logout } = useAuthContext();
    const canCreateCourse = usePermission("CREATE_COURSE");
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <>
            <nav>
                <span>{user.email}</span>
                {canCreateCourse && (
                    <button onClick={() => navigate("/create/course")}>Crear curso</button>
                )}
                <button onClick={handleLogout}>Cerrar sesión</button>
            </nav>
        </>
    )
}
