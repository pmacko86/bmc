(window.webpackJsonpundefined=window.webpackJsonpundefined||[]).push([[0],{105:function(e,t,a){e.exports=a(157)},157:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(50),o=a.n(l),s=a(10),i=a(11),c=a(13),p=a(12),u=a(14),h=a(169),d=a(172),b=a(173),m=a(168),f=a(5).a.create({header:{backgroundColor:"#000",color:"#fff",padding:4},instructions:{backgroundColor:"#ccc",color:"#000",paddingTop:4,paddingBottom:4,paddingLeft:8,paddingRight:4},test:{backgroundColor:"#fff",color:"#000",padding:4},bmcTextChapter:{paddingTop:4},actionList:{backgroundColor:"#fff",padding:4},actionListItem:{color:"#000",padding:4}}),v=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(m.a,{style:f.instructions},this.props.text)}}]),t}(r.a.Component),y=a(30),g=a(101),k=a(25),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).handleBack=a.handleBack.bind(Object(y.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleBack",value:function(e){e.stopPropagation(),e.preventDefault(),"web"===g.a.OS&&this.props.onBackIfWeb?this.props.onBackIfWeb():this.props.navigation.goBack()}},{key:"render",value:function(){return r.a.createElement(k.a,{style:[f.header,{flexDirection:"row"}]},this.props.hideBack?null:r.a.createElement(b.a,{onPress:this.handleBack},r.a.createElement(m.a,{style:f.header},"<")),r.a.createElement(m.a,{style:f.header},this.props.text))}}]),t}(r.a.Component),E=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"chooseAction",value:function(e){var t=this.props.navigation.getParam("book");this.props.navigation.navigate(e,{book:t})}},{key:"render",value:function(){var e=this,t=this.props.navigation.getParam("book");return r.a.createElement(h.a,{style:{flex:1}},r.a.createElement(x,{navigation:this.props.navigation,text:t,onBackIfWeb:function(){return e.props.navigation.navigate("Home")}}),r.a.createElement(v,{text:"What would you like to do?"}),r.a.createElement(d.a,{style:f.actionList},r.a.createElement(b.a,{onPress:function(t){return e.chooseAction("Study")}},r.a.createElement(m.a,{style:f.actionListItem},"Study")),r.a.createElement(b.a,{onPress:function(t){return e.chooseAction("Test")}},r.a.createElement(m.a,{style:f.actionListItem},"Test"))))}}]),t}(r.a.Component),w=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(k.a,{style:[f.actionList,{alignItems:"flex-start",flexDirection:"column"}]},this.props.items.map((function(t,a){return r.a.createElement(b.a,{key:t,onPress:function(a){e.props.onChoose&&e.props.onChoose(t)}},r.a.createElement(m.a,{style:f.actionListItem},t))})))}}]),t}(r.a.Component),O={contents:[{title:"Matthew",items:[{chapter:1,part:null,label:"Genealogy, Birth of Jesus"},{chapter:2,part:null,label:"Magi, King Herod"},{chapter:3,part:null,label:"John the Baptist, Baptism of Jesus"},{chapter:4,part:null,label:"Temptations of Jesus"},{chapter:5,part:null,label:"Beatitudes"},{chapter:6,part:null,label:"APF (Alms, Prayer, Fasting)"},{chapter:7,part:null,label:"ASK (Ask, Seek, Knock)"},{chapter:8,part:"a",label:"Centurion"},{chapter:8,part:"b",label:"Storm"},{chapter:8,part:"c",label:"Legion"},{chapter:9,part:null,label:"BPB (Bleeding Woman, Paralytic, Blind Man)"},{chapter:10,part:null,label:"Twelve Disciples"},{chapter:11,part:null,label:"Kingdom Invasion"},{chapter:12,part:null,label:"Sabbath"},{chapter:13,part:null,label:"PK (Parables of Kingdom)"},{chapter:14,part:"a",label:"5-2 (5 Loaves, 2 Fish)"},{chapter:14,part:"b",label:"WOW (Walking on Water)"},{chapter:15,part:null,label:"7-2"},{chapter:16,part:null,label:"Peter's Confession"},{chapter:17,part:null,label:"Transfiguration"},{chapter:18,part:null,label:"Little Children"},{chapter:19,part:null,label:"Rich Young Ruler"},{chapter:20,part:null,label:"Eleventh Hour Workers"},{chapter:21,part:null,label:"Entering Jerusalem"},{chapter:22,part:null,label:"Greatest Commandment"},{chapter:23,part:null,label:"Seven Woes"},{chapter:24,part:null,label:"ETS (End Times Signs)"},{chapter:25,part:null,label:"TV (Talents, Virgins)"},{chapter:26,part:null,label:"Arrest, Peter's Denial"},{chapter:27,part:null,label:"Death on the Cross"},{chapter:28,part:null,label:"Resurrection, Commission"}]},{title:"Luke",items:[{chapter:1,part:null,label:"John the Baptist"},{chapter:2,part:null,label:"Birth of Jesus, SAS (Shepherds, Anna, Simeon)"},{chapter:3,part:null,label:"Baptism, Genealogy of Jesus"},{chapter:4,part:null,label:"Temptations"},{chapter:5,part:null,label:"Jesus Calls Peter"},{chapter:6,part:null,label:"Sermon on the Plain, LA (Lord of Sabbath, 12 Apostles)"},{chapter:7,part:null,label:"CAN (Centurion, Alabaster Jar Woman, Nain)"},{chapter:8,part:null,label:"Storm, Legion"},{chapter:9,part:"a",label:"Sending out the Twelve"},{chapter:9,part:"b",label:"5-2"},{chapter:9,part:"c",label:"Peter's Confession"},{chapter:9,part:"d",label:"Transfiguration"},{chapter:10,part:null,label:"Sending out the 72, Good Samaritan, Martha vs. Mary"},{chapter:11,part:null,label:"LAB6 (Lord's Prayer, ASK, Bealzebub, 6 woes)"},{chapter:12,part:null,label:"Rich Fool"},{chapter:13,part:null,label:"Kingdom of God Parables"},{chapter:14,part:null,label:"Discipleship (3 P's)"},{chapter:15,part:null,label:"Lost SCP (Sheep, Coin, Prodigal)"},{chapter:16,part:null,label:"Unrighteous Manager, Poor Lazarus"},{chapter:17,part:null,label:"Unworthy Servant"},{chapter:18,part:null,label:"How to pray (Persistent Widow, the Pharisee and the Tax Collector)"},{chapter:19,part:null,label:"Zacchaeus, Entering Jerusalem"},{chapter:20,part:null,label:"Wicked Tenants, Resurrected World"},{chapter:21,part:null,label:"ETS (End Times Signs)"},{chapter:22,part:null,label:"Arrest (Lord's Supper, Gethsemane, Peter's Denial)"},{chapter:23,part:null,label:"Death on the Cross"},{chapter:24,part:null,label:"Resurrection (Emmaus)"}]}]},j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).bookItems=void 0,a.bookItems=O.contents.map((function(e){return e.title})),a.state={},a.handleBookChoose=a.handleBookChoose.bind(Object(y.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleBookChoose",value:function(e){this.props.navigation.navigate("BookAction",{book:e})}},{key:"render",value:function(){return r.a.createElement(h.a,{style:{flex:1}},r.a.createElement(x,{hideBack:!0,navigation:this.props.navigation,text:"Choose a book to study"}),r.a.createElement(d.a,null,r.a.createElement(w,{items:this.bookItems,onChoose:this.handleBookChoose})))}}]),t}(r.a.Component),I=a(171),C=a(102),B=a(170),P=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).words=void 0,a.input=void 0,a.input=null;for(var n=e.text.split(" "),r=n.length,l=new Array(r),o=0;o<r;o++){var i=n[o];l[o]={byLetter:!!i.match(/^[A-Z0-9-]+$/),word:i}}return a.words=l,a.state={index:0,charIndex:0,correct:new Array(r)},a.handlePress=a.handlePress.bind(Object(y.a)(a)),a.handleKeyPress=a.handleKeyPress.bind(Object(y.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"backspace",value:function(){if(this.state.charIndex>0)this.setState({charIndex:this.state.charIndex-1});else if(this.state.index>0){var e=0,t=this.words[this.state.index-1];t.byLetter&&(e=t.word.length-1),this.setState({index:this.state.index-1,charIndex:e})}else void 0!==this.props.onTopBackspace&&this.props.onTopBackspace()}},{key:"focus",value:function(){null!=this.input&&this.input.focus()}},{key:"handlePress",value:function(e){e.stopPropagation(),e.preventDefault(),this.focus()}},{key:"handleKeyPress",value:function(e){e.stopPropagation(),e.preventDefault();var t=e.nativeEvent.key.toLowerCase();if("backspace"===t&&this.props.allowBackspace&&this.backspace(),1===t.length&&t.match(/[a-z0-9]/i)){if(this.state.index>=this.words.length)return;for(var a=this.state.index,n=this.state.charIndex,r=this.words[a],l=r.word.toLowerCase(),o="",s="",i=0,c=l.length,p=n;p<l.length;p++){var u=l.charAt(p);if(u.match(/[a-z0-9]/i)){if(""!==o){s=u,c=p;break}o=u,i=p}}var h=t===o||""===o,d=this.state.correct.slice(0);if(d[a]||(d[a]=new Array(l.length)),r.byLetter)for(var b=i;b<c;b++)d[a][b]=h;else for(var m=0;m<d[a].length;m++)d[a][m]=h;r.byLetter?""===s?(a++,n=0):n++:(a++,n=0),this.setState({index:a,charIndex:n,correct:d}),a>=this.words.length&&void 0!==this.props.onCompletion&&this.props.onCompletion()}}},{key:"render",value:function(){var e=this,t=void 0!==this.props.readOnly&&this.props.readOnly,a=this.state.index<this.words.length?this.words[this.state.index]:null,n={input:{},correct:{color:"black"},wrong:{color:"red"},unseen:{color:"#EEE"}};return r.a.createElement(C.a,{onPress:this.handlePress},r.a.createElement(k.a,{style:[this.props.style,{alignItems:"flex-start",flexDirection:"row",flexShrink:1,flexWrap:"wrap"}]},r.a.createElement(m.a,null),this.words.map((function(t,a){if(t.byLetter)return a>e.state.index?null:r.a.createElement(m.a,{key:a},a>0?" ":"",t.word.split("").map((function(l,o){var s=e.state.correct[a]&&e.state.correct[a][o];return a===e.state.index&&o>=e.state.charIndex?null:r.a.createElement(m.a,{key:o,style:s?n.correct:n.wrong},t.word[o])})));if(a>=e.state.index)return null;var l=e.state.correct[a]&&e.state.correct[a][0];return r.a.createElement(m.a,{key:a,style:l?n.correct:n.wrong},(a>0?" ":"")+t.word)})),t?null:r.a.createElement(B.a,{ref:function(t){return e.input=t},style:{margin:0,padding:0,position:"relative",width:5,left:0===this.state.index||a&&a.byLetter?0:4},onKeyPress:this.handleKeyPress,autoCompleteType:"off",autoCorrect:!1,autoFocus:!0,editable:!0,selectTextOnFocus:!1,caretHidden:!1,value:"",maxLength:0,secureTextEntry:!1,textContentType:"none",autoCapitalize:"characters"}),this.words.map((function(a,n){if(n<e.state.index)return null;var l=n<=0||n===e.state.index&&e.words[e.state.index].byLetter,o=n===e.state.index&&e.words[e.state.index].byLetter?e.state.charIndex:0;return r.a.createElement(m.a,{key:n,selectable:e.props.displayAll,style:[{color:e.props.displayAll?"#AAA":"#00000000",marginLeft:n!==e.state.index||t?0:-5}]},(l?"":" ")+a.word.substr(o))}))))}}]),t}(r.a.Component),A=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).itemInputs=void 0,a.itemInputs=new Array(a.props.items.length),a.state={index:0,previousIndex:null},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(k.a,{style:[{},{alignItems:"flex-start",flexDirection:"column"}]},this.props.items.map((function(t,a){var n="";0===a?n+=t.chapter:e.props.items[a-1].chapter!==t.chapter&&(n+=t.chapter);return t.part&&(n+=t.part),n+=".",!e.props.displayAllItems&&a>e.state.index?null:r.a.createElement(k.a,{key:a,style:{alignItems:"stretch",flexDirection:"row"}},r.a.createElement(m.a,{style:[f.bmcTextChapter,{flexShrink:0,textAlign:"right",width:45}]},n+"  "),r.a.createElement(P,{ref:function(t){null!=t&&(e.itemInputs[a]=t)},allowBackspace:e.props.allowBackspace,displayAll:e.props.displayAllTextInItem,readOnly:e.state.index!==a&&e.state.previousIndex!==a,style:f.test,text:t.label,onCompletion:function(){a+1<e.itemInputs.length&&e.setState({index:a+1,previousIndex:a},(function(){setTimeout((function(){e.itemInputs[a+1].focus(),setTimeout((function(){}),25)}),25)}))},onTopBackspace:function(){a>0&&e.setState({index:a-1,previousIndex:a},(function(){setTimeout((function(){e.itemInputs[a-1].backspace(),e.itemInputs[a-1].focus()}),25)}))}}))})))}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.navigation.getParam("book"),a=O.contents.find((function(e){return e.title===t}));return void 0===a?r.a.createElement(m.a,null,"Internal Error"):r.a.createElement(h.a,{style:{flex:1,flexDirection:"column"}},r.a.createElement(x,{navigation:this.props.navigation,text:t,onBackIfWeb:function(){return e.props.navigation.navigate("BookAction",{book:t})}}),r.a.createElement(v,{text:"Please type just the first letter:"}),r.a.createElement(I.a,{behavior:"padding"},r.a.createElement(d.a,{style:{flexGrow:1},keyboardShouldPersistTaps:"handled"},r.a.createElement(A,{allowBackspace:!0,displayAllItems:!0,displayAllTextInItem:!0,items:a.items}))))}}]),t}(r.a.Component),T=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.navigation.getParam("book"),a=O.contents.find((function(e){return e.title===t}));return void 0===a?r.a.createElement(m.a,null,"Internal Error"):r.a.createElement(h.a,{style:{flex:1,flexDirection:"column"}},r.a.createElement(x,{navigation:this.props.navigation,text:t,onBackIfWeb:function(){return e.props.navigation.navigate("BookAction",{book:t})}}),r.a.createElement(v,{text:"Please type just the first letter:"}),r.a.createElement(I.a,{behavior:"padding"},r.a.createElement(d.a,{style:{flexGrow:1},keyboardShouldPersistTaps:"handled"},r.a.createElement(A,{allowBackspace:!0,displayAllItems:!1,displayAllTextInItem:!1,items:a.items}))))}}]),t}(r.a.Component),L=a(49),W=a(103),D={Home:{screen:j},BookAction:{screen:E},Study:{screen:S},Test:{screen:T}},J=Object(L.createSwitchNavigator)(D,{backBehavior:"history"}),K=Object(W.createBrowserApp)(J);o.a.render(r.a.createElement(K,null),document.getElementById("root"))}},[[105,1,2]]]);
//# sourceMappingURL=main.b587bcbe.chunk.js.map