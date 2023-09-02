export interface CustomerRegisterDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: string;
}

export interface CompanyRegisterDetails {
    name: string,
    email: string;
    password: string;
    confirm: string;
}

export interface CustomerRegisterReq {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CompanyRegisterReq {
    name: string,
    email: string;
    password: string;

}