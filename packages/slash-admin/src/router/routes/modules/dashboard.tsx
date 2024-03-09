import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@turnit/admin/src/components/icon';
import { CircleLoading } from '@turnit/admin/src/components/loading';

import { AppRouteObject } from '@turnit/admin/types/router';

const HomePage = lazy(() => import(`@turnit/admin/src/pages/dashboard/workbench`));
const Analysis = lazy(() => import('@turnit/admin/src/pages/dashboard/analysis'));

const dashboard: AppRouteObject = {
    order: 1,
    path: 'dashboard',
    element: (
        <Suspense fallback={<CircleLoading />}>
            <Outlet />
        </Suspense>
    ),
    meta: {
        label: 'sys.menu.dashboard',
        icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
        key: '/dashboard',
    },
    children: [
        {
            index: true,
            element: <Navigate to="workbench" replace />,
        },
        {
            path: 'workbench',
            element: <HomePage />,
            meta: { label: 'sys.menu.workbench', key: '/dashboard/workbench' },
        },
        {
            path: 'analysis',
            element: <Analysis />,
            meta: { label: 'sys.menu.analysis', key: '/dashboard/analysis' },
        },
    ],
};

export default dashboard;
