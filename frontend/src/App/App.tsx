import React from 'react';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CongratulationsPage from '../Landing Page/CongratulationsPage';

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import LandingPage from '../Landing Page/LandingPage';
import SidebarWithHeader from '../Components/SidebarWithHeader';
import PrivateRoute from '../Admin/PrivateRoute';
import AdminPage from '../Admin/AdminPage';
import LoginPage from '../Admin/LoginPage';
import UserPage from '../Portal Contacts/UserPage';

const App: React.FC = () => {
    const items = [
        { name: 'Contacts', icon: FiUsers, route: '/user/:userId/contacts' },
        { name: 'Settings', icon: FiSettings, route: '/user/:userId/settings' },
    ];

    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/user/:userId/congrats" element={<CongratulationsPage />} />
                        <Route path="/user/:userId/*" element={<UserPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin/*" element={
                            <PrivateRoute><AdminPage /></PrivateRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

export default App;