import { Outlet, Navigate } from "react-router-dom"
import useCheckAuth from "../../hooks/useCheckAuth";

export default function PrivateRoute() {

    const { userAuth, loading } = useCheckAuth()

    if (loading) {
        return (
            <>
            </>
        )
    }


    if (userAuth) {
        return (
            <Outlet />
        )
    }

    return (
        <Navigate to={"/login"} />
    )

}