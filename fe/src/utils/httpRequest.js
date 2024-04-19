import axios from "axios";
import { getToken } from "./token";

function HttpRequest(url, method = "GET", params = {}, isLoading = true, responseType = null) {
    method = method.toUpperCase();
    const token = getToken();
    const httpDefault = {
        // baseURL: process.env.BASE_API,
        baseURL:"http://localhost:3212/",
        method,
        url,
        headers: {
            // "Access-Control-Allow-Origin": "http://localhost:3000",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            withCredentials: true, // token: token,
            Authorization: "Bearer "+token,
            vision: "1.0.0",
            operating_system: "Web"
        },
        params: method === "GET" || method === "DELETE" ? params : null,
        data: method === "POST" || method === "PUT" ? params : null,
        timeout: 10000,
    };
    if (responseType) {
        httpDefault.responseType = responseType;
    }

    return new Promise((resolve, reject) => {
        axios(httpDefault)
            .then((response) => {
                resolve(response);
            })
            .catch((response) => {
                // errorState(response);
                reject(response);
            })
            // .then(function () {
            //     // always executed
            //     httpTime--;
            //     // console.log(httpTime, url)
            //     if (!httpTime) {
            //         store.state.app.loading = false;
            //     }
            // });
    });
}

export default HttpRequest;
