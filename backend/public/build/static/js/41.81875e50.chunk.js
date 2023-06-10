"use strict";(self.webpackChunkmern_app=self.webpackChunkmern_app||[]).push([[41],{5565:function(e,t,a){a.r(t);var i=a(4165),n=a(5861),r=a(2791),s=a(4366),l=a(7517),u=a(7689),p=a(3108),d=a(184),o={inputs:{title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}},isValid:!1};t.default=function(){var e=(0,r.useContext)(p.V),t=e.loggedInUser,a=e.token,c=(0,u.s0)(),v=(0,l.x)(),x=v.isLoading,m=v.error,f=v.sendRequest;function h(){return(h=(0,n.Z)((0,i.Z)().mark((function e(n){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(r=new FormData).append("title",n.inputs.title.value),r.append("description",n.inputs.description.value),r.append("address",n.inputs.address.value),r.append("image",n.inputs.image.value),e.next=8,f("".concat("https://proj-places-app.herokuapp.com/api","/places/"),"POST",r,{Authorization:"Bearer ".concat(a)});case 8:c("/".concat(t.id,"/places"),{replace:!0}),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return v.clearError,(0,d.jsx)(s.Z,{placeSubmit:function(e){return h.apply(this,arguments)},place:o,error:m,isLoading:x})}},4366:function(e,t,a){a.d(t,{Z:function(){return o}});var i=a(9439),n=(a(2791),a(7196)),r=a(1786),s=a(6517),l=a(6507),u=a(4488),p=a(8874),d=a(184);var o=function(e){var t=e.place,a=e.placeSubmit,o=e.updateMode,c=e.error,v=e.isLoading,x=(0,l.Z)(t),m=(0,i.Z)(x,2),f=m[0],h=m[1];return(0,d.jsxs)("form",{className:"place-form",onSubmit:function(e){e.preventDefault(),a(h)},children:[(0,d.jsx)(n.Z,{id:"title",type:"text",label:"Title",element:"input",validators:[(0,r.hg)()],errorText:"Please enter a valid title",onInput:f,initValue:null===t||void 0===t?void 0:t.inputs.title.value}),(0,d.jsx)(n.Z,{id:"description",label:"Description",type:"text",validators:[(0,r.CP)(5)],errorText:"Please enter a valid descripition. (5 characters at least)",onInput:f,initValue:null===t||void 0===t?void 0:t.inputs.description.value}),!o&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.Z,{id:"address",label:"Address",type:"text",element:"input",validators:[(0,r.hg)()],errorText:"Please enter a valid adress",onInput:f,initValue:null===t||void 0===t?void 0:t.inputs.address.value}),(0,d.jsx)(p.Z,{id:"image",center:!0,errorText:!0,onInput:f})]}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,d.jsx)(s.Z,{type:"submit",disabled:(h.isValid&&t&&function(){var e=!0;for(var a in h.inputs)h.inputs[a].value!==t.inputs[a].value&&(e=!1);return e}())|!h.isValid,children:v?(0,d.jsx)("div",{className:"center",children:(0,d.jsx)(u.Z,{})}):o?"Update":"Add Place"})}),c&&(0,d.jsx)("span",{style:{color:"red"},children:c})]})}}}]);
//# sourceMappingURL=41.81875e50.chunk.js.map