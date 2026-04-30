import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

function PrivateRoute(props) {
    const auth = true

    const Auth = useSelector(state => state.Auth)

    console.log("Auth:", Auth);



    return (

        auth ? <Outlet /> : <Navigate to={'/signIn'} />

    );
}

export default PrivateRoute;