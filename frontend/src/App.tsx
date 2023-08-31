import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CongratulationsPage from './CongratulationsPage';
import SidebarWithHeader from './SidebarWithHeader';

import LandingPage from './LandingPage';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/user/:userId/congrats" element={<CongratulationsPage />} />
                        <Route path="/user/:userId/*" element={<SidebarWithHeader />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ChakraProvider>
  );
}

export default App;