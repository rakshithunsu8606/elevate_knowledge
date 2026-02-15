import React from 'react';
import Layout from '../admin/Componet/layout/layout';
import { Route, Routes } from 'react-router';
import Sub_Category from '../admin/container/Sub Category/Sub_Category';
import Course from '../admin/container/Course/Course';
import Category from '../admin/container/Category/Category';
import  DeshBoard from '../admin/container/DeshBoard/DeshBoard';

function AdminRoute(props) {
    return (
        <Layout>
            <Routes>
                <Route path='/Dashboard' element={<DeshBoard />} />
                <Route path='/Category' element={<Category />} />
                <Route path='/Sub_Category' element={<Sub_Category />} />
                <Route path='/Course' element={<Course />} />

            </Routes>
        </Layout>
    );
}

export default AdminRoute;