'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const db = {};
const SSHConnection = require('node-ssh-forward').SSHConnection
require('dotenv').config()
/*const sequelize = new Sequelize('dolphin', 'seth', 'air&dInformatique', {
    host: '127.0.0.1',
    dialect:  'postgres',
});*/

let connec = async() =>{  
    const sshConnection = new SSHConnection({
        username: process.env.SSH_USER,
        endHost: process.env.SSH_HOST,
        endPort: process.env.SSH_PORT,
    })
    await sshConnection.forward({
        fromPort: 4000,
        toPort: 5432,
        toHost:'localhost'
    })
    return new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: '127.0.0.1',
        dialect:  'postgres',
        port : process.env.DB_PORT
    })
}
const sequelize= connec().then((s) => {
    s.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
        fs.readdirSync(__dirname)
    .filter((filename) => filename !== 'index.js')
    .forEach((filename) => {
        const model = require('./' + filename)(s, Sequelize.DataTypes);
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
        db[modelName].associate(db);
    });
    
    //s.sync(); //permet de verifier les tables a créer

    })
    .catch(error=>console.error('Unable to connect to the database:', error))
});

module.exports = db;