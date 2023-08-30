import React, { FC, MouseEventHandler, ReactNode, useCallback } from 'react';
import classnames from 'classnames';

interface Props {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onMouseDown?: MouseEventHandler<HTMLButtonElement>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({ children, active, disabled, onMouseDown, onClick }): JSX.Element => {
    const getActiveStyle = useCallback((): string => {
        if (active) return 'dark:bg-primary dark:text-primary-dark bg-primary-dark text-primary';
        return 'text-secondary-light bg-secondary-dark';
    }, [active]);

    const commonClasses = 'p-2 rounded text-lg hover:scale-110 hover:shadow-md transition';

    return (
        <button
            type="button"
            onMouseDown={onMouseDown}
            onClick={onClick}
            className={classnames(commonClasses, getActiveStyle())}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
