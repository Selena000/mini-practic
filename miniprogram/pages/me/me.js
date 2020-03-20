// miniprogram/pages/me/me.js
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
      title: '书影音档案'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#feffff'
    })

  }
})