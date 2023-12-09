import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value : {},
  },
  reducers: {
    updateData: (state, action) => {
        state.value[action.payload[1]]=action.payload[0];
    },
  },
})
export const { updateData } = dataSlice.actions

export default dataSlice.reducer