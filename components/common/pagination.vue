<template lang="pug">
  div.component-paination
    div.pagenationid(:id="'pagid-' + flag")
</template>
<script>
  import $ from '~/static/js/jquery-vendor'
  require('~/static/js/jquery.twbsPagination.js')
  export default {
    props: ['flag', 'size', 'total'],
    data () {
      return {
      }
    },
    watch: {
      '$route': function () {
        this.initPage()
      },
      'total': function () {
        this.initPage()
      }
    },
    methods: {
      initPage: function () {
        let $wraper = $(`#pagid-${this.flag}`)
        if ($wraper.find('ul')) {
          $wraper.twbsPagination('destroy')
        }
        let self = this
        let startPageNum = self.$route.query.page ? Number(self.$route.query.page) : Number(1)
        let pages = Math.ceil(this.total / this.size)
        if (pages < 1) { pages = 1 }
        $wraper.twbsPagination({
          totalPages: pages,
          visiblePages: 5,
          startPage: startPageNum,
          initiateStartPageClick: false,
          paginationClass: 'pagination justify-content-end',
          first: '首页',
          prev: '«',
          next: '»',
          last: '末页',
          onPageClick: function (event, pageNumber) {
            let _query = {}
            for (let key in self.$route.query) {
              _query[key] = self.$route.query[key]
            }
            _query.page = pageNumber
            self.$router.push({path: self.$route.path, query: _query})
            self.$emit('callback', pageNumber)
          }
        })
      }
    },
    mounted () {
      this.initPage(this.startpage)
    }
  }
</script>

<style lang="scss" scoped>
  .component-paination {
    margin: 20px 0 10px 0;
    height: 40px;
  }
</style>