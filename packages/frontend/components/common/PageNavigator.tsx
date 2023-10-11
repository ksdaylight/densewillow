import { FC, MouseEventHandler } from 'react';

interface Props {
    onPrevClick?(): void;
    onNextClick?(): void;
}

const PageNavigator: FC<Props> = ({ onNextClick, onPrevClick }): JSX.Element => {
    return (
        <div className="flex items-center space-x-3">
            <Button onClick={onPrevClick} title="Prev" />
            <Button onClick={onNextClick} title="Next" />
        </div>
    );
};

const Button: FC<{ title: string; onClick?: MouseEventHandler }> = ({ title, onClick }) => {
    return (
        <button
            className="text-primary-dark dark:text-white hover:underline transition"
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default PageNavigator;
