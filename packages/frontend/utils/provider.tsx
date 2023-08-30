'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

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

    return (
        <QueryClientProvider client={client}>
            {children}
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default Providers;
