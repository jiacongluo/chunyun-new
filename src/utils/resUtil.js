import axios from 'axios';
import utils from './index'
export default {
    /**
     * 加载资源数据
     * */
    async getRes(url, paramter) {
        let theData=await this.get(url,utils.toQuery(paramter||{}));
        return theData;
    },
    /***
     * 异步加载资源
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    async  get(url, params = {}) {
        try {
            let res = await axios.get(url, params);
            return new Promise((resolve, reject) => {
                resolve(res.data);
            })
        } catch (err) {
            console.log(err);
        }
    }
}