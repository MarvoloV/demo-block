import { createBrowserRouter } from "react-router-dom";

import { ConnectWallet } from "../pages/ConnectWallet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectWallet />,
  },
  {
    path: "connect",
    element: <ConnectWallet />,
  },
]);
