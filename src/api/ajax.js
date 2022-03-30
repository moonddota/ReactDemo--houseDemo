import axios from "axios";
import { message } from "antd";
import Qs from "qs";

// axios 配置
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;

export function Axios() {
    return axios;
}

export function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        switch (type) {
            case "GET":
                promise = axios.get(url, { params: data });
                break;
            case "POST":
                promise = axios.post(url, Qs.stringify(data));
                break;
            default:
                break;
        }
        promise
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                message.error("请求出错了: " + err.message);
                console.log("请求出错了:", "URL :" + url, err);
            });
    });
}

export function ajax1(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        switch (type) {
            case "GET":
                promise = axios.get(url, { params: data });
                break;
            case "POST":
                promise = axios.post(url, Qs.stringify(data));
                break;
            default:
                break;
        }
        promise
            .then(response => {
                if (response.data.errorCode === 0) {
                    resolve(response.data.data);
                } else {
                    message.error("请求出错了: " + response.data.errorMsg);
                    console.log("请求出错了:", "URL :" + url, response.data.errorMsg);
                }
            })
            .catch(err => {
                message.error("请求出错了: " + err.message);
                console.log("请求出错了:", "URL :" + url, err);
            });
    });
}

export function ajax2(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        switch (type) {
            case "GET":
                promise = axios.get(url, { params: data });
                break;
            case "POST":
                promise = axios.post(url, Qs.stringify(data));
                break;
            default:
                break;
        }
        promise
            .then(response => {
                if (response.data.code === 200) {
                    resolve(response.data.data);
                } else {
                    message.error("请求出错了: " + response.data.msg);
                    console.log("请求出错了:", "URL :" + url, response.data.msg);
                }
            })
            .catch(err => {
                message.error("请求出错了: " + err.message);
                console.log("请求出错了:", "URL :" + url, err);
            });
    });
}
