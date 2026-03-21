import {
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
  }),
);
export default useLoginStore;
