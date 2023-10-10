import React from "react";

export const ConnectWallet = () => {
  return (
    <section className="bg-white dark:bg-white h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-4xl tracking-tight font-bold  md:text-7xl dark:text-black">
            Conectar Wallet
          </p>

          <a
            href="#"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-4xl px-10 py-5 text-center  my-1"
          >
            Conectar
          </a>
        </div>
      </div>
    </section>
  );
};
