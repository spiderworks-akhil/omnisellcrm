import { Suspense, lazy } from 'react';
import {GuestGuard} from "./guards/GuestGuard";
import { LoadingScreen } from './components/loading-screen';
import {Home} from "./pages/home";
import {MainLayout} from "./pages/main-layout";
import AuthGuard from "./guards/AuthGuard";
import {DashboardNavbar} from "./components/dashboard-navbar";
import { DashboardLayout } from './containers/dashboard-layout';
import {Navigate} from "react-router-dom";
import {Reports} from "./containers/reports";

import {ProductsSummary} from "./components/product/products-summary";
import LeadIndex from "./components/leads/lead-index";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Not found pages
const NotFound = Loadable(lazy(() => import('./containers/not-found').then((module) => ({ default: module.NotFound }))));

// Auth pages
const Login = Loadable(lazy(() => import('./containers/login').then((module) => ({ default: module.Login }))));

// Dashboard pages
const ReportsOverview = Loadable(lazy(() => import('./containers/reports-overview').then((module) => ({ default: module.ReportsOverview }))));
const ReportsSales = Loadable(lazy(() => import('./containers/reports-sales').then((module) => ({ default: module.ReportsSales }))));

const Products = Loadable(lazy(() => import('./containers/products').then((module) => ({ default: module.Products }))));



const routes = [
  {
    path: '',
    element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
    )
  },
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: '',
                element: (
                    <Navigate
                        to="/dashboard/reports"
                        replace
                    />
                )
            },
            {
                path: 'reports',
                element: <Reports />,
                children: [
                    {
                        path: '',
                        element: <ReportsOverview />
                    },
                    {
                        path: 'sales',
                        element: <ReportsSales />
                    }
                ]
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        element: <Products />
                    },
                ]
            },
            {
                path: 'leads',
                element: <LeadIndex />,
                children: [
                    {
                        path: 'details',
                        element: <LeadIndex />
                    },
                ]
            },
        ]
    },
  {
    path: '*',
    element: <NotFound />
  }


];

export default routes;
