export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Cadastro: undefined;
      CriarEvento: undefined | {position: {
        latitude:string; 
        longitude: string;
      };}
      Home: undefined;
      Perfil: undefined;
      EditPerfil: undefined;
      SelectMapPosition: undefined;
    }
  }
}