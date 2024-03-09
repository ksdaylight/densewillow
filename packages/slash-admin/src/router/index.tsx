import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@turnit/admin/src/layouts/dashboard';
import AuthGuard from '@turnit/admin/src/router/components/auth-guard';
import { usePermissionRoutes } from '@turnit/admin/src/router/hooks';
import { ErrorRoutes } from '@turnit/admin/src/router/routes/error-routes';

import { AppRouteObject } from '@turnit/admin/types/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
    path: '/login',
    Component: lazy(() => import('@turnit/admin/src/pages/sys/login/Login')),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
    path: '*',
    element: <Navigate to="/404" replace />,
};

export default function Router() {
    const permissionRoutes = usePermissionRoutes();
    const asyncRoutes: AppRouteObject = {
        path: '/',
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        children: [
            { index: true, element: <Navigate to={HOMEPAGE} replace /> },
            ...permissionRoutes,
        ],
    };

    const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

    const router = createHashRouter(routes as unknown as RouteObject[]);
    return <RouterProvider router={router} />;
}
