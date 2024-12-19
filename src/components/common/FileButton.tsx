import { ChangeEvent, cloneElement, useId } from "react";
import { styled } from "styled-components";

interface Props {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    children: React.ReactElement<HTMLLabelElement>;
}

const FileButton: React.FC<Props> = ({ onChange, accept, children }) => {
    const inputId = useId();
    const cloneChildren = cloneElement(children, { htmlFor: inputId });

    return (
        <FileButtonStyle>
            <HiddenInput type="file" id={inputId} accept={accept} onChange={onChange} />
            {cloneChildren}
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

export default FileButton;
