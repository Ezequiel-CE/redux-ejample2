import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendDataCart, fetchCardData } from "./store/cart-actions";

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatchFunction = useDispatch();

  //for fetching data
  useEffect(() => {
    dispatchFunction(fetchCardData());
  }, [dispatchFunction]);

  //for sending data
  useEffect(() => {
    if (cart.change) {
      dispatchFunction(sendDataCart(cart));
    }
  }, [cart, dispatchFunction]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
