import { Navigate } from 'react-router-dom';

import DashboardLayout from '@slash-admin/src/layouts/dashboard';

import { AppRouteObject } from '@slash-admin/types/router';

import AuthGuard from '../components/auth-guard';
import { getMenuModules } from '../utils';

const menuModuleRoutes = getMenuModules();

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * dynamic routes
 */
export const menuRoutes: AppRouteObject = {
    path: '/',
    element: (
        <AuthGuard>
            <DashboardLayout />
        </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...menuModuleRoutes],
};
