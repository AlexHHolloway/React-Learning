import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

// create context...sort of a schema for the context that will be provided.
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

// useReducer function to relocate logic outside of provider function
function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const newItems = [...state.items];

    const foundItemIndex = newItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    const existingItem = newItems[foundItemIndex];

    if (existingItem) {
      const incrementedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      newItems[foundItemIndex] = incrementedItem;
    } else {
      const productToAdd = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      newItems.push({
        id: action.payload,
        name: productToAdd.title,
        price: productToAdd.price,
        quantity: 1,
      });
    }

    return {
      items: newItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const newItems = [...state.items];
    const itemIndex = newItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const itemToUpdate = {
      ...newItems[itemIndex],
    };

    itemToUpdate.quantity += action.payload.quantityChange;

    if (itemToUpdate.quantity <= 0) {
      newItems.splice(itemIndex, 1);
    } else {
      newItems[itemIndex] = itemToUpdate;
    }

    return {
      items: newItems,
    };
  }

  return state;
}

// main provider function to wrap any components needing to access context
export default function CartContextProvider({ children }) {
  // use reducer setting up initial state and dispatch
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // these functions dispatch useReducer to update and return state
  function handleAddItemToCart(productId) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: productId,
    });
  }

  function handleUpdateCartItemQuantity(productId, quantityChange) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        quantityChange,
      },
    });
  }

  // this is the value being passed to our context
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  // this is what will actually wrap the other components. (.Provider only needed in React 18 and earlier)
  // Values are passed in and update via the useReducer functions above.
  // It accepts any children (other) components and provides context.
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
