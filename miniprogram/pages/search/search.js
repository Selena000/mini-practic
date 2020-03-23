// miniprogram/pages/search/search.js
Page({

  /**
   * Page initial data
   */
  data: {
    resultList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },
  bindSearchInput(e) {
    // this.search(e.detail.value)
    this.debounce(this.search(e.detail.value), 600)
  },
  search(value) {
    let url = encodeURI(`https://frodo.douban.com/api/v2/search?&apiKey=054022eaeae0b00e0fc068c0c0a2102a&q=${value}`)
    wx.cloud.callFunction({
      name: 'topMovie',
      data: {
        url
      },
      success: ({result}) => {
        console.log(result)
        this.setData({
          resultList: result.data.subjects
        })
      }
    })
  },
  debounce(fn, interval) {
    console.log(11)
    var timer;
    var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
    return function() {
      clearTimeout(timer);
      var context = this;
      var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      timer = setTimeout(function() {
        fn.call(context,args);
      }, gapTime);
    };
  }
})