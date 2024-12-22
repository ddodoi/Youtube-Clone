import { styled } from "styled-components";

interface Props {
    size?: number;
    children: React.ReactNode;
    color?: string;
}

const SVG: React.FC<Props> = ({ size, children, color }) => {
    return (
        <SVGStyle style={{ width: size, height: size }} size={size} color={color}>
            {children}
        </SVGStyle>
    );
};

const SVGStyle = styled.div<{ size?: number; color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        color: ${({ color }) => color};
    }
`;

export default SVG;
