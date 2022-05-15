import{a as T,b as z,c as Q,d as W,_ as j,e as X,f as tt,g as et}from"./main.efe08dba.js";import{o as n,e as l,f as t,g as A,i as M,r as C,u as o,h as u,t as $,F as k,x as w,Y as L,k as B,L as N,w as S,v as I,Z as R,j as Y,s as ot,m as st,p as H,q as K,l as nt,O as lt}from"./vendor.8a5c162a.js";const at={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32"},rt=t("path",{d:"M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z",fill:"currentColor"},null,-1),ct=t("path",{d:"M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z",fill:"currentColor"},null,-1),it=[rt,ct];function ut(i,r){return n(),l("svg",at,it)}var O={name:"carbon-checkbox-checked",render:ut};const _t={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 16 16"},dt=t("g",{fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"})],-1),ht=[dt];function pt(i,r){return n(),l("svg",_t,ht)}var mt={name:"bi-plus-lg",render:pt};const vt={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32"},ft=t("path",{d:"M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z",fill:"currentColor"},null,-1),gt=[ft];function xt(i,r){return n(),l("svg",vt,gt)}var V={name:"carbon-checkbox",render:xt},U={};const yt={class:"flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center"},$t={class:"msg content-center min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 sm:mx-auto mx-auto"},kt=["title"],wt={class:"title prose"},bt=t("hr",{class:"hr max-w-27 pb-3"},null,-1),Lt={class:"todos"},Tt={class:"relative"},At={class:"flex justify-left items-start"},Ct=t("hr",{class:"m-2"},null,-1),D=A({setup(i){const{t:r}=M(),e=T(),g=z();let v=C(!1),_=C(null);const c=async(d,s,h,x)=>(s==null?void 0:s.trim.length)==null?(g.showAlert=!0,g.alertMessage=r("alert.todoNull")):h.includes(s)?(_.value=null,v.value=!1):x.includes(s)?(await e.unArchiveTask(d,s).then(()=>v.value=!1).then(()=>_.value=null),await e.fetchList(d)):(await e.addTodo(d,s),v.value=!1,await e.fetchList(d),_.value=null),y=async(d,s)=>{await e.archiveTask(d,s),await e.fetchList(d)},f=async(d,s)=>{await e.unArchiveTask(d,s),await e.fetchList(d)};return(d,s)=>{const h=Q,x=V,p=mt,m=O,b=W;return n(),l("div",yt,[t("div",$t,[t("button",{title:o(r)("button.close"),class:"float-right hover mt-1 mr-1",onClick:s[0]||(s[0]=a=>o(e).showAddTodoComp=!1)},[u(h)],8,kt),t("div",wt,[t("h3",null,$(o(e).getTemporaryList.title),1)]),bt,t("div",Lt,[t("ul",null,[t("div",Tt,[(n(!0),l(k,null,w(o(e).getTemporaryList.todos,a=>(n(),l("li",{key:a,class:"flex justify-left items-start"},[u(x,{onClick:P=>y(o(e).getTemporaryList.listId,a),class:"mr-2 my-auto hover"},null,8,["onClick"]),L($(a),1)]))),128))])])]),t("div",At,[o(v)?S((n(),l("input",{type:"text",ref:"newTodoRef",key:"user-input","onUpdate:modelValue":s[2]||(s[2]=a=>N(_)?_.value=a:_=a),placeholder:"Add a new todo",class:"max-w-43 bg-transparent mx-auto ml-2 overflow-hidden focus:outline-none placeholder-true-gray-600 placeholder-opacity-20 dark:placeholder-light-50 dark:placeholder-opacity-20",onBlur:s[3]||(s[3]=a=>c(o(e).getTemporaryList.listId,o(_),o(e).getTemporaryList.todos,o(e).getTemporaryList.archived)),onKeyup:s[4]||(s[4]=R(a=>c(o(e).getTemporaryList.listId,o(_),o(e).getTemporaryList.todos,o(e).getTemporaryList.archived),["enter"]))},null,544)),[[I,o(_)]]):(n(),B(p,{key:0,onClick:s[1]||(s[1]=a=>N(v)?v.value=!0:v=!0),class:"hover"}))]),Ct,t("div",null,[t("ul",null,[(n(!0),l(k,null,w(o(e).getTemporaryList.archived,a=>(n(),l("li",{key:a,class:"flex justify-left items-start"},[u(m,{onClick:P=>f(o(e).getTemporaryList.listId,a),class:"mr-2 my-auto hover"},null,8,["onClick"]),L(" "+$(a),1)]))),128))])]),o(g).getShowAlert?(n(),B(b,{key:0})):Y("",!0)])])}}});typeof U=="function"&&U(D);var E={};const F=i=>(H("data-v-996a03fa"),i=i(),K(),i),Mt={id:"List",class:"container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center"},St=["title"],It={class:"title prose"},Vt=F(()=>t("hr",{class:"hr max-w-27 pb-3"},null,-1)),zt={class:"todos"},jt={class:"relative"},Bt=F(()=>t("hr",{class:"m-2"},null,-1)),Nt={class:"archived"},Rt=["title","onClick"],q=A({setup(i){const{t:r}=M(),e=T(),g=c=>{e.deleteList(c)},v=(c,y)=>{e.archiveTask(c,y)},_=(c,y)=>{e.unArchiveTask(c,y)};return(c,y)=>{const f=X,d=V,s=O,h=tt,x=ot("masonry");return n(),l("div",Mt,[u(x,{cols:{default:5,1280:4,1192:3,840:2,520:1},gutter:{default:"20px",700:"15px",500:"0px"},class:"mx-auto container justify-center"},{default:st(()=>[(n(!0),l(k,null,w(o(e).getLists,p=>(n(),l("div",{key:p.listId,class:"msg hover max-h-screen-lg overflow-auto"},[t("button",{title:o(r)("button.edit"),class:"float-right hover"},[u(f,{onClick:m=>o(e).changeList(p)},null,8,["onClick"])],8,St),t("div",It,[t("h3",null,$(p.title),1)]),Vt,t("div",zt,[t("ul",null,[t("div",jt,[(n(!0),l(k,null,w(p.todos,m=>(n(),l("li",{key:m},[u(d,{onClick:b=>v(p.listId,m),class:"mr-2 my-auto hover"},null,8,["onClick"]),L($(m),1)]))),128))])])]),Bt,t("div",Nt,[t("ul",null,[(n(!0),l(k,null,w(p.archived,m=>(n(),l("li",{key:m,class:"flex justify-left items-start"},[u(s,{onClick:b=>_(p.listId,m),class:"mr-2 my-auto hover"},null,8,["onClick"]),L(" "+$(m),1)]))),128))])]),t("button",{title:o(r)("button.delete"),onClick:m=>g(p.listId),class:"float-right"},[u(h,{class:"float-right hover"})],8,Rt)]))),128))]),_:1})])}}});typeof E=="function"&&E(q);var Yt=j(q,[["__scopeId","data-v-996a03fa"]]);const Ht={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32"},Kt=t("path",{d:"M29.707 5.293l-3-3a1 1 0 0 0-1.414 0L19.586 8h-2.491a11.012 11.012 0 0 0-10.383 7.366L2.056 28.67a1 1 0 0 0 1.275 1.274l13.303-4.656A11.012 11.012 0 0 0 24 14.905v-2.49l5.707-5.708a1 1 0 0 0 0-1.414zm-7.414 6A1 1 0 0 0 22 12v2.905a9.01 9.01 0 0 1-6.027 8.495l-9.168 3.209L16 17.414L14.586 16L5.39 25.195L8.6 16.027A9.01 9.01 0 0 1 17.095 10H20a1 1 0 0 0 .707-.293L26 4.414L27.586 6z",fill:"currentColor"},null,-1),Ot=[Kt];function Ut(i,r){return n(),l("svg",Ht,Ot)}var Dt={name:"carbon-pen-fountain",render:Ut};const Et={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 16 16"},Ft=t("path",{"fill-rule":"evenodd",d:"M2.5 1.75a.25.25 0 0 1 .25-.25h8.5a.25.25 0 0 1 .25.25v7.736a.75.75 0 1 0 1.5 0V1.75A1.75 1.75 0 0 0 11.25 0h-8.5A1.75 1.75 0 0 0 1 1.75v11.5c0 .966.784 1.75 1.75 1.75h3.17a.75.75 0 0 0 0-1.5H2.75a.25.25 0 0 1-.25-.25V1.75zM4.75 4a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5zM4 7.75A.75.75 0 0 1 4.75 7h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 4 7.75zm11.774 3.537a.75.75 0 0 0-1.048-1.074L10.7 14.145L9.281 12.72a.75.75 0 0 0-1.062 1.058l1.943 1.95a.75.75 0 0 0 1.055.008l4.557-4.45z",fill:"currentColor"},null,-1),qt=[Ft];function Zt(i,r){return n(),l("svg",Et,qt)}var Gt={name:"octicon-checklist16",render:Zt};var Z={};const Jt=i=>(H("data-v-aa297f28"),i=i(),K(),i),Pt={class:"container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center pt-12 pb-7"},Qt=["title"],Wt={key:1,class:"msg relative min-w-xs overflow-y-auto"},Xt={class:"title"},te=["placeholder"],ee={class:"todo mb-1"},oe=["placeholder","onKeyup"],se=Jt(()=>t("hr",{class:"max-w-xs mx-auto mt-1"},null,-1)),ne={class:"newTodos"},le={class:"pt-3 items-end"},ae=["title"],G=A({setup(i){const{t:r}=M(),e=z();let g=C(!1);const v=()=>{g.value=!0},_=T(),c=C(""),y=()=>c.value.length>0?(f.todos.push(c.value),c.value="",document.getElementById("todoInput").focus()):(e.showAlert=!0,e.alertMessage=r("alert.todoNull")),f=nt({title:"",todos:[]}),d=()=>{var h,x;let s=Object.assign({},f);if(((h=f.title)==null?void 0:h.length)===0)return e.showAlert=!0,e.alertMessage=r("alert.listTitle");if(((x=f.todos)==null?void 0:x.length)==0)return e.showAlert=!0,e.alertMessage=r("alert.zeroTasks");try{_.add(s)}catch(p){console.error(p)}finally{f.title="",f.todos=[],g.value=!1}};return(s,h)=>{const x=Gt,p=Dt,m=V,b=et;return n(),l("div",Pt,[o(g)?(n(),l("div",Wt,[t("div",Xt,[u(p,{class:"icon mt-1 absolute"}),S(t("input",{type:"text",placeholder:o(r)("input.title"),"onUpdate:modelValue":h[0]||(h[0]=a=>o(f).title=a),class:"transition duration-500 bg-transparent focus:outline-none"},null,8,te),[[I,o(f).title]])]),t("div",ee,[u(m,{class:"icon mt-1 absolute"}),S(t("input",{ref:"todoRef",id:"todoInput",type:"text",placeholder:o(r)("input.todo"),"onUpdate:modelValue":h[1]||(h[1]=a=>c.value=a),onKeyup:R(y,["enter"]),onBlur:h[2]||(h[2]=a=>s.$refs.todoRef.focus()),class:"bg-transparent transition duration-500 focus:outline-none"},null,40,oe),[[I,c.value]])]),se,t("div",ne,[t("ul",le,[(n(!0),l(k,null,w(o(f).todos,a=>(n(),l("li",{key:a,class:"flex justify-left items-start"},[u(m,{class:"mx-3 my-auto"}),L(" "+$(a),1)]))),128))]),t("button",{onClick:d,class:"float-right hover",title:o(r)("button.submit")},[u(b)],8,ae)])])):(n(),l("button",{key:0,onClick:v,title:o(r)("button.createList"),class:"hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50"},[u(x)],8,Qt))])}}});typeof Z=="function"&&Z(G);var re=j(G,[["__scopeId","data-v-aa297f28"]]),J={};const ce={class:"mx-auto"},ie={key:0},ue=A({setup(i){const r=T();return lt(()=>{r.fetchTodoLists()}),(e,g)=>{const v=re,_=Yt,c=D;return n(),l(k,null,[t("div",ce,[u(v),u(_)]),o(r).getShowAddTodoComponent?(n(),l("div",ie,[u(c)])):Y("",!0)],64)}}});typeof J=="function"&&J(ue);export{ue as default};