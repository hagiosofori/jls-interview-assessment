
const { DataTypes } = require('sequelize');
// const { db } = require('../db');

const generateProductModel = db => db.define('Product', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  coreNumber: { type: DataTypes.STRING },
  internalTitle: { type: DataTypes.STRING },
  vendor: { type: DataTypes.STRING },
  vendorTitle: { type: DataTypes.STRING },
  vendorSKU: { type: DataTypes.STRING },
  backupVendor: { type: DataTypes.STRING },
  backupVendorSKU: { type: DataTypes.STRING },
  restockable: { type: DataTypes.STRING },
  vendorOrderUnit: { type: DataTypes.STRING },
  vendorCasePack: { type: DataTypes.STRING },
  moq: { type: DataTypes.STRING },
  bufferDays: { type: DataTypes.STRING },
  minLevel: { type: DataTypes.STRING },
  productUrl: { type: DataTypes.STRING },
  noteForNextOrder: { type: DataTypes.STRING },
  casePack: { type: DataTypes.STRING },
  piecesPerInternalBox: { type: DataTypes.STRING },
  boxesPerCase: { type: DataTypes.STRING },
  tagsAndInfo: { type: DataTypes.STRING },
  tag1: { type: DataTypes.STRING },
  tag2: { type: DataTypes.STRING },
  tag3: { type: DataTypes.STRING },
  tag4: { type: DataTypes.STRING },
  hazmat: { type: DataTypes.STRING },
  active: { type: DataTypes.STRING },
  ignoreUntil: { type: DataTypes.STRING },
  notes: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

// Product.hasOne(ProductLocations);

module.exports = generateProductModel;