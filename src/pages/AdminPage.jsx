import '../styles/AdminPage.css';

import { useState, useEffect } from 'react';
import { getMaquinas, adicionarMaquina, atualizarMaquina, deletarMaquina } from '../database/server';
import { getAgendamentos, adicionarAgendamento, atualizarAgendamento } from '../database/server';
import { getClientes } from '../database/server';

export default () => {
    const [maquinas, setMaquinas] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [novaMaquina, setNovaMaquina] = useState({ nome: '', marca: '', modelo: '', cor: '', toneladas: '' });
    const [novoAgendamento, setNovoAgendamento] = useState({ clienteId: '', maquinaId: '', dataInicio: '', dataFim: '' });
    const [mostrarMaquinas, setMostrarMaquinas] = useState(false);
    const [mostrarAgendamentos, setMostrarAgendamentos] = useState(false);
    const [mostrarClientes, setMostrarClientes] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const maquinasData = await getMaquinas();
            setMaquinas(maquinasData);

            const agendamentosData = await getAgendamentos();
            setAgendamentos(agendamentosData);

            const clientesData = await getClientes();
            setClientes(clientesData);
        };

        fetchData();
    }, []);

    const handleAddMaquina = async () => {
        if (!novaMaquina.marca || !novaMaquina.modelo) {
            alert('Marca e Modelo são obrigatórios!');
            return;
        }

        try {
            const maquina = { nome: novaMaquina.nome, marca: novaMaquina.marca, modelo: novaMaquina.modelo, cor: novaMaquina.cor, toneladas: novaMaquina.toneladas };
            await adicionarMaquina(maquina);
            setNovaMaquina({ nome: '', marca: '', modelo: '', cor: '', toneladas: '' });
            alert('Máquina cadastrada com sucesso!');
            const maquinasData = await getMaquinas();
            setMaquinas(maquinasData);
        } catch (error) {
            console.error('Erro ao adicionar máquina:', error);
        }
    };

    const handleDeleteMaquina = async (id) => {
        try {
            await deletarMaquina(id);
            setMaquinas(maquinas.filter(maquina => maquina.id !== id));
        } catch (error) {
            console.error('Erro ao excluir máquina:', error);
        }
    };

    const handleAddAgendamento = async () => {
        const maquinaIndisponivel = agendamentos.some(agendamento =>
            agendamento.maquinaId === novoAgendamento.maquinaId &&
            ((novoAgendamento.dataInicio >= agendamento.dataInicio && novoAgendamento.dataInicio <= agendamento.dataFim) ||
                (novoAgendamento.dataFim >= agendamento.dataInicio && novoAgendamento.dataFim <= agendamento.dataFim))
        );

        if (maquinaIndisponivel) {
            alert('Esta máquina já está agendada para as datas selecionadas!');
            return;
        }

        try {
            await adicionarAgendamento(novoAgendamento);
            setNovoAgendamento({ clienteId: '', maquinaId: '', dataInicio: '', dataFim: '' });
            alert('Agendamento feito com sucesso!');
            const agendamentosData = await getAgendamentos();
            setAgendamentos(agendamentosData);
        } catch (error) {
            console.error('Erro ao adicionar agendamento:', error);
        }
    };

    return (
        <div className="admin-page">
            <h2>Painel Administrativo</h2>

            <h3>Cadastrar Máquina</h3>
            <input
                type="text"
                value={novaMaquina.nome}
                onChange={(e) => setNovaMaquina({ ...novaMaquina, nome: e.target.value })}
                placeholder="Nome da máquina"
            />
            <input
                type="text"
                value={novaMaquina.marca}
                onChange={(e) => setNovaMaquina({ ...novaMaquina, marca: e.target.value })}
                placeholder="Marca (Obrigatório)"
            />
            <input
                type="text"
                value={novaMaquina.modelo}
                onChange={(e) => setNovaMaquina({ ...novaMaquina, modelo: e.target.value })}
                placeholder="Modelo (Obrigatório)"
            />
            <input
                type="text"
                value={novaMaquina.cor}
                onChange={(e) => setNovaMaquina({ ...novaMaquina, cor: e.target.value })}
                placeholder="Cor"
            />
            <input
                type="number"
                value={novaMaquina.toneladas}
                onChange={(e) => setNovaMaquina({ ...novaMaquina, toneladas: e.target.value })}
                placeholder="Toneladas"
            />
            <button onClick={handleAddMaquina}>Cadastrar</button>

            <button onClick={() => setMostrarMaquinas(!mostrarMaquinas)}>Ver Máquinas Cadastradas</button>
            {mostrarMaquinas && (
                <div>
                    <h3>Máquinas Cadastradas</h3>
                    <ul>
                        {maquinas.map(maquina => (
                            <li key={maquina.id}>
                                {maquina.nome} - {maquina.marca} - {maquina.modelo} - {maquina.cor} - {maquina.toneladas} toneladas
                                <button onClick={() => handleDeleteMaquina(maquina.id)}>Deletar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h3>Agendamento de Máquinas</h3>
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
                    <option key={maquina.id} value={maquina.id}>{maquina.nome}</option>
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

            <button onClick={() => setMostrarAgendamentos(!mostrarAgendamentos)}>Ver Agendamentos</button>
            {mostrarAgendamentos && (
                <div>
                    <h3>Agendamentos</h3>
                    <ul>
                        {agendamentos.map(agendamento => {
                            // Encontre o cliente e a máquina correspondentes ao agendamento
                            const cliente = clientes.find(cliente => cliente.id === agendamento.clienteId);
                            const maquina = maquinas.find(maquina => maquina.id === agendamento.maquinaId);

                            return (
                                <li key={agendamento.id}>
                                    {/* Exibe o nome do cliente e o modelo da máquina */}
                                    Cliente: {cliente ? cliente.nome : 'Cliente Desconhecido'} -
                                    Máquina: {maquina ? maquina.nome : 'Máquina Desconhecida'} -
                                    Data Início: {agendamento.dataInicio} -
                                    Data Fim: {agendamento.dataFim}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}


            <button onClick={() => setMostrarClientes(!mostrarClientes)}>Ver Clientes</button>
            {mostrarClientes && (
                <div>
                    <h3>Clientes</h3>
                    <ul>
                        {clientes.map(cliente => (
                            <li key={cliente.id}>{cliente.nome} - {cliente.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
