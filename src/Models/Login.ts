
export interface LoginReqModel {
    email: string,
    password: string,
    clientType: string

}

export interface LoginResModel {
    token: string;
    name: string;
}

