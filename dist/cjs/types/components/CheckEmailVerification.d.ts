import { FC } from "react";
declare type CheckEmailVerificationProps = {
    sendVerifyEmail: (userId: string) => Promise<any>;
    logout: () => void;
};
export declare const CheckEmailVerification: FC<CheckEmailVerificationProps>;
export {};
