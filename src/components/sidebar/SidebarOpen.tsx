import { useLayoutStore } from "@stores/layoutStore";
import { styled } from "styled-components";
import HeaderStart from "../header/HeaderStart";
import { useAuth } from "@hooks/useAuth";
import { ReactComponent as Home } from "@assets/sidebar/home.svg";
import { ReactComponent as Shorts } from "@assets/sidebar/shorts.svg";
import { ReactComponent as Subscription } from "@assets/sidebar/subscription.svg";
import { ReactComponent as YoutubeMusic } from "@assets/sidebar/youtubeMusic.svg";
import { ReactComponent as History } from "@assets/sidebar/history.svg";
import { ReactComponent as Download } from "@assets/sidebar/download.svg";
import { ReactComponent as Playlist } from "@assets/sidebar/playlist.svg";
import { ReactComponent as Video } from "@assets/sidebar/video.svg";
import { ReactComponent as LaterVideo } from "@assets/sidebar/laterVideo.svg";
import { ReactComponent as Like } from "@assets/sidebar/like.svg";
import { ReactComponent as GreaterThan } from "@assets/sidebar/greaterthan.svg";
import { ReactComponent as Hot } from "@assets/sidebar/hot.svg";
import { ReactComponent as Shopping } from "@assets/sidebar/shopping.svg";
import { ReactComponent as Music } from "@assets/sidebar/music.svg";
import { ReactComponent as Movie } from "@assets/sidebar/movie.svg";
import { ReactComponent as Live } from "@assets/sidebar/live.svg";
import { ReactComponent as Game } from "@assets/sidebar/game.svg";
import { ReactComponent as Sports } from "@assets/sidebar/sports.svg";
import { ReactComponent as Course } from "@assets/sidebar/course.svg";
import { ReactComponent as Podcast } from "@assets/sidebar/podcast.svg";
import { ReactComponent as YoutubeStudio } from "@assets/sidebar/youtubeStudio.svg";
import { ReactComponent as YoutubeMusicColor } from "@assets/sidebar/youtubeMusicColor.svg";
import { ReactComponent as YoutubeKids } from "@assets/sidebar/youtubeKids.svg";
import { ReactComponent as Config } from "@assets/sidebar/config.svg";
import { ReactComponent as Report } from "@assets/sidebar/report.svg";
import { ReactComponent as Service } from "@assets/sidebar/service.svg";
import { ReactComponent as Suggest } from "@assets/sidebar/suggest.svg";
import SidebarSection from "./SidebarSection";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSectionTitle from "./SidebarSectionTitle";
import { Link } from "react-router-dom";

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
];

const myPage = [
    {
        title: "시청 기록",
        href: "/feed/history",
        icon: <History />,
    },
    {
        title: "재생목록",
        href: "/feed/playlists",
        icon: <Playlist />,
    },
    {
        title: "내 동영상",
        href: "/channel/videos/:channel_id", // 임의 경로
        icon: <Video />,
    },
    {
        title: "나중에 볼 동영상",
        href: "/playlists?list=WL",
        icon: <LaterVideo />,
    },
    {
        title: "좋아요 표시한 동영상",
        href: "/playlists?list=LL",
        icon: <Like />,
    },
    {
        title: "오프라인 저장 동영상",
        href: "/feed/downloads",
        icon: <Download />,
    },
];

const subscription = [];

const explore = [
    {
        title: "인기 급상승",
        href: "/feed/trending",
        icon: <Hot />,
    },
    {
        title: "쇼핑",
        href: "/channel/shopping",
        icon: <Shopping />,
    },
    {
        title: "음악",
        href: "/channel/music",
        icon: <Music />,
    },
    {
        title: "영화",
        href: "/feed/storefront",
        icon: <Movie />,
    },
    {
        title: "실시간",
        href: "/channel/live",
        icon: <Live />,
    },
    {
        title: "게임",
        href: "/gaming",
        icon: <Game />,
    },
    {
        title: "스포츠",
        href: "/channel/sports",
        icon: <Sports />,
    },
    {
        title: "학습 프로그램",
        href: "/feed/courses_destination",
        icon: <Course />,
    },
    {
        title: "팟캐스트",
        href: "/podcasts",
        icon: <Podcast />,
    },
];

const youtubeMore = [
    {
        title: "YouTube 스튜디오",
        href: "https://studio.youtube.com/",
        icon: <YoutubeStudio />,
    },
    {
        title: "YouTube Music",
        href: "https://music.youtube.com/",
        icon: <YoutubeMusicColor />,
    },
    {
        title: "YouTube Kids",
        href: "https://www.youtubekids.com/?source=youtube_web",
        icon: <YoutubeKids />,
    },
];

const etc = [
    {
        title: "설정",
        href: "/account",
        icon: <Config />,
    },
    {
        title: "신고 기록",
        href: "/reporthistory",
        icon: <Report />,
    },
    {
        title: "고객센터",
        href: "",
        icon: <Service />,
    },
    {
        title: "의견 보내기",
        href: "",
        icon: <Suggest />,
    },
];
const SidebarOpen = () => {
    const { isSidebarOpen } = useLayoutStore();
    const { isLoggedIn } = useAuth();
    return (
        <SidebarOpenStyle $isSidebarOpen={isSidebarOpen}>
            <header>
                <HeaderStart isLoggedIn={isLoggedIn} />
            </header>
            <div className="content">
                <SidebarSection>
                    {menus.map((item, i) => (
                        <SidebarMenuItem aria-label={item.title} key={i}>
                            <Link to={item.href}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarSection>
                <SidebarSection>
                    <div className="my-page">
                        <Link to="/feed/you">
                            <div className="label">내 페이지</div>
                            <GreaterThan />
                        </Link>
                    </div>
                    {myPage.map((item, i) => (
                        <SidebarMenuItem aria-label={item.title} key={i}>
                            <Link to={item.href}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarSection>
                <SidebarSection>
                    <SidebarSectionTitle>구독</SidebarSectionTitle>
                </SidebarSection>
                <SidebarSection>
                    <SidebarSectionTitle>탐색</SidebarSectionTitle>
                    {explore.map((item, i) => (
                        <SidebarMenuItem aria-label={item.title} key={i}>
                            <Link to={item.href}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarSection>
                <SidebarSection>
                    <SidebarSectionTitle>YouTube 더보기</SidebarSectionTitle>
                    {youtubeMore.map((item, i) => (
                        <SidebarMenuItem aria-label={item.title} key={i}>
                            <Link to={item.href}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarSection>
                <SidebarSection>
                    {etc.map((item, i) => (
                        <SidebarMenuItem aria-label={item.title} key={i}>
                            <Link to={item.href}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarSection>
            </div>
        </SidebarOpenStyle>
    );
};

interface SidebarStyleProps {
    $isSidebarOpen: boolean;
}

const SidebarOpenStyle = styled.div<SidebarStyleProps>`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100vh;
    transition: transform 0.2s ease-in-out;
    transform: translateX(${({ $isSidebarOpen }) => ($isSidebarOpen ? "0" : "-240px")});
    background-color: rgb(255, 255, 255);
    z-index: 10000;
    header {
        padding-left: 16px;
    }

    .content {
        flex: 1;
        overflow-y: hidden;

        &:hover {
            scrollbar-width: thin;
            overflow-y: auto;
            display: block;
            scrollbar-color: #909090 transparent;
        }

        .my-page {
            border-radius: 10px;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }

            a {
                color: rgb(15, 15, 15);
                font-size: 16px;
                padding: 0 12px;
                display: flex;
                text-decoration: none;
                height: 40px;
                align-items: center;
                justify-content: flex-start;

                .label {
                    padding-right: 8px;
                }
            }
        }
    }
`;

export default SidebarOpen;
