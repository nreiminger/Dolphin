'use strict';

const db = require("../models");
const sequelize = require("sequelize");
const capteur_ctrl = require('../controllers/capteur')
const authVerify = require('../middleware/authVerify')
module.exports = [
    {
        url : '/captor',
        method : 'get',
        func : [(req, res) => {
                db.group.findAll({
                    attributes : ['gro_nom'],
                    include :  {
                        model : db.user,
                        attributes : ['uti_name', 'cap_id_capteur'],
                        where : {
                            cap_id_capteur :{
                                [sequelize.Op.ne]:null 
                            }
                        }
                    }
                })
            .then(captors => res.json(captors))
        }
    ]
    },
    {
        url:'/captor',
        method : 'post',
        func: [
            authVerify,
            capteur_ctrl.get_max_capteur,
            (req, res) =>{
                console.log(req.max_id)
                db.captor.create({
                    cap_nom : process.env.CAP_NOM+req.max_id,
                    cap_modele : process.env.CAP_NOM,
                    cap_type: 'mobile',
                })
                .then(capteur => 
                    db.user.create({
                        name : process.env.CAP_NOM + capteur.dataValues.cap_id_capteur,
                        groupe : req.user.gr != null ? req.user.gr : 1,
                        id_capteur : capteur.dataValues.cap_id_capteur
                    })
                    .then(() => res.status(201).send('Created'))
                    .catch((err) => res.status(409).json({error : err})) 
                    )
                .catch((err) => res.json({error : err}))
            }
        ]
    },
    {
        url :'/captor/:captor_id',
        method :'delete',
        func : [
            capteur_ctrl.delete_by_id
        ]
    },
    
];