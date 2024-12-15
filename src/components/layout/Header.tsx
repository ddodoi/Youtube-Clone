import { FaBars } from "react-icons/fa6";
import { styled } from "styled-components";
import Premium from "@assets/premium.svg";
import Mike from "@assets/mike.svg";

const Header = () => {
    return (
        <HeaderStyle>
            <div className="start">
                <FaBars size={24} />
                <Premium />
                <span className="contry-code">KR</span>
            </div>
            <div className="center">
                <div className="search-box">검색창</div>
                <button>
                    <Mike />
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
