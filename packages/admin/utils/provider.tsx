'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: React.PropsWithChildren) => {
    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Infinity,
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false,
                },
            },
        }),
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default Providers;
