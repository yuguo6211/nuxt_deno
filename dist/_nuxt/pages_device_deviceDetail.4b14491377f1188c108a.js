webpackJsonp([11],{"bl/h":function(t,e,a){"use strict";var i=a("YFWx"),n=void 0;e.a={head:function(){return{title:"设备"}},layout:"layout",components:{},data:function(){return{deviceLoadingState:!0,warningLoadingState:!0,deviceInfo:{},warning:[],devices:[],pagetotal:1,pagesize:10}},methods:{init:function(){n.deviceLoadingState=!0,n.warningLoadingState=!0},getListData:function(t){n.getWarning(t)},getDeviceDetailInfo:function(){Object(i.a)().get("/device/"+this.$route.query.id).then(function(t){t.data.data.length>0&&(n.deviceInfo=t.data.data[0],n.deviceInfo.device_part.length>0&&(n.devices=n.deviceInfo.device_part)),n.deviceLoadingState=!1})},getWarning:function(t){var e={page:t,limit:n.pagesize};Object(i.a)().get("/device/warning/"+this.$route.query.id,{params:e}).then(function(t){t.data.data.data.length>0&&(n.warning=t.data.data.data),n.pagetotal=t.data.total,n.warningLoadingState=!1})},backPage:function(){window.window.location="/device"}},mounted:function(){(n=this).init(),n.getWarning(1),n.getDeviceDetailInfo()}}},cgLe:function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,".table-responsive .row[data-v-46eb9dd7]{margin:0;padding:0}.table-responsive .col-4[data-v-46eb9dd7]{margin-left:0;padding-left:0}.table-responsive .col-8[data-v-46eb9dd7]{margin-right:0;padding-right:0}.info-box[data-v-46eb9dd7]{padding:10px}",""])},juy6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("bl/h"),n=a("xu76"),s=a("QAAC"),c=!1;var d=function(t){c||a("loj9")},o=Object(s.a)(i.a,n.a,n.b,!1,d,"data-v-46eb9dd7",null);o.options.__file="pages\\device\\deviceDetail.vue",e.default=o.exports},loj9:function(t,e,a){var i=a("cgLe");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a("urRS").default)("7f347664",i,!1,{sourceMap:!1})},xu76:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-list"},[a("h4",{staticClass:"text-center"},[t._v("设备详情")]),a("span",{staticClass:"goback-icon",on:{click:function(e){t.backPage()}}},[a("i",{staticClass:"fe fe-chevrons-left"}),t._v("返回")]),a("div",{staticClass:"card info-box"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-3 col-sm-3"},[t._v("设备名称："+t._s(t.deviceInfo.name))]),a("div",{staticClass:"col-3 col-sm-3"},[t._v(" 当前操作人："+t._s((t.deviceInfo.latest_run_record,((t.deviceInfo.latest_run_record||{}||{}).user||{}).name)))]),a("div",{staticClass:"col-3 col-sm-3"},[t._v("登录时间："+t._s(t.localDate((t.deviceInfo.latest_run_record,(t.deviceInfo.latest_run_record||{}||{}).login_time))))]),a("div",{staticClass:"col-3 col-sm-3"},[t._v("设备状态："+t._s(t.typeFomat("device",t.deviceInfo.status)))])])]),a("div",{staticClass:"card"},[a("div",{staticClass:"table-responsive"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("table",{staticClass:"table card-table table-striped table-vcenter"},[t._m(0),a("tbody",t._l(t.warning,function(e,i){return a("tr",[a("td",[a("div",{staticClass:"goods-infos"},[a("p",{staticStyle:{float:"right"}},[t._v(t._s(t.localDate(e.report_time)))]),a("p",{staticClass:"color777 fontsize12"},[t._v("信息："+t._s(e.information))])])])])}))]),a("pagination",{attrs:{flag:"devicedetail",total:t.pagetotal,size:t.pagesize},on:{callback:t.getListData}})],1),a("p",{directives:[{name:"show",rawName:"v-show",value:0==t.warning.length&&0==t.warningLoadingState,expression:"(warning.length == 0) && (warningLoadingState == false)"}],staticStyle:{"text-align":"center"}},[t._v("暂无数据")]),t.warningLoadingState?a("div",[a("vueloading")],1):t._e(),a("div",{staticClass:"col-8"},[a("table",{staticClass:"table card-table table-striped table-vcenter"},[t._m(1),a("tbody",t._l(t.devices,function(e,i){return a("tr",[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.rated_lifespan)+" "+t._s(e.lifespan_unit))]),a("td",[t._v(t._s(e.used_lifespan)+" "+t._s(e.lifespan_unit))]),a("td",[t._v(t._s(parseInt(e.used_lifespan/e.rated_lifespan*100))+"%")]),a("td",[t._v(t._s(e.warning_threshold)+"%")]),a("td",[t._v(t._s("Y"==e.valid?"正常":"不正常"))])])}))])]),a("p",{directives:[{name:"show",rawName:"v-show",value:0==t.devices.length&&0==t.deviceLoadingState,expression:"(devices.length == 0) && (deviceLoadingState == false)"}],staticStyle:{"text-align":"center"}},[t._v("暂无数据")]),t.deviceLoadingState?a("div",[a("vueloading")],1):t._e()])])])])},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"10"}},[this._v("设备事件监控")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"10"}},[this._v("设备维护档案信息")])]),e("tr",[e("th",[this._v("部件名称")]),e("th",[this._v("预算寿命")]),e("th",[this._v("已使用时间  ")]),e("th",[this._v("已使用率%")]),e("th",[this._v("警告门槛%")]),e("th",[this._v("状态")])])])}];i._withStripped=!0}});