import { FormEvent, useRef } from "react";
import { styled } from "styled-components";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { userLogin } = useAuth();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email || !password) return;
        userLogin(email, password);
        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

    return (
        <LoginStyle>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="이메일" ref={emailRef} required />
                <input type="password" placeholder="비밀번호" ref={passwordRef} required />
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
