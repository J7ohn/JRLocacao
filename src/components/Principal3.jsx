import '../styles/Principal3.css';
import Botao from './Botao'

export default () => {
    return (
        <section className="block block3">
            <h2>Sobre Nós</h2>
            <p>
                Na JRLocação, nosso compromisso é com a satisfação do cliente, oferecendo soluções de locação de caminhões e tratores de alta qualidade. Nosso objetivo é garantir que você tenha os melhores equipamentos para seus projetos.
            </p>
            <div className="company-info">
                <div className="company">
                    <h3>Serviços de Locação</h3>
                    <p>Oferecemos uma ampla variedade de caminhões e tratores para atender às necessidades específicas de cada setor, incluindo agronegócio, construção civil e mineração.</p>
                    <Botao/>
                </div>
                <div className="company">
                    <h3>Qualidade e Compromisso</h3>
                    <p>Nossa equipe é dedicada e especializada para garantir que você receba o melhor atendimento e suporte técnico durante todo o período de locação.</p>
                    <Botao/>
                </div>
                <div className="company">
                    <h3>Experiência Confiável</h3>
                    <p>Com anos de experiência no mercado, a JRLocação se destaca pela confiabilidade e excelência em serviços de locação de veículos pesados.</p>
                    <Botao/>
                </div>
            </div>
        </section>
    );
} 
