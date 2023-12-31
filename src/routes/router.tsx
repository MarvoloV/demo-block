import { createBrowserRouter } from "react-router-dom";

import { ConnectWallet } from "../pages/ConnectWallet";
import { Success, loaderSuccess } from "../pages/Success";
import { ErrorView } from "../pages/ErrorView";
import { Page404 } from "../pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectWallet />,
  },

  {
    path: "success/:id",
    element: <Success />,
    loader: loaderSuccess,
    errorElement: <ErrorView />,
  },
  {
    path: "error",
    element: <ErrorView />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
