import { create } from "zustand";
type BalanceState = {
    balance:number;
    setBalance:(amount:number) => void;
};
export const useBalanceStore = create<BalanceState>((set) => ({
    balance: 0,
    setBalance: (amount) => set({ balance: amount }),
  }));