import App from "@/App";
import DefaultLayout from "@/components/ui/default-layout";
import Login from "@/page/login";
import Register from "@/page/register";
import { Outlet, useRoutes } from "react-router-dom";

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
          path: "/",
          element: <App />,
        },
        {
          path: "/dang-nhap",
          element: <Login />,
        },
        {
          path: "/dang-ky",
          element: <Register />,
        },
      ],
    },
  ]);

  return routes;
}
