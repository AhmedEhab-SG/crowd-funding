import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Routers from "./routers";
import { isRouteFound } from "./utils/functions/general";
import { useLocation } from "react-router-dom";
import { appRoutes } from "./config";

export default function App() {
  const { pathname } = useLocation();

  const isFound = isRouteFound(pathname, {
    dynamicRoutes: [appRoutes.auth],
  });

  return (
    <Layout>
      <Header removeNav={isFound} />
      <Routers />
      {!isFound && <Footer />}
    </Layout>
  );
}
