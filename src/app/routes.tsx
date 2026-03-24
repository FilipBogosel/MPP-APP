import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./pages/Root";
import { Maintenance } from "./pages/Maintenance";
import { Register } from "./pages/Register";
import { AddService } from "./pages/AddService";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Login } from "./pages/Login";
import { Analytics } from "./pages/Analytics";
import { LifecycleForecaster } from "./pages/LifecycleForecaster";
import { DataImport } from "./pages/DataImport";

export const router = createBrowserRouter([
  // Added comment to trigger HMR
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Maintenance },
      { path: "analytics", Component: Analytics },
      { path: "lifecycle-forecaster", Component: LifecycleForecaster },
      { path: "import", Component: DataImport },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "add-service", Component: AddService },
      { path: "service/:id", Component: ServiceDetail },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
