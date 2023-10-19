/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const Success = () => {
  const [info, setInfo] = useState<any>({ message: "hola" });
  const enviarDatos = () => {
    const data = {
      pagado: 12312,
      orderId: 123123,
      hash: "asdasd123asd",
    };
    window.opener.postMessage(data, "https://txb33m4b-5501.brs.devtunnels.ms");
    // Cierra la ventana secundaria
    window.close();
  };
  useEffect(() => {
    window.addEventListener("message", function (event) {
      // Verifica si el origen del mensaje es válido para mayor seguridad
      if (event.origin === "https://txb33m4b-5501.brs.devtunnels.ms") {
        // Muestra los datos recibidos en la ventana principal
        setInfo(event);
        console.log("🚀 ~ file: test.html:46 ~ event.data:", event.data);
      }
    });

    return () => {
      // second;
    };
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <div className="bg-white p-12  md:mx-auto shadow-lg">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-32 h-32 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-5xl text-base text-gray-900 font-semibold text-center">
            ¡Operación exitosa!
          </h3>
          <p className="text-gray-600 my-2 text-xl">
            Gracias por completar su pago seguro en línea.
          </p>
          <p>{JSON.stringify(info)}</p>
          <div className="py-10 text-center">
            <button
              className=" text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-xl px-10 py-5 text-center  my-1"
              onClick={enviarDatos}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
