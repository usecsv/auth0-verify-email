/// <reference types="react" />
declare const VerifyYourAccount: import("react").FC<{
    email: string;
    logout: () => any;
    sendEmail: () => Promise<any>;
}>;
export default VerifyYourAccount;
