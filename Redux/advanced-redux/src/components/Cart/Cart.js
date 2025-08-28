import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector, useDispatch } from "react-redux";
import { clearCartData } from "../../store/cart-actions";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleClearCart = () => {
    dispatch(clearCartData());
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              title: item.title,
            }}
          />
        ))}
      </ul>
      {cartItems.length > 0 && (
        <div className={classes.total}>
          <button className={classes.clearButton} onClick={handleClearCart}>
            Clear Cart
          </button>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </Card>
  );
};

export default Cart;
