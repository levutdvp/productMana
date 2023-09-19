import { createSlice } from "@reduxjs/toolkit";
export const productChosenListSlice =  createSlice({
  name: 'productList',
  initialState: {
    product: []
  },
  reducers: {
    addToCart: (state, action) => {
      state.product = [...state.product, action.payload];
    },
    removeFromCart:(state,action) =>{
      const removeProduct = action.payload
      return state.filter(item => item.id !== removeProduct)
    },
    clearCart:(state) =>{
        state.product = [state.product]
    }
  }
})

export const { addToCart, removeFromCart, clearCart} = productChosenListSlice.actions;
export default productChosenListSlice.reducer;