webpackJsonp([10],{"64bZ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("eAOi"),n=a("RrYE"),r=a("QAAC"),s=!1;var o=function(t){s||a("nTGp")},c=Object(r.a)(i.a,n.a,n.b,!1,o,"data-v-2909dcf2",null);c.options.__file="pages\\device\\index.vue",e.default=c.exports},RrYE:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-list"},[a("h4",{staticClass:"text-center"},[t._v("设备列表")]),a("div",{staticClass:"card"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table card-table table-striped table-vcenter"},[t._m(0),a("tbody",t._l(t.datainfo,function(e,i){return a("tr",[a("td",[t._v(t._s(i+1))]),a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s((e.latest_run_record,((e.latest_run_record||{}||{}).user||{}).name)))]),a("td",[t._v(t._s(e.latest_run_record?t.localDate(e.latest_run_record.login_time):"暂无"))]),a("td",[t._v(t._s(e.latest_run_record?e.latest_run_record.st_time:"暂无"))]),a("td",[t._v(t._s(t.usePercent(e.production,e.capacity))+"%")]),a("td",[t._v(t._s(t.typeFomat("device",e.status)))])])}))]),a("p",{directives:[{name:"show",rawName:"v-show",value:0==t.datainfo.length&&0==t.loadingState,expression:"(datainfo.length == 0) && (loadingState == false)"}],staticStyle:{"text-align":"center"}},[t._v("暂无数据")]),t.loadingState?a("div",[a("vueloading")],1):t._e(),a("pagination",{attrs:{flag:"devicelist",total:t.pagetotal,size:t.pagesize},on:{callback:t.getListData}})],1)])])},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("序号")]),e("th",[this._v("设备名称")]),e("th",[this._v("当前操作人员")]),e("th",[this._v("登录时间")]),e("th",[this._v("运行时间 /h")]),e("th",[this._v("设备利用率")]),e("th",[this._v("工作状态")])])])}];i._withStripped=!0},eAOi:function(t,e,a){"use strict";var i=a("YFWx"),n=void 0;e.a={head:function(){return{title:"设备"}},layout:"layout",components:{},data:function(){return{loadingState:!0,pagetotal:1,pagesize:10,datainfo:[]}},watch:{"$store.state.updateSate":function(){n.init()}},methods:{init:function(){n.loadingState=!0},getDeviceData:function(t){var e={page:t,limit:n.pagesize};Object(i.a)().get("/device",{params:e}).then(function(t){n.datainfo=t.data.data.data.map(function(t){return t.latest_run_record&&(t.latest_run_record.st_time=window.Core.getRuntime(1e3*parseInt(t.latest_run_record.start_time))),t}),n.loadingState=!1,n.pagetotal=t.data.data.total})},getListData:function(t){n.getDeviceData(t)}},mounted:function(){(n=this).init(),n.getDeviceData(1),setInterval(function(){n.datainfo.forEach(function(t){t.latest_run_record&&(t.latest_run_record.st_time=window.Core.getRuntime(1e3*parseInt(t.latest_run_record.start_time)))})},1e3)}}},nTGp:function(t,e,a){var i=a("uIig");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a("urRS").default)("2cdad61a",i,!1,{sourceMap:!1})},uIig:function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,".table[data-v-2909dcf2]{border-bottom:1px solid #ddd}",""])}});