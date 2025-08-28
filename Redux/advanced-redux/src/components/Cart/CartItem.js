import classes from "./CartItem.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, totalPrice, price, id } = props.item;

  const decreaseQty = () => {
    dispatch(cartActions.removeItem(id));
  };
  const increaseQty = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        title: title,
        price: price,
      })
    );
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>
          {title} (x <span>{quantity}</span>)
        </h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.actions}>
          <button onClick={decreaseQty}>-</button>
          <button onClick={increaseQty}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
