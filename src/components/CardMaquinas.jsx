import '../styles/CardMaquinas.css'
import React, { useState, useEffect } from 'react';
import { getMaquinas } from '../database/server'; // Certifique-se de ajustar o caminho da importação

const CardMaquinas = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const fetchMaquinas = async () => {
            const maquinas = await getMaquinas();
            setMachines(maquinas);
        };

        fetchMaquinas();
    }, []);

    return (
        <div className="card-container">
            {machines.map(machine => (
                <div key={machine.id} className="card">
                    <img src={machine.foto} alt={`${machine.marca} ${machine.modelo}`} className="card-image" />
                    <div className="card-details">
                        <p><strong>Cor:</strong> {machine.cor}</p>
                        <p><strong>Placa:</strong> {machine.placa}</p>
                        <p><strong>Marca:</strong> {machine.marca}</p>
                        <p><strong>Modelo:</strong> {machine.modelo}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardMaquinas;
