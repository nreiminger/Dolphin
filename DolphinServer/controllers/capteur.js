'use-strict'

const db = require("../models")
const sequelize =require("sequelize");
const capteur = require("../routes/capteur");
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
    delete_by_id : (req,res,next) =>{
        console.log(req.params.captor_id)
        db.captor.findByPk(req.params.captor_id)
            .then(captor => {
                if(!captor){
                    throw {status: 404, message: 'Requested capteur not found'};
                }
                console.log(captor)
                return captor.destroy();
            })
            .then(()=> res.status(200).end())
            .catch( err => next(err));
    },
};