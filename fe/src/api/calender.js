import HttpRequest from "../utils/httpRequest";

export function getData (params = {}) {
    return HttpRequest('/data', 'get', params)
}

export function addData (params = {}) {
    return HttpRequest('/data', 'post', params)
}