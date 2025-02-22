import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColorType ={
    mode: 'dark' | 'light' 
}

const initialState: ColorType = {
    mode: 'dark'
}

export const colorSlice = createSlice({
    name:'color',
    initialState,
    reducers:{
        setColor:(state, action:PayloadAction<'dark' | 'light'>) =>{
            state.mode = action.payload
        }
    }
})

export const { setColor } = colorSlice.actions
export default colorSlice.reducer