import { styled } from "styled-components";
import { ReactComponent as Mike } from "@assets/header/mike.svg";
import { ReactComponent as Bell } from "@assets/header/bell.svg";
import SearchBox from "@components/header/SearchBox";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "@hooks/useAuth";

import HeaderStart from "./HeaderStart";
import LoginButton from "./LoginButton";

import MakeButton from "./MakeButton";
import ProfileButton from "./ProfileButton";

const Header = () => {
    const { isLoggedIn } = useAuth();

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
                        <MakeButton />
                        <div className="notification-button">
                            <div>
                                <Bell />
                            </div>
                        </div>
                        <ProfileButton />
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

export default Header;
