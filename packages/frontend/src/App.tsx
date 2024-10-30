import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Routers from "./routers";
import { isRouteFound } from "./utils/functions/general";
import { useLocation } from "react-router-dom";
import { routes } from "./config";

export default function App() {
  const { pathname } = useLocation();

  const isFound = isRouteFound(pathname, {
    dynamicRoutes: [routes.auth],
  });

  return (
    <Layout>
      <Header removeNav={isFound} />
      <Routers />
      {!isFound && <Footer />}
    </Layout>
  );
}
