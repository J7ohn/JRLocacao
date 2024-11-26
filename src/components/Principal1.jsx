import '../styles/Principal1.css'

import Botao from './Botao'

export default () => {
    return (
        <section className="container">
            <div className="text-container">
                <h1>Alugue Tratores e Caminhões na JRLocação</h1>
                <p className="description">
                    Na JRLocação, garantimos qualidade, preço justo e suporte !.
                </p>
                <Botao/>
            </div>
        </section>
    );
}

