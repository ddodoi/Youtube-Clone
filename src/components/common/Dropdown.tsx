import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    toggleButton: React.ReactNode;
}

const Dropdown: React.FC<Props> = ({ children, toggleButton }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>{toggleButton}</button>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

export default Dropdown;
