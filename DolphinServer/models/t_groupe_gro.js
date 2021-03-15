'use strict'

module.exports = (sequelize, DataTypes) => sequelize.define('groupe',
    {
        id:{
            field : "gro_id_groupe",
            autoIncrement : true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nom:{
          type: DataTypes.STRING,
          allowNull: false, 
          field : "gro_nom" 
        }
    },{
    schema: 's_capteur',
    tableName: 't_groupe_gro',
    timestamps: false,
    initialAutoIncrement: 2,
});