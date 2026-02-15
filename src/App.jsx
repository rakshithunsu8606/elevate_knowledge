import React from 'react';
import { Route, Routes } from 'react-router';
import AdminRoute from './Routes/AdminRoute';
import UserRoute from './Routes/UserRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { Provider } from 'react-redux';
import { Confstore } from './Redux/Store';

function App(props) {
  const store=Confstore()
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoute />} />

        <Route element={<PrivateRoute />}>
          <Route path='/admin/*' element={<AdminRoute />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;