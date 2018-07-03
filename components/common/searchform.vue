<template lang="pug">
  div.component-searchform
    div.row(:id="'search-' + flag")
      div.col-md-6.col-lg-4
        div.form-group
          div.input-icon.mb-3
            span.input-icon-addon
              i.fe.fe-search
            input.form-control(type="text" v-model="obj.keywords" placeholder="请输入搜索内容")
      div.col-md-3.col-lg-2
        div.input-icon
          input.datepicker.start.form-control(type="text" v-model="obj.start_time" placeholder="起始时间")
          span.input-icon-addon
            i.fe.fe-calendar
      div.col-md-3.col-lg-2
        div.input-icon
          input.datepicker.end.form-control(type="text" v-model="obj.end_time" placeholder="截止时间")
          span.input-icon-addon
            i.fe.fe-calendar
      div.col-md-6.col-lg-4
        button.btn.btn-azure.btn-sm(@click="searchBtn(true)" style="margin-right: 10px;") 搜索
        button.btn.btn-lime.btn-sm(@click="searchBtn(false)") 刷新

</template>
<script>
  let model
  let $ = require('jquery')
  let _ = require('underscore')
  require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.css')
  export default {
    props: ['flag'],
    data () {
      return {
        obj: {
          keywords: '',
          start_time: '',
          end_time: ''
        }
      }
    },
    methods: {
      init: function () {
        $('.datepicker').datepicker({
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
          todayHighlight: true
        })
        $('.datepicker').on('changeDate', function(event) {
          // 开始时间
          if ($(event.target).hasClass('start')) {
            model.obj.start_time = $(event.target).val()
          } else {
            // 结束时间
            model.obj.end_time = $(event.target).val()
          }
        })
      },

      /**
      * 点击搜索
      * flag 标记是刷新还是搜索
      */
      searchBtn: function (flag) {
        let nullkey = false
        if (flag) {
          for(let key in this.obj) {
            if (!_.isEmpty(this.obj[key])) {
              nullkey = true
            }
          }
          if (!nullkey) {
            return
          }
        } else {
          //  刷新时清空
          model.obj.keywords = ''
          model.obj.start_time = ''
          model.obj.end_time = ''
        }
        if (Date.parse(model.obj.start_time) > Date.parse(model.obj.end_time)) {
          Core.alert('danger', '起始时间不能大于结束时间')
          return
        }
        this.$emit('searchback', flag ? this.obj : '')
      }
    },
    mounted () {
      require('bootstrap-datepicker')
      require('bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN')
      model = this
      model.init()
    }
  }
</script>
<style lang="scss" scoped>
  .component-searchform {
    input {
      font-size: 0.5rem;
    }
    .btn{
      width: 72px;
      height: 34px;
    }
  }
</style>