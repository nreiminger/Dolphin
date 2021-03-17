'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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

user.associate = (db) => {
  user.belongsTo(db.captor, {
    onDelete : 'cascade',
    foreignKey: 'gro_id_groupe'
  }) //cree une clé étrangère pour le capteur 

  user.belongsTo(db.group,{
    onDelete: 'cascade',
    foreignKey : 'cap_id_capteur'
  }) //clé etrangère pour le groupe
}
  
user.prototype.toJSON = function () {
    const data = Object.assign({}, this.get());
    delete data.password;
    return data;
  };
  
return user;
}
