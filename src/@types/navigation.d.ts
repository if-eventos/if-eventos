type Coords = {
  latitude: number,
  longitude: number,
}

interface Evento {
  key: string;
  nome: string;
  descricao: string;
  id: number;
  image: any;
  data_hora: string;
  categoria: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Cadastro: undefined;
      CriarEvento: undefined | Coords;
      Home: undefined;
      Perfil: undefined;
      EditPerfil: undefined;
      SelectMapPosition: Coords
      DetalheEvento: undefined | { evento: Evento };
      EventosInscritos: undefined;
    }
  }
}