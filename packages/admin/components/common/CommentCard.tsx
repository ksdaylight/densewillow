import { FC, ReactNode, useState } from 'react';

import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { BsFillReplyAllFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';

import { CommentResponse } from '../../utils/types';

import CommentForm from './CommentForm';
import ProfileIcon from './ProfileIcon';
import LikeHeart from './LikeHeart';

interface Props {
    comment: CommentResponse;
    showControls?: boolean;
    busy?: boolean;
    onUpdateSubmit?(content: string): void;
    onReplySubmit?(content: string): void;
    onDeleteClick?(): void;
    onLikeClick?(): void;
}

const CommentCard: FC<Props> = ({
    comment,
    showControls = false,
    busy,
    onUpdateSubmit,
    onReplySubmit,
    onDeleteClick,
    onLikeClick,
}): JSX.Element => {
    const { owner, createdAt, content, likedByOwner, likes } = comment;
    const { name, avatar } = owner;
    const [showForm, setShowForm] = useState(false);
    const [initialState, setInitialState] = useState('');

    const displayReplyForm = () => {
        setInitialState('');
        setShowForm(true);
    };

    const hideReplyForm = () => {
        setShowForm(false);
    };

    const handleOnReplyClick = () => {
        displayReplyForm();
    };

    const handleOnEditClick = () => {
        displayReplyForm();
        setInitialState(content);
    };

    const handleCommentSubmit = (inputComment: string) => {
        // means we want to update
        if (initialState) {
            onUpdateSubmit && onUpdateSubmit(inputComment);
        } else {
            // means we want to reply
            onReplySubmit && onReplySubmit(inputComment);
        }
        hideReplyForm();
    };

    return (
        <div className="flex space-x-3">
            <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar} />

            <div className="flex-1">
                <h1 className="text-lg text-primary-dark dark:text-primary font-semibold">
                    {name}
                </h1>
                <span className="text-sm text-secondary-dark">
                    {dateFormat(createdAt, 'd-mmm-yyyy')}
                </span>
                <div className="text-primary-dark dark:text-primary">{parse(content)}</div>

                <div className="flex space-x-4">
                    <LikeHeart
                        liked={likedByOwner}
                        label={`${likes} likes`}
                        onClick={onLikeClick}
                        busy={busy}
                    />
                    <Button onClick={handleOnReplyClick}>
                        <BsFillReplyAllFill />
                        <span>Reply</span>
                    </Button>
                    {showControls && (
                        <>
                            <Button onClick={handleOnEditClick}>
                                <BsPencilSquare />
                                <span>Edit</span>
                            </Button>
                            <Button onClick={onDeleteClick}>
                                <BsFillTrashFill />
                                <span>Delete</span>
                            </Button>
                        </>
                    )}
                </div>

                {showForm && (
                    <div className="mt-3">
                        <CommentForm
                            onSubmit={handleCommentSubmit}
                            onClose={hideReplyForm}
                            initialState={initialState}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentCard;

interface ButtonProps {
    children: ReactNode;
    onClick?(): void;
}
const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center text-primary-dark dark:text-primary space-x-2"
        >
            {children}
        </button>
    );
};
