import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { RootPage } from "./pages/root-page.tsx";
import { PlanRecipe } from "./pages/plan-recipe/index.tsx";
import { PlanDetail } from "./pages/plan-detail/[id]/index.tsx";
import "@/lib/firebase.ts";
import { NotFound } from "./pages/not-found/index.tsx";
import { UserRecipeList } from "./pages/user-recipe-list/index.tsx";
import { BaseLayout } from "./components/custom/BaseLayout.tsx";
import { LoginGuard } from "./components/guard/LoginGuard.tsx";
import { NotLogin } from "./pages/not-login/index.tsx";

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
            element: <PlanRecipe />,
          },
          {
            path: "/plan-detail/:id",
            element: <PlanDetail />,
          },
          {
            path: "/user/:uid/recipe",
            element: <UserRecipeList />,
          },
        ],
      },
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "/not-login",
        element: <NotLogin />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
