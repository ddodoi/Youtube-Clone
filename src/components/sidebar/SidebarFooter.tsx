import { styled } from "styled-components";

const top = [
    {
        title: "정보",
        href: "https://www.youtube.com/about/",
    },
    {
        title: "보도자료",
        href: "https://www.youtube.com/about/press/",
    },
    {
        title: "저작권",
        href: "https://www.youtube.com/about/copyright/",
    },
    {
        title: "문의하기",
        href: "/t/contact_us/",
    },
    {
        title: "크리에이터",
        href: "https://www.youtube.com/creators/",
    },
    {
        title: "광고",
        href: "https://www.youtube.com/ads/",
    },
    {
        title: "개발자",
        href: "https://developers.google.com/youtube",
    },
];

const mid = [
    {
        title: "약관",
        href: "/t/terms",
    },
    {
        title: "개인정보처리방침",
        href: "/t/privacy",
    },
    {
        title: "정책 및 안전",
        href: "https://www.youtube.com/about/policies/",
    },
    {
        title: "YouTube 작동의 원리",
        href: "https://www.youtube.com/howyoutubeworks?utm_campaign=ytgen&amp;utm_source=ythp&amp;utm_medium=LeftNav&amp;utm_content=txt&amp;u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen",
    },
    {
        title: "새로운 기능 테스트하기",
        href: "/new",
    },
];

const SidebarFooter = () => {
    return (
        <SidebarFooterStyle>
            <div className="top">
                {top.map((item) => (
                    <a href={item.href}>{item.title}</a>
                ))}
            </div>
            <div className="mid">
                {mid.map((item) => (
                    <a href={item.href}>{item.title}</a>
                ))}
            </div>
            <div className="bottom">
                © 2024 Google LLC, Sundar Pichai, 1600 Amphitheatre Parkway, Mountain View CA
                94043, USA, 0807-882-594 (무료), yt-support-solutions-kr@google.com, 호스팅: Google
                LLC,{" "}
                <a
                    href="http://www.ftc.go.kr/selectBizOvrCommPop.do?apvPermMgtNo=2022-공정-0001"
                    target="_blank"
                >
                    사업자정보
                </a>
                {", "}
                <a href="https://support.google.com/youtube?p=korea_report" target="_blank">
                    불법촬영물 신고
                </a>
                <br />
                크리에이터들이 유튜브 상에 게시, 태그 또는 추천한 상품들은 판매자들의 약관에 따라
                판매됩니다. 유튜브는 이러한 제품들을 판매하지 않으며, 그에 대한 책임을 지지
                않습니다.
            </div>
        </SidebarFooterStyle>
    );
};

const SidebarFooterStyle = styled.footer`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0 12px;
    padding: 0 12px;

    a {
        color: rgb(96, 96, 96);
        font-size: 1.3rem;
        line-height: 1.8rem;
        margin-right: 8px;
        text-decoration: none;
        font-weight: 500;
    }

    .top {
        padding: 16px 0 0;
        display: flex;
        flex-wrap: wrap;
    }

    .mid {
        padding: 12px 0 0;
        display: flex;
        flex-wrap: wrap;
    }

    .bottom {
        padding: 16px 0;
        color: #909090;
        font-size: 1.2rem;
        line-height: 1.8rem;
        a {
            color: #065fd4;
            font-size: 1.2rem;
            line-height: 1.8rem;
            margin-right: 0;
        }
    }
`;

export default SidebarFooter;
