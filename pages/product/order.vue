<template lang="pug">
  div.table-list
    span.goback-icon(v-on:click="backPage()") 
      i.fe.fe-chevrons-left
      | 返回
    h4.text-center 未完成订单数
    div.search-box(v-if="false")
      <vue-searchform v-on:searchback="searchData"></vue-searchform>
    div.row.row-cards
    div.card
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th(colspan="1") 产品信息
              th 数量（件）
              th 交货时间
              th 任务单状态
              th.text-center 已完成数量
              th.text-center 已包装数量
          tbody
            template(v-for="item in orders")
              tr(style="background-color: white") 
                td(colspan="1") {{item.delivery_date || '暂无'}}
                td(colspan="5") 生产任务单：{{orderNumber}}
              template(v-for="product in item.order_items")
                tr 
                  td
                    div.img-div(class="avatar d-block" style="background-image: url(item.images)")
                    div.info-div
                      span 产品名称：{{(product || {}).name || '暂无'}}
                      span 产品规格：{{(product || {}).height || '暂无'}}-{{(product || {}).length || '暂无'}}-{{(product || {}).width || '暂无'}}
                  td {{(product || {}).amount || '暂无'}}
                  td {{(product || {}).deliverTime || '暂无'}}
                  td {{item.status || '暂无'}}
                  td.text-center {{item.finishCount || '暂无'}}
                  td.text-center {{item.packCount || '暂无'}}
        p(style="text-align: center" v-show="(orders.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading      
</template>
<script>
  let model
  let _ = require('underscore')
  import searchForm from '~/components/common/searchform.vue'
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '设备'
      }
    },
    layout: 'layout',
    components: {
      'vue-searchform': searchForm
    },
    data () {
      return {
        loadingState: true,
        orders: [],  //  未完成订单数列表
        searchObj: {}  //  搜索对象 2018.6.11 王翀
        // orderNumber: this.$route.query.number  //  生产任务单号
      }
    },
    methods: {
      init: function () {
        model.loadingState = true
      },
      backPage: function () {
        window.window.location = '/product'
      },
      //  获取未完成订单列表
      getOrderList: function (obj) {
        axios().get('/workshop/order/unfinished/'+this.$route.query.id, {params: model.searchObj}).then((msg) => {
          model.orders = msg.data.data
          model.loadingState = false
        })
      },
      //  搜索组件返回的数据
      searchData: function (obj) {
        if (obj) {
          //  搜索
          model.searchObj = _.clone(obj)
          if (obj.start_time) {
            model.searchObj.start_time = (Date.parse(obj.start_time) / 1000) 
          }
          if (obj.end_time) {
            model.searchObj.end_time =  (Date.parse(obj.end_time) / 1000)
          }
        } else {
          //  刷新
          model.searchObj = {}
        }
        model.orders = []
        model.getOrderList()
      }
    },
    mounted () {
      model = this
      model.init()
      model.getOrderList()
    }
  }
</script>
<style lang="scss" scoped>
.img-div{
  position: absolute;
}
.info-div{
  margin-left: 50px;
  span{
    display: -webkit-box;
  }
}
</style>