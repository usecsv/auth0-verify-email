function emailVerified(user, context, callback) {
  if (!user.email_verified) {
    let data = {
      errorCode: "email_not_verified",
      userId: user.user_id,
      email: user.email,
    };
    let buff = new Buffer(JSON.stringify(data));
    let base64data = buff.toString("base64");
    return callback(new UnauthorizedError(base64data));
  } else {
    return callback(null, user, context);
  }
}
