import Header from "./components/Header";
import Layout from "./components/Layout";
import Routers from "./routers";

function App() {
  return (
    <Layout>
      <Header />
      <Routers />
    </Layout>
  );
}

export default App;
