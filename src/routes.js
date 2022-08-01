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
import PreQualifierIndex from "./components/prequalifiers";
import LeadFilterIndex from "./components/lead-filter";
import LabelIndex from "./components/label";
import MyLeads from "./components/my-leads";
import ClosedLeads from "./components/closed-leads";
import DashboardIndex from "./components/dashboard";
import ForgotPassword from "./components/login/forgot-password";
import UserSettings from "./components/user-settings";
import FollowUpIndex from "./components/pages/follow-up/follow-up-index";
import DemoIndex from "./components/pages/demo/demo-index";
import LeadDetailIndex from "./components/pages/lead/lead-detail-index";
import MissedCallIndex from "./components/pages/missed-calls/missed-call-index";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Not found pages
const NotFound = Loadable(lazy(() => import('./containers/not-found').then((module) => ({ default: module.NotFound }))));

// Auth pages
const Login = Loadable(lazy(() => import('./containers/login').then((module) => ({ default: module.Login }))));


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
        path: 'forgot-password',
        element: (
            <GuestGuard>
                <ForgotPassword />
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
                element: <DashboardIndex />
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
            },
            {
                path: 'lead/:leadId',
                element: <LeadDetailIndex />,
            },
            {
                path: 'pre-qualifiers',
                element: <PreQualifierIndex />,
            },
            {
                path: 'lead-filter',
                element: <LeadFilterIndex />,
            },
            {
                path: 'labels',
                element: <LabelIndex />,
            },
            {
                path: 'mine',
                element: <MyLeads />,
            },
            ,
            {
                path: 'closed',
                element: <ClosedLeads />,
            },
            {
                path: 'follow-up',
                element: <FollowUpIndex />,
            },
            {
                path: 'Demo',
                element: <DemoIndex />,
            },
            {
                path: 'missed-calls',
                element: <MissedCallIndex />,
            },
            {
                path: 'settings',
                element: <UserSettings />,
            },
        ]
    },
  {
    path: '*',
    element: <NotFound />
  }


];

export default routes;
