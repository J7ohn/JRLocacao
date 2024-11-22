import '../styles/Orcamento.css'

export default () => {
    return (
        /* From Uiverse.io by marc_remus */
        <form className="form">
            <p className="title">Adiante seu orçamento!</p>
            <div className="flex">
                <label>
                    <input required="" placeholder="" type="text" className="input" />
                    <span>Nome</span>
                </label>

                <label>
                    <input required="" placeholder="" type="text" className="input" />
                    <span>Sobrenome</span>
                </label>
            </div>

            <label>
                <input required="" placeholder="" type="email" className="input" />
                <span>Email</span>
            </label>

            <label>
                <input required="" placeholder="" type="password" className="input" />
                <span>Telefone/Whats App</span>
            </label>
            <label>
                <input required="" placeholder="" type="password" className="input" />
                <span>CEP</span>
            </label>
        </form>

    )
}