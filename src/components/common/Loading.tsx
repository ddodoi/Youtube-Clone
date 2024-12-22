import { styled } from "styled-components";

interface Props {
    size?: number;
}

const Loading: React.FC<Props> = ({ size }) => {
    return (
        <LoadingStyle>
            <Spinner size={size} />
        </LoadingStyle>
    );
};

const LoadingStyle = styled.div`
    padding: 40px 0;
    text-align: center;
`;

const Spinner = styled.div<{ size?: number }>`
    border: 3px solid #ddd;
    border-top-color: #fff;
    width: ${({ size }) => (size ? size : "50")}px;
    height: ${({ size }) => (size ? size : "50")}px;
    border-radius: 50%;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    animation: spin 1s linear infinite;
`;

export default Loading;
