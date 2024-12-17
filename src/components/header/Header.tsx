import { styled } from "styled-components";
import { ReactComponent as Mike } from "@assets/header/mike.svg";
import { ReactComponent as Bell } from "@assets/header/bell.svg";
import { ReactComponent as UserCircle } from "@assets/userCircle.svg";
import { useNavigate } from "react-router-dom";
import SearchBox from "@components/common/header/SearchBox";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "@hooks/useAuth";
import { useUser } from "@hooks/useUser";
import HeaderStart from "./HeaderStart";

const Header = () => {
    const { isLoggedIn } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <HeaderStyle>
            <HeaderStart isLoggedIn={isLoggedIn} />
            <div className="center">
                <SearchBox />
                <div className="voice-search-button">
                    <button>
                        <Mike width={24} height={24} />
                    </button>
                </div>
            </div>
            <div className="end">
                {isLoggedIn ? (
                    <>
                        <div className="make-button">
                            <button>
                                <BsPlusLg size={24} />
                                <div>만들기</div>
                            </button>
                        </div>
                        <div className="notification-button">
                            <div>
                                <Bell />
                            </div>
                        </div>
                        <div className="avatar-button">
                            <button aria-label="계정 메뉴">
                                <img src={user.profileImageURL} alt="아바타" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="menu-button">
                            <button>
                                <BsThreeDotsVertical size={24} />
                            </button>
                        </div>
                        <div className="login-button">
                            <button onClick={() => navigate("/login")}>
                                <div>
                                    <UserCircle />
                                </div>
                                <div>로그인</div>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </HeaderStyle>
    );
};

const HeaderStyle = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2020;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 56px;
    width: 100%;

    .center {
        display: flex;
        flex: 0 1 732px;
        align-items: center;

        .voice-search-button {
            width: 40px;
            height: 40px;
            padding: 0;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.05);
            margin-left: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                border: none;
                outline: none;
                background: none;
                cursor: pointer;
            }

            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }

    .end {
        display: flex;
        min-width: 225px;
        align-items: center;
        justify-content: flex-end;
        flex: 1;

        .make-button {
            margin-right: 8px;

            button {
                display: flex;
                align-items: center;
                padding: 0 16px;
                height: 36px;
                font-size: 14px;
                line-height: 36px;
                border-radius: 18px;
                border: none;
                outline: none;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }

                svg {
                    margin: 0 6px 0 -6px;
                }
            }
        }

        .notification-button {
            margin-right: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;

            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }

            div {
                width: 24px;
                height: 24px;
            }
        }

        .avatar-button {
            padding: 1px 6px;

            button {
                border: none;
                background: none;
                width: 32px;
                height: 32px;
                cursor: pointer;
                margin: 0 8px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;

                svg {
                    width: 100%;
                    height: 100%;
                }
                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }

        .menu-button {
            margin-right: 8px;

            button {
                outline: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
            }
        }

        .login-button {
            padding: 0 15px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            height: 36px;

            border-radius: 18px;
            display: flex;
            align-items: center;

            button {
                color: #065fd4;
                line-height: 36px;
                font-size: 14px;
                display: flex;
                align-items: center;
                outline: none;
                background: none;
                border: none;
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
        }
    }
`;

export default Header;
