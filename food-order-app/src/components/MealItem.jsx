import { useContext, useState, useRef } from "react";

import Button from "./UI/Button.jsx";
import Toast from "./UI/Toast.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef();

  function handleAddMealToCart() {
    cartCtx.addItem(meal);

    // Get button position for toast placement using viewport coordinates
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      setToastPosition({
        top: buttonRect.top - 15, // 15px above button in viewport
        left: buttonRect.left + buttonRect.width / 2, // Center horizontally
      });
    }

    setShowToast(true);
  }

  function handleCloseToast() {
    setShowToast(false);
  }

  return (
    <>
      <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {currencyFormatter.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button ref={buttonRef} onClick={handleAddMealToCart}>
              Add to Cart
            </Button>
          </p>
        </article>
      </li>

      <Toast
        message={`Added to cart!`}
        isVisible={showToast}
        onClose={handleCloseToast}
        type="success"
        position={toastPosition}
      />
    </>
  );
}
