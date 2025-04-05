import { createSlice } from "@reduxjs/toolkit";
import { IProductCart } from "@/interfaces/index";

interface ICartState {
  products: IProductCart[];
  selectedItems: number;
  totalPrice: number;
  taxRate: number;
}

const initialState: ICartState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  taxRate: 0.05, //5% tax rate
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === product._id
      );
      if (existingProductIndex === -1) {
        state.products.push({ ...product, quantity: 1 });
      } else {
        state.products[existingProductIndex].quantity += 1;
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const product = state.products.find((p) => p._id === id);

      if (product) {
        if (type === "INCREMENT") {
          product.quantity += 1;
        } else if (type === "DECREMENT" && product.quantity > 1) {
          product.quantity -= 1;
        }
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
    
      // Remove the product using filter (returns a new array)
      state.products = state.products.filter((product) => product._id !== id);
    
      // Update selected items and total price
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
    },
    clearCart: () => {
      return initialState;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

//utility functions

//count how many items are in the cart
const setSelectedItems = (state: ICartState): number => {
  return state.products.reduce((acc: number, product: IProductCart) => {
    return acc + product.quantity;
  }, 0);
};

//calculate the total price
const calculateTotalPrice = (state: ICartState): number => {
  return parseFloat(
    state.products
      .reduce((acc: number, product: IProductCart) => {
        return acc + product.price * product.quantity;
      }, 0)
      .toFixed(2)
  );
};
