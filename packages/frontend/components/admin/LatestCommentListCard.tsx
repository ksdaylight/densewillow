import { FC } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import parse from 'html-react-parser';

import { trimText } from '@frontend/utils/helps';

import { CommentWithPartialRelations } from '@api-contracts';

import ProfileIcon from '../common/ProfileIcon';

interface Props {
    comment: CommentWithPartialRelations;
}

const LatestCommentListCard: FC<Props> = ({ comment }): JSX.Element => {
    const { owner, belongsTo, content } = comment;
    return (
        <div className="flex space-x-2">
            <ProfileIcon
                nameInitial={owner && owner.name ? owner.name[0].toUpperCase() : 'Guest'}
                avatar={owner?.avatar ? owner.avatar : undefined}
            />

            <div className="flex-1">
                <p className="font-semibold text-primary-dark dark:text-white transition">
                    {owner?.name} <span className="text-sm text-secondary-gray">commented on</span>
                </p>

                <a
                    href={`/${belongsTo?.slug}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-secondary-gray hover:underline"
                >
                    <div className="flex items-center space-x-2">
                        <BsBoxArrowUpRight size={12} />
                        {trimText(belongsTo?.title || '...', 30)}
                    </div>
                </a>

                <div className="text-primary-dark dark:text-white transition">{parse(content)}</div>
            </div>
        </div>
    );
};

export default LatestCommentListCard;
