import { Link } from "react-router-dom";

export const Success = () => {
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

          <div className="py-10 text-center">
            <Link
              to={"/"}
              className="  text-white bg-blue-600 hover:bg-blue-800   font-medium rounded-xl text-xl px-10 py-5 text-center  my-1"
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
