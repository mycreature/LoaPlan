import axios from 'axios'

const accessToken = import.meta.env.VITE_LOSTARK_API_KEY
console.log('✅ accessToken:', accessToken)

const instance = axios.create({
  baseURL: 'https://developer-lostark.game.onstove.com',
  headers: {
    'content-type': 'application/json;charset-UTF-8',
    accept: 'application/json,',
  },
})

instance.interceptors.request.use(
  function (config: any) {
    config.headers!.authorization = accessToken
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
export default instance
