import { FC, MouseEventHandler } from 'react';
import { BiLoader } from 'react-icons/bi';

interface Props {
    title: string;
    busy?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton: FC<Props> = ({ disabled, busy = false, title, onClick }): JSX.Element => {
    return (
        <button
            className="text-highlight-dark bg-action px-6 py-2 font-semibold hover:scale-[0.97] duration-100 rounded w-full flex items-center justify-center space-x-2 transition"
            onClick={onClick}
            disabled={disabled}
        >
            <span className="text-white">{title}</span>
            {busy && <BiLoader className="animate-spin" size={20} />}
        </button>
    );
};

export default ActionButton;
