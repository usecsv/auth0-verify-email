import { Box, Center, Divider, Text, VStack, Button } from "@chakra-ui/react";
import React,{ useRef, useState } from "react";
import useHttpReq from "./useHttpReq";

const useCountDown = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<any>();
  const startCountDown = (sec: number) => {
    if (intervalRef.current) return;
    setSeconds(sec);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s < 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };
  return { seconds, startCountDown };
};
type VerifyYourAccountProps = { email: string; logout: () => any; sendEmail: () => Promise<any> };

export const VerifyYourAccount: React.FC<VerifyYourAccountProps> = ({ email, logout, sendEmail }) => {
  const { seconds, startCountDown } = useCountDown();
  const [{ error, loading, called }, callsendEmail] = useHttpReq(sendEmail);

  const toManyReq = error?.response?.status === 429;
  const errorMsg = toManyReq
    ? "You've sent to many requests, please try again later."
    : "An error occurred, please try again.";

  return (
    <Center h="90vh" m="auto">
      <VStack align="center" w="40vw" textAlign="center" spacing={8}>
        <Text fontSize="2xl">Almost there …</Text>
        <Text>
          Please check your email <b>{email}</b> to confirm your account.
        </Text>
        <Divider />
        <Text>
          If <b>{email}</b> is not your email address, please{" "}
          <Box display="contents" textDecoration="underline" color="blue" cursor="pointer" onClick={() => logout()}>
            click here to go back
          </Box>{" "}
          and enter the correct one.{" "}
        </Text>
        <Text>If you have not received our email in 15 minutes, please check your spam folder.</Text>
        <VStack>
          <Text>Still can't find it?</Text>
          {!toManyReq && (
            <Button
              onClick={() =>
                callsendEmail().then((res) => {
                  startCountDown(30);

                  if (res?.data?.url) window.location.href = res.data.url;
                })
              }
              variant="invertedPrimary"
              w="fit-content"
              px="6"
              size="sm"
              ml="3"
              disabled={loading || seconds > 0}
            >
              {!loading ? "Resend verification email" : "Loading..."}
            </Button>
          )}

          {!loading && called && (
            <Text color={error ? "warning.600" : "secondary.500"}>
              {error ? errorMsg : "Your verification email has been sent, please check your inbox."}
            </Text>
          )}
          {seconds > 0 && <Text fontSize="xs">You can try again in {seconds}</Text>}
        </VStack>
      </VStack>
    </Center>
  );
};

