import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { Iconify } from '@slash-admin/src/components/icon';
import { CircleLoading } from '@slash-admin/src/components/loading';

import { AppRouteObject } from '@slash-admin/types/router';

const Page403 = lazy(() => import('@slash-admin/src/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@slash-admin/src/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@slash-admin/src/pages/sys/error/Page500'));

const errors: AppRouteObject[] = [
    {
        path: 'error',
        order: 6,
        element: (
            <Suspense fallback={<CircleLoading />}>
                <Outlet />
            </Suspense>
        ),
        meta: {
            label: 'sys.menu.error.index',
            icon: <Iconify icon="bxs:error-alt" className="ant-menu-item-icon" size="24" />,
            key: '/error',
        },
        children: [
            {
                path: '403',
                element: <Page403 />,
                meta: {
                    label: 'sys.menu.error.403',
                    key: '/error/403',
                },
            },
            {
                path: '404',
                element: <Page404 />,
                meta: {
                    label: 'sys.menu.error.404',
                    key: '/error/404',
                },
            },
            {
                path: '500',
                element: <Page500 />,
                meta: {
                    label: 'sys.menu.error.500',
                    key: '/error/500',
                },
            },
        ],
    },
];

export default errors;
