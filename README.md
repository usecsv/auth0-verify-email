# Auth0 Verify email

This repository contains module and component that are shared across layercode
components and libraries. They are considered internal to layercode, without
any stability guarantees for external usage.


# How to use

## in front-end
  - use the `CheckEmailVerification` in your app just bellow the auth provider, and you need to provide the auth0 logout function
  - add a page at "/email-verified" using the `EmailVerifiedNextPage` component (just serve the component)

## back-end

  - add an api route at "/api/user/send-verfication-email" using the `sendVerificationEmailHandler` (ps: you actually have to have a mailhandler and `sendVerificationEmailHandler` takes `sendVerificationEmail function` as a param)

## auth0 config
  - add the hooks and rules under ./auth0

and voila!

