import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Integration } from './pages/index'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Integration" element={<Integration />} />
        </Routes>
    );
}

export default App;
