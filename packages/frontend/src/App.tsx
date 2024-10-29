import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Routers from "./routers";

function App() {
  return (
    <Layout>
      <Header />
      <Routers />
      <Footer />
    </Layout>
  );
}

export default App;
