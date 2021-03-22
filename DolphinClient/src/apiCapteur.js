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
}
export default capteurApi;