webpackJsonp([2],{"2Nlc":function(t,e,a){"use strict";a("YFWx");var n=void 0;e.a={head:function(){return{title:"今日排产"}},layout:"layout",components:{},data:function(){return{date:"111",tmps:[{name:"封边机1",status:"yellow"},{name:"封边机2",status:"red"},{name:"封边机3",status:"green"},{name:"打孔机1",status:"green"},{name:"打孔机2",status:"yellow"},{name:"开料机1",status:"red"},{name:"开料机2",status:"green"},{name:"开料机3",status:"green"},{name:"开料机4",status:"green"},{name:"开料机5",status:"green"},{name:"开料机6",status:"green"}]}},watch:{"$store.state.updateSate":function(){n.init()}},methods:{init:function(){n.date=window.Core.getNowDate()}},mounted:function(){(n=this).init()}}},"6e46":function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,"body{background-color:#000!important}.header{visibility:hidden}.content,.self-header{background-color:#000!important}.content-wrapper{margin:0;padding:0;background-color:#000}#main{width:600px;height:400px}#main,#mainfall{background-color:#000}",""])},"6vl1":function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-list"},[a("h3",{staticClass:"text-center",staticStyle:{color:"white"}},[t._v("今日机器工作情况 当前时间 "+t._s(t.date))]),a("div",{staticClass:"card"},[a("div",{attrs:{id:"mainfall"}},t._l(t.tmps,function(e){return a("div",[a("div",{staticClass:"singleDevice"},[a("div",{staticClass:"leftArea",style:"background-color:"+e.status}),a("p",{style:"color:"+e.status},[t._v(t._s(e.name))])])])}))])])},i=[];n._withStripped=!0},Ifv3:function(t,e,a){var n=a("6e46");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a("urRS").default)("25d9131a",n,!1,{sourceMap:!1})},eLev:function(t,e,a){var n=a("nJRV");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a("urRS").default)("cb21c8c6",n,!1,{sourceMap:!1})},nJRV:function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,".leftArea[data-v-5a8a2f31]{width:30px;height:80px;padding:0;margin:0;display:block;float:left;position:relative;left:-30px;top:-30px}.singleDevice[data-v-5a8a2f31]{float:left;margin:10px;padding:30px;width:315px;height:80px;vertical-align:middle;background-color:#fff}.singleDevice p[data-v-5a8a2f31]{text-align:center}",""])},vqI7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("2Nlc"),i=a("6vl1"),s=a("QAAC"),o=!1;var r=function(t){o||(a("Ifv3"),a("eLev"))},l=Object(s.a)(n.a,i.a,i.b,!1,r,"data-v-5a8a2f31",null);l.options.__file="pages\\factory\\devicewatch.vue",e.default=l.exports}});