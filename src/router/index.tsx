import App from "@/App";
import DefaultLayout from "@/components/ui/default-layout";
import Login from "@/page/login";
import Register from "@/page/register";
import { Outlet, useRoutes } from "react-router-dom";
import { PUBLIC_ROUTER } from "./section";
import { Box, LinearProgress } from "@mui/material";

export function Router() {
  const routes = useRoutes([
    {
      element: (
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      ),
      children: [
        {
          index: true,
          path: PUBLIC_ROUTER.HOME,
          element: <App />,
        },
        {
          path: PUBLIC_ROUTER.ACCOUNT.LOGIN,
          element: <Login />,
        },
        {
          path: PUBLIC_ROUTER.ACCOUNT.REGISTER,
          element: <Register />,
        },
      ],
    },
  ]);

  return routes;
}
