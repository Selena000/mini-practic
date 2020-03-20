// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init()

// let url = 'https://frodo.douban.com/api/v2/movie/rank_list?apiKey=054022eaeae0b00e0fc068c0c0a2102a'

// getTop()

async function getTop(url) {
	let result = await axios.get(url)

	return result.data
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const data = await getTop(event.url)


  return {
  	data
  }
}