import classnames from 'classnames';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';

interface Props {
    initialValue?: string;
    onChange(file: File): void;
}

const commonClass =
    'border border-dashed border-secondary-gray flex items-center justify-center rounded cursor-pointer aspect-video text-secondary-gray dark:text-secondary-light';

const ThumbnailSelector: FC<Props> = ({ initialValue, onChange }): JSX.Element => {
    const [selectedThumbnail, setSelectedThumbnail] = useState('');
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { files } = target;
        if (!files) return;

        const file = files[0];
        setSelectedThumbnail(URL.createObjectURL(file));
        onChange(file);
    };

    useEffect(() => {
        if (typeof initialValue === 'string') setSelectedThumbnail(initialValue);
    }, [initialValue]);

    return (
        <div className="w-32">
            <input
                type="file"
                hidden
                accept="image/jpg, image/png, image/jpeg"
                id="thumbnail"
                onChange={handleChange}
            />
            <label htmlFor="thumbnail">
                {selectedThumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={selectedThumbnail}
                        alt=""
                        className={classnames(commonClass, 'object-cover')}
                    />
                ) : (
                    <PosterUI label="Thumbnail" />
                )}
            </label>
        </div>
    );
};

const PosterUI: FC<{ label: string; className?: string }> = ({ label, className }) => {
    return (
        <div className={classnames(commonClass, className)}>
            <span>{label}</span>
        </div>
    );
};

export default ThumbnailSelector;
