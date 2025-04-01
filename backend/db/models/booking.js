'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Spot, {
        foreignKey:"spotId"
      }),
      Booking.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      references:{
        model: "Spots"
      },
      allowNull: false,
      onDelete: "CASCADE"
    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: "Users"
      },
      allowNull: false,
        onDelete:"CASCADE"
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};