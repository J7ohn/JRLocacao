import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento após login

const Login = ({ setIsAdmin }) => { // Recebendo a função setIsAdmin como props
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    // Função para verificar o login do admin
    const handleLogin = (e) => {
        e.preventDefault();

        // Nome e senha do admin (você pode mudar conforme necessário)
        const nomeAdmin = 'João Victor Fonseca Saraiva';
        const senhaAdmin = 'admin123'; // Senha do admin, também pode ser alterada

        // Verifica se o nome e senha correspondem ao admin
        if (nome === nomeAdmin && senha === senhaAdmin) {
            // Se for o admin, atualiza o estado de isAdmin e redireciona para a página administrativa
            setIsAdmin(true);
            navigate('/admin');
        } else {
            // Caso contrário, exibe uma mensagem de erro
            setErro('Nome ou senha incorretos.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login - Admin</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                {erro && <p className="error-message">{erro}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
