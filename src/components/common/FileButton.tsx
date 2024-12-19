import { ChangeEvent, useId } from "react";
import { styled } from "styled-components";

interface Props {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
}

const FileButton: React.FC<Props> = ({ onChange, accept }) => {
    const inputId = useId();

    return (
        <FileButtonStyle>
            <HiddenInput type="file" id={inputId} accept={accept} onChange={onChange} />
            <StyledLabel htmlFor={inputId}>파일 선택</StyledLabel>
        </FileButtonStyle>
    );
};

const FileButtonStyle = styled.div`
    margin-top: 26px;
    margin-bottom: auto;
`;

const HiddenInput = styled.input`
    display: none;
`;

// 버튼 처럼 보이도록 스타일링
const StyledLabel = styled.label`
    display: block;
    align-content: center;
    min-width: 36px;
    height: 36px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    border: none;
    outline: none;
    background: #0d0d0d;
    color: rgb(255, 255, 255);
    border-radius: 18px;
    padding: 0 16px;
    cursor: pointer;
`;

export default FileButton;
