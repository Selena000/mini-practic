// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

getMovie()

async function getMovie(data) {
	// let data = {
	// 	type: 'movie',
	// 	tag: '热门',
	// 	page_limit: 50,
	// 	page_start: 0
	// }
	const url = encodeURI(`https://movie.douban.com/j/search_subjects?type=${data.type}&tag=${data.tag}&page_limit=${data.page_limit}&page_start=${data.page_start}`)
	const result = await axios.get(url)
	
	return result.data
}

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, tag, pageSize: page_limit, pageNum: page_start } = event
  const data = await getMovie({
  	type,
  	tag,
  	page_limit,
  	page_start
  })

  return data
}