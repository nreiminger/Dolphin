'use strict';
const db = require('../models/');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const auth = require('../middleware/authVerify')
module.exports=[
	{
		url : '/user/signup',
		method : 'post',
		func : (req, res) =>{
			const data = {
				name : req.body.username || '',
				password : bcrypt.hashSync(req.body.password,10) || ''
			}
			return db.user.create(data)
			.then(user => res.status(201).json(user))
			.catch(err => res.status(500).json({error : err}))
		}
	},
	{
		url:'/user',
		method: 'get',
		func: (req,res) =>{
			console.log(db);
			return  db.user.findAll({
				include : {
					model : db.captor
				}
			})
			.then(data => {console.log(data); res.json(data)})
			.catch(err => { console.log( err);res.json({error : err})})
		}
	},
	{
		url : '/user/signin',
		method:'post',
		func : (req,res) =>{
			db.user.findOne({where :{name : req.body.username}})
			.then(user => {
				const password = user.password == null ? bcrypt.hashSync("",10) : user.password; //utiliser le hash de la base de données ou utilisé le hash d'une chaine de caractère vide
				if(!bcrypt.compareSync(req.body.password, password))
					return res.status(500).json({error : "Authentification failed !!"})
				let token =  jwt.sign({
						user_name : user.name, 
						user_id: user.id, 
						user_is_admin: user.isAdmin, 
						user_gr: user.groupe
					}, 
					'secret', 
					{ expiresIn: 86400 });
				return res.status(200).json(token);
			})
			.catch(err => res.status(500).json({error : "Authentification failed"}))
		}
	},
    {
        url: '/user/whoami',
        method : 'post',
        func : [
            auth,
            (req, res) =>{
            	res.status(200).json(req.user)
        }
    	]
    },
	{
		url:'/user/resetPassword',
		method : 'put',
		func : [
			auth,
			(req,res)=>{
				console.log(req.user)
					db.user.update({password : null},{
						where: {
							id:req.user.id
						}
					})
					.then(user => res.status(200).send("User "+req.user.id+" has a empty password"))
					.catch(err => res.status(405).json({error:err}))
			}
		]
	},
	{
		url:'/user',
		method:'put',
		func:[
			auth,
			(req,res)=>{
				const data = {password : bcrypt.hashSync(req.body.password,10)}
				db.user.update(data,{
					where:{
						id:req.user.id,
						password: null
					}
				})
				.then((data) => { if(data == 0) res.status(403).send("Reset your password first"); res.status(201).send("Password Changed")})
				.catch(err => res.json({error : err}))
			}
		]
	}
];