'use strict'

module.exports = (sequelize, DataTypes) => {

    const Group =  sequelize.define('group',
    {
    id :{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field:"gro_id_groupe"
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
    });

    //Group.removeAttribute('id')
    
    Group.associate = (db) => {
    Group.hasOne(db.user, 
        {
            onDelete : 'cascade',
            foreignKey : 'gro_id_groupe'
    })
    }
    return Group;
} 