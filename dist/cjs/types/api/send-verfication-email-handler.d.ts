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
    json: (j: any) => Response;
    end(): () => Response;
};
export declare const sendVerificationEmailHandler: (req: {
    body: any;
}, res: Response, getUserProfile: (id: string) => Promise<{
    data: {
        email: string;
        username: string;
        email_verified: boolean;
    };
}>, sendVerificationEmail: (id: string, email: string) => Promise<MessageSendingResponse>) => Promise<void>;
export {};
