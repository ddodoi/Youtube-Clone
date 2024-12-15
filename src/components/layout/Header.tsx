import { styled } from "styled-components";
import { ReactComponent as Premium } from "@assets/premium.svg";
import { ReactComponent as Mike } from "@assets/mike.svg";
import { ReactComponent as Bars } from "@assets/bars.svg";

const Header = () => {
    return (
        <HeaderStyle>
            <div className="start">
                <Bars width={24} height={24} />
                <Premium width={101} height={20} />
                <span className="contry-code">KR</span>
            </div>
            <div className="center">
                <div className="search-box">검색창</div>
                <button>
                    <Mike width={24} height={24} />
                </button>
            </div>
            <div className="end">
                <div>만들기</div>
                <div>알림</div>
                <div>프로필</div>
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
        display: flex;
    }

    .center {
        display: flex;
    }

    .end {
        display: flex;
    }
`;

export default Header;
