(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{45:function(e,t,a){e.exports=a(72)},50:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(40),o=a.n(c),l=(a(50),a(44)),i=a(3),u=a(4),s=a(6),m=a(5),b=a(7),p=a(11),d=new(a(41).a)("Rankscore");d.version(1).stores({Score:"++id"});var h=d,E=a(13),f=a(17),j=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"404 Not Found"),r.a.createElement(f.a,{to:"/"},"Go back to the front page..."))}}]),t}(n.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.props.LocationSubmit},r.a.createElement("p",null,"Location:",r.a.createElement("input",{name:"location",type:"text"})),r.a.createElement("input",{value:"Add Location",type:"submit"})))}}]),t}(n.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.l,r.a.createElement("form",{onSubmit:this.props.NameSubmit},r.a.createElement("p",null,"Name:",r.a.createElement("input",{name:"name",type:"text"})),r.a.createElement("input",{value:"Start",type:"submit"})))}}]),t}(n.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{class:"score"},this.props.name,r.a.createElement("hr",null),this.props.location,r.a.createElement("hr",null),this.props.score),r.a.createElement("div",{class:"game"},r.a.createElement("button",{onClick:this.props.submit})))}}]),t}(n.Component),S=a(2),k=Object(S.a)(),g=a(32),N=a.n(g),A={_id:{type:g.ObjectID,required:!0},name:{type:String,required:!0},location:{type:String,required:!0},score:{type:Number,required:!0}},L=new N.a(A,"rank"),w=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=document.getElementById("network").value,t=[];return"true"===e?L.find()._rejectionHandler0.forEach(function(e){t.push(r.a.createElement("li",null,r.a.createElement("p",null,"Name: ",e.name),r.a.createElement("p",null,"Score: ",e.score),r.a.createElement("p",null,"Location: ",e.location),r.a.createElement("hr",null)))}):"false"===e&&this.props.scores.forEach(function(e){t.push(r.a.createElement("li",null,r.a.createElement("p",null,"Name: ",e.name),r.a.createElement("p",null,"Score: ",e.score),r.a.createElement("p",null,"Location: ",e.location),r.a.createElement("hr",null)))}),r.a.createElement("div",null,r.a.createElement(f.a,{to:"/Name"},r.a.createElement("button",{type:"button"},"Try again")),r.a.createElement("ul",null,t))}}]),t}(n.Component),x=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).state={Allscores:[],score:4,sted:"",name:""},e.LocationSubmit=e.LocationSubmit.bind(Object(p.a)(Object(p.a)(e))),e.NameSubmit=e.NameSubmit.bind(Object(p.a)(Object(p.a)(e))),e.Addscore=e.Addscore.bind(Object(p.a)(Object(p.a)(e))),e}return Object(b.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.table("Score").toArray().then(function(t){e.setState({Allscores:t})})}},{key:"LocationSubmit",value:function(e){e.preventDefault();var t=e.target.location.value;this.setState({sted:t}),k.push("/Name")}},{key:"NameSubmit",value:function(e){e.preventDefault();var t=e.target.name.value;this.setState({name:t}),k.push("/Game")}},{key:"Addscore",value:function(){var e=this,t={name:this.state.name,location:this.state.sted,score:this.state.score};h.table("Score").add(t).then(function(a){var n=[].concat(Object(l.a)(e.state.Allscores),[Object.assign({},t,{id:a})]);e.setState({Allscores:n})}),k.push("/Rank")}},{key:"renderdata",value:function(){!h.table("Score")===[]&&(h.table("Score").foreach(function(e){var t=e.name,a=e.location,n=e.score;L.create({name:t,location:a,score:n}).catch(function(e){return console.log(e.errors)})}),h.table("Score").clear())}},{key:"render",value:function(){var e=this,t=setInterval(function(){return navigator.onLine?r.a.createElement("intput",{value:"true"}):r.a.createElement("intput",{value:"false"})},2e3);return r.a.createElement(E.b,{history:k},r.a.createElement("div",{className:"container"},t,r.a.createElement(E.c,null,r.a.createElement(E.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(O,Object.assign({},t,{LocationSubmit:e.LocationSubmit}))}}),r.a.createElement(E.a,{exact:!0,path:"/Name",render:function(t){return r.a.createElement(v,Object.assign({},t,{l:e.state.sted,NameSubmit:e.NameSubmit}))}}),r.a.createElement(E.a,{exact:!0,path:"/Game",render:function(t){return r.a.createElement(y,Object.assign({},t,{location:e.state.sted,name:e.state.name,score:e.state.score,submit:e.Addscore}))}}),r.a.createElement(E.a,{exact:!0,path:"/Rank",render:function(t){return r.a.createElement(w,Object.assign({},t,{scores:e.state.Allscores}))}}),r.a.createElement(E.a,{component:j}))))}}]),t}(n.Component);o.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.8e2bfd80.chunk.js.map