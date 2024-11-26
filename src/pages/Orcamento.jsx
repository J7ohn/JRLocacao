import { useState } from 'react';
import { adicionarCliente } from '../database/server'; // Importando a função para adicionar cliente no Firestore
import '../styles/Orcamento.css';

const Orcamento = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');

    const handleWhatsAppClick = async () => {
        // Verificando se os campos obrigatórios estão preenchidos
        if (!nome || !sobrenome || !telefone) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Sobrenome e Telefone.');
            return; // Não prossegue se algum dos campos obrigatórios estiver vazio
        }

        // Montando a mensagem com quebras de linha
        const message = `Nome: ${nome}\nSobrenome: ${sobrenome}\nEmail: ${email}\nTelefone/WhatsApp: ${telefone}\nCEP: ${cep}`;

        // Codificando a mensagem para que ela seja corretamente lida na URL
        const encodedMessage = encodeURIComponent(message);

        // Definindo o número do WhatsApp
        const phoneNumber = '5538998732041';

        // Construindo a URL do WhatsApp com a mensagem codificada
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Definindo o tipo de cliente
        const tipoCliente = nome === 'João Victor Fonseca Saraiva' ? 'adm' : 'comum';

        // Preparando os dados do cliente para salvar no Firestore
        const novoCliente = {
            nome,
            sobrenome,
            email,
            telefone,
            cep,
            tipo: tipoCliente // Campo adicional para o tipo de cliente
        };

        try {
            // Adicionando o cliente no Firestore
            await adicionarCliente(novoCliente);
            // Abrindo o WhatsApp com a mensagem predefinida
            window.open(url, '_blank');
        } catch (error) {
            console.error('Erro ao salvar cliente no Firestore:', error);
        }
    };

    return (
        <form className="form">
            <p className="title">Adiante seu orçamento!</p>
            <div className="flex">
                <label>
                    <input
                        required
                        type="text"
                        className="input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <span>Nome*</span>
                </label>

                <label>
                    <input
                        required
                        type="text"
                        className="input"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                    />
                    <span>Sobrenome*</span>
                </label>
            </div>

            <label>
                <input
                    required
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
            </label>

            <label>
                <input
                    required
                    type="text"
                    className="input"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <span>Telefone/WhatsApp*</span>
            </label>

            <label>
                <input
                    required
                    type="text"
                    className="input"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />
                <span>CEP</span>
            </label>

            <button type="button" onClick={handleWhatsAppClick} className="whatsapp-button">
                Enviar para o WhatsApp
            </button>
        </form>
    );
};

export default Orcamento;
