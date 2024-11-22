import '../../styles/BarraNavegacao.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../../pages/HomePage'
import AboutPage from '../../pages/AboutPage'
import Orcamento from '../../pages/Orcamento'
import CadastroMaquina from '../../pages/CadastroMaquina'

export default () => {
    return (
        <Router>
            <nav className="nav">
                <div className="logo-container">
                    <h1 className="logo-title">JRLocações</h1>
                    <div className="vertical-line"></div>
                    <p className="logo-subtitle">Locadora de máquinas pesadas</p>
                </div>
                <input type="checkbox" id="menu-toggle" className="menu-toggle" />
                <label htmlFor="menu-toggle" className="menu-icon">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </label>
                <div className="nav-links">
                    <Link to="/">Principal</Link>
                    <Link to="/onde-estamos">Onde estamos</Link>
                    <Link to="/sobre">Sobre</Link>
                    <Link to="/cadastro-de-maquina">Cadastro de máquinas</Link>
                    <Link to="/solicitar-orcamento">Solicitar Orçamento</Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/onde-estamos" element={<div></div>} />
                <Route path="/sobre" element={<AboutPage/>} />
                <Route path="/cadastro-de-maquina" element={<CadastroMaquina/>} />
                <Route path="/solicitar-orcamento" element={<Orcamento/>} />
            </Routes>
        </Router>
    );
};