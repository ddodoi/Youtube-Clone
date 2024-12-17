import { styled } from "styled-components";
import { ReactComponent as Premium } from "@assets/premium.svg";
import { ReactComponent as Bars } from "@assets/bars.svg";
import { ReactComponent as Youtube } from "@assets/youtube.svg";
import { useLayoutStore } from "@stores/layoutStore";
import { Link } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
}

const HeaderStart: React.FC<Props> = ({ isLoggedIn }) => {
    const { toggleSidebar } = useLayoutStore();
    return (
        <HeaderStartStyle>
            <button className="guide-button yt-icon-button" onClick={() => toggleSidebar()}>
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
        </HeaderStartStyle>
    );
};

const HeaderStartStyle = styled.div`
    flex: 1;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;

    .guide-button {
        width: 40px;
        height: 40px;
        padding: 8px;
        border-radius: 50%;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
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
`;

export default HeaderStart;
