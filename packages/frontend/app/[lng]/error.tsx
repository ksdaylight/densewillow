'use client';

import Link from 'next/link';
import { FC } from 'react';

interface Props {
    error: Error;
    reset: () => void;
}

const errorPage: FC<Props> = ({ error, reset }) => {
    return (
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">There was a problem</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900dark:text-zinc-50 sm:text-5xl">
                    {error.message || 'Something went wrong'}
                </h1>
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    Please try again later or contact support if the problem persists.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={reset}
                        className="btn-custom-base bg-[#E9EFFF] dark:bg-[#262f48] text-primary mr-[24px] mb-[16px] md:mb-0 w-full md:w-auto text-center"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="btn-custom-base bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-primary  w-full md:w-auto text-center"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    );
};
export default errorPage;
