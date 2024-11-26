import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebase'; // Importa o auth do arquivo firebase.js

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);

    const handleAuth = async () => {
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Usuário cadastrado com sucesso!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login realizado com sucesso!');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>{isRegister ? 'Cadastro' : 'Login'}</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
            />
            <button onClick={handleAuth}>
                {isRegister ? 'Cadastrar' : 'Entrar'}
            </button>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Já tem uma conta? Entre' : 'Não tem uma conta? Cadastre-se'}
            </button>
        </div>
    );
};

export default AuthComponent;
