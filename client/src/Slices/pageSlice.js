import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

export const pageSlice = createSlice({
    name: 'Expenses',
    initialState,
    reducers: {
      addExpense : (state , action)=>{
     
        return state = action.payload;
      }
     
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addExpense } = pageSlice.actions
  
  export default pageSlice.reducer