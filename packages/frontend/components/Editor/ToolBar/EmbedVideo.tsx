import { FC, useState } from 'react';
import { BsYoutube } from 'react-icons/bs';

import Button from './Button';

interface Props {
    onSubmit(link: string): void;
}

const EmbedVideo: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [url, setUrl] = useState('');
    const [visible, setVisible] = useState(false);

    const handleSubmit = () => {
        if (!url.trim()) return hideForm();

        onSubmit(url);
        setUrl('');
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
                <BsYoutube />
            </Button>

            {visible && (
                <div className="absolute top-full mt-4 right-0 z-50">
                    <div className="flex space-x-2">
                        <input
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            type="text"
                            className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-white transition p-2 text-primary-dark dark:text-white"
                            placeholder="https://example.com"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-action p-2 text-white rounded text-sm"
                        >
                            Embed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmbedVideo;
