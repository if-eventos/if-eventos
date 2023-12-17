type Coords = {
  latitude: number,
  longitude: number,
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
      DetalheEvento: undefined;
    }
  }
}