const express = require('express');
const router = express.Router();
const { Product, ProductLocation, Location } = require('../db');


router.get('/', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const { count, rows: result } = await Product.findAndCountAll({ include: { all: true }, limit, offset, });
    res.status(200).json({ data: result, total: count });
  } catch (error) {
    console.log('failed to fetch products -> ', error);
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { dataValues: result } = await Product.findOne({ where: { id } });
    console.log('product -> ', result);
    const productLocations = await ProductLocation.findAll({ where: { productId: id }, include: { all: true } });
    res.status(200).json({ ...result, locations: productLocations });
  } catch (error) {
    console.log('failed to get product details -> ', error);
    res.status(500).json(error);
  }
});



module.exports = router;