import React from 'react';
import Register from './Register';
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Register/>} />
                <Route path="/" element={<h1>User's Name!!</h1>} />
            </Routes>
        </div>
  );
}

export default App;