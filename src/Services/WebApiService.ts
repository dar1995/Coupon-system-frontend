import axios, { AxiosResponse } from "axios";
import { LoginReqModel, LoginResModel } from "../Models/Login";
import { CouponModel } from "../Models/CouponModel";
import urlService from "./UrlService";
import { CompanyRegisterReq, CustomerRegisterReq } from "../Models/RegisterModel";
import { CompanyModel } from "../Models/CompanyModel";
import store from "../Redux/Store";
import { CustomerModel } from "../Models/CustomerModel";

class WebApiService {
    public login(data: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
        return axios.post<LoginResModel>(urlService.auth + "/login", data);
    }


    public getAllGeneralCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return axios.get<CouponModel[]>(urlService.user + "/coupons");

    }

    public getRandomCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return axios.get<CouponModel[]>(urlService.user + "/coupons/random");

    }

    public getSingleGeneralCoupon(id: number): Promise<AxiosResponse<CouponModel>> {
        return axios.get<CouponModel>(`${urlService.user}/coupons/${id}`);

    }

    public companyRegister(data: CompanyRegisterReq): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register-company", data)
    }

    public customerRegister(data: CustomerRegisterReq): Promise<AxiosResponse<any>> {
        return axios.post<any>(urlService.auth + "/register-customer", data)
    }
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.admin + "/companies", { headers })
    }

    public deleteCompany(companyId: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.delete(`${urlService.admin}/companies/${companyId}`, { headers })
    }
    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.admin + "/customers", { headers })
    }
    public deleteCustomer(customerId: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.delete(`${urlService.admin}/customers/${customerId}`, { headers })
    }
    public addCompany(company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.post(urlService.admin + "/companies", company, { headers })
    }
    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.post(urlService.admin + "/customers", customer, { headers })
    }
    public updateCompany(id: number, company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${urlService.admin}/companies/${id}`, company, { headers })
    }
    public updateCustomer(id: number, customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${urlService.admin}/customers/${id}`, customer, { headers })
    }
    public companyDetails(): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.company + "/details", { headers })
    }
    public getCompanyCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.company + "/coupons", { headers })

    }
    public deleteCoupon(couponId: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.delete(`${urlService.company}/coupons/${couponId}`, { headers })
    }

    public addCoupon(coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.post(urlService.company + "/coupons", coupon, { headers })

    }

    public updateCoupon(couponId: number, coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.put(`${urlService.company}/coupons/${couponId}`, coupon, { headers })
    }
    public customerDetails(): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.customer + "/details", { headers })
    }
    public getCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.get(urlService.customer + "/coupons", { headers })

    }
    public purchaseCoupons(couponId: number): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token }
        return axios.post(`${urlService.customer}/coupons/${couponId}`, null, { headers })

    }
}
const webApiService = new WebApiService();
export default webApiService;