type MessageSendingResponse = {
  To?: string;
  Cc?: string;
  Bcc?: string;
  SubmittedAt: string;
  MessageID?: string;
  ErrorCode: number;
  Message: string;
};

type Response = {
  status: (s: number) => Response;
  json: (j: any) => void;
  end: () => void;
};
const sendVerificationEmailHandler = async (
  req: { body: any },
  res: Response,
  getUserProfile: (
    id: string,
  ) => Promise<{ data: { email: string; username: string; email_verified: boolean }; [prop: string]: any }>,
  sendVerificationEmail: (id: string, email: string) => Promise<MessageSendingResponse>,
) => {
  const userResponse = await getUserProfile(req.body.id);
  const user = userResponse.data;
  if (!user) res.status(404).end();
  if (user.email_verified) res.json({ url: "/admin" });
  await sendVerificationEmail(req.body.id, user.email);
  res.status(200).end();
};
export default sendVerificationEmailHandler;
