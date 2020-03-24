// miniprogram/pages/me/me.js
const db = wx.cloud.database()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
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
  },

  getUserInfo(e) {
    wx.showLoading({
      title: '登录中',
    })
    db.collection('users').field({
      openid: e.detail.openid
    }).get().then(res => {
      if (res.data.length > 0) {
        this.setUserInfo(res.data[0])
        wx.hideLoading()
      } else {
        this.setDbUserInfo(e.detail.userInfo)
      }
    })
  },
  /**
   * 数据库里不存在，调云函数获取openid
  */
  setDbUserInfo(userInfo) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        const { openid } = res.result
        const { avatarUrl, city, gender, nickName } = userInfo
        const data = {
          openid,
          avatarUrl,
          city,
          gender,
          nickName,
          create_time: Date.now()
        }
        db.collection('users').add({
          data
        }).then(result => {
          this.setUserInfo(data)
          wx.hideLoading()
        })
      }
    })
  },
  
  setUserInfo(userInfo) {
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo
    })
  },

  /**
   * 退出登录
  */
  logout() {
    wx.removeStorageSync('userInfo')
    this.setData({
      userInfo: {}
    })
  }
})