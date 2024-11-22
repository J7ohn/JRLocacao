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
