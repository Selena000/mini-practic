Page({
  data: {
    //  app.json -> window -> "usingComponents": "./components/tabbar/tabbar"
      list: [{
        "text": "对话",
      },
      {
        "text": "设置"
      }]
  },
  tabChange(e) {
      console.log('tab change', e)
  }
});