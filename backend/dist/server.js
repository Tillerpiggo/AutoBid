(()=>{"use strict";var e={422:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(185)),d=new s.Schema({name:{type:String,required:!0},birthday:{type:Date,required:!0}}),u=new s.Schema({email:{type:String,required:!0,unique:!0},loginCode:{type:String,required:!0},loginCodeExpires:{type:Date},friends:[d]});u.methods.getFriend=function(e){return this.friends.find((t=>t._id.toString()===e))},t.default=s.default.model("User",u)},505:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{u(n.next(e))}catch(e){o(e)}}function d(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(860)),s=i(r(185)),d=i(r(422)),u=r(294);i(r(142)).default.config();const a=(0,o.default)();s.default.connect("mongodb://localhost/newsletter_app");const f=new u.NodeMailgun;f.apiKey="d5f2b3f5e1354af28393cc0cc7e234c7-ee16bf1a-38bc24b4",f.domain="sandbox8b5c461a52ed44469758906f83cd1231.mailgun.org",f.fromEmail="ideas@autigift.com",f.fromTitle="Autogift Inc",f.init(),a.use(o.default.json()),a.get("/",((e,t)=>{t.send("Hello, world!")}));const c=process.env.PORT||3e3;a.listen(c,(()=>{console.log(`Server is listening on port ${c}`)})),a.post("/register",((e,t)=>n(void 0,void 0,void 0,(function*(){const{email:r}=e.body;if(yield d.default.findOne({email:r}))return t.status(400).send({error:"User with this email already exists"});const n=Math.floor(1e5+9e5*Math.random()),i=new d.default({email:r,loginCode:n,loginCodeExpires:Date.now()+9e5});yield i.save(),process.env.MAILGUN_FROM_EMAIL,f.send(r,"Your Login Code",`<h1>Your login code is ${n}</h1>`).then((()=>{t.send({message:"User registered, check your email for your login code"})})).catch((e=>{console.error(e),t.status(500).send({error:"Failed to send email"})}))})))),a.post("/users/:userId/friends",((e,t)=>n(void 0,void 0,void 0,(function*(){const{userId:r}=e.params,{name:n,birthday:i}=e.body,o=yield d.default.findById(r);if(!o)return t.status(404).send({error:"User not found"});const s={name:n,birthday:i};o.friends.push(s),yield o.save(),t.send({message:"Friend added",user:o})})))),a.put("/users/:userId/friends/:friendId",((e,t)=>n(void 0,void 0,void 0,(function*(){const{userId:r,friendId:n}=e.params,{name:i,birthday:o}=e.body,s=yield d.default.findById(r);if(!s)return t.status(404).send({error:"User not found"});const u=s.friends.find((e=>e.id===n));if(!u)return t.status(404).send({error:"Friend not found"});i&&(u.name=i),o&&(u.birthday=o),yield s.save(),t.send({message:"Friend updated",user:s})})))),a.get("/users/:userId",((e,t)=>n(void 0,void 0,void 0,(function*(){const{userId:r}=e.params,n=yield d.default.findById(r);if(!n)return t.status(404).send({error:"User not found"});t.send({user:n})}))))},142:e=>{e.exports=require("dotenv")},860:e=>{e.exports=require("express")},185:e=>{e.exports=require("mongoose")},294:e=>{e.exports=require("ts-mailgun")}},t={};!function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(505)})();