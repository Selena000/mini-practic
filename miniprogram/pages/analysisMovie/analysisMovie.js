// miniprogram/pages/analysisMovie/anlysisMovie.js
Page({

  /**
   * Page initial data
   */
  data: {
    x: 0,
    y: 30
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: ''
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fff'
    })
  },

  htouchmove(e) {
    console.log('htouchmove', e)
  },

  vtouchmove(e) {
    console.log('htouchmove', e)
  },

  touchend(e) {
    console.log('touchend', es)
  },

  touchmove(e) {
    console.log('touchmove', e)
  },

  moveChange(e) {
    const { source, x, y } = e.detail
    // console.log(x, y)
    // x: -40 y: 80 开始显示按钮
    // console.log('moveChange', e)

    

    if (source === 'out-of-bounds') {
      console.log(111)
      this.setData({
        x,
        y
      })
    }
  }
})