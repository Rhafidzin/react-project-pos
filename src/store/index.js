import {configureStore} from "@reduxjs/toolkit"
import cartSlice, { fetchCart } from "./reducers/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice
    }
});

store.dispatch(fetchCart());
export default store