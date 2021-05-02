const express = require('express');
const { ProductLocation } = require('../db/index');

const router = express.Router();



router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const response = await ProductLocation.update({ quantity }, { where: { id }, returning: true, });
    console.log('productLocations update -> ', response);

    res.status(200).json({success: true});
  } catch (error) {
    console.log('failed to update quantity -> ', error);
    res.status(500).json(error);
  }
});

module.exports = router;
