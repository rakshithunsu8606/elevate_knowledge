import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import AdminRoute from './Routes/AdminRoute';
import UserRoute from './Routes/UserRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { Provider, useDispatch } from 'react-redux';
import { Confstore } from './Redux/Store';
import { SnackbarProvider } from 'notistack';
import Alert from './Componet/Alert/Alert';
import { ThemeProvider } from './Context/ThemeContext';


function App(props) {
  const store = Confstore()

  return (
    <SnackbarProvider>
      <ThemeProvider>
        <Provider store={store}>
          <Alert />
          <Routes>
            <Route path='/*' element={<UserRoute />} />

            <Route element={<PrivateRoute />}>
              <Route path='/admin/*' element={<AdminRoute />} />
            </Route>
          </Routes>

        </Provider>
      </ThemeProvider>
    </SnackbarProvider >
  );
}

export default App;