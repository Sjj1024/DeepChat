import { fetch } from '@tauri-apps/plugin-http'

// base url
const baseURL = `https://ark.cn-beijing.volces.com`

const commonOptions = {
    timeout: 60,
}

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, requestedURL: string) => {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
}

const http = async (url: string, options: any = {}) => {
    if (!options.headers)
        options.headers = {
            Authorization: `Bearer 7f5744e3-acfc-43de-a35c-3bd3cf92f5e4`,
        }
    if (options?.data) {
        options.body = JSON.stringify(options.data)
        // if (options.body.type === BODY_TYPE.Form) {
        //     options.headers['Content-Type'] = 'multipart/form-data'
        // }
    }
    // get params
    if (options?.params) {
        url = `${url}?${new URLSearchParams(options.params)}`
    }
    options = { ...commonOptions, ...options }
    console.log('request-------', buildFullPath(baseURL, url), options)
    return fetch(buildFullPath(baseURL, url), options)
        .then(async (response: any) => {
            console.log('fetch success response', response)
            // maybe response.body is null
            const data = response.body ? await response.json() : {}
            if (response.status >= 200 && response.status < 500) {
                return Promise.resolve({ status: response.status, data: data })
            }
            return Promise.reject({
                status: response.status,
                data: data,
            })
        })
        .catch((error) => {
            console.error('fetch error', error)
            return Promise.resolve({ status: 400, msg: 'fetch error' })
        })
        .finally(() => {
            console.log('fetch finally')
        })
}

export default http
