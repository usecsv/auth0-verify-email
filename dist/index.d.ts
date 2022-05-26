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

declare type MessageSendingResponse = {
    To?: string;
    Cc?: string;
    Bcc?: string;
    SubmittedAt: string;
    MessageID?: string;
    ErrorCode: number;
    Message: string;
};
declare type Response = {
    status: (s: number) => Response;
    json: (j: any) => void;
    end(): () => Response;
};
declare const sendVerificationEmailHandler: (req: {
    body: any;
}, res: Response, getUserProfile: (id: string) => Promise<{
    [prop: string]: any;
    data: {
        email: string;
        username: string;
        email_verified: boolean;
    };
}>, sendVerificationEmail: (id: string, email: string) => Promise<MessageSendingResponse>) => Promise<void>;

export { CheckEmailVerification, EmailVerifiedNextPage, VerifyYourAccount, sendVerificationEmailHandler };
