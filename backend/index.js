// import express from 'express';
// import db from './db';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { db } = require('./db');
const {productRoutes, productLocationRoutes} = require('./routes');


const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use('/products', productRoutes)
app.use('/product-locations', productLocationRoutes);

app.listen(80, async () => {
  await db.sync({ alter: true, });
  console.log('listening on port 80');
});