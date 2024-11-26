import './styles/App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orcamento from './pages/Orcamento';
import HomePage from './pages/HomePage'

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/orcamento" element={<Orcamento />} />
          </Routes>
      </Router>
  );
}

export default App







