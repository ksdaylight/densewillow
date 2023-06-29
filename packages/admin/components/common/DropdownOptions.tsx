'use client';

import { FC, ReactNode, useState } from 'react';

interface Props {
    options: { label: string; onClick(): void }[];
    head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <button
            onBlur={() => setShowOptions(false)}
            onMouseDown={() => setShowOptions(!showOptions)}
            className="relative"
        >
            {head}
            {showOptions && (
                <div className="min-w-max absolute top-full mt-4 right-2 z-10 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
                    <ul className="p-3 space-y-3">
                        {options.map(({ label, onClick }, index) => {
                            return (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li key={label + index.toString()} onMouseDown={onClick}>
                                    {label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </button>
    );
};

export default DropdownOptions;