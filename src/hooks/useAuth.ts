import { useAuthStore } from "../stores/authStore";
import { loginUser } from "../apis/auth.api";
import { LoginResponse } from "../mock/auth.mock";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { isLoggedIn, avatarURL, userName, storeLogin, storeLogout } = useAuthStore();
    const navigate = useNavigate();

    const userLogin = (email: string, password: string) => {
        console.log("email >>>", email);
        console.log("password >>>", password);
        loginUser(email, password).then((res: LoginResponse) => {
            storeLogin(res);
            navigate("/");
        });
    };

    const userLogout = () => {
        window.alert("로그아웃 되었습니다.");
        storeLogout();
    };

    return { isLoggedIn, avatarURL, userName, userLogin, userLogout };
};
