import { customersReducer } from './CustomerAppState';
import { idReducer } from './DeleteIdAppState';
import { guardReducer } from './GuardAppState';
import { userReducer } from './UserAppState';
import { generalCouponsReducer } from './GeneralCouponsAppState';
import { companiesReducer } from './CompanyAppState';
import { themeReducer } from './ThemeAppState';
import { configureStore } from '@reduxjs/toolkit';
import { couponsReducer } from './CouponAppState';

const rootReducer = {
    themeReducer: themeReducer,
    generalCouponsReducer: generalCouponsReducer,
    userReducer: userReducer,
    guardReducer: guardReducer,
    companiesReducer: companiesReducer,
    customersReducer: customersReducer,
    idReducer: idReducer,
    couponsReducer: couponsReducer,
}

const store = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>;
export default store;