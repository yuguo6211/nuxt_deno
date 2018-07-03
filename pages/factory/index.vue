<template lang="pug">
  div.table-list
    p.date-title.text-center.white  {{date}}
    div.row(v-cloak)
      div.col-md-8
        div.table-title.white
          span.order 订单号
          span.img 预览图
          span.furname(style="text-align: center;") 商品名称
          span.number 数量
          span.state 状态
        div.dowebok#dowebok
          ul
            li.item-style(v-for="item in tmps")
              span.order {{item.num}}
              span.img 
                img(:src="item.imgurl" style="width: 40px;height: 40px;")
              span.furname {{item.name}}
              span.number {{item.count}} 
              span.state 
      div.col-md-4
        p.white.text-center.pic-title 今日排产完成情况
        div#main
        div.pic-item
          p 
            span 今日计划数：
            span(style="font-size: 32px;") 120
          p 
            span 今日完成数：
            span.point(style="background-color: green")
            span(style="font-size: 32px;") 100
          p 
            span 今日未完数：
            span.point(style="background-color: red") 
            span(style="font-size: 32px;") 20
</template>
<script>
  let model
  let echarts = require('echarts')
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '今日排产'
      }
    },
    layout: 'factorylayout',
    components: {
    },
    data () {
      return {
        date: '',
        tmps: [
          {
            num: '201806220001',
            imgurl: 'http://cdn.dpjia.com/files/uploads/images/82d9d215d58aa06eb8e52f8d6852132b.jpg',
            name: '搭配家（Dpjia）M8系列JLM8-BD004办公桌 ',
            sku: '1200*800*500',
            count: '1',
            state: '已完成'
          },
          {
            num: '201806220001',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/d89ceae9eb5805a3c6395968c844652a.jpg?x-oss-process=image/resize,m_fill,h_215,w_215',
            name: '搭配家（Dpjia）玲珑系列LL-LY09单人工位',
            sku: '1200*600*750',
            count: '2',
            state: '已完成'
          },
          {
            num: '201806220001',
            imgurl: 'http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg',
            name: '搭配家（Dpjia）M2系列JLM2-BD605六人工位 ',
            sku: '3600*1200*750',
            count: '3',
            state: '已完成'
          },
          {
            num: '201806220001',
            imgurl: 'http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg',
            name: '搭配家（Dpjia）M2系列JLM2-HY001会议桌 ',
            sku: '1200*600*750',
            count: '4',
            state: '生产中'
          },
          {
            num: '201806220002',
            imgurl: 'http://cdn.dpjia.com/files/uploads/images/dad253d5e17829ef96e88e002564bc13.jpg',
            name: '那里家居维也纳系列WYN-YG001衣柜 ',
            sku: '500*800*60',
            count: '5',
            state: '生产中'
          },          
          {
            num: '201806220002',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/54d35fdd091d9b1587477607982eeace.jpg',
            name: '搭配家（Dpjia）玲珑系列LL-LY07双人工位',
            sku: '1200*1200*750',
            count: '6',
            state: '已完成'
          },
          {
            num: '201806220002',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/59a91f5e4bbc0d05e682a9df592a52f6.jpg',
            name: '银丰科艺（ivke）御泰系列YTT-2701主管台',
            sku: '1200*800*600',
            count: '7',
            state: '已完成'
          },
          {
            num: '201806220002',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/5f8869491225379d8458d61720e4b613.jpg',
            name: '搭配家（Dpjia）翎美系列LM-MZ01单人工位',
            sku: '2400*1200*750',
            count: '8',
            state: '未开始'
          },
          {
            num: '201806220003',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/58a4e8e8a9db14b87164706bfb5c8abf.jpg',
            name: '搭配家（Dpjia）部落格系列BG-BG08更衣柜',
            sku: '800*1200*60',
            count: '9',
            state: '未开始'
          },
          {
            num: '201806220003',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/eb6d4b8b8a4fd2232807aa1ecc94c060.jpg',
            name: '搭配家（Dpjia）音乐汇系列YY-MY010茶几',
            sku: '800*400*200',
            count: '10',
            state: '未开始'
          },
          {
            num: '201806220003',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/7076e79e140805e6809214b66e9e7494.jpg',
            name: '搭配家（Dpjia）玲珑系列HY-207B椅子',
            sku: '160*80*80',
            count: '11',
            state: '已完成'
          },
          {
            num: '201806220003',
            imgurl: 'http://cimg.dpjia.com/files/uploads/images/8459c456f982a9a9e89296b384d6a3c8.jpg',
            name: '搭配家（Dpjia）翎美系列HY-207A职员椅',
            sku: '300*120*120',
            count: '12',
            state: '未开始'
          }
        ]
      }
    },
    watch: {
      '$store.state.updateSate': function () {
        // model.init()
      }
    },
    methods: {
      // 初始化获取数据
      init: function () {
        $('#dowebok').vTicker({
          showItems: 10,
          pause: 2000
        })
      },
      initPai: function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        myChart.setOption({
          color: ['red','green'],
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              label: {
                normal: {
                  textStyle : {
                    fontWeight : 600 ,
                    fontSize : 16    //文字的字体大小
                  }
                }
              },
              data: [
                {value: 20, name: '未完成' + ((20/120)*100).toFixed(0) + '%'},
                {value: 100, name: '已完成' + ((100/120)*100).toFixed(0) + '%'}
              ]
            }
          ]
        });
      }
    },
    mounted () {
      model = this
      model.date = window.Core.getNowDate()
      require('~/static/js/jquery.vticker.min.js')
      model.init()
      model.initPai()
    }
  }
</script>
<style lang="scss">
  body{
    background-color: #000 !important;
  }
  .header{
    visibility: hidden;
  }
  .wrapper {
    margin: 0px;
    padding: 0px;
    background-color: black;
  }
  .content{
    background-color: #000 !important;
    padding: 20px;
    .table-list{
      .date-title{
        padding: 0;
        margin-bottom: 10px;
        font-size: 36px;
      }
      .row{
        border: 1px solid #fff;
        .col-md-8, .col-md-4{
          margin: 0;
          padding: 0;
        }
        .table-title{
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
        }
        .table-title {
          & > span{
            display: inline-block;
            height: 60px;
            text-align: center;
            font-size: 30px;
            color: #fff;
          }
          .order{
            width: 15%;
          }
          .img{
            width: 10%;
          }
          .furname{
            text-align: left;
            width: 55%;
          }
          .number{
            width: 10%;
          }
          .state{
            width: 10%;
          }
        }
        .dowebok{
          border-right: 1px solid #fff;
          ul{
            width: 100%;
            li{
              overflow: hidden
            }
            .item-style{
              span{
                display: inline-block;
                height: 60px;
                text-align: center;
                font-size: 30px;
                color: #fff;
              }
              .order{
                width: 15%;
              }
              .img{
                width: 10%;
              }
              .furname{
                text-align: left;
                width: 55%;
              }
              .number{
                width: 10%;
              }
              .state{
                width: 10%;
              }
            }
          }
        }
        .pic-title{
          height: 60px;
          line-height: 60px;
          font-size: 30px;
          border-bottom: 1px solid #fff;
        }
        #main {
          width: 360px;
          height: 360px;
          background-color: #000;
          margin: 0 auto;
          padding: 0px;
        }
        .pic-item{
          p{
            height: 40px;
            line-height: 40px;
            color: #fff;
            padding-left: 30%;
            margin: 20px 0;
            & > span{
              display: inline-block;
              height: 40px;
              line-height: 40px;
              float: left;
            }
            .point{
              width: 20px;
              height: 20px;
              position: relative;
              top: 12px;
              margin: 0 10px;
              border-radius: 100%;
              background-color: #000;
            }
          }
        }
      }
    }
  }
</style>