import axios from 'axios';
import AuthHelper from './AuthHelper';

const API_URL = process.env.API_URL;

export default class ApiHelper {
    static get (url : string, callback : Function){
        let headers : any = {};

        if (AuthHelper.isLogged()) {
            headers.token = AuthHelper.getAccessToken();
            headers.uid = AuthHelper.getUserId();
        }

        axios.get(API_URL + url, { headers: headers }).then((response) => {
            callback(response.data);
        }).catch((error) => {  })
    }


    static async getResult (url : string, callback : Function){
        let headers : any = {};

        if (AuthHelper.isLogged()) {
            headers.token = AuthHelper.getAccessToken();
            headers.uid = AuthHelper.getUserId();
        }

        let result = await axios.get(API_URL + url, { headers: headers });

        return result;
    }

    static post (url : string, params = {}, callback : Function) {
        let headers : any = {};

        if (AuthHelper.isLogged()) {
            headers.token = AuthHelper.getAccessToken();
            headers.uid = AuthHelper.getUserId();
        }

        axios.post(API_URL + url, params, { headers: headers }).then((response) => {
            callback(response.data);
        }).catch((error) => {  })
    }

    static delete (url : string, callback : Function) {
        let headers : any = {};

        if (AuthHelper.isLogged()) {
            headers.token = AuthHelper.getAccessToken();
            headers.uid = AuthHelper.getUserId();
        }

        axios.delete(API_URL + url, { headers: headers }).then((response) => {
            callback(response.data);
        }).catch((error) => { console.log(error); })
    }
}