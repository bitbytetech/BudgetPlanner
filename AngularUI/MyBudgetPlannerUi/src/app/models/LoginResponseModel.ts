export interface LoginResponseModel {
    isLoginSuccess: boolean;
    token: string;
    userId: string;
    fName: string;
    lName: string;
    email: string;
    mobile: string;
    fullName: string;
    issuedAt: string;
}
