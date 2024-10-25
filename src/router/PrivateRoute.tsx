import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {

    const isLogged = useAuthStore((store) => store.isLogged);

    return (isLogged)
        ? children
        : <Navigate to={"/ingresar"}/>
}
