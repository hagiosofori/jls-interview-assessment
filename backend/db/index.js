const { Sequelize } = require('sequelize');
const { generateProductModel, generateProductLocationsModel, generateLocationModel } = require('../models');

let db = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
});

const Product = generateProductModel(db);
const Location = generateLocationModel(db);
const ProductLocation = generateProductLocationsModel(db);


Location.hasMany(ProductLocation); //(Product, { through: 'ProductLocation' });
Product.hasOne(Location, { through: 'ProductLocation' });
ProductLocation.belongsTo(Product);
ProductLocation.belongsTo(Location);


module.exports = { db, Product, Location, ProductLocation };