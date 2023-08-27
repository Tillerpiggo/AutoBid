import React from 'react';
import Register from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDisplay from './UserDisplay';
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
                        <Route path="/user/:userId" element={<UserDisplay />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ChakraProvider>
  );
}

export default App;