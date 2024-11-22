import '../styles/HomePage.css'; // Certifique-se de ter um arquivo CSS para estilização
import CardMaquinas from '../components/layout/CardMaquinas'

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="hero-section">
                <h1 className="fade-in">Bem-vindo à Nossa Locadora de Máquinas Pesadas</h1>
                <p className="slide-in">Venda e locação de caminhões e tratores de alta qualidade.</p>
            </header>
            <CardMaquinas/>
        </div>
        
    );
};

export default HomePage;
