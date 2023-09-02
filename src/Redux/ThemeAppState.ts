import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../Models/ThemeType';
interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: 'light'
};

export enum ActionType {
    SET_THEME = "SET_THEME",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload
        }
    }
})

export const {
    setTheme,
} = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
