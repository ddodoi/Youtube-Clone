import styled from "styled-components";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { Comment } from "../../../types/comment.type";
import { formatDate, formatNumber } from "../../../utils/format";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineFlag, MdKeyboardArrowDown, MdModeEdit, MdDelete } from "react-icons/md";

interface CommentItemProps extends Comment {
    onReply: (content: string) => void;
    onDelete: (commentId: string, parentId?: string) => void;
    currentUserId?: string;
    isReply?: boolean;
}

const CommentItem = ({
    id,
    author,
    content,
    likes,
    createdAt,
    replies,
    onReply,
    onDelete,
    currentUserId,
    isReply,
}: CommentItemProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [likeCount, setLikeCount] = useState(likes);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isAuthor = currentUserId === author.id;

    const handleLike = () => {
        if (isLiked) {
            setLikeCount((prev) => prev - 1);
            setIsLiked(false);
        } else {
            setLikeCount((prev) => prev + (isDisliked ? 1 : 1));
            setIsLiked(true);
            setIsDisliked(false);
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setIsDisliked(false);
        } else {
            if (isLiked) {
                setLikeCount((prev) => prev - 1);
            }
            setIsDisliked(true);
            setIsLiked(false);
        }
    };

    const handleSubmitReply = () => {
        if (!replyContent.trim()) return;
        onReply(replyContent);
        setReplyContent("");
        setShowReplyInput(false);
    };

    const handleEdit = () => {
        if (!editContent.trim()) return;
        console.log("Edit comment:", editContent);
        setIsEditing(false);
        setShowDropdown(false);
    };

    const handleDelete = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            onDelete(id);
        }
        setShowDropdown(false);
    };

    const handleDropdownAction = (action: string) => {
        switch (action) {
            case "edit":
                setIsEditing(true);
                setShowDropdown(false);
                break;
            case "delete":
                handleDelete();
                break;
            default:
                break;
        }
    };

    return (
        <Container $isReply={isReply}>
            <Avatar $src={author.avatar} />
            <Content>
                {isEditing ? (
                    <EditInput>
                        <Input
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleEdit();
                                }
                            }}
                        />
                        <ButtonGroup>
                            <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
                            <SubmitButton onClick={handleEdit} disabled={!editContent.trim()}>
                                저장
                            </SubmitButton>
                        </ButtonGroup>
                    </EditInput>
                ) : (
                    <>
                        <AuthorInfo>
                            <Author>{author.name}</Author>
                            <Timestamp>{formatDate(createdAt)}</Timestamp>
                            <MoreButtonWrapper ref={dropdownRef}>
                                <MoreButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDropdown(!showDropdown);
                                    }}
                                >
                                    <BsThreeDots size={20} style={{ transform: "rotate(90deg)" }} />
                                </MoreButton>
                                {showDropdown && (
                                    <DropdownMenu>
                                        {isAuthor ? (
                                            <>
                                                <DropdownItem
                                                    onClick={() => handleDropdownAction("edit")}
                                                >
                                                    <MdModeEdit size={20} />
                                                    수정
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => handleDropdownAction("delete")}
                                                >
                                                    <MdDelete size={20} />
                                                    삭제
                                                </DropdownItem>
                                            </>
                                        ) : (
                                            <DropdownItem
                                                onClick={() => handleDropdownAction("report")}
                                            >
                                                <MdOutlineFlag size={20} />
                                                신고
                                            </DropdownItem>
                                        )}
                                    </DropdownMenu>
                                )}
                            </MoreButtonWrapper>
                        </AuthorInfo>
                        <Text>{content}</Text>
                    </>
                )}
                <Actions>
                    <ActionButton onClick={handleLike} $isLiked={isLiked}>
                        {isLiked ? <AiFillLike size={16} /> : <AiOutlineLike size={16} />}
                        <Count>{likeCount > 0 ? formatNumber(likeCount) : ""}</Count>
                    </ActionButton>
                    <ActionButton onClick={handleDislike} $isDisliked={isDisliked}>
                        {isDisliked ? <AiFillDislike size={16} /> : <AiOutlineDislike size={16} />}
                    </ActionButton>
                    <ReplyButton onClick={() => setShowReplyInput(true)}>답글</ReplyButton>
                </Actions>
                {showReplyInput && (
                    <ReplyInput>
                        <UserAvatar />
                        <Input
                            placeholder="답글 추가..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmitReply();
                                }
                            }}
                        />
                        <ButtonGroup>
                            <CancelButton
                                onClick={() => {
                                    setShowReplyInput(false);
                                    setReplyContent("");
                                }}
                            >
                                취소
                            </CancelButton>
                            <SubmitButton
                                onClick={handleSubmitReply}
                                disabled={!replyContent.trim()}
                            >
                                답글
                            </SubmitButton>
                        </ButtonGroup>
                    </ReplyInput>
                )}
                {replies && replies.length > 0 && (
                    <RepliesSection>
                        <ShowRepliesButton onClick={() => setShowReplies(!showReplies)}>
                            <MdKeyboardArrowDown
                                size={30}
                                style={{
                                    transform: showReplies ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s ease",
                                }}
                            />
                            {showReplies ? "답글 숨기기" : `답글 ${replies.length}개`}
                        </ShowRepliesButton>
                        {showReplies && (
                            <RepliesList>
                                {replies.map((reply) => (
                                    <CommentItem
                                        key={reply.id}
                                        {...reply}
                                        onReply={onReply}
                                        onDelete={(replyId) => onDelete(replyId, id)}
                                        currentUserId={currentUserId}
                                        isReply={true}
                                    />
                                ))}
                            </RepliesList>
                        )}
                    </RepliesSection>
                )}
            </Content>
        </Container>
    );
};

const Container = styled.div<{ $isReply?: boolean }>`
    display: flex;
    gap: 12px;
    padding: ${(props) => (props.$isReply ? "8px 0 8px 48px" : "8px 0")};
    width: 100%;
    position: relative;
`;

const Avatar = styled.div<{ $src: string }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e5e5e5;
    background-image: url(${(props) => props.$src});
    background-size: cover;
    flex-shrink: 0;
`;

const Content = styled.div`
    flex: 1;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
`;

const Author = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
`;

const Timestamp = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme?.colors?.text?.secondary || "#606060"};
`;

const Text = styled.p`
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
    margin: 0;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
`;

const ActionButton = styled.button<{ $isLiked?: boolean; $isDisliked?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || "#e5e5e5"};
    }

    svg {
        color: ${(props) =>
            props.$isLiked || props.$isDisliked
                ? "#065fd4"
                : ({ theme }) => theme?.colors?.text?.secondary || "#606060"};
    }
`;

const Count = styled.span`
    font-size: 12px;
`;

const ReplyButton = styled.button`
    background: none;
    border: none;
    padding: 8px;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.text?.secondary || "#606060"};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || "#e5e5e5"};
        border-radius: 50%;
    }
`;

const ReplyInput = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 12px;
    position: relative;
    padding-left: 40px;
`;

const Input = styled.input`
    flex: 1;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || "#e5e5e5"};
    padding: 4px 0;
    font-size: 14px;
    outline: none;

    &:focus {
        border-bottom: 2px solid #000;
    }
`;

const ButtonGroup = styled.div`
    position: absolute;
    bottom: -40px;
    right: 0;
    display: flex;
    gap: 8px;
`;

const RepliesSection = styled.div`
    margin-top: 12px;
`;

const ShowRepliesButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #065fd4;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 0;

    &:hover {
        color: #0456bf;
    }
`;

const RepliesList = styled.div`
    margin-top: 12px;
    padding-left: 40px;
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e5e5e5;
    flex-shrink: 0;
`;

const CancelButton = styled.button`
    background: none;
    border: none;
    padding: 8px 16px;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.text?.primary || "#030303"};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme?.colors?.button?.hover || "#e5e5e5"};
    }
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 500;
    background: ${({ theme }) => theme?.colors?.button?.primary || "#065fd4"};
    color: white;
    border: none;
    cursor: pointer;

    &:disabled {
        background: ${({ theme }) => theme?.colors?.button?.disabled || "#cccccc"};
        cursor: not-allowed;
    }
`;

const MoreButtonWrapper = styled.div`
    position: relative;
    margin-left: auto;
`;

const MoreButton = styled.button`
    padding: 8px;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: #606060;

    &:hover {
        background: #f2f2f2;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 200px;
    padding: 8px 0;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #f2f2f2;
    }

    svg {
        color: #606060;
    }
`;

const EditInput = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 12px;
    position: relative;
    padding-left: 40px;
`;

export default CommentItem;
