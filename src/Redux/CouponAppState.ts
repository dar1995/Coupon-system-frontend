import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CouponModel } from "../Models/CouponModel";

interface CouponsState {
    coupons: CouponModel[];
}
const initialState: CouponsState = {
    coupons: [],
}


const couponsSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {
        gotAllCouponsAction(state, action: PayloadAction<CouponModel[]>) {
            state.coupons = action.payload;
        },
        deletedCouponAction(state, action: PayloadAction<number>) {
            state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
        },
        updatedCouponAction(state, action: PayloadAction<CouponModel>) {
            const idx = state.coupons.findIndex(c => c.id === action.payload.id);
            state.coupons[idx] = action.payload
        },
        addedCouponAction(state, action: PayloadAction<CouponModel>) {
            state.coupons.push(action.payload);
        },
        clearAllCoupons(state) {
            state.coupons = initialState.coupons;
        }
    }
});

export const {
    gotAllCouponsAction,
    deletedCouponAction,
    updatedCouponAction,
    addedCouponAction,
    clearAllCoupons,
} = couponsSlice.actions;

export const couponsReducer = couponsSlice.reducer;