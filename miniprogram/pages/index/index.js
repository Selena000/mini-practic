// miniprogram/pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,
    inputVal: '',
    viewData: [
      { title: '影院热播' },
      { title: '豆瓣热门' },
      { title: '近期热门剧集' },
      { title: '近期热门综艺节目' },
      { title: '畅销图书' },
      { title: '热门单曲榜' }
    ]
  },
  showInput() {
    this.setData({
      inputShowed: true
    })
  },
  hideInput() {
    this.setData({
      inputShowed: false
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getList()
  },

  getList() {
    wx.showLoading({
      title: '加载中'
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
          viewData: this.data.viewData.map((item, index) => {
            item.list = result.subjects.slice(10 * index, (index + 1) * 10).map(sub => ({
              ...sub,
              score:  "★★★★★☆☆☆☆☆".slice(5 - Math.floor(sub.rate/2), 10 - Math.floor(sub.rate/2))
            }))
            return item
          })
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})