import { FC } from 'react';

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
    return (
        <input
            placeholder="search..."
            type="text"
            className="border-2 bg-transparent border-secondary-gray p-2 text-primary-dark dark:text-white rounded focus:border-primary-dark dark:focus:border-white outline-none transition"
        />
    );
};

export default SearchBar;
