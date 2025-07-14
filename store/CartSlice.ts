import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    items:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addItem:(state,action) => {
            const item= action.action
         const existing = state.item.find(i=> i.id === item.id)       
         if(existing){
            existing.qty +=1
         }else{
            state.items.push({...item,qty:1})
         }
        },
        removeItem:(state,action) => {
            state.items = state .items.filter(i => i.id !==action.payload)
        },
        increaseQty:(state,action) => {
            const existing = state.items.find(i => i.id === action.payload)
            if (existing) existing.qty += 1
        },
        decreaseQty: (state,action) => {
            const existing = state.items.find(i => i.id === action.payload)
            if (existing) {
                existing.qty-=1
                if(existing.qty <=0) {
                    state.items = state.items.filter(i=> i.id !== action.payload)
                }
            }
        },
        clearCart:state=>{
            state.items = []
        }
    }
})

export const { addItem,removeItem,increaseQty,decreaseQty,clearCart} = cartSlice.actions
export default cartSlice.reducer