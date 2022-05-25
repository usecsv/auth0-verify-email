/// <reference types="react" />
import * as react from 'react';

declare const VerifyYourAccount: react.FC<{
    email: string;
    logout: () => any;
    sendEmail: () => Promise<any>;
}>;

export { VerifyYourAccount as default };
