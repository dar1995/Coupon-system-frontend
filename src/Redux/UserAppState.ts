import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginResModel } from "../Models/Login";

interface UserState {
    user: LoginResModel
}

const initialState: UserState = {
    user: { token: "", name: "" }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(state, action: PayloadAction<LoginResModel>) {
            state.user = action.payload;
        },
        userLoggedOut(state) {
            state.user = initialState.user;
        }
    }
})

export const {
    userLoggedIn,
    userLoggedOut,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
