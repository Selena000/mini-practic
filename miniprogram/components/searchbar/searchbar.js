// miniprogram/pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,
    inputVal: '',
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
  }
})