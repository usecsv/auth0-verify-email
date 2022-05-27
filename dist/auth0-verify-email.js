(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@chakra-ui/react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@chakra-ui/react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["auth0-verify-email"] = {}, global.React, global.react));
})(this, (function (exports, React, react) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    var useHttpReq = function (fetcher) {
        var _a = React.useState({
            loading: false,
            called: false,
        }), res = _a[0], setRes = _a[1];
        var request = function () {
            setRes({ loading: true, called: true });
            return fetcher()
                .then(function (response) {
                setRes({ loading: false, called: true });
                return response;
            })
                .catch(function (err) {
                console.error(err);
                setRes({ loading: false, called: true, error: err });
            });
        };
        return [res, request];
    };

    var useCountDown = function () {
        var _a = React.useState(0), seconds = _a[0], setSeconds = _a[1];
        var intervalRef = React.useRef();
        var startCountDown = function (sec) {
            if (intervalRef.current)
                return;
            setSeconds(sec);
            intervalRef.current = setInterval(function () {
                setSeconds(function (s) {
                    if (s < 0) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = undefined;
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        };
        return { seconds: seconds, startCountDown: startCountDown };
    };
    var VerifyYourAccount = function (_a) {
        var _b;
        var email = _a.email, logout = _a.logout, sendEmail = _a.sendEmail;
        var _c = useCountDown(), seconds = _c.seconds, startCountDown = _c.startCountDown;
        var _d = useHttpReq(sendEmail), _e = _d[0], error = _e.error, loading = _e.loading, called = _e.called, callsendEmail = _d[1];
        var toManyReq = ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status) === 429;
        var errorMsg = toManyReq
            ? "You've sent to many requests, please try again later."
            : "An error occurred, please try again.";
        return (React__default["default"].createElement(react.Center, { h: "90vh", m: "auto" },
            React__default["default"].createElement(react.VStack, { align: "center", w: "40vw", textAlign: "center", spacing: 8 },
                React__default["default"].createElement(react.Text, { fontSize: "2xl" }, "Almost there \u2026"),
                React__default["default"].createElement(react.Text, null,
                    "Please check your email ",
                    React__default["default"].createElement("b", null, email),
                    " to confirm your account."),
                React__default["default"].createElement(react.Divider, null),
                React__default["default"].createElement(react.Text, null,
                    "If ",
                    React__default["default"].createElement("b", null, email),
                    " is not your email address, please",
                    " ",
                    React__default["default"].createElement(react.Box, { display: "contents", textDecoration: "underline", color: "blue", cursor: "pointer", onClick: function () { return logout(); } }, "click here to go back"),
                    " ",
                    "and enter the correct one.",
                    " "),
                React__default["default"].createElement(react.Text, null, "If you have not received our email in 15 minutes, please check your spam folder."),
                React__default["default"].createElement(react.VStack, null,
                    React__default["default"].createElement(react.Text, null, "Still can't find it?"),
                    !toManyReq && (React__default["default"].createElement(react.Button, { onClick: function () {
                            return callsendEmail().then(function (res) {
                                var _a;
                                startCountDown(30);
                                if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.url)
                                    window.location.href = res.data.url;
                            });
                        }, variant: "invertedPrimary", w: "fit-content", px: "6", size: "sm", ml: "3", disabled: loading || seconds > 0 }, !loading ? "Resend verification email" : "Loading...")),
                    !loading && called && (React__default["default"].createElement(react.Text, { color: error ? "warning.600" : "secondary.500" }, error ? errorMsg : "Your verification email has been sent, please check your inbox.")),
                    seconds > 0 && React__default["default"].createElement(react.Text, { fontSize: "xs" },
                        "You can try again in ",
                        seconds)))));
    };

    var CheckEmailVerification = function (_a) {
        var children = _a.children, logout = _a.logout, sendVerifyEmail = _a.sendVerifyEmail;
        if (typeof window === "undefined")
            return null;
        var urlParams = new URLSearchParams(window.location.search);
        var errorDescription = urlParams.get("error_description");
        var error = typeof errorDescription === "string" && window.atob(errorDescription);
        var _b = (error ? JSON.parse(error) : {}), email = _b.email, userId = _b.userId, errorCode = _b.errorCode;
        var isEmailVerified = errorCode !== "email_not_verified";
        if (isEmailVerified)
            return React__default["default"].createElement(React__default["default"].Fragment, null, children);
        return (React__default["default"].createElement(VerifyYourAccount, { sendEmail: sendVerifyEmail
                ? function () { return sendVerifyEmail(userId); }
                : function () {
                    return fetch("/api/user/send-verfication-email", {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                        method: "POST",
                        body: JSON.stringify({ id: userId }),
                    });
                }, logout: logout, email: email }));
    };

    var EmailVerifiedNextPage = function () {
        return (React__default["default"].createElement(react.ChakraProvider, null,
            React__default["default"].createElement(react.Center, { h: "100vh" },
                React__default["default"].createElement(react.VStack, { textAlign: "center", spacing: "6" },
                    React__default["default"].createElement(react.Text, null, "Your email has been verified \uD83C\uDF89"),
                    React__default["default"].createElement(react.Button, { onClick: function () { return window.location.assign("/admin"); } }, "Continue to UseCSV")))));
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var sendVerificationEmailHandler = function (req, res, getUserProfile, sendVerificationEmail) { return __awaiter(void 0, void 0, void 0, function () {
        var userResponse, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserProfile(req.body.id)];
                case 1:
                    userResponse = _a.sent();
                    user = userResponse.data;
                    if (!user)
                        res.status(404).end();
                    if (user.email_verified)
                        res.json({ url: "/admin" });
                    return [4 /*yield*/, sendVerificationEmail(req.body.id, user.email)];
                case 2:
                    _a.sent();
                    res.status(200).end();
                    return [2 /*return*/];
            }
        });
    }); };

    exports.CheckEmailVerification = CheckEmailVerification;
    exports.EmailVerifiedNextPage = EmailVerifiedNextPage;
    exports.sendVerificationEmailHandler = sendVerificationEmailHandler;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=auth0-verify-email.js.map
