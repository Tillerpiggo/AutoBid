import React from 'react';
import Register from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDisplay from './UserDisplay'

const App: React.FC = () => {
    return (
        <div className="App">
            <p>Yup</p>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/user/:email" element={<UserDisplay />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;