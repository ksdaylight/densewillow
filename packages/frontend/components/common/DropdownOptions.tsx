'use client';

import { FC, ReactNode, useState } from 'react';

export type DropDownOptions = { label: string; onClick(): void }[];

interface Props {
    options: DropDownOptions;
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
                <div className="min-w-max absolute top-full mt-4 right-2 z-40 border-2 border-primary-dark dark:border-white rounded text-left bg-white dark:bg-primary-dark">
                    <ul className="p-3 space-y-3">
                        {options.map(({ label, onClick }, index) => {
                            return (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li
                                    className="text-primary-dark dark:text-white"
                                    key={label + index.toString()}
                                    onMouseDown={onClick}
                                >
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
