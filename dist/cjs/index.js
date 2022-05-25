"use strict";var e=require("@chakra-ui/react"),t=require("react");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=n(t),a=function(n){var a,l=n.email,o=n.logout,u=n.sendEmail,c=function(){var e=t.useState(0),n=e[0],r=e[1],a=t.useRef();return{seconds:n,startCountDown:function(e){a.current||(r(e),a.current=setInterval((function(){r((function(e){return e<0?(clearInterval(a.current),a.current=void 0,0):e-1}))}),1e3))}}}(),i=c.seconds,d=c.startCountDown,s=function(e){var n=t.useState({loading:!1,called:!1}),r=n[0],a=n[1];return[r,function(){return a({loading:!0,called:!0}),e().then((function(e){return a({loading:!1,called:!0}),e})).catch((function(e){console.error(e),a({loading:!1,called:!0,error:e})}))}]}(u),f=s[0],m=f.error,v=f.loading,E=f.called,g=s[1],h=429===(null===(a=null==m?void 0:m.response)||void 0===a?void 0:a.status),x=h?"You've sent to many requests, please try again later.":"An error occurred, please try again.";return r.default.createElement(e.Center,{h:"90vh",m:"auto"},r.default.createElement(e.VStack,{align:"center",w:"40vw",textAlign:"center",spacing:8},r.default.createElement(e.Text,{fontSize:"2xl"},"Almost there …"),r.default.createElement(e.Text,null,"Please check your email ",r.default.createElement("b",null,l)," to confirm your account."),r.default.createElement(e.Divider,null),r.default.createElement(e.Text,null,"If ",r.default.createElement("b",null,l)," is not your email address, please"," ",r.default.createElement(e.Box,{display:"contents",textDecoration:"underline",color:"blue",cursor:"pointer",onClick:function(){return o()}},"click here to go back")," ","and enter the correct one."," "),r.default.createElement(e.Text,null,"If you have not received our email in 15 minutes, please check your spam folder."),r.default.createElement(e.VStack,null,r.default.createElement(e.Text,null,"Still can't find it?"),!h&&r.default.createElement(e.Button,{onClick:function(){return g().then((function(e){var t;d(30),(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.url)&&(window.location.href=e.data.url)}))},variant:"invertedPrimary",w:"fit-content",px:"6",size:"sm",ml:"3",disabled:v||i>0},v?"Loading...":"Resend verification email"),!v&&E&&r.default.createElement(e.Text,{color:m?"warning.600":"secondary.500"},m?x:"Your verification email has been sent, please check your inbox."),i>0&&r.default.createElement(e.Text,{fontSize:"xs"},"You can try again in ",i))))};module.exports=a;
//# sourceMappingURL=index.js.map