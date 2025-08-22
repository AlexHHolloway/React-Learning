import { useContext } from "react";

import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { ModalContextProvider } from "./store/ModalContext.jsx";
import ModalContext from "./store/ModalContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function AppContent() {
  const modalCtx = useContext(ModalContext);

  return (
    <>
      <Header />
      <Meals />
      <Cart
        open={modalCtx.showCart}
        onClose={modalCtx.closeCart}
        onGoToCheckout={modalCtx.openCheckout}
      />
      <Checkout open={modalCtx.showCheckout} onClose={modalCtx.closeCheckout} />
    </>
  );
}

function App() {
  return (
    <CartContextProvider>
      <ModalContextProvider>
        <AppContent />
      </ModalContextProvider>
    </CartContextProvider>
  );
}

export default App;
