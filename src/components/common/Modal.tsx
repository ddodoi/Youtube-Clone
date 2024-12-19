import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

interface Props extends React.CSSProperties {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

const Modal: React.FC<Props> = ({ children, isOpen, setIsOpen, ...props }) => {
    const [isFadingout, setIsFadingout] = useState(false);

    const handleClose = (e?: MouseEvent) => {
        setIsFadingout(true);
        e?.stopPropagation();
    };

    const handleESC = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    };

    const handleBackgroundClick = () => {
        handleClose();
    };

    const handleAnimationEnd = () => {
        if (isFadingout) {
            setIsOpen(false);
            setIsFadingout(false);
        }
    };

    useEffect(() => {
        if (isOpen) window.addEventListener("keydown", handleESC);
        else window.removeEventListener("keydown", handleESC);
        return () => window.removeEventListener("keydown", handleESC);
    }, [isOpen]);

    return (
        isOpen &&
        createPortal(
            <ModalStyle
                onClick={handleBackgroundClick}
                className={isFadingout ? "fade-out" : "fade-in"}
                onAnimationEnd={handleAnimationEnd}
            >
                <ModalBodyStyle style={{ ...props }}>{children}</ModalBodyStyle>
            </ModalStyle>,
            document.body,
        )
    );
};

const ModalStyle = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }

    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4000;
`;

const ModalBodyStyle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
`;

export default Modal;
