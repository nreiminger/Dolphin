'use strict'
const group_ctrl = require("../controllers/groupe")
const capteur_ctrl = require("../controllers/capteur")
module.exports = [
    {
        url:'/group',
        method: 'get',
        func : [
            (req,res) => { return res.json({data : 'test'}) }
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