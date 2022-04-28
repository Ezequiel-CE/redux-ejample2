import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import Products from "./components/Shop/Products";

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
