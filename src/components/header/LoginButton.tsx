import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as UserCircle } from "@assets/userCircle.svg";

const LoginButton = () => {
    const navigate = useNavigate();
    return (
        <LoginButtonStyle onClick={() => navigate("/login")}>
            <div className="login-button">
                <UserCircle />
                <div>로그인</div>
            </div>
        </LoginButtonStyle>
    );
};

const LoginButtonStyle = styled.button`
    padding: 0 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    outline: none;
    background: none;

    .login-button {
        color: #065fd4;
        line-height: 36px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0;

        svg {
            margin: 0 6px 0 -6px;
            fill: currentColor;
        }
    }

    &:hover {
        background: #def1ff;
        border-color: transparent;
    }
`;

export default LoginButton;
