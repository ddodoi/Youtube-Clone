import { Video } from "../types/mainPage.types";
import VideoCard from "../components/MainPage/VIdeoCard/VIdeoCard";
import styled from "styled-components";

const sampleVideos: Video[] = [
    {
        id: "1",
        title: "아이유(IU) - 라일락(Lilac) Official MV",
        channel: "이지금 [IU Official]",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 89420123,
        createdAt: "2023-03-25T09:00:00Z",
        duration: "3:35",
    },
    {
        id: "2",
        title: "프로그래머 하루 루틴 브이로그 | 재택근무 편",
        channel: "테크튜브",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 245891,
        createdAt: "2024-03-10T11:30:00Z",
        duration: "12:45",
    },
    {
        id: "3",
        title: "Gordon Ramsay's Ultimate Guide to Quick Cooking",
        channel: "Gordon Ramsay",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 3789562,
        createdAt: "2024-02-28T15:20:00Z",
        duration: "18:22",
    },
    {
        id: "4",
        title: "React 완벽 가이드 2024 - Hooks, Context API, Redux 총정리",
        channel: "코딩애플",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 156234,
        createdAt: "2024-01-15T07:45:00Z",
        duration: "45:12",
    },
    {
        id: "5",
        title: "방탄소년단 'Yet To Come' @ 2023 Grammy Awards",
        channel: "BANGTANTV",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 12567834,
        createdAt: "2023-12-05T13:15:00Z",
        duration: "4:18",
    },
    {
        id: "6",
        title: "ChatGPT로 만드는 AI 비서 프로젝트 전체 과정",
        channel: "테크위드미",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 89234,
        createdAt: "2024-03-01T10:00:00Z",
        duration: "28:45",
    },
    {
        id: "7",
        title: "우주의 끝에는 무엇이 있을까? | 다큐멘터리",
        channel: "Science Today",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 678234,
        createdAt: "2024-02-20T16:30:00Z",
        duration: "52:15",
    },
    {
        id: "8",
        title: "30분 전신 홈트레이닝 루틴 | 초보자도 가능",
        channel: "홈트여신",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 445678,
        createdAt: "2024-03-08T14:20:00Z",
        duration: "31:44",
    },
    {
        id: "9",
        title: "맥북 M3 프로 리뷰 | 디자이너의 관점",
        channel: "테크리뷰",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 234567,
        createdAt: "2024-01-25T09:15:00Z",
        duration: "15:33",
    },
    {
        id: "10",
        title: "전통 한식 레시피 | 된장찌개 끝판왕",
        channel: "한식의 정석",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 891234,
        createdAt: "2024-03-05T11:45:00Z",
        duration: "8:56",
    },
    {
        id: "11",
        title: "2024 봄 패션 트렌드 총정리 | 스타일 가이드",
        channel: "패션왕",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 345678,
        createdAt: "2024-02-15T08:30:00Z",
        duration: "21:15",
    },
    {
        id: "12",
        title: "Typography의 모든 것 | UI/UX 디자인 강의",
        channel: "디자인 스쿨",
        thumbnailUrl: "/api/placeholder/320/180",
        viewCount: 123456,
        createdAt: "2024-03-12T13:00:00Z",
        duration: "35:22",
    },
];

const MainPage = () => {
    return (
        <MainPageContainer>
            <ScrollContainer>
                <VideoGrid>
                    {sampleVideos.map((video: Video) => (
                        <VideoCard 
                            key={video.id}
                            video={video}
                            size="medium"
                        />
                    ))}
                </VideoGrid>
            </ScrollContainer>
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: fixed;
    top: 56px; /* 헤더 높이 */
    left: 72px; /* 사이드바 너비 */
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 24px;
    box-sizing: border-box;
    
    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #909090;
        border-radius: 4px;
    }
`;

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;
    
    @media (min-width: 1850px) {
        grid-template-columns: repeat(5, 1fr);
    }
    
    @media (min-width: 1500px) and (max-width: 1849px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (min-width: 1000px) and (max-width: 1499px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (min-width: 600px) and (max-width: 999px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 599px) {
        grid-template-columns: 1fr;
    }
`;

export default MainPage;