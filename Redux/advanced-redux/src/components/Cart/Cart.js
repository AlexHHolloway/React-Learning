import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

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
    </Card>
  );
};

export default Cart;
