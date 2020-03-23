// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

getSearchResult()

async function getSearchResult() {
	let url = 'https://frodo.douban.com/api/v2/search?q=%E6%88%91&apiKey=054022eaeae0b00e0fc068c0c0a2102a'
	let result = await axios.get(url)

	console.log(result.data)
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}