import Image from 'next/legacy/image';
import { UserPartialWithRelations } from 'packages/api-contracts/src/zod';
import { FC } from 'react';

interface Props {
    profile: UserPartialWithRelations;
}

const AuthorInfo: FC<Props> = ({ profile }): JSX.Element => {
    const { name, avatar } = profile;
    const message = `This post is written by ${name}. ${
        name?.split(' ')[0]
    } is an full stack JavaScript developer. `;

    return (
        <div className="p-2 border-2 border-secondary-dark rounded flex">
            {/* profile icons */}
            <div className="w-12">
                <div className="aspect-square relative">
                    {avatar && <Image src={avatar} layout="fill" alt={name} className="rounded" />}
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
