import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("techCart");
  if (localCartData == []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  // cart : [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // to remove the individiual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // increament and decreament the product
  const setDecrease = (id) => {
    dispatch({type:"SET_DECREMENT" , payload:id});
  }
  const setIncrement = (id) => {
    dispatch({type:"SET_INCREMENT" , payload:id});
  }

//   to clear the cart
const clearCart = () => {
    dispatch({type: "CLEAR_CART"  })
}

  // to add the data in localStorage
  // get vs set
  useEffect(() => {
     dispatch({type:"CART_TOTAL_ITEM"});
     dispatch({type: "CART_TOTAL_PRICE"});

    localStorage.setItem("techCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem,clearCart,setDecrease,setIncrement }}>
      {children}
    </CartContext.Provider>
  );
};
const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
