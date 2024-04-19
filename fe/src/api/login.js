import HttpRequest from "../utils/httpRequest";

export function login (params = {}) {
    return HttpRequest('/auth/login', 'post', params)
}

export function logout(params = {}) {
    return HttpRequest('/auth/logout', 'post', params)
}