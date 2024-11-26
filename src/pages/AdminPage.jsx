import '../styles/AdminPage.css';
import { useState, useEffect } from 'react';
import { 
    getMaquinas, adicionarMaquina, deletarMaquina, 
    getAgendamentos, adicionarAgendamento,
    getClientes 
} from '../database/server';

export default () => {
    const [maquinas, setMaquinas] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [novaMaquina, setNovaMaquina] = useState({
        marca: '', modelo: '', cor: '', toneladas: '', foto: null
    });
    const [novoAgendamento, setNovoAgendamento] = useState({
        clienteId: '', maquinaId: '', dataInicio: '', dataFim: ''
    });
    const [expandMaquinas, setExpandMaquinas] = useState(false);
    const [expandAgendamentos, setExpandAgendamentos] = useState(false);
    const [expandClientes, setExpandClientes] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setMaquinas(await getMaquinas());
            setAgendamentos(await getAgendamentos());
            setClientes(await getClientes());
        };

        fetchData();
    }, []);

    const handleAddMaquina = async () => {
        if (!novaMaquina.marca || !novaMaquina.modelo || !novaMaquina.foto) {
            alert('Preencha os campos obrigatórios!');
            return;
        }

        try {
            await adicionarMaquina(novaMaquina);
            setNovaMaquina({ marca: '', modelo: '', cor: '', toneladas: '', foto: null });
            alert('Máquina cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar máquina:', error);
        }
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        setNovaMaquina({ ...novaMaquina, foto: event.dataTransfer.files[0] });
    };

    const handleAddAgendamento = async () => {
        const maquinaIndisponivel = agendamentos.some(agendamento =>
            agendamento.maquinaId === novoAgendamento.maquinaId &&
            (
                (novoAgendamento.dataInicio >= agendamento.dataInicio && novoAgendamento.dataInicio <= agendamento.dataFim) ||
                (novoAgendamento.dataFim >= agendamento.dataInicio && novoAgendamento.dataFim <= agendamento.dataFim)
            )
        );
        if (maquinaIndisponivel) {
            alert('Esta máquina já está agendada para o período selecionado!');
            return;
        }

        try {
            await adicionarAgendamento(novoAgendamento);
            setNovoAgendamento({ clienteId: '', maquinaId: '', dataInicio: '', dataFim: '' });
            alert('Agendamento feito com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar agendamento:', error);
        }
    };

    return (
        <div className="admin-container">
            <h2>Painel Administrativo</h2>

            <div className="section">
                <h3>Cadastrar Máquina</h3>
                <input
                    type="text"
                    placeholder="Marca"
                    value={novaMaquina.marca}
                    onChange={(e) => setNovaMaquina({ ...novaMaquina, marca: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={novaMaquina.modelo}
                    onChange={(e) => setNovaMaquina({ ...novaMaquina, modelo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={novaMaquina.cor}
                    onChange={(e) => setNovaMaquina({ ...novaMaquina, cor: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Toneladas"
                    value={novaMaquina.toneladas}
                    onChange={(e) => setNovaMaquina({ ...novaMaquina, toneladas: e.target.value })}
                />
                <div
                    className="file-drop"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    Arraste a foto da máquina aqui
                </div>
                <button onClick={handleAddMaquina}>Cadastrar Máquina</button>
            </div>

            <div className="expand-section">
                <button onClick={() => setExpandMaquinas(!expandMaquinas)}>
                    {expandMaquinas ? 'Ocultar Máquinas' : 'Ver Máquinas'}
                </button>
                {expandMaquinas && (
                    <ul>
                        {maquinas.map(maquina => (
                            <li key={maquina.id}>
                                {maquina.marca} - {maquina.modelo} ({maquina.cor})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="section">
                <h3>Agendar Aluguel</h3>
                <select
                    value={novoAgendamento.clienteId}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, clienteId: e.target.value })}
                >
                    <option value="">Selecione o cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                    ))}
                </select>
                <select
                    value={novoAgendamento.maquinaId}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, maquinaId: e.target.value })}
                >
                    <option value="">Selecione a máquina</option>
                    {maquinas.map(maquina => (
                        <option key={maquina.id} value={maquina.id}>{maquina.marca} - {maquina.modelo}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={novoAgendamento.dataInicio}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, dataInicio: e.target.value })}
                />
                <input
                    type="date"
                    value={novoAgendamento.dataFim}
                    onChange={(e) => setNovoAgendamento({ ...novoAgendamento, dataFim: e.target.value })}
                />
                <button onClick={handleAddAgendamento}>Agendar</button>
            </div>

            <div className="expand-section">
                <button onClick={() => setExpandAgendamentos(!expandAgendamentos)}>
                    {expandAgendamentos ? 'Ocultar Agendamentos' : 'Ver Agendamentos'}
                </button>
                {expandAgendamentos && (
                    <ul>
                        {agendamentos.map(agendamento => (
                            <li key={agendamento.id}>
                                Cliente: {agendamento.clienteId} - Máquina: {agendamento.maquinaId} - De: {agendamento.dataInicio} Até: {agendamento.dataFim}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="expand-section">
                <button onClick={() => setExpandClientes(!expandClientes)}>
                    {expandClientes ? 'Ocultar Clientes' : 'Ver Clientes'}
                </button>
                {expandClientes && (
                    <ul>
                        {clientes.map(cliente => (
                            <li key={cliente.id}>
                                {cliente.nome} - {cliente.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
