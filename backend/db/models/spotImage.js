'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
 class SpotImage extends Model {
   static associate(models) {
     // define association here
     SpotImage.belongsTo(models.Spot,{
       foreignKey: "spotId"});
   }
 }
 SpotImage.init({
   spotId:{
     type: DataTypes.INTEGER,
     allowNull: false,
     references: {
        model: "Spots"
     },
     onDelete: "CASCADE"
   },
   url: {
     type: DataTypes.TEXT,
     allowNull: false,
   },
   preview: {
     type: DataTypes.BOOLEAN,
     allowNull:false,
     defaultValue: false
   }
 }, {
   sequelize,
   modelName: 'SpotImage',
 });
 return SpotImage;
};
