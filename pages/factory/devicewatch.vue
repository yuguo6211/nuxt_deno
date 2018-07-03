<template lang="pug">
  div.table-list
    h3.text-center(style="color: white") 今日机器工作情况 当前时间 {{date}}
    div.card
      div#mainfall(v-cloak)
        div(v-for="item in tmps")
          div(v-cloak).singleDevice
            div.leftArea(v-bind:style="'background-color:' + (item.status)")
            p(v-bind:style="'color:' + (item.status)") {{item.name}}
</template>
<script>
  let model
  import axios from '~/plugins/axios'

  export default {
    head () {
      return {
        title: '今日排产'
      }
    },
    layout: 'layout',
    components: {
    },
    data () {
      return {
        date: '111',
        tmps: [
          {
            name: '封边机1',
            status: 'yellow'
          },
          {
            name: '封边机2',
            status: 'red'
          },
          {
            name: '封边机3',
            status: 'green'
          },
          {
            name: '打孔机1',
            status: 'green'
          },
          {
            name: '打孔机2',
            status: 'yellow'
          },
          {
            name: '开料机1',
            status: 'red'
          },
          {
            name: '开料机2',
            status: 'green'
          },
          {
            name: '开料机3',
            status: 'green'
          },
          {
            name: '开料机4',
            status: 'green'
          },
          {
            name: '开料机5',
            status: 'green'
          },
          {
            name: '开料机6',
            status: 'green'
          }
        ]
      }
    },
    watch: {
      '$store.state.updateSate': function () {
        model.init()
      }
    },
    methods: {
      // 初始化获取数据
      init: function () {
        model.date = window.Core.getNowDate()
      }
    },
    mounted () {
      model = this
      model.init()
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
  .self-header {
    background-color: #000 !important;
  }
  .content{
    background-color: #000 !important;
  }
  .content-wrapper {
    margin: 0px;
    padding: 0px;
    background-color: black;
  }
  #main {
    width: 600px;
    height:400px;
    background-color: #000;
  }
  #mainfall {
    background-color: black;
  }
</style>
<style lang="scss" scoped>
 .leftArea {
  width:30px; 
  height: 80px; 
  padding: 0px; 
  margin:0px;
  display: block;
  float: left;
  position: relative;
  left: -30px;
  top: -30px;
 }
 .singleDevice {
   float: left;
   margin: 10px;
   padding: 30px;
   width: 315px;
   height: 80px;
   vertical-align: middle;
   background-color: white;
   p {
     text-align: center;
   }
 }

</style>