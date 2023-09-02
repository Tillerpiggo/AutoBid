import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CongratulationsPage from '../Landing Page/CongratulationsPage';

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import LandingPage from '../Landing Page/LandingPage';
import SidebarWithHeader from '../Portal Settings/SidebarWithHeader';
import PrivateRoute from '../Admin/PrivateRoute';
import AdminPage from '../Admin/AdminPage';
import LoginPage from '../Admin/LoginPage';


const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/user/:userId/congrats" element={<CongratulationsPage />} />
                        <Route path="/user/:userId/*" element={<SidebarWithHeader />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={
                            <PrivateRoute><AdminPage /></PrivateRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

export default App;