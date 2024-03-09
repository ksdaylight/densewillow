import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@turnit/admin/src/components/loading';
import SimpleLayout from '@turnit/admin/src/layouts/simple';

import { AppRouteObject } from '@turnit/admin/types/router';

import AuthGuard from '../components/auth-guard';

const Page403 = lazy(() => import('@turnit/admin/src/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@turnit/admin/src/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@turnit/admin/src/pages/sys/error/Page500'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: AppRouteObject = {
    element: (
        <AuthGuard>
            <SimpleLayout>
                <Suspense fallback={<CircleLoading />}>
                    <Outlet />
                </Suspense>
            </SimpleLayout>
        </AuthGuard>
    ),
    children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
        { path: '500', element: <Page500 /> },
    ],
};
