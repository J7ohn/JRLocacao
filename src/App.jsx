import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login'; // Importando a página de login
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Orcamento from './pages/Orcamento';

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Armazenando se o admin está autenticado

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orcamento" element={<Orcamento />} />
        {/* Rota do login */}
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        {/* Rota protegida para admin */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
