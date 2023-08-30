import { FC, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

const PaddingContainer: FC<Props> = ({ children }): JSX.Element => {
    return <div className="w-full px-8 mx-auto max-w-7xl">{children}</div>;
};

export default PaddingContainer;
