import { styled } from "styled-components";
import { ReactComponent as Premium } from "@assets/premium.svg";
import { ReactComponent as Mike } from "@assets/mike.svg";
import { ReactComponent as Bars } from "@assets/bars.svg";
import { ReactComponent as Bell } from "@assets/bell.svg";
import { ReactComponent as Youtube } from "@assets/youtube.svg";
import { Link } from "react-router-dom";
import SearchBox from "../common/header/SearchBox";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
    const { isLoggedIn, avatarURL, userName, userLogin, userLogout } = useAuth();

    return (
        <HeaderStyle>
            <div className="start">
                <button className="guide-button yt-icon-button">
                    <Bars width={24} height={24} />
                </button>
                <div className="logo">
                    <Link to="/">
                        <div className="logo-icon">
                            {isLoggedIn ? <Premium width={101} height={20} /> : <Youtube />}
                        </div>
                    </Link>
                    <span className="contry-code">KR</span>
                </div>
            </div>
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
                                <img src={avatarURL} alt="아바타" />
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
                            <button>
                                <div>
                                    <FaRegCircleUser size={24} />
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
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 56px;

    .start {
        flex: 1;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;

        .guide-button {
            width: 40px;
            height: 40px;
            padding: 8px;
        }

        .logo {
            display: flex;
            height: 100%;

            a {
                padding: 0;
                color: #000000;
                align-items: center;
                display: flex;
                align-self: center;
                flex: none;
                width: max-content;

                .logo-icon {
                    padding: 18px 14px 18px 16px;
                }
            }

            .contry-code {
                margin: 12px 0 0 -10px;
                color: #606060;
            }
        }
    }

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
