import { ClientTypes } from './../Models/ClientType';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GuardState {
    user: ClientTypes | null;
}
const initialState: GuardState = {
    user: null,
};

const guardSlice = createSlice({
    name: "guard",
    initialState,
    reducers: {
        loggedIn(state, action: PayloadAction<ClientTypes>) {
            state.user = action.payload;
        },
        loggedOut(state) {
            state.user = initialState.user;
        }
    }
});

export const {
    loggedIn,
    loggedOut,
} = guardSlice.actions;

export const guardReducer = guardSlice.reducer;