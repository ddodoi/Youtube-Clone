import { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userLogin } = useAuth();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        userLogin(email, password);
    };

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <LoginStyle>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleEmailInput}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                />
                <button>로그인</button>
            </form>
        </LoginStyle>
    );
};

const LoginStyle = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;

        input {
            padding: 5px 12px;
        }
    }
`;

export default Login;
