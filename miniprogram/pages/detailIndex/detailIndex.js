// miniprogram/pages/detailIndex/detailIndex.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#feffff'
    })
    this.getList()
  },

  getList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movieIndex',
      data: {
        type: 'movie',
		    tag: '热门',
		    pageSize: 60,
		    pageNum: 0
      },
      success: ({result}) => {
        // "★★★★★☆☆☆☆☆".slice(5 - Math.round(item.rate), 10 - Math.round(item.rate))
        this.setData({
          list: result.subjects.map(sub => ({
            ...sub,
            score:  "★★★★★☆☆☆☆☆".slice(5 - Math.floor(sub.rate/2), 10 - Math.floor(sub.rate/2))
          }))
        })
        wx.hideLoading()
      }
    })
  },
})