import { FC } from 'react';

// import { LatestUserProfile } from '@frontend/utils/types';
import { User } from '@api-contracts';

import ProfileIcon from '../common/ProfileIcon';

interface Props {
    users?: User[];
}

const LatesUserTable: FC<Props> = ({ users }): JSX.Element => {
    return (
        <div>
            <table className="w-full text-left text-primary-dark dark:text-white">
                <tbody>
                    <tr className="text-left bg-secondary-gray text-white">
                        <th className="p-2">Profile</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Provider</th>
                    </tr>

                    {users?.map((profile) => {
                        return (
                            <tr className="border-b" key={profile.id}>
                                <td className="py-2">
                                    <div className="flex items-center space-x-2">
                                        <ProfileIcon
                                            nameInitial={profile.name[0].toUpperCase()}
                                            avatar={profile.avatar || undefined}
                                        />
                                        <p>{profile.name}</p>
                                    </div>
                                </td>
                                <td className="p-2">{profile.email}</td>
                                <td>{profile.provider}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LatesUserTable;
