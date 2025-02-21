//对axios进行二次封装
import axios from 'axios'
import router from '@/router'

//1、利用axios对象的方法create,去创建一个axios实例
// const ipPort = window.location.hostname + ':' + window.location.port
// const ipPort = "192.168.1.243:9080"
const requests = axios.create({
    //配置对象
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: `${import.meta.env.VITE_BASE_URL}/v1`,
    //代表请求超时的时间5s
    timeout: 5000,
})
//请求拦截器，在请求发出之前做些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有个属性很重要，header请求头
    return config
})
//响应拦截器,对响应的数据做一些操作
requests.interceptors.response.use(
    (res) => {
        //成功回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
        // console.log('响应拦截器', res)
        if (res.data.code === 401) {
            console.log('window.location.href', window.location.href)
            if (window.location.href.indexOf('pad') !== -1) {
                return Promise.resolve({})
            } else {
                return router.push('/')
            }
        }
        return Promise.resolve(res.data)
    },
    (error) => {
        //响应失败回调函数，如终结Promise链
        console.log('请求失败:', error)
        return Promise.reject(error)
    }
)
//对外暴露
export default requests
