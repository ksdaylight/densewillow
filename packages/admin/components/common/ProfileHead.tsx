import { FC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

import ProfileIcon from './ProfileIcon';

interface Props {
    lightOnly?: boolean;
    avatar?: string;
    nameInitial?: string;
}

const ProfileHead: FC<Props> = ({ avatar, nameInitial, lightOnly }): JSX.Element => {
    return (
        <div className="flex items-center">
            {/* image / name initial */}
            <ProfileIcon avatar={avatar} nameInitial={nameInitial} lightOnly />
            {/* down icon */}
            <AiFillCaretDown
                className={lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'}
            />
        </div>
    );
};

export default ProfileHead;
