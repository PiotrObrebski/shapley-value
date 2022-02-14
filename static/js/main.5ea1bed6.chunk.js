(this["webpackJsonpshapley-value"]=this["webpackJsonpshapley-value"]||[]).push([[0],{141:function(e,t,a){},146:function(e,t,a){},222:function(e,t,a){},228:function(e,t,a){},229:function(e,t,a){},230:function(e,t,a){},231:function(e,t,a){},232:function(e,t,a){"use strict";a.r(t);a(141);var n=a(0),c=a.n(n),r=a(33),i=a.n(r),l=(a(146),a(147),a(133)),s=a(238),u=a(26),o=a(237),j=a(240),b=a(7),d=function(e){var t=e.message,a=e.maxValue,n=e.handleNumberOfPlayesChange;return Object(b.jsxs)(o.a,{labelCol:{span:12},wrapperCol:{span:12},layout:"horizontal",size:"middle",className:"number-of-players-input",children:[Object(b.jsx)("div",{className:"error-message",children:t}),Object(b.jsx)(o.a.Item,{labelAlign:"right",label:"Number of players",children:Object(b.jsx)(j.a,{min:0,max:a-1,defaultValue:0,onChange:n})})]})},O=function(){return Object(b.jsx)("div",{className:"function-definition-input"})},f=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),a=(t[0],t[1]),c=Object(n.useState)([]),r=Object(u.a)(c,2),i=(r[0],r[1],Object(n.useState)(void 0)),l=Object(u.a)(i,2),s=l[0],o=l[1],j=Object(n.useState)([]),f=Object(u.a)(j,2),h=(f[0],f[1]),x=Object(n.useState)([]),p=Object(u.a)(x,2),v=(p[0],p[1]),m=Object(n.useState)([]),y=Object(u.a)(m,2);y[0],y[1];return Object(b.jsxs)("div",{className:"calculator-coalition-definition",children:[Object(b.jsx)(d,{maxValue:10,message:s,handleNumberOfPlayesChange:function(e){e<10?(a(function(e){return Array.from({length:e},(function(e,t){return t+1}))}(e)),v(Array(Math.pow(2,e)).fill(0)),h([]),o(void 0)):o("Number of coalition members exceded!")}}),Object(b.jsx)(O,{})]})},h=a(234),x=a(235),p=a(63),v=(a(222),a(34)),m=a(132),y=function(e,t){var a=-1;return e.forEach((function(e,n){m.a.isEqual(e,t)&&(a=n)})),a},g=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;e>0;)t*=e--;return t},N=function(e,t,a){var n=[];return e.forEach((function(c){var r=function(e,t,a,n){var c=0;return a.forEach((function(r){if(r.includes(e)){var i=n[y(a,r)],l=Object(v.a)(r);l.splice(r.indexOf(e),1);var s=n[y(a,l)],u=g(l.length),o=g(t.length-l.length-1)*u/g(t.length);c+=(i-s)*o}})),Number(c.toFixed(2))}(c,e,t,a);n.push(r)})),n},C=function(e){return Array.from({length:e},(function(e,t){return t+1}))},P=function(e,t){var a=Array(t).fill(0);return e.forEach((function(e){var t,n,c=e.positivePlayers.length,r=e.negativePlayers.length,i=(t=c,n=r,e.value*g(t-1)*g(n)/g(t+n)),l=function(e,t,a){return-1*a*(g(t-1)*g(e))/g(e+t)}(r,c,e.value);e.positivePlayers.forEach((function(e){a[parseFloat(e)-1]+=i})),e.negativePlayers.forEach((function(e){a[parseFloat(e)-1]+=l}))})),a},S=a(61),E=a(236),k=a(100),V=a.n(k),T=function(e){var t=e.coalitionsArray,a=e.functionOfCoalitions,n=e.setFunctionOfCoalitions,c=null===t||void 0===t?void 0:t.map((function(e,t){return{key:t,coalition:e.length?e.toString():"\xd8",value:0}})),r=[{title:"Coalition Structure",dataIndex:"coalition",key:"coalition",align:"right"},{title:"Value",dataIndex:"value",key:"value",render:function(e,t){return Object(b.jsx)(j.a,{value:a[t.key],defaultValue:0,onChange:function(e){var c=Object(v.a)(a);c[t.key]=e,n(c)}})},align:"left"}];return Object(b.jsx)(E.a,{bordered:!0,size:"small",dataSource:c,pagination:!1,scroll:{y:300},className:"coalition-structures-input",children:r.map((function(e){return Object(b.jsx)(V.a,Object(S.a)({},e))}))})},w=function(e){var t=e.listShapleyValues,a=e.tableMaxHeight,n=t.map((function(e,t){return{key:t,value:e,playerNumber:t+1}}));return Object(b.jsx)(E.a,{bordered:!0,size:"small",dataSource:n,pagination:!1,scroll:{y:null!==a&&void 0!==a?a:300},className:"display-generated-values",children:[{title:"Player number",dataIndex:"playerNumber",key:"playerNumber",align:"center"},{title:"Player Shapley Value",dataIndex:"value",key:"value",align:"center"}].map((function(e){return Object(b.jsx)(V.a,Object(S.a)({},e))}))})},A=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)([]),i=Object(u.a)(r,2),l=i[0],s=i[1],o=Object(n.useState)(void 0),j=Object(u.a)(o,2),O=j[0],f=j[1],v=Object(n.useState)([]),m=Object(u.a)(v,2),y=m[0],g=m[1],P=Object(n.useState)([]),S=Object(u.a)(P,2),E=S[0],k=S[1];return Object(n.useEffect)((function(){a&&s(function(e){for(var t=e.length,a=[],n=0;n<Math.pow(2,t);n++){for(var c=[],r=0;r<t;r++)n&1<<r&&c.push(e[r]);a.push(c)}return a}(a))}),[a]),Object(b.jsxs)("div",{className:"calculator-coalition-structures",children:[Object(b.jsx)(d,{maxValue:10,message:O,handleNumberOfPlayesChange:function(e){e<10?(c(C(e)),k(Array(Math.pow(2,e)).fill(0)),g([]),f(void 0)):f("Number of coalition members exceded!")}}),Object(b.jsxs)(h.a,{justify:"center",children:[Object(b.jsx)(x.a,{xs:24,sm:24,md:24,lg:10,xl:10,children:Object(b.jsx)(T,{coalitionsArray:l,functionOfCoalitions:E,setFunctionOfCoalitions:k})}),Object(b.jsx)(x.a,{xs:24,sm:24,md:24,lg:4,xl:4,children:Object(b.jsx)(p.a,{type:"primary",disabled:!a.length,className:"generate-button",onClick:function(){return g(N(a,l,E))},children:"Generate"})}),Object(b.jsx)(x.a,{xs:24,sm:24,md:24,lg:10,xl:10,children:Object(b.jsx)(w,{listShapleyValues:y})})]})]})},F=a(241),I=a(137),M=function(e){var t=e.rules,a=e.setRules;return Object(b.jsx)("div",{className:"add-mc-nets-rule",children:Object(b.jsxs)(h.a,{justify:"center",align:"middle",children:[Object(b.jsx)(x.a,{flex:"64px",children:"          Add Rule"}),Object(b.jsx)(x.a,{flex:"40px",children:Object(b.jsx)(p.a,{type:"primary",shape:"circle",icon:Object(b.jsx)(I.a,{}),onClick:function(){return a([].concat(Object(v.a)(t),[{positivePlayers:[],negativePlayers:[],value:0}]))}})})]})})},R=a(242),K=a(83),_=function(e){var t=e.options,a=e.value,n=e.onChange;return Object(b.jsx)("div",{className:"player-group",children:Object(b.jsx)(K.a.Group,{options:t,value:a,onChange:n,style:{width:"calc(".concat(t.length," * 52px)")}})})},z=(a(228),a(229),function(e){var t=e.index,a=e.nrPlayers,n=e.rules,c=e.setRules,r=C(a).map(String);return Object(b.jsx)("div",{className:"mc-nets-rule",children:Object(b.jsxs)(h.a,{align:"middle",wrap:!1,justify:"center",children:[Object(b.jsxs)(x.a,{flex:"100px",className:"mc-nets-rule-name",children:["Rule nr ".concat(t),Object(b.jsx)(j.a,{placeholder:"Value",onChange:function(e){var a=Object(v.a)(n);a[t].value=e,c(a)},value:n[t].value})]}),Object(b.jsxs)(x.a,{flex:"auto",children:[Object(b.jsx)("div",{className:"player-group-name",children:"Positive Players"}),Object(b.jsx)(_,{onChange:function(e){var a=Object(v.a)(n);a[t].positivePlayers=e,a[t].negativePlayers=a[t].negativePlayers.filter((function(t){return!e.includes(t)})),c(a)},value:n[t].positivePlayers,options:r})]}),Object(b.jsxs)(x.a,{flex:"auto",children:[Object(b.jsx)("div",{className:"player-group-name",children:"Negative Players"}),Object(b.jsx)(_,{onChange:function(e){var a=Object(v.a)(n);a[t].negativePlayers=e,a[t].positivePlayers=a[t].positivePlayers.filter((function(t){return!e.includes(t)})),c(a)},value:n[t].negativePlayers,options:r})]}),Object(b.jsx)(x.a,{flex:"32px",children:Object(b.jsx)(p.a,{type:"primary",shape:"circle",icon:Object(b.jsx)(R.a,{}),onClick:function(){var e=Object(v.a)(n);e.splice(t,1),c(e)}})})]})})}),G=(a(230),function(){var e=Object(n.useState)(0),t=Object(u.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)([]),i=Object(u.a)(r,2),l=i[0],s=i[1],o=Object(n.useState)([]),j=Object(u.a)(o,2),O=j[0],f=j[1],m=Object(n.useState)(["1","2"]),y=Object(u.a)(m,2),g=y[0],N=y[1];return Object(b.jsx)("div",{className:"calculator-mc-nets",children:Object(b.jsxs)(F.a,{activeKey:g,onChange:function(e){return N(e)},children:[Object(b.jsxs)(F.a.Panel,{header:"Game Definition",children:[Object(b.jsxs)(h.a,{justify:"center",children:[Object(b.jsx)(x.a,{span:12,children:Object(b.jsx)(d,{maxValue:20,handleNumberOfPlayesChange:function(e){return c(e)}})}),Object(b.jsx)(x.a,{span:12,children:Object(b.jsx)(M,{rules:l,setRules:s})})]}),Object(b.jsx)("div",{className:"mc-nets-rules",children:l.map((function(e,t){return Object(b.jsx)(z,{index:t,rules:l,setRules:s,nrPlayers:a},t)}))})]},"1"),Object(b.jsx)(F.a.Panel,{showArrow:!1,forceRender:!0,header:"",collapsible:"disabled",className:"generate-panel",children:Object(b.jsx)(h.a,{justify:"center",gutter:32,children:Object(b.jsx)(p.a,{type:"primary",disabled:!a,className:"generate-button",onClick:function(){f(P(l,a));var e=g.includes("3")?g:[].concat(Object(v.a)(g),["3"]);N(e)},children:"Calculate"})})},"2"),Object(b.jsx)(F.a.Panel,{header:"Shapley Values",className:"values-panel",children:Object(b.jsx)(w,{listShapleyValues:O,tableMaxHeight:200})},"3")]})})}),Y=s.a.TabPane,B=function(){return Object(b.jsxs)(s.a,{centered:!0,children:[Object(b.jsx)(Y,{tab:"Coalition structures definition",children:Object(b.jsx)(A,{})},"coalition"),Object(b.jsx)(Y,{tab:"Function generating values",disabled:!0,children:Object(b.jsx)(f,{})},"function"),Object(b.jsx)(Y,{tab:"MC-nets game representation",children:Object(b.jsx)(G,{})},"mc-nets")]})},D=(a(231),a(239)),H=function(){return Object(b.jsx)(D.a,{title:"Shapley Value Calculator",subTitle:"Pick your game definition"})},J=a(101),L={SET_CONTENT_KEY:"SET_CONTENT_KEY"},q={applicationKey:"function"},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;return t.type===L.SET_CONTENT_KEY?Object(S.a)(Object(S.a)({},e),{},{applicationKey:t.payload}):e},U=Object(J.a)({aplication:Q}),W=Object(J.b)(U),X=function(){return Object(b.jsx)(l.a,{store:W,children:Object(b.jsxs)("div",{className:"app",children:[Object(b.jsx)(H,{}),Object(b.jsx)(B,{})]})})},Z=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,243)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),r(e),i(e)}))};i.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(X,{})}),document.getElementById("root")),Z()}},[[232,1,2]]]);
//# sourceMappingURL=main.5ea1bed6.chunk.js.map