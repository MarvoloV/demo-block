import { createBrowserRouter } from "react-router-dom";

import { ConnectWallet } from "../pages/ConnectWallet";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "connect",
    element: <ConnectWallet />,
  },
]);
