import { FC, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    className?: string;
}

const PaddingContainer: FC<Props> = ({ children, className }): JSX.Element => {
    return <div className={`w-full px-8 mx-auto max-w-7xl ${className}`}>{children}</div>;
};

export default PaddingContainer;
