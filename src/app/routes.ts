import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { WorksPage } from "./pages/WorksPage";
import { WorkDetailPage } from "./pages/WorkDetailPage";
import { ExhibitionsPage } from "./pages/ExhibitionsPage";
import { ImpresumPage } from "./pages/ImpresumPage";
import { PrivacyPage } from "./pages/PrivacyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "radovi", Component: WorksPage },
      { path: "radovi/:id", Component: WorkDetailPage },
      { path: "izlozbe", Component: ExhibitionsPage },
      { path: "impresum", Component: ImpresumPage },
      { path: "politika-privatnosti", Component: PrivacyPage },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
