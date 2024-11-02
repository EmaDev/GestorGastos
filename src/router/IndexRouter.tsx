import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../auth/pages/Login';
import { AppRoutes } from '../app/routes/AppRoutes';
import { Signin } from '../auth/pages/Signin';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


const router = createHashRouter([
    {
        path: "/ingresar",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: "/registro",
        element: (
            <PublicRoute>
                <Signin />
            </PublicRoute>
        ),
    },
    {
        path: "/*",
        element: (
            <PrivateRoute>
                <AppRoutes />
            </PrivateRoute>
        ),
    },
]);

export const IndexRouter = () => {
    return <RouterProvider router={router} />;
}
