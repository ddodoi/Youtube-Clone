import { useState } from 'react';
import styled from 'styled-components';

interface CommentInputProps {
    onSubmit: (content: string) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps) => {
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        if (!content.trim()) return;
        onSubmit(content);
        setContent('');
        setIsFocused(false);
    };

    return (
        <Container>
            <UserAvatar />
            <InputWrapper>
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="댓글 추가..."
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                {isFocused && (
                    <ButtonGroup>
                        <CancelButton onClick={() => {
                            setIsFocused(false);
                            setContent('');
                        }}>
                            취소
                        </CancelButton>
                        <SubmitButton 
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                        >
                            댓글
                        </SubmitButton>
                    </ButtonGroup>
                )}
            </InputWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e5e5e5;
    flex-shrink: 0;
`;

const InputWrapper = styled.div`
    flex: 1;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || '#e5e5e5'};
    padding: 4px 0;
    font-size: 14px;
    outline: none;

    &:focus {
        border-bottom: 2px solid #000;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
`;

const Button = styled.button`
    padding: 8px 16px;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;

const CancelButton = styled(Button)`
    background: none;
    border: none;
    color: ${({ theme }) => theme?.colors?.text?.primary || '#030303'};

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || '#e5e5e5'};
    }
`;

const SubmitButton = styled(Button)`
    background: ${({ theme }) => theme?.colors?.button?.primary || '#065fd4'};
    color: white;
    border: none;
    
    &:disabled {
        background: ${({ theme }) => theme?.colors?.button?.disabled || '#cccccc'};
        cursor: not-allowed;
    }
`;

export default CommentInput; 