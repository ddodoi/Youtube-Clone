import { useAuthStore } from "../stores/authStore";
import { createLogin } from "../apis/user.api";
import { LoginResponse } from "../mock/user.mock";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
    const navigate = useNavigate();

    const userLogin = (email: string, password: string) => {
        createLogin(email, password).then((res: LoginResponse) => {
            storeLogin(res.token);
            navigate("/");
        });
    };

    const userLogout = () => {
        window.alert("로그아웃 되었습니다.");
        storeLogout();
    };

    return { isLoggedIn, userLogin, userLogout };
};
