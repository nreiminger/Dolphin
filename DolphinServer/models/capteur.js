'use strict';

module.exports = (sequelize, DataTypes) => {

  const Captor = sequelize.define('captor', {
    id :{
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field:"cap_id_capteur"
    },  
    cap_nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "t_capteur_cap_cap_nom_key"
      },
    cap_modele: {
        type: DataTypes.STRING,
        allowNull: true
      },
    cap_date_livraison: {
        type: DataTypes.DATE,
        allowNull: true
      },
    cap_date_revision: {
        type: DataTypes.DATE,
        allowNull: true
      },
    cap_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
    con_id_constructeur: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },{
      freezeTableName: true,
      schema: "s_capteur",
      tableName: 't_capteur_cap',
      timestamps : false,
    });
    
    Captor.associate = (db) => {
      Captor.hasOne(db.user, 
        {
          onDelete : 'cascade',
          foreignKey :'cap_id_capteur'
        })
    }
  return Captor;
} 
