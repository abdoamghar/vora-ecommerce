import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "vora-cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          )
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image: action.product.image,
            quantity: action.quantity || 1
          }
        ]
      };
    }
    case "SET_QTY": {
      const q = Math.max(1, Math.min(99, action.quantity));
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: q } : i
        )
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.id !== action.id)
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) return parsed;
  } catch {
    /* ignore */
  }
  return { items: [] };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = useMemo(
    () => state.items.reduce((n, i) => n + i.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      subtotal,
      addItem: (product, quantity = 1) =>
        dispatch({ type: "ADD", product, quantity }),
      setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" })
    }),
    [state.items, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
