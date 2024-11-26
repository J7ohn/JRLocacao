import React, { useState } from 'react';
import Botao from './Botao';

import '../styles/Principal2.css';
import caminhao from '../assets/caminhaoCacamba.jpg'
import trator1 from '../assets/trator-block1.jpg'
import trator2 from '../assets/trator1.jpg'
import trator3 from '../assets/trator2Amarelo.jpg'
import trator4 from '../assets/tratoramarelo.jpg'



const Principal2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const staticMachines = [
        { id: 1, foto: caminhao, cor: 'Vermelho', placa: 'ABC-1234', marca: 'Marca A', modelo: 'Modelo A' },
        { id: 2, foto: trator1, cor: 'Azul', placa: 'DEF-5678', marca: 'Marca B', modelo: 'Modelo B' },
        { id: 3, foto: trator2, cor: 'Verde', placa: 'GHI-9012', marca: 'Marca C', modelo: 'Modelo C' },
        { id: 4, foto: trator3, cor: 'Amarelo', placa: 'JKL-3456', marca: 'Marca D', modelo: 'Modelo D' },
        { id: 5, foto: trator4, cor: 'Branco', placa: 'MNO-7890', marca: 'Marca E', modelo: 'Modelo E' },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % staticMachines.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + staticMachines.length) % staticMachines.length);
    };

    return (
        <section className="block block2">
            <h2>Nossos Veículos</h2>
            <div className="carousel">
                <button className="carousel-button prev" onClick={handlePrev}>‹</button>
                <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {staticMachines.map(machine => (
                        <div key={machine.id} className="carousel-card">
                            <img src={machine.foto} alt={`${machine.marca} ${machine.modelo}`} />
                            <div className="carousel-details">
                                <p><strong>Cor:</strong> {machine.cor}</p>
                                <p><strong>Placa:</strong> {machine.placa}</p>
                                <p><strong>Marca:</strong> {machine.marca}</p>
                                <p><strong>Modelo:</strong> {machine.modelo}</p>
                                <Botao />
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
