import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../pages/Loading";
import { appRoutes } from "../config";
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));

export default function Routers() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.auth} element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
