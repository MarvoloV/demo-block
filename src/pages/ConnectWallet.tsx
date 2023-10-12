import { shallow } from "zustand/shallow";
import useWalletStore from "../store/walletStore";
import { useEffect } from "react";
import { mintToken } from "../web3/payment/pay";

export const ConnectWallet = () => {
  const { connectWallet } = useWalletStore();
  const { currentAccount } = useWalletStore(
    (state) => ({
      currentAccount: state.currentAccount,
    }),
    shallow
  );
  const handlerConnect = () => {
    connectWallet();
  };
  const handlerPermit = async () => {
    const response = await mintToken(currentAccount);
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
        // return notify("Wallet Conectada!!!", "success");
      });

      return () => {
        window.ethereum.removeListener("accountsChanged", () => {});
      };
    }
  }, [connectWallet]);
  return (
    <>
      {!currentAccount ? (
        <section className="bg-white dark:bg-white h-screen flex items-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <p className="mb-4 text-4xl tracking-tight font-bold  md:text-7xl dark:text-black">
                Conectar Wallet
              </p>

              <button
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-4xl px-10 py-5 text-center  my-1"
                onClick={handlerConnect}
              >
                Conectar
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white dark:bg-white h-screen flex items-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto text-center flex items-center flex-col bg-red-300">
              <p className="mb-4 text-4xl font-bold  md:text-7xl text-black">
                Wallet user:
              </p>
              <p className="text-5xl font-semibold ">{currentAccount}</p>
            </div>
            <button
              className="inline-flex text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-4xl px-10 py-5 text-center  my-1"
              onClick={() => handlerPermit()}
            >
              Permitir
            </button>
          </div>
        </section>
      )}
    </>
  );
};
