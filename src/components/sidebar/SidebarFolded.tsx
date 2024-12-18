import { ReactComponent as Home } from "@assets/sidebar/home.svg";
import { ReactComponent as Shorts } from "@assets/sidebar/shorts.svg";
import { ReactComponent as Subscription } from "@assets/sidebar/subscription.svg";
import { ReactComponent as YoutubeMusic } from "@assets/sidebar/youtubeMusic.svg";
import { ReactComponent as UserCircle } from "@assets/userCircle.svg";
import { ReactComponent as Download } from "@assets/sidebar/download.svg";
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

const SidebarFolded = () => {
    return (
        <SidebarFoldedStyle>
            <div className="menu-items">
                {menus.map((menu, i) => (
                    <MenuItem aria-label={menu.title} key={i}>
                        <a href={menu.href}>
                            {menu.icon}
                            <span>{menu.title}</span>
                        </a>
                    </MenuItem>
                ))}
            </div>
        </SidebarFoldedStyle>
    );
};

const SidebarFoldedStyle = styled.div`
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

    &:hover {
        outline: none;
        background-color: rgba(0, 0, 0, 0.05);
    }

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

    @media screen AND (${({ theme }) => theme.mediaQuery.sidebar.mobile}) {
        display: none;
    }
`;

export default SidebarFolded;
