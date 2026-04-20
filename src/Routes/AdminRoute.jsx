import React, { useContext } from 'react';
// import Layout from '../admin/Componet/layout/layout';
import { Route, Routes } from 'react-router';
import Section from '../admin/container/Section/Section';
import Course from '../admin/container/Course/Course';
import Category from '../admin/container/Category/Category';
import DeshBoard from '../admin/container/DeshBoard/DeshBoard';
import Layout from '../admin/Componet/Layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeContext } from '../Context/ThemeContext';
import Quiz from '../admin/container/Quiz/Quiz';
import QuizContent from '../admin/container/Quiz/QuizContent';

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
                    <Route path='/Section' element={<Section />} />
                    <Route path='/Section/:id' element={<Section />} />
                    <Route path='/Course' element={<Course />} />
                    <Route path='/Quiz' element={<Quiz/>}/>
                    <Route path='/QuizContent/:id' element={<QuizContent/>}/>
                </Routes>
            </Layout>
        </ThemeProvider>

    );
}

export default AdminRoute;