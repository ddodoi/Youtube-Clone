import { ReactComponent as Home } from "@assets/home.svg";
import { ReactComponent as Shorts } from "@assets/shorts.svg";
import { ReactComponent as Subscription } from "@assets/subscription.svg";
import { ReactComponent as YoutubeMusic } from "@assets/youtubeMusic.svg";
import { ReactComponent as UserCircle } from "@assets/userCircle.svg";
import { ReactComponent as Download } from "@assets/download.svg";
import { styled } from "styled-components";

const menus = [
    {
        title: "홈",
        href: "/",
        icon: <Home />,
    },
    {
        title: "Shorts",
        href: "/shorts/:shorts_id",
        icon: <Shorts />,
    },
    {
        title: "구독",
        href: "/feed/subscriptions",
        icon: <Subscription />,
    },
    {
        title: "YouTube Music",
        href: "https://music.youtube.com/",
        icon: <YoutubeMusic />,
    },
    {
        title: "내 페이지",
        href: "/feed/you",
        icon: <UserCircle />,
    },
    {
        title: "오프라인 저장 동영상",
        href: "/feed/downloads",
        icon: <Download />,
    },
];

const Sidebar = () => {
    return (
        <SidebarStyle>
            <div className="menu-items">
                {menus.map((menu) => (
                    <MenuItem aria-label={menu.title}>
                        <a href={menu.href}>
                            {menu.icon}
                            <span>{menu.title}</span>
                        </a>
                    </MenuItem>
                ))}
            </div>
        </SidebarStyle>
    );
};

const SidebarStyle = styled.div`
    position: fixed;
    top: 56px;
    left: 0px;
    z-index: 2028;
    width: 72px;
    padding: 0 4px;

    .menu-items {
        display: flex;
        flex-direction: column;
        margin-top: 4px;
    }
`;

const MenuItem = styled.div`
    border-radius: 10px;

    a {
        padding: 16px 0 14px;
        width: 64px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;

        svg {
            width: 24px;
            height: 24px;
            margin-bottom: 6px;
            color: #030303;
        }

        span {
            color: #0f0f0f;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1rem;
            line-height: 1.4rem;
        }
    }
`;

export default Sidebar;
