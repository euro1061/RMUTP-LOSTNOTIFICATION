import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialValue = {
    loading: false,
    settings: {},
    error: ''
}

export const setAllSetting = createAsyncThunk(
    "setting/setAllSetting", () => {
        return axios
            .get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/other-setting`)
            .then(res => res.data)
    }
)

const settingSlice = createSlice({
    name: "setting",
    initialState: initialValue,
    extraReducers: (builder) => {
        builder.addCase(setAllSetting.pending, (state) => {
            state.loading = true
        })
        builder.addCase(setAllSetting.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
            state.error = ''
        })
        builder.addCase(setAllSetting.rejected, (state, action) => {
            state.loading = false
            state.settings = {}
            state.error = action.error.message
        })
    }
})
  export default settingSlice.reducer;
