'use client';

import React, { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import NProgress from 'nprogress';

const Providers = ({ children }: React.PropsWithChildren) => {
    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5000,
                },
            },
        }),
    );
    useEffect(() => {
        // This is fix for it https://github.com/apal21/nextjs-progressbar/issues/77
        // When we start to change the route we start the progress bar and when the route change is done we stop it
        NProgress.done();
    }, []);
    return (
        <QueryClientProvider client={client}>
            {children}
            <ProgressBar
                height="4px"
                color="#4079dc"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default Providers;
