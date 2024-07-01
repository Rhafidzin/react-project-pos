import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    dataCart: [],
    isLoading: false,
    hasError: false,
};

// export const fetchCart = createAsyncThunk(
//     'cart/fetchCart',
//     async () => {
//         const response = await axios.get(
//             "http://localhost:3000/cart")
//     return response.data
// }
// )

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // const sameProduct = state.dataCart.find((p) => 
            //     p.id === action.payload.id)
            //  if (sameProduct !== undefined) {
            //     const qty = { qty: parseInt(sameProduct.qty) + parseInt(action.payload.qty)};
            //     axios.put("http://localhost:3000/cart/" + sameProduct.id, {...sameProduct, ...qty})
            // } else {
            //   axios.post("http://localhost:3000/cart", action.payload)
            // }
            
            // console.log(state.dataCart)
            // console.log(action.payload)
            action.payload.qty = 1;
            const sameId = state.dataCart.find((d) => d.id === action.payload.id);
            // console.log(sameId)
          if (sameId !== undefined) {
            const qty = { qty: parseInt(sameId.qty) + 1 };
            const updateData = state.dataCart.map((p) => {
              if (p.id == action.payload.id) {
                return { ...p, ...qty };
              } else {
                return p;
              }
            });
            // console.log(updateData)
            state.dataCart = updateData;
          } else {
            state.dataCart = [...state.dataCart, action.payload];
          
          };
            
        },
        deleteFromCart: (state, action) => {
          // const sameProduct = state.dataCart.find((p) => 
          //   p.id === action.payload)
          // axios.delete("http://localhost:3000/cart/" + sameProduct.id)

          const filter = state.dataCart.filter((c) => c.id !== action.payload)
          state.dataCart = filter
        },
        minusQty: (state, action) => {
          // const sameProduct = state.dataCart.find((p) => 
          //   p.id === action.payload)
          // const qty = { qty: parseInt(sameProduct.qty) - 1};
          // axios.put("http://localhost:3000/cart/" + sameProduct.id, {...sameProduct, ...qty})
       
          const sameId = state.dataCart.find((d) => d.id === action.payload);
          if (sameId !== undefined) {
            const qty =  { qty: parseInt(sameId.qty) - 1}
            const updateData = state.dataCart.map((p) => {
              if (p.id == action.payload) {
                return { ...p, ...qty };
              } else {
                return p;
              }
            });
            state.dataCart = updateData;
          } else {
            state.dataCart = [...state.dataCart, action.payload];
          
          };
          // const decreasedQty = {...sameId, ...qty}
          // state.dataCart = [...state.dataCart, decreasedQty]
          // state.
        },
        plusQty: (state, action) => {
          // const sameProduct = state.dataCart.find((p) => 
          //   p.id === action.payload)
          // const qty = { qty: parseInt(sameProduct.qty) + 1};
          // axios.put("http://localhost:3000/cart/" + sameProduct.id, {...sameProduct, ...qty})
          const sameId = state.dataCart.find((d) => d.id === action.payload);
          if (sameId !== undefined) {
            const qty =  { qty: parseInt(sameId.qty) + 1}
            const updateData = state.dataCart.map((p) => {
              if (p.id == action.payload) {
                return { ...p, ...qty };
              } else {
                return p;
              }
            });
            state.dataCart = updateData;
          } else {
            state.dataCart = [...state.dataCart, action.payload];
          
          };
       
        },
        dropCart: (state, action) => {
          // for (let i = 0; i < action.payload.length; i++) {
          //   axios.delete("http://localhost:3000/cart/" + action.payload[i].product)
          // }
          state.dataCart = []
        }

    },
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchCart.pending, (state, action) => {
    //       state.isLoading = true;
    //       state.hasError = false;
    //     })
    //       .addCase(fetchCart.fulfilled, (state, action) => {
    //         state.dataCart = action.payload;
    //         state.isLoading = false;
    //         state.hasError = false
    //       })
    //       .addCase(fetchCart.rejected, (state, action) => {
    //         state.hasError = true
    //         state.isLoading = false;
    //       })
    //   }
});

export const { addToCart, deleteFromCart , minusQty, plusQty, dropCart } = cartSlice.actions;
export default cartSlice.reducer