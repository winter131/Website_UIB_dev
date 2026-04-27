












import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModulType } from "@/types/ModulType";

interface ModulState {
  modul: ModulType[];
  setModul: (modul: ModulType[]) => void;
  clearModul: () => void;
}

export const useModul = create<ModulState>()(
  persist(
    (set) => ({
      modul: [],
      setModul: (modul) => set({ modul }),
      clearModul: () => set({ modul: [] }),
    }),
    {
      name: "modul", 
    }
  )
);