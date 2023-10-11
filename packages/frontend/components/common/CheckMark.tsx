import { FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';

interface Props {
    visible: boolean;
}

const CheckMark: FC<Props> = ({ visible }): JSX.Element | null => {
    if (!visible) return null;

    return (
        <div className="bg-action p-2 text-white rounded-full bg-opacity-70 backdrop-blur-sm">
            <BsCheckLg />
        </div>
    );
};

export default CheckMark;
