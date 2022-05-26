import React, { FC } from 'react';

declare type VerifyYourAccountProps = {
    email: string;
    logout: () => any;
    sendEmail: () => Promise<any>;
};
declare const VerifyYourAccount: React.FC<VerifyYourAccountProps>;

declare const EmailVerifiedNextPage: FC;

declare type CheckEmailVerificationProps = {
    sendVerifyEmail: (userId: string) => Promise<any>;
    logout: () => void;
};
declare const CheckEmailVerification: FC<CheckEmailVerificationProps>;

export { CheckEmailVerification, EmailVerifiedNextPage, VerifyYourAccount };
