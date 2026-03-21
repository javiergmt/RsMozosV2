export default function interfaces() {
  return null;
}

export type paramMozosType = {
  ColorMesaCerrada: string;
  ColorMesaComiendo: string;
  ColorMesaComiendoEsperando: string;
  ColorMesaEsperando: string;
  ColorMesaNormal: string;
  ColorMesaOcupada: string;
  ColorMesaPorCobrar: string;
  ColorMesaSinPed: string;
  ColorPostre: string;
  Sucursal: number;
  ActivarSubEstadosMesa: boolean;
  ModificaPrecioEnMesa: boolean;
  PermiteDescLibre: boolean;
  PermitePrecioCero: boolean;
  AutorizarElimiarPlatoEnMesa: boolean;
  MarcarMesaSinCobrar: boolean;
  MozosCierranMesa: boolean;
  MostrarRubroFavoritos: boolean;
  OcultarTotalMesaMozos: boolean;
  PedirMotElimRenglon: boolean;
  PedirCubiertos: boolean;
  idCubiertos: number;
  idTurnoCubierto: number;
  Nombre: string;
  idPagWeb: number;
  NombreWeb: string;
  Sector_ini: number;
  DescripCub: string;
};

export type subRubrosType = {
  idSubRubro: number;
  Descripcion: string;
  Imagen: string;
  Orden: number;
};

export type rubrosSubType = {
  idRubro: number;
  Descripcion: string;
  Orden: number;
  Visualizacion: string;
  iconoApp: string;
  Prefijo: string;
  subrubros: subRubrosType[];
};

export type sectoresType = {
  idSector: number;
  Descripcion: string;
  Comensales: number;
};

export type mozoType = {
  idMozo: number;
  Nombre: string;
  Direccion: string;
  Telefono: string;
  Activo: boolean;
  Password: string;
  Tecla: string;
  idTipoMozo: number;
  NroPager: string;
  Orden: number;
};

export type mesasType = {
  NroMesa: number;
  idSector: number;
  PosTop: number;
  PosLeft: number;
  Width: number;
  Height: number;
  Ocupada: string;
  Nro2: number;
  idMozo: number;
  Forma: number;
  Cerrada: number;
  CantSillas: number;
  CantPersonas: number;
  Activa: boolean;
  ConPedEnEspera: boolean;
  Comiendo: boolean;
  Pendiente: boolean;
  PorCobrar: boolean;
  Reservada: boolean;
  SoloOcupada: boolean;
  ConPostre: boolean;
  DescMesa: string;
};
