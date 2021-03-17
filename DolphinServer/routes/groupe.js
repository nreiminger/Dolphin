'use strict'
const group_ctrl = require("../controllers/groupe")
const capteur_ctrl = require("../controllers/capteur")
const db = require("../models")
const authVerify = require("../middleware/authVerify")
module.exports = [
    {
        url:'/group',
        method: 'get',
        func : [
            //authVerify,
            (req,res) => { 
                db.group.findAll({
                    include : db.user
                })
                .then(groups => res.status(200).json(groups)) }
        ]
    },
    {
        url:'/group',
        method:'post',
        func : [
            capteur_ctrl.get_max_capteur,
            group_ctrl.create 
        ]
    }
]