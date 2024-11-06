import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReservationForm from './components/ReservationForm';
import AdminPage from './components/AdminPage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<ReservationForm />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    </Router>
);

export default App;
