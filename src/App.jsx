import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import UserMenu from './components/UserMenu';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <UserMenu />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={<PrivateRoute><ContactsPage /></PrivateRoute>} />
      </Routes>
    </Provider>
  );
};

export default App;
