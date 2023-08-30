import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';

import Button from '../ToolBar/Button';

import LinkForm, { LinkOption } from './LinkForm';

interface Props {
    onSubmit(link: LinkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (link: LinkOption) => {
        if (!link.url.trim()) return hideForm();

        onSubmit(link);
        hideForm();
        return undefined;
    };

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

    return (
        <div
            onKeyDown={({ key }) => {
                if (key === 'Escape') hideForm();
            }}
            className="relative"
        >
            <Button onClick={visible ? hideForm : showForm}>
                <BsLink45Deg />
            </Button>

            <div className="absolute top-full mt-4 right-0 z-50 w-60">
                <LinkForm visible={visible} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default InsertLink;
