import {checkStatus, url_prefix} from "./CheckStatus"

const capteurApi = {
    getCapteurs : () => {
        return fetch(`${url_prefix}/captor`)
            .then(checkStatus)
            .then(res => res.json())
    },
    deleteCapteur : (id_capteur) => {
        return fetch(`${url_prefix}/captor/${id_capteur}`,{ 
            method : 'delete' 
        })
        .then(checkStatus)
    },
    updateCapteur : ({currentCapteur,group_id})=>{
        console.log(currentCapteur + " "+ group_id)
        return fetch(`${url_prefix}/captor/${currentCapteur}`,{
            method : 'put',
            headers : new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body : JSON.stringify({group_id})
        })
    },
    createGroupe : ({name,nbCapteur})=>{
        console.log(JSON.stringify({name,nbCapteur}))
        return fetch(`${url_prefix}/group`,{
            method : 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
            body : JSON.stringify({name,nbCapteur})
        })
        .then(checkStatus)
    },
    getGroup : () => {
        return fetch(`${url_prefix}/group`)
        .then(checkStatus)
        .then(data => data.json())
    },

}
export default capteurApi;