'use strict'

const db = require("../models")
require('dotenv').config();

module.exports = {
    create : (req, res, next)=>{
        console.log(req.body);
        return db.group.create({
            nom : req.body.name
        })
        .then((gr) => {
            for(let i=req.max_id; i<parseInt(req.max_id)+ parseInt(req.body.nbCapteur) ;i++){
                console.log(i)
                db.captor.create({
                    cap_nom: process.env.CAP_NOM+i,
                    cap_modele: process.env.CAP_NOM,
                    cap_type: 'mobile',
                }).then((capteur) => 
                    {
                        console.log(gr);
                        console.log(capteur.dataValues.id)
                        db.user.create({
                            name: capteur.dataValues.cap_nom,
                            groupe : gr.dataValues.id,
                            cap_id_capteur : capteur.dataValues.id,
                            gro_id_groupe : gr.dataValues.id
                        })
                    }
                ).catch(err => res.status(409).json(err))
            }
            return res.status(201).send('Created');
        }).catch(err => res.status(409).json(err))
        .catch(err => res.json({error : err}))
    },
}