import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "@/App";
import DefaultLayout from "@/components/ui/default-layout";
import Login from "@/page/login";
import Register from "@/page/register";
import { PUBLIC_ROUTER } from "./section";
import NotFount from "@/page/not-found";
import LoanCalculator from "@/page/xac-nhan-khoan-vay/page";

const router = createBrowserRouter(
  [
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
        {
          path: PUBLIC_ROUTER.LOANS,
          element: <LoanCalculator />,
        },
        {
          path: "*",
          element: <NotFount />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
