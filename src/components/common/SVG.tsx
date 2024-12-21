import { styled } from "styled-components";

interface Props {
    size?: number;
    children: React.ReactNode;
}

const SVG: React.FC<Props> = ({ size, children }) => {
    return <SVGStyle style={{ width: size, height: size }}>{children}</SVGStyle>;
};

const SVGStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default SVG;
