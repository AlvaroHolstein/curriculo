(function(e){function t(t){for(var n,o,i=t[0],c=t[1],u=t[2],d=0,f=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={app:0},s=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},"12f2":function(e,t,a){e.exports=a.p+"img/mim.adcf5a73.jpg"},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},2:function(e,t){},"21c5":function(e,t,a){"use strict";var n=a("cef8"),r=a.n(n);r.a},2269:function(e,t){e.exports={PROD_URL:"https://alvarocurriculo.herokuapp.com/api/",JWT_SECRET:"aiuiosegredo"}},"25b7":function(e,t,a){e.exports=a.p+"img/BK.f39e239a.jpg"},3:function(e,t){},"35fd":function(e,t,a){"use strict";var n=a("e98b"),r=a.n(n);r.a},"387e":function(e,t,a){"use strict";var n=a("9a67"),r=a.n(n);r.a},4:function(e,t){},"416a":function(e,t,a){var n={"./BK.jpg":"25b7","./NS.jpg":"6fe0","./curtasVC.jpg":"75c0","./mgs.jpg":"a341","./mim.jpg":"12f2","./safira_casinopovoa.jpg":"f25b","./umportoparaomundo.jpg":"becc"};function r(e){var t=s(e);return a(t)}function s(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=s,e.exports=r,r.id="416a"},"4bfa":function(e,t,a){"use strict";var n=a("a9a4"),r=a.n(n);r.a},"4e04":function(e,t,a){},"4fff":function(e,t,a){},5:function(e,t){},5571:function(e,t,a){"use strict";var n=a("6d54"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=(a("b0c0"),a("96cf"),a("1da1")),s=a("8c4f"),o=a("2f62"),i=a("2269"),c=(a("d3b7"),a("d4ec")),u=a("bee2"),l=a("2269"),d=a("14b7"),f=function(){function e(){Object(c["a"])(this,e)}return Object(u["a"])(e,null,[{key:"verifyToken",value:function(e){return new Promise((function(t,a){d.verify(e,l.JWT_SECRET,(function(e,n){e?a(e):t(n)}))}))}}]),e}();n["default"].use(o["a"]),console.log(Object({NODE_ENV:"production",BASE_URL:"/"}));var m=new o["a"].Store({state:{logged:!1,url:i["PROD_URL"],token:null,username:null},mutations:{login:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.verifyToken(m.getters.token);case 2:a=t.sent,console.log({jwtVerified:a}),a&&(e.logged=!0,e.username=a.username);case 5:case"end":return t.stop()}}),t)})))()},logout:function(e){e.logged=!1,e.username=null},setToken:function(e,t){e.token=t},clearToken:function(e){e.token=null}},getters:{logged:function(e){return e.logged},url:function(e){return e.url},token:function(e){return e.token},username:function(e){return e.username}}}),p=m,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container-sm all-container"},[a("div",{staticClass:"row main-container"},[e.login?a("Login"):e._e(),e.login?e._e():a("Register")],1),a("div",{staticClass:"text-center log-reg-btn"},[a("button",{staticClass:"btn btn-outline-dark",on:{click:function(t){e.login=!e.login}}},[e._v(e._s(e.login?"Register":"Login"))])])])},v=[],h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12 actual-auth"},[a("h2",{staticClass:"text-center"},[e._v("Login")]),a("form",{staticClass:"login-form",on:{submit:function(t){return e.login(t)}}},[a("label",{attrs:{for:"login-part1"}},[e._v("Email/Username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPart1,expression:"loginPart1"}],staticClass:"form-control",attrs:{type:"text",id:"login-part1"},domProps:{value:e.loginPart1},on:{input:function(t){t.target.composing||(e.loginPart1=t.target.value)}}}),a("label",{attrs:{for:"password-login"}},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.pass,expression:"pass"}],staticClass:"form-control",attrs:{type:"text",id:"password-login"},domProps:{value:e.pass},on:{input:function(t){t.target.composing||(e.pass=t.target.value)}}}),e._m(0)])])},b=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center btns-div"},[a("button",{staticClass:"btn btn-outline-success",attrs:{type:"submit"}},[e._v(" Login ")])])}],w={data:function(){return{loginPart1:"",pass:""}},created:function(){},methods:{login:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.preventDefault(),a.next=3,t.http.post("".concat(t.$store.getters.url,"auth/login"),{username:t.loginPart1,password:t.pass});case 3:if(n=a.sent,!n.data.success){a.next=9;break}return t.$store.commit("setToken",n.data.jwt),a.next=8,t.$store.commit("login");case 8:t.$router.push({name:"experiencia"});case 9:case"end":return a.stop()}}),a)})))()}}},_=w,x=(a("5571"),a("2877")),C=Object(x["a"])(_,h,b,!1,null,null,null),k=C.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-12 actual-auth"},[a("h2",{staticClass:"text-center"},[e._v("Register")]),a("form",{staticClass:"register-form",on:{submit:function(t){return e.registerUser(t)}}},[a("label",{attrs:{for:"username-register"}},[e._v("Username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",id:"username-register",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email",required:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),a("label",{attrs:{for:"empresa"}},[e._v("Empresa")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.empresa,expression:"empresa"}],staticClass:"form-control",attrs:{type:"text",id:"empresa"},domProps:{value:e.empresa},on:{input:function(t){t.target.composing||(e.empresa=t.target.value)}}}),a("label",{attrs:{for:"password"}},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"text",id:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("label",{attrs:{for:"password-recheck"}},[e._v("ReCheck Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordRecheck,expression:"passwordRecheck"}],staticClass:"form-control",attrs:{type:"text",id:"password-recheck",required:""},domProps:{value:e.passwordRecheck},on:{input:function(t){t.target.composing||(e.passwordRecheck=t.target.value)}}}),e._m(0)])])},j=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center btns-div"},[a("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e._v(" Registar ")])])}],O={data:function(){return{username:"",email:"",empresa:"",password:"",passwordRecheck:""}},methods:{registerUser:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.preventDefault(),n=null,r=!1,""==t.password||""==t.passwordRecheck||t.password!=t.passwordRecheck){a.next=20;break}return r=!0,a.next=7,t.http.post("".concat(t.$store.getters.url,"auth/register"),{username:t.username,password:t.password,empresa:t.empresa,email:t.email});case 7:if(s=a.sent,console.log(s),!s.data.success){a.next=16;break}return t.$store.commit("setToken",s.data.token),a.next=13,t.$store.commit("login");case 13:t.$router.push({name:"experiencia"}),a.next=18;break;case 16:r=!1,n="Ocorreu um erro no Backends. Um momentinho !";case 18:a.next=22;break;case 20:n="As passwords não são iguais!",r=!1;case 22:r||t.$Swal.fire({position:"top-end",icon:"error",title:n,showConfirmButton:!1,timer:1500});case 23:case"end":return a.stop()}}),a)})))()}},computed:{},created:function(){}},R=O,$=Object(x["a"])(R,y,j,!1,null,null,null),E=$.exports,M={components:{Login:k,Register:E},data:function(){return{login:!0}},created:function(){this.$store.getters.logged&&this.$router.push({name:"experiencia"})}},T=M,P=(a("eba1"),Object(x["a"])(T,g,v,!1,null,null,null)),S=P.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Navbar"),a("div",{staticClass:"container-sm",attrs:{id:"app"}},[a("div",{staticClass:"row curriculo-header"},[e._m(0),a("div",{staticClass:"col-sm-6"},[a("ul",{staticClass:"first-info"},[a("li",[e._v("Álvaro Diogo Gomes Ferreira de Sousa Holstein")]),a("hr"),a("li",[e._v(e._s(e.detalhes["telemovel"]))]),a("li",[e._v(e._s(e.detalhes["email"]))]),a("li",[e._v(e._s(e.detalhes["morada"]))]),a("hr"),a("li",[a("a",{attrs:{href:e.detalhes["github"]}},[e._v("GitHub ")])]),a("li",[a("a",{attrs:{href:e.detalhes["bitbucket"]}},[e._v("Bitbucket ")])])])])]),a("div",{staticClass:"row"},[a("ul",{staticClass:"nav nav-tabs"},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"experiencia"},id:"experiencia"}},[e._v("Experiencia Profissional")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"educacao"},id:"educacao"}},[e._v("Educação")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"competencias"},id:"competencias"}},[e._v("Competencias")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"detalhes"},id:"detalhes"}},[e._v("Detalhes")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"info_adicional"},id:"info_adicional"}},[e._v("Informação Adicional")])],1)])]),a("div",[a("router-view",{attrs:{id:"router-view"}})],1),a("Messaging")],1)],1)},N=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-sm-6 image-div"},[n("img",{attrs:{alt:"My Face",src:a("12f2")}})])}],L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"message-wrapper"},[a("div",{staticClass:"fab message-icon",on:{click:function(t){return e.openMessages()}}},[a("i",{staticClass:"fa fa-comments-o",attrs:{"aria-hidden":"true"}})]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showMessages,expression:"showMessages"}],staticClass:"message-container",attrs:{id:"messaging"}},[a("div",{staticClass:"message-container-header"},[a("div",{staticClass:"fab close-messaging",on:{click:function(t){return e.closeMessages()}}},[a("i",{staticClass:"fas fa-times"})])]),a("div",{staticClass:"message-container-body"},e._l(e.messagesFilter,(function(t,n){return a("div",{key:n,staticClass:"message-text-container",class:{self:t.self,theirs:!t.self}},[a("div",{staticClass:"message-text",class:{self:t.self,theirs:!t.self}},[e._v(" "+e._s(t.message)+" ")])])})),0),a("div",{staticClass:"write-message-container row"},[a("div",{staticClass:"col-11 write-message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.textMessage,expression:"textMessage"}],staticClass:"text-message",attrs:{type:"text",id:"text"},domProps:{value:e.textMessage},on:{input:function(t){t.target.composing||(e.textMessage=t.target.value)}}})]),a("div",{staticClass:"col-1 send-container",on:{click:function(t){return e.sendMessage()}}},[a("i",{staticClass:"far fa-paper-plane"})])])])])},U=[],B=(a("ac1f"),a("1276"),a("8055")),I=a.n(B),A=a("3d20"),V=a.n(A),q={data:function(){return{textMessage:"",firstTimeChatOpen:!0,socketClient:null,messages:[],showMessages:!1}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I.a.connect(e.$store.getters.url.split("/api")[0],{withCredentials:!1,secure:!1,rejectUnauthorized:!1});case 2:e.socketClient=t.sent,e.socketClient.on("connection",(function(e){console.log("connected",e)})),e.socketClient.on("user left",(function(e){return console.log("Alguem saiu",e)})),e.socketClient.on("messageDisc",(function(t){console.log("data",t),e.receiveMessages(t)}));case 6:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;document.querySelector("#text").addEventListener("keypress",(function(t){13==t.keyCode&&e.sendMessage()}))},computed:{messagesFilter:function(){return this.messages}},methods:{openMessages:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.showMessages=!e.showMessages,!e.firstTimeChatOpen){t.next=14;break}return e.scrollDownMessageContainer(),e.firstTimeChatOpen=!1,t.next=7,f.verifyToken(e.$store.getters.token);case 7:return a=t.sent,n=a.a,r=a.b,t.next=12,e.http.post("".concat(e.$store.getters.url,"msg/getmessages"),{token:e.$store.getters.token,c:n*r});case 12:s=t.sent,s.data.success?e.messages=s.data.data:V.a.fire({position:"top-end",icon:"error",title:"Couldn't fetch Last Messages, sory!",showConfirmButton:!1,timer:1500});case 14:t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),console.error("ERROU",t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()},sendMessage:function(){if(this.textMessage){var e={message:this.textMessage,date:(new Date).toISOString(),empresa:"TBD",compId:-1,name:"TBD",self:!1};this.messages.push(e),this.socketClient.emit("mess",{text:this.textMessage,token:this.$store.getters.token}),this.textMessage="",this.scrollDownMessageContainer()}},receiveMessages:function(e){var t={message:e,date:(new Date).toISOString(),empresa:"TBD",compId:-1,name:"TBD",self:!0};this.messages.push(t),this.scrollDownMessageContainer()},closeMessages:function(){this.showMessages=!1},scrollDownMessageContainer:function(){var e=document.querySelector("div.message-container-body");setTimeout((function(){e.scrollTop=e.scrollHeight}),100)}}},F=q,H=(a("387e"),Object(x["a"])(F,L,U,!1,null,null,null)),J=H.exports,G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[a("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[e._v(e._s(null==e.$store.getters.username?e.Curriculo:e.$store.getters.username))]),e._m(0),a("div",{staticClass:"collapse navbar-collapse text-right",attrs:{id:"navbarSupportedContent"}},[a("ul",{staticClass:"navbar-nav navbar-list"},[a("li",{staticClass:"nav-item active logout-btn",on:{click:function(t){return e.logout()}}},[a("span",[e._v("Logout")])])])])])},K=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})])}],W={data:function(){return{}},methods:{logout:function(){this.$store.commit("logout"),this.$router.push({name:"auth"})}}},z=W,Q=(a("db35"),Object(x["a"])(z,G,K,!1,null,"117ffdc5",null)),X=Q.exports,Y={components:{Messaging:J,Navbar:X},data:function(){return{detalhes:{}}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.http.get("".concat(e.$store.getters.url,"infoextra"));case 2:a=t.sent,a.data.success&&(e.detalhes=a.data.data[0]);case 4:case"end":return t.stop()}}),t)})))()},computed:{}},Z=Y,ee=(a("7557"),Object(x["a"])(Z,D,N,!1,null,null,null)),te=ee.exports,ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"experiencia-wrapper"},e._l(e.filterTrabalhos,(function(t,n){return a("b-card",{key:n,staticClass:"overflow-hidden outter-card",attrs:{"no-body":""}},[a("b-row",{attrs:{"no-gutters":""}},[a("b-col",{attrs:{md:"6"}},[a("b-card-img",{staticClass:"rounded-0",attrs:{src:e.getImgUrl(t.img),alt:"Image"}})],1),a("b-col",{attrs:{md:"6"}},[a("b-card-body",{attrs:{title:t.cargo}},e._l(t.datas,(function(t,n){return a("div",{key:n},[a("b-card-text",{staticClass:"datas"},[a("span",{staticClass:"data-inicio"},[e._v(e._s(void 0==t.data_inicio?"little error":t.data_inicio.split("T")[0]))]),e._v(" até "),a("span",{staticClass:"data-fim"},[e._v(e._s(void 0==t.data_fim?"little error":t.data_fim.split("T")[0]))])]),a("b-card-text",{staticClass:"resumo"},[e._v(" "+e._s(t.resumo)+" ")])],1)})),0)],1)],1)],1)})),1)},ne=[],re=(a("c740"),a("b85c")),se={data:function(){return{trabalhos:[]}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.$store.getters.url,"exp"));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,n.success&&(e.trabalhos=n.data);case 7:case"end":return t.stop()}}),t)})))()},computed:{filterTrabalhos:function(){var e,t=this.trabalhos,a=t.sort((function(e,t){return new Date(t.data_inicio).getTime()-new Date(e.data_inicio).getTime()})),n=[],r=Object(re["a"])(a);try{var s=function(){var t=e.value,r={empresa:"",cargo:"",datas:[],identifier:"",img:""};if(-1==n.findIndex((function(e){return e.identifier==t.identifier}))){r.empresa=t.empresa,r.cargo=t.cargo,r.identifier=t.identifier,n.push(r);var s,o=Object(re["a"])(a);try{for(o.s();!(s=o.n()).done;){var i=s.value;if(t.identifier==i.identifier&&n.length>0)for(var c=0;c<n.length;c++)n[c].identifier==i.identifier&&(n[c].datas.push({data_inicio:i.data_inicio,data_fim:i.data_fim,resumo:i.resumo}),""!=i.img&&(n[c].img=i.img))}}catch(u){o.e(u)}finally{o.f()}}};for(r.s();!(e=r.n()).done;)s()}catch(o){r.e(o)}finally{r.f()}return console.log(n),n}},methods:{getImgUrl:function(e){var t=a("416a");return t("./"+e)}}},oe=se,ie=(a("35fd"),Object(x["a"])(oe,ae,ne,!1,null,null,null)),ce=ie.exports,ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"escolas-wrapper"},e._l(e.escolas,(function(t,n){return a("b-card",{key:n,staticClass:"overflow-hidden outter-card",attrs:{"no-body":""}},[a("b-row",[a("b-col",{attrs:{md:"12"}},[a("b-card-body",{attrs:{title:t.nome_curso}},[a("h5",[e._v(e._s(t.nome))]),a("b-card-text",{staticClass:"datas"},[a("span",{staticClass:"data-inicio"},[e._v(e._s(t.data_inicio))]),e._v(" até "),a("span",{staticClass:"data-fim"},[e._v(e._s(t.data_inicio))])])],1)],1)],1)],1)})),1)},le=[],de={data:function(){return{escolas:[]}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.$store.getters.url,"escola"));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,n.success&&(e.escolas=n.data);case 7:case"end":return t.stop()}}),t)})))()},methods:{}},fe=de,me=(a("4bfa"),Object(x["a"])(fe,ue,le,!1,null,"60cea952",null)),pe=me.exports,ge=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"competencias-wrapper"},e._l(e.competencias,(function(t,n){return a("div",{key:n},[a("div",{staticClass:"competencias-list row"},[a("div",{staticClass:"col-3"},[e._v(e._s(t.name))]),a("div",{staticClass:"col-8"},e._l(e.maxScore,(function(e,n){return a("span",{key:n,staticClass:"circle",class:{fill:t.current>=e}})})),0)])])})),0)},ve=[],he={data:function(){return{competencias:[],maxScore:5}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.$store.getters.url,"competencias"));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,n.success&&(e.competencias=n.data);case 7:case"end":return t.stop()}}),t)})))()}},be=he,we=(a("21c5"),Object(x["a"])(be,ge,ve,!1,null,"5ea63720",null)),_e=we.exports,xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"detalhes-wrapper",domProps:{innerHTML:e._s(void 0==e.detalhes[0]?"Ocorreu um erro ao carregar esta informação":e.detalhes[0].resumo)}})},Ce=[],ke={data:function(){return{detalhes:[]}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.$store.getters.url,"infoextra"));case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,n.success&&(e.detalhes=n.data);case 7:case"end":return t.stop()}}),t)})))()}},ye=ke,je=Object(x["a"])(ye,xe,Ce,!1,null,null,null),Oe=je.exports,Re=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"info-wrapper",domProps:{innerHTML:e._s(this.markdown)}})},$e=[],Ee={data:function(){return{markdown:""}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.http.get("".concat(e.$store.getters.url,"extra-info"));case 3:a=t.sent,console.log(a),a.data.success&&(e.markdown=e.markyIt.render(a.data.data)),t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),e.markdown="Ocorreu um erro ao carregar esta informação";case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},Me=Ee,Te=Object(x["a"])(Me,Re,$e,!1,null,null,null),Pe=Te.exports,Se=a("bc3a"),De=a.n(Se);n["default"].use(s["a"]);var Ne=new s["a"]({routes:[{path:"/auth",name:"auth",component:S},{path:"/",name:"cv",component:te,children:[{path:"/exp",name:"experiencia",component:ce},{path:"/educacao",name:"educacao",component:pe},{path:"/competencias",name:"competencias",component:_e},{path:"/detalhes",name:"detalhes",component:Oe},{path:"/info",name:"info_adicional",component:Pe}]}]});Ne.beforeEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a,n){var r,s,o,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,r=!0,console.log(Object({NODE_ENV:"production",BASE_URL:"/"})),"auth"!=t.name&&0==p.getters.logged&&(r=!1),"auth"==t.name||1!=p.getters.logged){e.next=14;break}return e.next=7,f.verifyToken(p.getters.token);case 7:return s=e.sent,o=s.a,i=s.b,console.log({a:o,b:i,jwtVerified:s}),e.next=12,De.a.post("".concat(p.getters.url,"auth/verify"),{token:p.getters.token,c:o*i});case 12:c=e.sent,c.data.success||(r=!1);case 14:n(r),r||"auth"==a.name||Ne.push({name:"auth"}),e.next=22;break;case 18:e.prev=18,e.t0=e["catch"](0),console.error(e.t0),n(!1);case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t,a,n){return e.apply(this,arguments)}}());var Le=Ne,Ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-link",{attrs:{to:{name:"experiencia"}}}),a("router-link",{attrs:{to:{name:"auth"}}}),a("router-view")],1)},Be=[],Ie={name:"App",components:{},data:function(){return{}},computed:{}},Ae=Ie,Ve=(a("5c0b"),Object(x["a"])(Ae,Ue,Be,!1,null,null,null)),qe=Ve.exports,Fe=a("14b7"),He=a.n(Fe),Je=a("ed18"),Ge=a.n(Je),Ke=a("d4cd"),We=a.n(Ke),ze=a("5f5b"),Qe=a("b1e0");Ge.a.config(),n["default"].config.productionTip=!1,console.log(Object({NODE_ENV:"production",BASE_URL:"/"})),n["default"].prototype.http=De.a,n["default"].prototype.jwt=He.a,n["default"].prototype.$Swal=V.a,n["default"].prototype.markyIt=new We.a,n["default"].use(Le),n["default"].use(o["a"]),n["default"].use(ze["a"]),n["default"].use(Qe["a"]),new n["default"]({render:function(e){return e(qe)},router:Le,store:p}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var n=a("4fff"),r=a.n(n);r.a},6:function(e,t){},"6d54":function(e,t,a){},"6fe0":function(e,t,a){e.exports=a.p+"img/NS.22159167.jpg"},7:function(e,t){},7557:function(e,t,a){"use strict";var n=a("7fef"),r=a.n(n);r.a},"75c0":function(e,t,a){e.exports=a.p+"img/curtasVC.4eee16b3.jpg"},"7fef":function(e,t,a){},8:function(e,t){},9:function(e,t){},"9a67":function(e,t,a){},a341:function(e,t,a){e.exports=a.p+"img/mgs.c18262c9.jpg"},a9a4:function(e,t,a){},becc:function(e,t,a){e.exports=a.p+"img/umportoparaomundo.c3b337ba.jpg"},c81e:function(e,t,a){},cef8:function(e,t,a){},db35:function(e,t,a){"use strict";var n=a("4e04"),r=a.n(n);r.a},e98b:function(e,t,a){},eba1:function(e,t,a){"use strict";var n=a("c81e"),r=a.n(n);r.a},f25b:function(e,t,a){e.exports=a.p+"img/safira_casinopovoa.01e32109.jpg"}});
//# sourceMappingURL=app.64cdc13d.js.map