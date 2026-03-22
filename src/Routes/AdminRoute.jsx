import React, { useContext } from 'react';
// import Layout from '../admin/Componet/layout/layout';
import { Route, Routes } from 'react-router';
import Sub_Category from '../admin/container/Sub Category/Sub_Category';
import Course from '../admin/container/Course/Course';
import Category from '../admin/container/Category/Category';
import DeshBoard from '../admin/container/DeshBoard/DeshBoard';
import Layout from '../admin/Componet/Layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeContext } from '../Context/ThemeContext';

function AdminRoute(props) {
    const ThemeMy = useContext(ThemeContext)

    console.log(ThemeMy);


    const theme = createTheme({
        palette: {
            mode: ThemeMy.theme,
            primary: {
                main: '#066AC9',
            },
            secondary: {
                main: '#F7C32E',
            },
        }
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