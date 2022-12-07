import axios from "axios";
import { config } from "../index.js";
import JSONbig from 'json-bigint';

export const Login = async (email, secret) => {
    let data = {
       email: email,
       secret: secret 
    }

    return await service('post', config.serverURL + "/api/login", data);
}

export const Logout = async () => {
    return await service('post', config.serverURL + "/api/logout", {});
}


export const Join = async (email, secret, name, birthday) => {
    let data = {
       email: email,
       secret: secret,
       name: name,
       birthday: birthday
    }

    return await service('post', config.serverURL + "/api/join", data);
}

const service = async (method, url, data) => {
    return axios({
        method: method === 'post' ? 'post' : 'get',
        baseURL: '',
        headers: {
        },
        url: url,
        data: data,
        transformResponse: [function (data) {
            return JSONbig.parse(data);
        }]
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        console.log(error);
        let message = error.message;
        return {code: 9999, message: message || 'error from server', error: error}
    });
}
