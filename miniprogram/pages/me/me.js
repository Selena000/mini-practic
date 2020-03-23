// miniprogram/pages/me/me.js
Page({

  /**
   * Page initial data
   */
  data: {
    detailMsg: [
      { image: '../../images/img/movie.png', text: '观影分析', count: 10, markText: '标记10部影片\n开启观影分析' },
      { image: '../../images/img/book.png', text: '读书分析', count: 10, markText: '标记10本书\n开启读书分析' },
      { image: '../../images/img/music.png', text: '音乐分析', count: 10, markText: '标记10张唱片\n开启音乐分析' }
    ]
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