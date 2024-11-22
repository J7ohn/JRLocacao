import '../styles/CadastroMaquina.css'

import React, { useState } from 'react';
import { adicionarMaquina } from '../database/server'; // Certifique-se de ajustar o caminho da importação

const CadastroMaquina = () => {
    const [foto, setFoto] = useState('');
    const [cor, setCor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaMaquina = { foto, cor, marca, modelo, placa };
        try {
            await adicionarMaquina(novaMaquina);
            // Limpar o formulário após o envio
            setFoto('');
            setCor('');
            setMarca('');
            setModelo('');
            setPlaca('');
            alert('Máquina cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar a máquina: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-cadastro-maquina">
            <div
                className="drop-zone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <label htmlFor="foto">Foto:</label>
                <input type="file" id="foto" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                {foto && <img src={foto} alt="Preview" className="preview" />}
            </div>
            <div>
                <label htmlFor="cor">Cor:</label>
                <input type="text" id="cor" value={cor} onChange={(e) => setCor(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="marca">Marca:</label>
                <input type="text" id="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="modelo">Modelo:</label>
                <input type="text" id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="placa">Placa:</label>
                <input type="text" id="placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
            </div>
            <button type="submit">Cadastrar Máquina</button>
        </form>
    );
};

export default CadastroMaquina;

