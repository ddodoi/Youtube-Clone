import { styled } from "styled-components";
import { ReactComponent as Bell } from "@assets/header/bell.svg";
import { ReactComponent as ArrowDown } from "@assets/sidebar/arrowDown.svg";
import SVG from "@components/common/SVG";

const SubscribedButton = () => {
    return (
        <SubscribedButtonStyle>
            <div className="bell">
                <SVG>
                    <Bell />
                </SVG>
            </div>
            <div>구독중</div>
            <div className="arrow-down">
                <SVG>
                    <ArrowDown />
                </SVG>
            </div>
        </SubscribedButtonStyle>
    );
};

const SubscribedButtonStyle = styled.button`
    color: #0f0f0f;
    background: rgba(0, 0, 0, 0.05);
    padding: 0 16px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
    width: 119px;
    display: flex;
    border: none;
    outline: none;
    align-items: center;
    cursor: pointer;

    .bell {
        margin-right: 6px;
        margin-left: -6px;
    }

    .arrow-down {
        margin-right: -6px;
        margin-left: 6px;
    }
`;

export default SubscribedButton;
