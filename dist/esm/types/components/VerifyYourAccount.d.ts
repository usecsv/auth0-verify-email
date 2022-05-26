import React from "react";
declare type VerifyYourAccountProps = {
    email: string;
    logout: () => any;
    sendEmail: () => Promise<any>;
};
export declare const VerifyYourAccount: React.FC<VerifyYourAccountProps>;
export {};
