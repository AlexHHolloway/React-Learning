import { useContext, useState } from "react";
import { useFormStatus } from "react-dom";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import ModalContext from "../store/ModalContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import { submitOrder } from "../http.js";
import Error from "./UI/Error.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    modalCtx.closeCheckout();
  }

  function handleFinish() {
    modalCtx.closeCheckout();
    cartCtx.clearCart();
    setWasSubmitted(false);
  }

  async function checkoutAction(fd) {
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    try {
      await submitOrder({
        customer: customerData,
        items: cartCtx.items,
      });
      setWasSubmitted(true);
      cartCtx.clearCart();
    } catch (error) {
      setError({ message: error.message || "Failed to submit order" });
    }
  }

  function FormActions({ onClose }) {
    const { pending } = useFormStatus();

    if (pending) {
      return <span>Sending order data...</span>;
    }

    return (
      <>
        <Button type="button" textOnly onClick={onClose}>
          Close
        </Button>
        <Button>Submit Order</Button>
      </>
    );
  }

  let actions = <FormActions onClose={handleClose} />;

  if (wasSubmitted) {
    return (
      <Modal open={modalCtx.showCheckout} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={modalCtx.showCheckout} onClose={handleClose}>
      <form action={checkoutAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && (
          <Error title="Failed to submit order" message={error.message} />
        )}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
