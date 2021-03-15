'use strict';
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id:{
      autoIncrement : true,
      type : DataTypes.INTEGER,
      allowNull: false,
      primaryKey : true,
      field : 'uti_id_utilisateur'
    },
    name:{
      type : DataTypes.STRING,
      allowNull : false,
      field : 'uti_name',
    },
    password:{
      type : DataTypes.STRING,
      allowNull : true,
      field : 'uti_password',
    },
    groupe:{
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "gro_id_groupe",
      defaultValue: 0
    },
    id_capteur:{
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "cap_id_capteur",
    },
    isAdmin:{
      type:DataTypes.INTEGER,
      allowNull: false,
      field : "uti_is_admin",
      defaultValue : false,
    }
  },{
    schema: 's_capteur',
    tableName: 't_utilisateur_uti',
    timestamps : false,
});     
  
User.prototype.toJSON = function () {
    const data = Object.assign({}, this.get());
    delete data.password;
    delete data.id_capteur;
    return data;
  };
  
  return User;
}
