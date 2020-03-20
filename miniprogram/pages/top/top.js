// miniprogram/pages/top/top.js
Page({

  /**
   * Page initial data
   */
  data: {
    topCollection: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '榜单'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#feffff'
    })

    this.getList()
  },

  getList() {
    let url = 'https://frodo.douban.com/api/v2/movie/rank_list?apiKey=054022eaeae0b00e0fc068c0c0a2102a'
    
    wx.cloud.callFunction({
      name: 'topMovie',
      data: {
        url
      },
      success: ({result}) => {
        this.setData({
          topCollection: result.data.selected_collections
        })
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