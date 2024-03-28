import { create } from "zustand";

interface StoreState {
  balance: boolean;
  reFetchBalance: () => void;
}

const useWalletStore = create<StoreState>((set) => ({
  balance: false,
  reFetchBalance: () => set((state) => ({ balance: !state.balance })),
}));

export default useWalletStore;
