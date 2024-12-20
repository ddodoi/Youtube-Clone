import { FormEvent, ForwardedRef, forwardRef } from "react";
import { styled } from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
    label: string;
    placeholder?: string;
}

const InputText = forwardRef(
    (
        { label, content = "", placeholder = "", style }: Props,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        const handleInput = (e: FormEvent<HTMLDivElement>) => {
            if (!e.currentTarget.textContent?.trim()) {
                e.currentTarget.innerHTML = "";
            }
        };

        return (
            <InputTextStyle ref={ref}>
                <div className="label">{label}</div>
                <div
                    contentEditable={true}
                    className="editable"
                    data-placeholder={placeholder}
                    onInput={handleInput}
                    style={style}
                >
                    {content}
                </div>
            </InputTextStyle>
        );
    },
);

const InputTextStyle = styled.div`
    padding: 0 12px 27px;
    font-size: 15px;
    border-radius: 8px;
    box-shadow: rgb(204, 204, 204) 0px 0px 0px 1px inset;

    &:hover {
        box-shadow: rgb(13, 13, 13) 0px 0px 0px 1px inset;
    }

    .label {
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.011em;
        font-weight: 500;
        color: #606060;
        padding: 8px 0 3px;
    }

    .editable {
        outline: none;
        cursor: text;
    }

    .editable:empty::after {
        display: block;
        content: attr(data-placeholder);
        color: rgb(144, 144, 144);
    }
`;

export default InputText;
