import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IdState {
    id: number
}

const initialState: IdState = {
    id: 0
}

const idSlice = createSlice({
    name: "id",
    initialState,
    reducers: {
        setId(state, action: PayloadAction<number>) {
            state.id = action.payload;
        },
        clearId(state) {
            state.id = initialState.id;
        }
    }
})

export const {
    setId,
    clearId
} = idSlice.actions;

export const idReducer = idSlice.reducer;