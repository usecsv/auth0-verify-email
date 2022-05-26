import React, { FC } from "react";
import VerifyYourAccount from "./VerifyYourAccount";
type CheckEmailVerificationProps = {
  sendVerifyEmail: (userId: string) => Promise<any>;
  logout: () => void;
};
const CheckEmailVerification: FC<CheckEmailVerificationProps> = ({ children, logout, sendVerifyEmail }) => {
  if (typeof window === "undefined") return null;
  const urlParams = new URLSearchParams(window.location.search);
  const errorDescription = urlParams.get("error_description");
  const error = typeof errorDescription === "string" && window.atob(errorDescription);
  const { email, userId, errorCode } = (error ? JSON.parse(error) : {}) as any;
  const isEmailVerified = errorCode !== "email_not_verified";
  if (isEmailVerified) return <>{children}</>;
  return <VerifyYourAccount sendEmail={() => sendVerifyEmail(userId)} logout={logout} email={email} />;
};

export default CheckEmailVerification;
