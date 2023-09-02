import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerModel } from "../Models/CustomerModel";

interface CustomersState {
    customers: CustomerModel[];
}
const initialState: CustomersState = {
    customers: [],
}

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
            state.customers = action.payload;
        },
        deletedCustomerAction(state, action: PayloadAction<number>) {
            state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        },
        updatedCustomerAction(state, action: PayloadAction<CustomerModel>) {
            const idx = state.customers.findIndex(c => c.id === action.payload.id);
            state.customers[idx] = action.payload
        },
        addedCustomerAction(state, action: PayloadAction<CustomerModel>) {
            state.customers.push(action.payload);
        },
        clearAllCustomers(state) {
            state.customers = initialState.customers;
        }


    }
});

export const {
    gotAllCustomersAction,
    deletedCustomerAction,
    updatedCustomerAction,
    addedCustomerAction,
    clearAllCustomers,
} = customersSlice.actions;

export const customersReducer = customersSlice.reducer;