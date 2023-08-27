(()=>{"use strict";var e={433:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},s=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function d(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((r=r.apply(e,t||[])).next())}))},d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const u=o(n(422)),a=d(n(185));t.default=class{constructor(){a.default.connect(process.env.MONGODB_URI)}getAllUsers(){return s(this,void 0,void 0,(function*(){return yield u.default.find({})}))}getUserByEmail(e){return s(this,void 0,void 0,(function*(){return yield u.default.findOne({email:e})}))}createUser(e){return s(this,void 0,void 0,(function*(){const t=new u.default({email:e});return yield t.save(),t}))}addFriendToUser(e,t,n){return s(this,void 0,void 0,(function*(){const r=yield this.getUserByEmail(e),i=new u.Friend({name:t,birthday:n});return r.friends.push(i),yield r.save(),r}))}updateFriend(e,t,n,r){return s(this,void 0,void 0,(function*(){const i=yield u.default.findById(e),o=i.friends.find((e=>e._id.toString()===t));return n&&(o.name=n),r&&(o.birthday=new Date(r)),yield i.save(),i}))}}},413:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function d(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(n(344)),s=n(769)(process.env.MAILCHIMP_API_KEY);t.default=class{constructor(e){this.getUserList=e}sendEmail(e,t,n){return r(this,void 0,void 0,(function*(){try{return yield s.messages.send({message:{from_email:process.env.MAILCHIMP_FROM_EMAIL,to:[{email:e}],subject:t,text:n}})}catch(e){console.error("Error sending email:",e)}}))}getEmailsToSendToday(){return r(this,void 0,void 0,(function*(){const e=new Date,t=[];try{const n=yield this.getUserList();for(const r of n)for(const n of r.friends)n.birthday.getMonth()===e.getMonth()&&n.birthday.getDate()===e.getDate()&&t.push({to:r.email,subject:`It's ${n.name}'s Birthday Today!`,message:`Don't forget to wish ${n.name} a happy birthday!`});return t}catch(e){console.error("Error getting emails to send:",e)}}))}sendEmailsForToday(){return r(this,void 0,void 0,(function*(){const e=yield this.getEmailsToSendToday();if(e)for(const t of e)yield this.sendEmail(t.to,t.subject,t.message),yield new Promise((e=>setTimeout(e,5e3)))}))}sendEmailsNow(){this.sendEmailsForToday()}startDailyJob(){o.default.scheduleJob("53 02 * * *",(()=>r(this,void 0,void 0,(function*(){console.log("sending emails"),yield this.sendEmailsForToday()}))));let e=new Date(Date.now()+12e4);o.default.scheduleJob(e,(()=>r(this,void 0,void 0,(function*(){console.log("Job running!"),yield this.sendEmailsForToday(),console.log("Job complete")}))))}}},155:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function d(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.FriendController=void 0,t.FriendController=e=>({addFriend:(t,r)=>n(void 0,void 0,void 0,(function*(){const{userEmail:n}=t.params,{name:i,birthday:o}=t.body,s=yield e.addFriendToUser(n,i,o);if(!s)return r.status(404).send({error:"User not found"});r.send({message:"Friend added",user:s})})),updateFriend:(t,r)=>n(void 0,void 0,void 0,(function*(){const{userId:n,friendId:i}=t.params,{name:o,birthday:s}=t.body,d=yield e.updateFriend(n,i,o,s);if(!d)return r.status(404).send({error:"User not found"});r.send({message:"Friend updated",user:d})}))})},954:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function d(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.UserController=void 0,t.UserController=e=>({registerUser:(t,r)=>n(void 0,void 0,void 0,(function*(){const{email:n}=t.body,i=yield e.getUserByEmail(n);if(i)return r.send({user:i});const o=yield e.createUser(n);r.send({user:o})})),getUserByEmail:(t,r)=>n(void 0,void 0,void 0,(function*(){const{email:n}=t.params,i=yield e.getUserByEmail(n);if(!i)return r.status(404).send({error:"User not found"});r.send({user:i})}))})},422:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Friend=void 0;const s=o(n(185)),d=new s.Schema({name:{type:String,required:!0},birthday:{type:Date,required:!0}}),u=new s.Schema({email:{type:String,required:!0,unique:!0},friends:[d]});u.virtual("id").get((function(){return this._id.toHexString()})),u.set("toJSON",{virtuals:!0}),d.virtual("id").get((function(){return this._id.toHexString()})),d.set("toJSON",{virtuals:!0}),u.methods.getFriend=function(e){return this.friends.find((t=>t._id.toString()===e))},t.Friend=s.default.model("Friend",d),t.default=s.default.model("User",u)},505:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function d(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(n(860));i(n(142)).default.config();const s=i(n(413)),d=i(n(433)),u=n(954),a=n(155),c=(0,o.default)();c.use(o.default.json());const l=n(582);c.use(l());const f=process.env.PORT||3e3;c.listen(f,(()=>{console.log(`Server is listening on port ${f}`)}));const h=new d.default,v=new s.default(h.getAllUsers);v.startDailyJob();const y=(0,u.UserController)(h),m=(0,a.FriendController)(h);c.post("/register",y.registerUser),c.get("/users/:email",y.getUserByEmail),c.post("/users/:userEmail/friends",m.addFriend),c.put("/users/:userId/friends/:friendId",m.updateFriend),c.post("/debug/send-emails",((e,t)=>r(void 0,void 0,void 0,(function*(){v.sendEmailsNow(),t.send({message:"Emails sent"})}))))},769:e=>{e.exports=require("@mailchimp/mailchimp_transactional/src/index.js")},582:e=>{e.exports=require("cors")},142:e=>{e.exports=require("dotenv")},860:e=>{e.exports=require("express")},185:e=>{e.exports=require("mongoose")},344:e=>{e.exports=require("node-schedule")}},t={};!function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}(505)})();