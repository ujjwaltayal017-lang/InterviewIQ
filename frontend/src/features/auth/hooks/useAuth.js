import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../services/auth.api";
import { useNavigate } from "react-router";

export const useAuth = () => {

    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;
    const navigate = useNavigate()

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            navigate("/interview");
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)

        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            navigate("/interview");
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }

    }


    const handleLogout = async () => {
    try {
        setLoading(true);

        await logout();

        setUser(null);
        navigate("/");
    } catch (err) {
        console.log("Logout failed:", err);
    } finally {
        setLoading(false);
    }
};

    return { user, loading, handleLogin, handleLogout, handleRegister }

}
