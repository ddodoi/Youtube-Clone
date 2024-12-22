import { styled } from "styled-components";

interface Props {
    size?: number;
    children: React.ReactNode;
}

const SVG: React.FC<Props> = ({ size, children }) => {
    return (
        <SVGStyle style={{ width: size, height: size }} size={size}>
            {children}
        </SVGStyle>
    );
};

const SVGStyle = styled.div<{ size?: number }>`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
    }
`;

export default SVG;
