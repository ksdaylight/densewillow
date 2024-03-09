import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Iconify } from '@turnit/admin/src/components/icon';
import { CircleLoading } from '@turnit/admin/src/components/loading';

import { AppRouteObject } from '@turnit/admin/types/router';

const ClipboardPage = lazy(() => import('@turnit/admin/src/pages/functions/clipboard'));

const functions: AppRouteObject = {
    order: 4,
    path: 'functions',
    element: (
        <Suspense fallback={<CircleLoading />}>
            <Outlet />
        </Suspense>
    ),
    meta: {
        label: 'sys.menu.functions',
        icon: (
            <Iconify icon="solar:plain-2-bold-duotone" className="ant-menu-item-icon" size="24" />
        ),
        key: '/functions',
    },
    children: [
        {
            index: true,
            element: <Navigate to="clipboard" replace />,
        },
        {
            path: 'clipboard',
            element: <ClipboardPage />,
            meta: { label: 'sys.menu.clipboard', key: '/functions/clipboard' },
        },
    ],
};

export default functions;
