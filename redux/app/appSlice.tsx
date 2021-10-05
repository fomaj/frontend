import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
    walletOpened: boolean
}

const initialState: AppState = {
    walletOpened: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWalletOpen: (state, action: PayloadAction<boolean>) => {
            state.walletOpened = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setWalletOpen } = appSlice.actions

export default appSlice.reducer