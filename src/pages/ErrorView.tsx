export const ErrorView = () => {
  const sendData = () => {
    const data = {
      status: 400,
      message: "Ocurrio un error",
    };

    window.opener.postMessage(data, import.meta.env.VITE_URL_PARENT);
    // Cierra la ventana secundaria
    window.close();
  };
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <div className="bg-white p-12  md:mx-auto flex justify-center flex-col items-center  shadow-lg">
        <img src="/fallido.png" alt="failled" width={120} />
        <div className="text-center mt-6">
          <h3 className="md:text-5xl text-base text-gray-900 font-semibold text-center">
            ¡Operación Fallida!
          </h3>
          <p className="text-gray-600 my-2 text-xl">
            Ocurrio un problema al realizar el pago.
          </p>

          <div className="py-10 text-center">
            <button
              onClick={sendData}
              className="  text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-xl px-10 py-5 text-center  my-1"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
