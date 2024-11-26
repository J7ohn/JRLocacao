import React, { useEffect, useState } from 'react';
import '../styles/Principal2.css';
import { getMaquinas } from '../database/server'; // Certifique-se de ajustar o caminho da importação
import Botao from './Botao'

const Principal2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const fetchMaquinas = async () => {
            const maquinas = await getMaquinas();
            setMachines(maquinas);
        };

        fetchMaquinas();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % machines.length);
        }, 3000); // Muda a imagem a cada 3 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, [machines.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % machines.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + machines.length) % machines.length);
    };

    return (
        <section className="block block2">
            <h2>Nossos Veículos</h2>
            <div className="carousel">
                <button className="carousel-button prev" onClick={handlePrev}>‹</button>
                <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {machines.map(machine => (
                        <div key={machine.id} className="carousel-card">
                            <img src={machine.foto} alt={`${machine.marca} ${machine.modelo}`} />
                            <div className="carousel-details">
                                <p><strong>Cor:</strong> {machine.cor}</p>
                                <p><strong>Placa:</strong> {machine.placa}</p>
                                <p><strong>Marca:</strong> {machine.marca}</p>
                                <p><strong>Modelo:</strong> {machine.modelo}</p>
                                <Botao/>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-button next" onClick={handleNext}>›</button>
            </div>
        </section>
    );
};

export default Principal2;
