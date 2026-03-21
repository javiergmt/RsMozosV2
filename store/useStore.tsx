import {
  mesaType,
  mozoType,
  paramMozosType,
  rubrosSubType,
  sectoresType,
} from "@/Types/interfaces";
import { create } from "zustand";

interface LoginStoreState {
  isLoggedIn: boolean;

  Rubros: rubrosSubType[];
  getRubros: () => rubrosSubType[];
  setRubros: (rubros: rubrosSubType[]) => void;

  Param: paramMozosType[];
  getParam: () => paramMozosType[];
  setParam: (param: paramMozosType[]) => void;

  Sectores: sectoresType[];
  getSectores: () => sectoresType[];
  setSectores: (sectores: sectoresType[]) => void;

  Mozo: mozoType[];
  getMozo: () => mozoType[];
  setMozo: (mozo: mozoType[]) => void;

  Mesa: mesaType[];
  getMesa: () => mesaType[];
  setMesa: (mesa: mesaType[]) => void;

  ultSector?: number | string | null;
  setUltSector?: (idSector: number | string | null) => void;

  ultMesa?: number | string | null;
  setUltMesa?: (idMesa: number | string | null) => void;

  comensales?: number | string | null;
  setComensales?: (comensales: number | string | null) => void;
}

export const useLoginStore = create<LoginStoreState>(
  // @ts-ignore
  (set, get) => ({
    isLoggedIn: false,

    Rubros: [],
    getRubros: () => get().Rubros,
    setRubros: (rubros) => set({ Rubros: rubros }),

    Param: [],
    getParam: () => get().Param,
    setParam: (param) => set({ Param: param }),

    Sectores: [],
    getSectores: () => get().Sectores,
    setSectores: (sectores) => set({ Sectores: sectores }),

    Mozo: [],
    getMozo: () => get().Mozo,
    setMozo: (mozo) => set({ Mozo: mozo }),

    Mesa: [],
    getMesa: () => get().Mesa,
    setMesa: (mesa) => set({ Mesa: mesa }),

    ultSector: null,
    setUltSector: (idSector) => set({ ultSector: idSector }),

    ultMesa: null,
    setUltMesa: (idMesa) => set({ ultMesa: idMesa }),

    comensales: null,
    setComensales: (comensales) => set({ comensales: comensales }),
  }),
);
export default useLoginStore;

function initMesa(): mesaType {
  return {
    NroMesa: 0,
    idSector: 0,
    Ocupada: "S",
    idMozo: 0,
    Cerrada: 0,
    CantPersonas: 0,
    Activa: false,
    SoloOcupada: false,
    DescMesa: "",
  };
}
