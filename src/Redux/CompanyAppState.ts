import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CompanyModel } from '../Models/CompanyModel';
interface CompaniesState {
    companies: CompanyModel[];
}
const initialState: CompaniesState = {
    companies: [],
}


const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        gotAllCompaniesAction(state, action: PayloadAction<CompanyModel[]>) {
            state.companies = action.payload;
        },
        deletedCompanyAction(state, action: PayloadAction<number>) {
            state.companies = state.companies.filter((company) => company.id !== action.payload);
        },
        updatedCompanyAction(state, action: PayloadAction<CompanyModel>) {
            const idx = state.companies.findIndex(c => c.id === action.payload.id);
            state.companies[idx] = action.payload
        },
        addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
            state.companies.push(action.payload);
        },
        clearAllCompanies(state) {
            state.companies = initialState.companies;
        }


    }
});

export const {
    gotAllCompaniesAction,
    deletedCompanyAction,
    updatedCompanyAction,
    addedCompanyAction,
    clearAllCompanies,
} = companiesSlice.actions;

export const companiesReducer = companiesSlice.reducer;
