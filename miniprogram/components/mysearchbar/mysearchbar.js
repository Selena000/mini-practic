// miniprogram/components/mysearchbar/mysearchbar.js
Page({

  /**
   * Page initial data
   */
  data: {

  },
  handleClick(e) {
    wx.navigateTo({
      url: '../../pages/search/search'
    })
  }
})