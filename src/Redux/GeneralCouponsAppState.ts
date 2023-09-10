import { CouponModel } from './../Models/CouponModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface GeneralCouponsState {
    coupons: CouponModel[];
    isWithdraw:boolean;
}
const initialState: GeneralCouponsState = {
    coupons: [],
    isWithdraw: false,
}


const generalCouponsSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {
        gotAllGeneralCouponsAction(state, action: PayloadAction<CouponModel[]>) {
            state.coupons = action.payload;
            state.isWithdraw = true;
        },
        deletedGeneralCouponAction(state, action: PayloadAction<number>) {
            state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
        },
        addedGeneralCouponAction(state, action: PayloadAction<CouponModel>) {
            state.coupons.push(action.payload);
        }
    }
});

export const {
    gotAllGeneralCouponsAction,
    deletedGeneralCouponAction,
    addedGeneralCouponAction
} = generalCouponsSlice.actions;

export const generalCouponsReducer = generalCouponsSlice.reducer;