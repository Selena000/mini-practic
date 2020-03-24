// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const qs = require('qs')

cloud.init()

// let url = 'https://frodo.douban.com/api/v2/movie/rank_list?apiKey=054022eaeae0b00e0fc068c0c0a2102a'
// let url = encodeURI(`https://frodo.douban.com/api/v2/noviciate/mark_recommendations?start=0&apiKey=054022eaeae0b00e0fc068c0c0a2102a`)
// getTop({
// 	url 
// })

async function getTop({url, params = {}}) {
	let result = await axios.get(url, qs.stringify(params))
	// console.log(result.data)
	return result.data
}

// 云函数入口函数
exports.main = async (event, context) => {
  const data = await getTop(event)

  return {
  	data
  }
}