'use strict'

const db = require("../models")
require('dotenv').config();

module.exports = {
    create : (req, res, next)=>{
        console.log(req.body);
        return db.groupe.create({
            nom : req.body.name
        })
        .then((gr) => {
            for(let i=req.max_id; i<(req.max_id+ req.body.nbCapteur) ;i++){
                db.captor.create({
                    cap_nom: process.env.CAP_NOM+i,
                    cap_modele: process.env.CAP_NOM,
                    cap_type: 'mobile',
                }).then((capteur) => 
                    {
                        console.log(capteur);
                        return db.user.create({
                            name: capteur.dataValues.cap_nom,
                            groupe : gr.dataValues.id,
                            id_capteur : capteur.dataValues.cap_id_capteur
                        })
                    }
                )
            }
            return res.status(201).send('Created');
        })
        .catch(err => res.json({error : err}))
    },
}