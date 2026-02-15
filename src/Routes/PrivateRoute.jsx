import React from 'react';
import { Navigate, Outlet } from 'react-router';

function PrivateRoute(props) {
    const auth = true
    return (
        
            auth ? <Outlet /> :<Navigate to={'/Sign_in'} />
        
    );
}

export default PrivateRoute;