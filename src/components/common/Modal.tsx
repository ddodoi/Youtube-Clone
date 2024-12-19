import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}

const Modal: React.FC<Props> = ({ children, isOpen, setIsOpen }) => {
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
                <div className="modal-body">
                    <div className="modal-content">{children}</div>
                </div>
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

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        background: rgb(255, 255, 255);
    }
`;

export default Modal;
