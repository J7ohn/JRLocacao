// firebaseOperations.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "./firebase";

// Função para obter todas as máquinas
export const getMaquinas = async () => {
    const querySnapshot = await getDocs(collection(db, "maquinas"));
    const maquinasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return maquinasList;
};

// Função para adicionar uma nova máquina
export const adicionarMaquina = async (novaMaquina) => {
    await addDoc(collection(db, "maquinas"), novaMaquina);
};

// Função para atualizar uma máquina existente
export const atualizarMaquina = async (id, maquinaAtualizada) => {
    const maquinaRef = doc(db, "maquinas", id);
    await updateDoc(maquinaRef, maquinaAtualizada);
};

// Função para deletar uma máquina
export const deletarMaquina = async (id) => {
    await deleteDoc(doc(db, "maquinas", id));
};


// Função para obter todos os clientes
export const getClientes = async () => {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    const clientesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return clientesList;
};

// Função para adicionar um novo cliente
export const adicionarCliente = async (novoCliente) => {
    await addDoc(collection(db, "clientes"), novoCliente);
};

// Função para atualizar um cliente existente
export const atualizarCliente = async (id, clienteAtualizado) => {
    const clienteRef = doc(db, "clientes", id);
    await updateDoc(clienteRef, clienteAtualizado);
};

// Função para deletar um cliente
export const deletarCliente = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
};

// Função para obter todos os agendamentos
export const getAgendamentos = async () => {
    const querySnapshot = await getDocs(collection(db, "agendamentos"));
    const agendamentosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return agendamentosList;
};

// Função para adicionar um novo agendamento
export const adicionarAgendamento = async (novoAgendamento) => {
    await addDoc(collection(db, "agendamentos"), novoAgendamento);
};

// Função para atualizar um agendamento existente
export const atualizarAgendamento = async (id, agendamentoAtualizado) => {
    const agendamentoRef = doc(db, "agendamentos", id);
    await updateDoc(agendamentoRef, agendamentoAtualizado);
};

// Função para deletar um agendamento
export const deletarAgendamento = async (id) => {
    await deleteDoc(doc(db, "agendamentos", id));
};

// Função para verificar se o usuário é admin
export const verificarAdmin = async (email) => {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    const clientes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const cliente = clientes.find(cliente => cliente.email === email);

    return cliente && cliente.tipo === 'adm';
};






