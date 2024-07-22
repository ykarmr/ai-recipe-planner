import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { PlanRecipePage } from "./pages/plan-recipe/index.tsx";
import { PlanDetailPage } from "./pages/plan-detail/index.tsx";
import { NotFoundPage } from "./pages/not-found/index.tsx";
import { UserRecipeListPage } from "./pages/user-recipe-list/index.tsx";
import { BaseLayout } from "./components/custom/BaseLayout.tsx";
import { LoginGuard } from "./components/guard/LoginGuard.tsx";
import { NotLoginPage } from "./pages/not-login/index.tsx";
import { RootPage } from "./pages/root-page/index.tsx";

const router = createBrowserRouter([
  {
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      {
        element: (
          <LoginGuard>
            <Outlet />
          </LoginGuard>
        ),
        children: [
          {
            path: "/plan-recipe",
            element: <PlanRecipePage />,
          },
          {
            path: "/plan-detail/:id",
            element: <PlanDetailPage />,
          },
          {
            path: "/user/:uid/recipe",
            element: <UserRecipeListPage />,
          },
        ],
      },
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/not-found",
        element: <NotFoundPage />,
      },
      {
        path: "/not-login",
        element: <NotLoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
