import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { CheakAuthUser } from '../Redux/Slice/auth';

function PrivateRoute() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CheakAuthUser());
    }, []);

    const Auth = useSelector(state => state.Auth);

    console.log(Auth);

    const data = localStorage.getItem("user");

    const storeuser = data ? JSON.parse(data) : null;

    console.log(storeuser);

    const users = Auth.user || storeuser;

    console.log(users);
    


    if (users) {
        if (users.role === "Instructor") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    } else {
        return <Navigate to="/Auth/user" />;
    }
}

export default PrivateRoute;