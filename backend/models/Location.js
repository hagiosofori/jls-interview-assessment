
const { DataTypes } = require('sequelize');
// const { db } = require('../db');
// const ProductLocation = require('./ProductLocations');

const generateLocationModel = db => db.define('Location', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  name: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

// Location.hasMany(ProductLocation);


module.exports = generateLocationModel;

