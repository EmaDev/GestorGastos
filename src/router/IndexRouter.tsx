import { Route, Routes } from 'react-router-dom';
import { Login } from '../auth/pages/Login';
import { AppRoutes } from '../app/routes/AppRoutes';
import { Signin } from '../auth/pages/Signin';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const IndexRouter = () => {
    return (
        <>
            <Routes>
                <Route
                    path='/ingresar'
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/registro'
                    element={
                        <PublicRoute>
                            <Signin />
                        </PublicRoute>
                    }
                />
                <Route path="/*"
                    element={
                        <PrivateRoute>
                            <AppRoutes />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}
