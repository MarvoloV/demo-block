/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  currentAccount: string;
  connectWallet: () => Promise<boolean | undefined>;
  reset: () => void;
  saveTransaction: (amount: number, numberTransaction: string) => void;
  resetTransaction: () => void;
}

const initialState = {
  currentAccount: "",
};

const useWalletStore = create(
  persist<AuthState>(
    (set) => ({
      ...initialState,
      connectWallet: async () => {
        // eslint-disable-next-line no-useless-catch
        try {
          const { ethereum } = window;

          if (!ethereum) {
            alert("Man, go and get Metamask!");
            return false;
          }

          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          set((state) => ({
            ...state,
            currentAccount: accounts[0],
          }));
          return true;
        } catch (error: any) {
          throw error;
          // toast.error(error.message);
        }
      },
      reset: () => {
        set(initialState);
      },
      saveTransaction: () => {
        set((state) => ({
          ...state,
        }));
      },
      resetTransaction: () => {
        set((state) => ({
          ...state,
        }));
      },
    }),

    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useWalletStore;
