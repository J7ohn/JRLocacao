import '../styles/Painel.css'

import React, { useEffect, useState } from 'react';
import { getClientes, getMaquinas, getAgendamentos } from '../database/server';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientesData = await getClientes();
      const maquinasData = await getMaquinas();
      const agendamentosData = await getAgendamentos();
      setClientes(clientesData);
      setMaquinas(maquinasData);
      setAgendamentos(agendamentosData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>

      <h1>Máquinas</h1>
      <ul>
        {maquinas.map(maquina => (
          <li key={maquina.id}>{maquina.modelo}</li>
        ))}
      </ul>

      <h1>Agendamentos</h1>
      <ul>
        {agendamentos.map(agendamento => (
          <li key={agendamento.id}>{agendamento.data} - {agendamento.clienteId} - {agendamento.maquinaId}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
