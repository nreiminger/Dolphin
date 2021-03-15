'use-strict'

const db = require("../models")
const sequelize =require("sequelize");
module.exports ={
    get_max_capteur : (req, res, next) =>{
        return db.captor.findOne({
            attributes : [
                [ sequelize.fn('MAX',
                    sequelize.cast(
                        sequelize.literal(`replace(cap_nom,'${process.env.CAP_NOM}', '')`)
                    , 'int')), 'id']
            ],
            where:{
                cap_nom : {
                    [sequelize.Op.like] : process.env.CAP_NOM+'%'
                }
            }
        })
        .then((capteurs)=> {
            req.max_id = capteurs.dataValues.id != null ? parseInt(capteurs.dataValues.id +1 ) : 1; 
            next()})
        .catch(err => console.log(err))
    },

};