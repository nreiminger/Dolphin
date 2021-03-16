const jwt = require('jsonwebtoken');
const db = require('../models')
module.exports = (req, res, next) =>{
    console.log(req.headers.authorization)
    jwt.verify(req.headers.authorization.replace("Bearer ",""),'secret', (err, decode) => {
        console.log(decode)
        req.user = {
            name: decode.user_name ,
            id: decode.user_id, 
            admin: decode.user_is_admin,
            gr: decode.user_gr
        },
        next();
    }) 
}
