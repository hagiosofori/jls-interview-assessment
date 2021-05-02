
const { DataTypes } = require('sequelize');
// const { db } = require('../db');
// const Product = require('./Product');
// const Location = require('./Location');

const generateProductLocationsModel = db => db.define('ProductLocation', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  quantity: { type: DataTypes.INTEGER },
}, {
  timestamps: false,
});


// export default ProductLocation;

module.exports = generateProductLocationsModel;