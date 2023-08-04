import Image from 'next/legacy/image';
import { FC } from 'react';

export interface AuthorProfile {
    id: string;
    name: string;
    avatar: string;
    message: string;
}

interface Props {
    profile: AuthorProfile;
}

const AuthorInfo: FC<Props> = ({ profile }): JSX.Element => {
    const { name, message, avatar } = profile;
    return (
        <div className="p-2 border-2 border-secondary-dark rounded flex">
            {/* profile icons */}
            <div className="w-12">
                <div className="aspect-square relative">
                    <Image src={avatar} layout="fill" alt={name} className="rounded" />
                </div>
            </div>
            {/* profile name, message */}

            <div className="ml-2 flex-1">
                <h4 className="font-semibold text-primary-dark dark:text-primary">{name}</h4>
                <p className="text-primary-dark dark:text-primary opacity-90">{message}</p>
            </div>
        </div>
    );
};

export default AuthorInfo;
