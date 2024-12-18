import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { styled } from "styled-components";

const SearchBox = () => {
    return (
        <SearchBoxStyle>
            <div className="search-input-box">
                <form action="">
                    <input type="text" placeholder="검색" />
                </form>
                <button className="input-assistant-button">
                    <img src="https://www.gstatic.com/inputtools/images/tia.png" alt="키보드" />
                </button>
            </div>
            <button className="search-button">
                <HiMiniMagnifyingGlass size={24} />
            </button>
        </SearchBoxStyle>
    );
};

const SearchBoxStyle = styled.div`
    flex: 1;
    display: flex;
    height: 40px;
    margin-left: 40px;
    padding: 0 4px;
    color: #0f0f0f;

    .search-input-box {
        display: flex;
        align-items: center;
        margin-left: 32px;
        border: 1px solid #c6c6c6;
        border-radius: 40px 0 0 40px;
        border-right: none;
        padding: 0 4px 0 16px;
        flex: 1;
        box-shadow: inset 0 1px 2px #eee;
        cursor: text;

        form {
            display: flex;
            flex: 1;

            input {
                padding: 1px 0;
                margin: 0;
                width: 100%;
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 1.6rem;
                line-height: 2.2rem;
                font-weight: 400;
            }
        }

        .input-assistant-button {
            cursor: pointer;
            padding: 4px;
            margin: 0;
            outline: none;
            border: none;
            background: none;
            display: block;
        }
    }

    .search-button {
        border-radius: 0 40px 40px 0;
        border: 1px solid #c6c6c6;
        background-color: #f8f8f8;
        width: 64px;
        cursor: pointer;
        padding: 0;
        margin: 0;

        &:hover {
            background-color: #f0f0f0;
            border: 1px solid #c6c6c6;
        }
    }
`;

export default SearchBox;
