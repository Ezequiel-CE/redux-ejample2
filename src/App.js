import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/iu-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatchFunction = useDispatch();

  useEffect(() => {
    const sendData = async () => {
      dispatchFunction(
        uiActions.showNotification({
          status: "pending",
          title: "Sending data",
          message: "sending cart data",
        })
      );

      const response = await fetch(
        "https://redux-26b78-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data fail");
      }

      dispatchFunction(
        uiActions.showNotification({
          status: "success",
          title: "data send",
          message: "data has been send",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendData().catch((err) => {
      dispatchFunction(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "something went wrong",
        })
      );
    });
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
