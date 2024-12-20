import { styled } from "styled-components";
import { ReactComponent as Mike } from "@assets/header/mike.svg";
import { ReactComponent as Bell } from "@assets/header/bell.svg";
import SearchBox from "@components/header/SearchBox";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "@hooks/useAuth";
import { useUser } from "@hooks/useUser";
import HeaderStart from "./HeaderStart";
import LoginButton from "./LoginButton";
import Dropdown from "@components/common/Dropdown";
import { ReactComponent as VideoUpload } from "@assets/header/videoUpload.svg";
import { Link } from "react-router-dom";

const makePannelData = [
    {
        title: "동영상 만들기",
        href: "",
        icon: <VideoUpload />,
    },
];

const Header = () => {
    const { isLoggedIn } = useAuth();
    const { user } = useUser();

    return (
        <HeaderStyle>
            <HeaderStart isLoggedIn={isLoggedIn} />
            <CenterStyle>
                <SearchBox />
                <VoiceSearchButtonStyle>
                    <button>
                        <Mike width={24} height={24} />
                    </button>
                </VoiceSearchButtonStyle>
            </CenterStyle>
            <div className="end">
                {isLoggedIn ? (
                    <>
                        <MakeButtonStyle>
                            <Dropdown
                                toggleButton={
                                    <>
                                        <BsPlusLg size={24} />
                                        <div>만들기</div>
                                    </>
                                }
                            >
                                <MakeButtonPanel>
                                    {makePannelData.map((item, i) => (
                                        <div key={i}>
                                            {item.icon}
                                            <Link to={item.href} aria-label={item.title}>
                                                {item.title}
                                            </Link>
                                        </div>
                                    ))}
                                </MakeButtonPanel>
                            </Dropdown>
                        </MakeButtonStyle>
                        <div className="notification-button">
                            <div>
                                <Bell />
                            </div>
                        </div>
                        <div className="avatar-button">
                            <button aria-label="계정 메뉴">
                                <img src={user.profileLocation} alt="아바타" />
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
                        <LoginButton />
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

    .end {
        display: flex;
        min-width: 225px;
        align-items: center;
        justify-content: flex-end;
        flex: 1;

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
    }
`;

const CenterStyle = styled.div`
    display: flex;
    flex: 0 1 732px;
    align-items: center;

    @media screen and (${({ theme }) => theme.mediaQuery.searchBox.mobile}) {
        flex: 1;
        justify-content: flex-end;
    }
`;

const VoiceSearchButtonStyle = styled.div`
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

    @media screen and (${({ theme }) => theme.mediaQuery.searchBox.mobile}) {
        background: none;
        margin-left: 0;
    }
`;

const MakeButtonStyle = styled.div`
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
`;

const MakeButtonPanel = styled.div`
    position: absolute;
    padding: 8px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    div {
        padding: 0 36px 0 16px;
        display: flex;
        align-items: center;
        height: 40px;
        width: 200px;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        svg {
            margin-right: 16px;
        }

        a {
            text-decoration: none;
            color: rgb(15, 15, 15);
            font-size: 1.4rem;
            line-height: 2rem;
        }
    }
`;

export default Header;
