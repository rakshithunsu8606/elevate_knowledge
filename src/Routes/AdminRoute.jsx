import React from 'react';
// import Layout from '../admin/Componet/layout/layout';
import { Route, Routes } from 'react-router';
import Sub_Category from '../admin/container/Sub Category/Sub_Category';
import Course from '../admin/container/Course/Course';
import Category from '../admin/container/Category/Category';
import DeshBoard from '../admin/container/DeshBoard/DeshBoard';
import Layout from '../admin/Componet/Layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

function AdminRoute(props) {

    const theme = createTheme({
        // palette: {
        //     primary: {
        //         main: '#228B22',
        //     },
        //     secondary: {
        //         main: '#f50057',
        //     },
        // },
        // typography: {
        //     fontFamily: 'Arial',
        //     fontSize: 16,
        //     fontWeight: 'bold',
        // },
    });

    return (
        <ThemeProvider theme={theme}>
        <Layout>
            <Routes>
                <Route path='/Dashboard' element={<DeshBoard />} />
                <Route path='/Category' element={<Category />} />
                <Route path='/Sub_Category' element={<Sub_Category />} />
                <Route path='/Course' element={<Course />} />
            </Routes>
        </Layout>
        </ThemeProvider>

    );
}

export default AdminRoute;