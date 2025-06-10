import axios from 'axios'

export const createLostarkInstance = (apikey: string) => {
  const accessToken = 'bearer ' + apikey
  console.log('✅ :', accessToken)

  const instance = axios.create({
    baseURL: 'https://developer-lostark.game.onstove.com',
    headers: {
      'content-type': 'application/json;charset-UTF-8',
      accept: 'application/json',
    },
  })

  instance.interceptors.request.use(
    function (config: any) {
      console.log('✅ Lostark API 응답')
      config.headers!.authorization = accessToken
      return config
    },
    function (error) {
      console.error('❌ Lostark API 요청 오류:', error)
      return Promise.reject(error)
    },
  )
  return instance
}

// const accessToken = 'bearer ' + import.meta.env.VITE_LOSTARK_API_KEY
// console.log('✅ accessToken:', accessToken)

// const instance = axios.create({
//   baseURL: 'https://developer-lostark.game.onstove.com',
//   headers: {
//     'content-type': 'application/json;charset-UTF-8',
//     accept: 'application/json,',
//   },
// })

// instance.interceptors.request.use(
//   function (config: any) {
//     config.headers!.authorization = accessToken
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   },
// )
// export default instance
