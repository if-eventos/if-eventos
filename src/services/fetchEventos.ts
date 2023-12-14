import api from "./api";

interface Evento {
    key: string;
    nome: string;
    descricao: string;
    id: number;
}


export default async function fetchEventos(): Promise<Evento[]> {
    try {
      const response = await api.get('/api/v1/evento/todos');
      return response.data ["evento"] as Evento[];
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
      throw error;
    }
}