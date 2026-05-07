// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router';
// import { CheakAuthUser } from '../Redux/Slice/auth';

// function PrivateRoute(props) {
//     // console.log(auth);

//     // const auth = true



//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(CheakAuthUser())

//     }, [])

//     const Auth = useSelector(state => state.Auth)

//     console.log("Authhhh:", Auth);

//     const aauth = Auth?.user

//     const Instructure = Auth?.user?.role

//     console.log(Instructure);

//     if (aauth) {
//         if (Instructure === "Instructure") {
//             return <Outlet />
//         } else if (Instructure === "user") {
//             return <Navigate to={'/'} />
//         }
//     } else {
//         return <Navigate to={'/Auth'} /> 
//     }

//     // if (Instructure === "Instructure") {
//     //     return <Outlet />
//     // } else if (Instructure === "user") {
//     //     return <Navigate to={'/'} />
//     // }



//     // return (

//     //     Instructure === "Instructure" ? <Outlet /> : <Navigate to={'/auth'} />

//     // );
// }

// export default PrivateRoute;

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