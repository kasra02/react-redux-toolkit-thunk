import {createSlice} from "@reduxjs/toolkit";
import uiReducer, {uiAction} from "./uiSlice";

const {createReducer} = require("@reduxjs/toolkit");

const initialState = {
    totalQuantity:0,
    items:[],
    changed:false
}

const cartReducer = createSlice({
    name:'cart1',
    initialState,
    reducers:{
        incrementTotalQuantity(state) {
            state.totalQuantity++
        },
        replaceCart(state,action) {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items

        },
        addItemToCart(state,action) {
            // 1. get item
            const newItem = action.payload
            const existItem = state.items.find(item => item.id === newItem.id)
            state.changed=true
            //state.totalQuantity++

            // 2. add to list OR update the quantity
            if (existItem) {
                 existItem.quantity++
                 existItem.totalPrice+=newItem.price
            } else {
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice: newItem.price,
                    title: newItem.title
                })

            }
        },
        removeItemFromCart(state,action){
            const id = action.payload
            const findItem = state.items.find(item=>item.id === id)
            state.totalQuantity--
            state.changed=true

            if (findItem.quantity === 1){
                state.items = state.items.filter(item=>item.id !== findItem.id)
            }else {
                findItem.quantity--
                findItem.totalPrice -= findItem.price
            }
        }
    }
})

export const cartAction = cartReducer.actions

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(
            uiAction.showNotification({
                status: "pending",
                title: "Sending...",
                message: "fetch cart data!",
            })
        )

        const fetchData = async () => {
            const response = await fetch(
                'https://test1-d6652-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(
                cartReducer.actions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity || 0,
                })
            );
            dispatch(
                uiAction.showNotification({
                    status: "success",
                    title: "Success",
                    message: "fetch cart data successfully!",
                })
            )
        } catch (error) {
            dispatch(
                uiAction.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};




export const sendCartData = (cart) => {
    return async (dispatch) => {
        // loading
        dispatch(
            uiAction.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        )
        // send data
        const sendData = async () => {
            const res = await fetch("https://test1-d6652-default-rtdb.firebaseio.com/cart.json",
                {
                method: "PUT", body:JSON.stringify(cart)
                }
            );
                if (!res.ok)
            {
                throw new Error('Sending cart data failed.');
            }

        }

        try {
            await sendData();
            // dispatch(cartAction.incrementTotalQuantity())
            dispatch(
                uiAction.showNotification({
                    status: "success",
                    title: "Success",
                    message: "Sent cart data successfully!",
                })
            )
        }
        catch (e)
        {
            dispatch(
                uiAction.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    }
}



export default cartReducer