import { shallow } from "zustand/shallow";
import useWalletStore from "../store/walletStore";
import { useEffect, useState } from "react";
import { mintToken } from "../web3/payment/pay";
import { apiPayment } from "../api/api";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface ParentProps {
  idPago: number;
  email: string;
}

export const ConnectWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataParent, setDataParent] = useState<ParentProps>();

  const { connectWallet } = useWalletStore();
  const { currentAccount } = useWalletStore(
    (state) => ({
      currentAccount: state.currentAccount,
    }),
    shallow
  );
  const navigate = useNavigate();
  const handlerConnect = () => {
    connectWallet();
  };
  const handlerPermit = async () => {
    if (!dataParent) return;
    try {
      setIsLoading(true);
      await mintToken(currentAccount);
      const user = await apiPayment.post("auth/login", {
        email: import.meta.env.VITE_USER,
        password: import.meta.env.VITE_PASSWORD,
      });

      const response = await apiPayment.post(
        "payment/transfer",
        {
          email: dataParent?.email,
          address: currentAccount,
          amount: 1,
          paymentId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.data.JWT}`,
          },
        }
      );
      const hash = response.data.hash;
      setIsLoading(false);
      navigate(`success/${hash}`);
    } catch (error) {
      setIsLoading(false);
      navigate("error");
    }
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
  useEffect(() => {
    const handlerEvent = (event: MessageEvent) => {
      if (event.origin === import.meta.env.VITE_URL_PARENT) {
        // Muestra los datos recibidos en la ventana principal

        setDataParent(event.data);
      }
    };
    window.addEventListener("message", handlerEvent);

    return () => {
      window.removeEventListener("message", handlerEvent);
    };
  }, []);
  return (
    <>
      {!currentAccount ? (
        <section className="bg-primary] h-screen flex items-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <p className="mb-4 text-4xl tracking-tight font-bold  md:text-7xl dark:text-black">
                Conectar Wallet
              </p>

              <button
                className="inline-flex text-white  bg-orange hover:bg-[#FFCC00] font-medium rounded-xl text-4xl px-10 py-5 text-center  my-1"
                onClick={handlerConnect}
              >
                Conectar
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-primary h-screen flex items-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col items-center">
            <div className="mx-auto text-center flex items-center flex-col ">
              <p className="mb-4 text-4xl font-bold  md:text-7xl text-white">
                Wallet user:
              </p>

              <p className="text-5xl font-semibold text-white">
                {currentAccount}
              </p>
            </div>
            {!isLoading ? (
              <button
                className="inline-flex mt-5 text-white bg-orange hover:bg-[#FFCC00]   font-medium rounded-xl text-4xl px-10 py-5 text-center  my-1"
                onClick={() => handlerPermit()}
              >
                Permitir
              </button>
            ) : (
              <div className="flex gap-x-3 mt-10 items-center">
                <ScaleLoader color="#000000" height={80} />
                <p className="text-6xl text-[#000000] font-semibold">
                  Otorgando Permisos...
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
