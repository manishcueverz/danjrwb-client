import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ProtectRoute } from '../middleware/auth'
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import OrdersList from "../pages/OrdersList";
import OrderDetails from "../pages/OrderDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Admin from "../pages/Admin";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, errorHandler } from "../middleware/errorHandle";

const MainRoute = () => {

    const ErrorBoundaryLayout = () => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
            <Outlet />
        </ErrorBoundary>
    );

    /** root routes */
    const router = createBrowserRouter([
        {
            element: <ErrorBoundaryLayout />,
            children: [
                {
                    path: '/',
                    element: <ProtectRoute><Home /></ProtectRoute>
                },
                {
                    path: '/cart',
                    element: <ProtectRoute><Cart /></ProtectRoute>
                },
                {
                    path: '/profile',
                    element: <ProtectRoute><Profile /></ProtectRoute>
                },
                {
                    path: '/profile/address',
                    element: <ProtectRoute><Address /></ProtectRoute>
                },
                {
                    path: '/profile/orders',
                    element: <ProtectRoute><OrdersList /></ProtectRoute>
                },
                {
                    path: '/profile/orders/:id',
                    element: <ProtectRoute><OrderDetails /></ProtectRoute>
                },
                {
                    path: '/admin',
                    element: <ProtectRoute><Admin /></ProtectRoute>
                },
                {
                    path: '/signin',
                    element: <SignIn />
                },
                {
                    path: '/signup',
                    element: <SignUp />
                },
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );
};

export default MainRoute;
