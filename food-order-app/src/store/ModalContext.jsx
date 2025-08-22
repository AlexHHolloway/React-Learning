import { createContext, useState } from "react";

const ModalContext = createContext({
  showCart: false,
  showCheckout: false,
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
  closeAllModals: () => {},
});

export function ModalContextProvider({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  function openCart() {
    setShowCart(true);
    setShowCheckout(false); // Close checkout if open
  }

  function closeCart() {
    setShowCart(false);
  }

  function openCheckout() {
    setShowCart(false); // Close cart when opening checkout
    setShowCheckout(true);
  }

  function closeCheckout() {
    setShowCheckout(false);
  }

  function closeAllModals() {
    setShowCart(false);
    setShowCheckout(false);
  }

  const modalContext = {
    showCart,
    showCheckout,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
