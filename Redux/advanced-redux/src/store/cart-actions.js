import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://test-project-8f5e9-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data.");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
          totalPrice: cartData.totalPrice || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed.",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://test-project-8f5e9-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalPrice: cart.totalPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};

export const clearCartData = () => {
  return async (dispatch) => {
    // Clear cart locally first
    dispatch(cartActions.clearCart());

    // Show clearing notification
    dispatch(
      uiActions.showNotification({
        status: "info",
        title: "Cart Cleared!",
        message: "All items have been removed from your cart.",
      })
    );

    // Clear cart in database
    const clearRequest = async () => {
      const response = await fetch(
        "https://test-project-8f5e9-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Clearing cart data failed.");
      }
    };

    try {
      await clearRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to clear cart in database.",
        })
      );
    }
  };
};
