(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,t,a){e.exports=a(162)},162:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),c=a.n(s),o=a(86),i=a(221),l=a(116),u=Object(l.a)(),m=a(57),h=a(104),d=a(222),f=a(31),p=a(38),g=a(20),b={userData:[],userInfo:null},v={status:!1,message:""},E=Object(p.combineReducers)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LIST_USERS":return Object(g.a)({},e,{userData:t.userData});case"GET_USER":return Object(g.a)({},e,{userInfo:t.userInfo});case"DISMISS_USER":return Object(g.a)({},e,{userInfo:t.setToNull});default:return e}},snackbar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SHOW_SNACKBAR":return Object(g.a)({},e,{status:!0,message:t.message});case"HIDE_SNACKBAR":return Object(g.a)({},e,{status:!1,message:""});default:return e}}}),w=a(106),y=a(107),D=Object(p.createStore)(E,Object(y.composeWithDevTools)(Object(p.applyMiddleware)(w.a))),k=a(24),U=a(17),O=a(71),j=a.n(O),S=function(){function e(){Object(k.a)(this,e),this.service=j.a.create({baseURL:"".concat("https://fullstack-coding-challenge.herokuapp.com","/api")})}return Object(U.a)(e,[{key:"listUsers",value:function(){return this.service.get("users").then(function(e){return e.data}).catch(function(e){return e})}},{key:"getUser",value:function(e){return this.service.get("users/".concat(e)).then(function(e){return e.data}).catch(function(e){return e})}},{key:"newUser",value:function(e){return this.service.post("users",e).then(function(e){return e}).catch(function(e){return e})}},{key:"edituser",value:function(e){var t=e.id,a=e.name,n=e.birthdate;return this.service.patch("users/".concat(t),{name:a,birthdate:n}).then(function(e){return e}).catch(function(e){return e})}},{key:"deleteUser",value:function(e){return this.service.delete("users/".concat(e)).then(function(e){return e.data}).catch(function(e){return e})}}]),e}(),C=new S,N=function(){return{type:"DISMISS_USER",setToNull:null}},I=function(){return function(e){return C.listUsers().then(function(t){return e({type:"LIST_USERS",userData:t})})}},B=function(e){return{type:"SHOW_SNACKBAR",message:e}},x=a(169),T=a(42),_=a(39),R=a(43),Y=a(53),A=a.n(Y),M=(a(152),function(e){return A()(e).format("DD/MM/YYYY")}),F=function(e){return A()(e).format("HH:mm")},W=a(81),H=a(205),L=a(226),z=a(206),K=a(207),q=a(211),G=a(212),J=a(213),P=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(T.a)(this,Object(_.a)(t).call(this,e))).data=new S,a.state={edit:!1,selectedDate:new Date},a}return Object(R.a)(t,e),Object(U.a)(t,[{key:"closeUserInfo",value:function(e){e.preventDefault(),this.props.dismissUser()}},{key:"handleDateChange",value:function(e){this.setState(Object(g.a)({},this.state,{selectedDate:e}))}},{key:"editUser",value:function(e){var t=this;e.preventDefault();var a=e.currentTarget.elements.name;this.data.edituser({id:this.props.userInfo._id,name:a.value,birthdate:this.state.selectedDate}).then(function(e){if(200===e.status){var n=F(new Date);t.props.showSnackbar("User updated at ".concat(n))}else t.props.showSnackbar("Something wrong has happened. Status: ".concat(e.status));a.value="",t.setState(Object(g.a)({},t.state,{selectedDate:new Date})),t.props.listUsers()})}},{key:"toggleEdit",value:function(){this.setState(Object(g.a)({},this.state,{edit:!this.state.edit}))}},{key:"render",value:function(){var e=this,t=this.props,a=t.userInfo,n=t.classes,s=a.name,c=a.birthdate;return r.a.createElement("div",null,r.a.createElement(W.a,{variant:"h5"},"User info"),this.state.edit?r.a.createElement("form",{onSubmit:function(t){return e.editUser(t)},className:n.form},r.a.createElement(H.a,{className:n.formControl},r.a.createElement(L.a,{htmlFor:"name"},"Name"),r.a.createElement(z.a,{required:!0,defaultValue:s,type:"text",id:"name"})),r.a.createElement(m.a,{label:"Birthday",value:c,onChange:function(t){return e.handleDateChange(t)},animateYearScrolling:!0,disableFuture:!0,format:"DD/MM/YYYY"}),r.a.createElement(K.a,{type:"submit",color:"primary",variant:"contained",className:n.updateButton},"Update User")):r.a.createElement(q.a,null,r.a.createElement(G.a,null,r.a.createElement(J.a,{primary:"Name:",secondary:s})," "),r.a.createElement(G.a,null,r.a.createElement(J.a,{primary:"Birthdate:",secondary:M(c)}))),r.a.createElement(K.a,{variant:"contained",color:"primary",onClick:function(){return e.toggleEdit()}},this.state.edit?"Cancel":"Edit"),r.a.createElement(K.a,{variant:"contained",color:"secondary",onClick:function(t){return e.closeUserInfo(t)},className:n.closeButton},"Close"))}}]),t}(n.Component),V={form:{display:"flex",flexDirection:"column"},formControl:{marginBottom:u.spacing(2)},updateButton:{marginBottom:u.spacing(4)},closeButton:{marginLeft:u.spacing(2)}},$=Object(x.a)(V)(P),Q={listUsers:I,dismissUser:N,showSnackbar:B},X=Object(f.b)(function(e){return{userInfo:e.users.userInfo}},Q)($),Z=function(){function e(){Object(k.a)(this,e),this.service=j.a.create({baseURL:"https://fullstack-coding-challenge.herokuapp.com"})}return Object(U.a)(e,[{key:"status",value:function(){return this.service.get("health").then(function(e){return e.data}).catch(function(e){return e})}}]),e}(),ee=a(214),te=a(208),ae=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(T.a)(this,Object(_.a)(t).call(this,e))).health=new Z,a}return Object(R.a)(t,e),Object(U.a)(t,[{key:"checkDB",value:function(){var e=this;this.health.status().then(function(t){e.props.showSnackbar("Database status: ".concat(t.isAlive?"online":"offline"))})}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(ee.a,{position:"static"},r.a.createElement(te.a,{className:t.toolBar},r.a.createElement(W.a,{variant:"h6"},"React Test"),r.a.createElement(K.a,{variant:"contained",size:"small",onClick:function(){return e.checkDB()}},"Check database")))}}]),t}(n.Component),ne=Object(x.a)({toolBar:{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:"1080px"}})(ae),re={showSnackbar:B},se=Object(f.b)(null,re)(ne),ce=a(164),oe=a(215),ie=a(216),le=a(217),ue=a(218),me=a(219),he=a(220),de=a(227),fe=a(223),pe=a(114),ge=a.n(pe),be=a(113),ve=a.n(be),Ee=a(112),we=a.n(Ee),ye=a(111),De=a.n(ye),ke=function(e){function t(e){var a;return Object(k.a)(this,t),(a=Object(T.a)(this,Object(_.a)(t).call(this,e))).data=new S,a.state={rightDrawer:!1,selectedDate:new Date},a}return Object(R.a)(t,e),Object(U.a)(t,[{key:"componentDidMount",value:function(){this.props.listUsers()}},{key:"showUserInfo",value:function(e,t){e.preventDefault(),this.props.getUser(t)}},{key:"handleDateChange",value:function(e){this.setState(Object(g.a)({},this.state,{selectedDate:e}))}},{key:"deleteUser",value:function(e,t){var a=this;e.preventDefault(),this.data.deleteUser(t).then(function(e){a.props.showSnackbar("User ".concat(e.name," was deleted sucessfuly.")),a.props.listUsers()})}},{key:"createUser",value:function(e){var t=this;e.preventDefault();var a=e.currentTarget.elements.name;this.data.newUser({name:a.value,birthdate:this.state.selectedDate}).then(function(e){if(t.toggleDrawer(!1),200===e.status){var n=F(new Date);t.props.showSnackbar("User ".concat(e.data.name," created at ").concat(n," with id ").concat(e.data._id))}else t.props.showSnackbar("Something wrong has happened. Status: ".concat(e.status));a.value="",t.setState(Object(g.a)({},t.state,{selectedDate:new Date})),t.props.listUsers()})}},{key:"toggleDrawer",value:function(e){this.setState(Object(g.a)({},this.state,{rightDrawer:e}))}},{key:"render",value:function(){var e=this,t=this.props,a=t.userData,n=t.userInfo,s=t.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement(se,null),r.a.createElement("div",{className:s.content},0!==a.length?r.a.createElement("div",{className:s.tableContainer},r.a.createElement(W.a,{component:"h1",variant:"h4",className:s.title},"Users list"),r.a.createElement(ce.a,{className:s.title},r.a.createElement(oe.a,null,r.a.createElement(ie.a,null,r.a.createElement(le.a,null,r.a.createElement(ue.a,{className:s.rowTitle},"First Name"),r.a.createElement(ue.a,{className:s.rowTitle},"Birthdate"),r.a.createElement(ue.a,{className:s.rowTitle},"More Info"),r.a.createElement(ue.a,{className:s.rowTitle},"Delete user"))),r.a.createElement(me.a,null,a.map(function(t){return r.a.createElement(le.a,{key:t._id},r.a.createElement(ue.a,null,t.name),r.a.createElement(ue.a,null,M(t.birthdate)),r.a.createElement(ue.a,null,r.a.createElement(K.a,{onClick:function(a){return e.showUserInfo(a,t._id)},color:"primary"},r.a.createElement(De.a,null),"Info")),r.a.createElement(ue.a,null,r.a.createElement(K.a,{onClick:function(a){return e.deleteUser(a,t._id)},color:"secondary",variant:"contained"},r.a.createElement(we.a,null),"Delete")))})))),r.a.createElement(he.a,{variant:"extended",color:"primary","aria-label":"Add",className:s.newUserButton,onClick:function(){return e.toggleDrawer(!0)}},r.a.createElement(ve.a,null),"New User"),r.a.createElement(de.a,{className:s.drawer,anchor:"right",open:this.state.rightDrawer,onClose:function(){return e.toggleDrawer(!1)}},r.a.createElement("div",{className:s.NewUserContainer},r.a.createElement(ce.a,{className:s.formContainer},r.a.createElement(W.a,{component:"h2",variant:"h6",align:"center"},"Create new user"),r.a.createElement("form",{className:s.newUserForm,onSubmit:function(t){return e.createUser(t)}},r.a.createElement(H.a,{className:s.formControl},r.a.createElement(L.a,{htmlFor:"name"},"Name"),r.a.createElement(z.a,{type:"text",id:"name",required:!0})),r.a.createElement(m.a,{label:"Birthday",value:this.state.selectedDate,onChange:function(t){return e.handleDateChange(t)},animateYearScrolling:!0,disableFuture:!0,format:"DD/MM/YYYY"}),r.a.createElement(K.a,{type:"submit",color:"primary",variant:"contained"},"Create User"))),r.a.createElement(he.a,{color:"secondary",className:s.closeButton,onClick:function(){return e.toggleDrawer(!1)}},r.a.createElement(ge.a,null))))):r.a.createElement("p",null,"Loading..."),r.a.createElement(fe.a,{open:!!n,onClose:function(){return e.props.dismissUser()},className:s.modalOverlay},r.a.createElement(ce.a,{className:s.modalBox},n?r.a.createElement(X,null):null))))}}]),t}(n.Component),Ue={content:{margin:"auto",marginTop:u.spacing(4)},newUserButton:{position:"absolute",bottom:"50px",right:"50px"},title:{marginBottom:u.spacing(2)},tableContainer:{maxWidth:"1080px",margin:"auto",padding:u.spacing(2)},rowTitle:{fontSize:"1.1em"},tablePagination:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:u.spacing(2)},newUserContainer:{minWidth:"60vw",margin:u.spacing(2),position:"relative",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},formContainer:{padding:u.spacing(2)},newUserForm:{display:"flex",flexDirection:"column",width:"250px"},formControl:{marginBottom:u.spacing(2)},closeButton:{position:"absolute",bottom:u.spacing(4),right:u.spacing(4)},modalOverlay:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},modalBox:{width:"360px",height:"460px",padding:u.spacing(2),margin:"auto"}},Oe=Object(x.a)(Ue)(ke),je={listUsers:I,getUser:function(e){return function(t){return C.getUser(e).then(function(e){return t({type:"GET_USER",userInfo:e})}).catch(function(e){return e})}},dismissUser:N,showSnackbar:B},Se=Object(f.b)(function(e){var t=e.users;return{userData:t.userData,userInfo:t.userInfo}},je)(Oe),Ce=a(45),Ne=a(224),Ie=function(e){function t(){return Object(k.a)(this,t),Object(T.a)(this,Object(_.a)(t).apply(this,arguments))}return Object(R.a)(t,e),Object(U.a)(t,[{key:"render",value:function(){var e=this.props,t=e.status,a=e.message,n=e.hideSnackbar;return r.a.createElement(Ne.a,{anchorOrigin:{horizontal:"center",vertical:"bottom"},autoHideDuration:1e4,open:t,onClose:function(){return n()},message:a,action:[r.a.createElement(K.a,{color:"secondary",size:"small",key:"undo",onClick:function(){return n()}},"Close")]})}}]),t}(n.Component),Be={hideSnackbar:function(){return{type:"HIDE_SNACKBAR"}}},xe=Object(f.b)(function(e){var t=e.snackbar;return{status:t.status,message:t.message}},Be)(Ie);var Te=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Ce.c,null,r.a.createElement(Ce.a,{exact:!0,path:"/",component:Se})),r.a.createElement(xe,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(f.a,{store:D},r.a.createElement(m.b,{utils:h.a},r.a.createElement(o.a,null,r.a.createElement(i.a,{theme:u},r.a.createElement(d.a,null),r.a.createElement(Te,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[124,1,2]]]);
//# sourceMappingURL=main.4b143914.chunk.js.map