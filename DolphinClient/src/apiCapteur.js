import {checkStatus, url_prefix} from "./CheckStatus"

const capteurApi = {
    getCapteurs : () => {
        return fetch(`${url_prefix}/captor`)
            .then(checkStatus)
            .then(res => res.json())
    }
}
export default capteurApi;