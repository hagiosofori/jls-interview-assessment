const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const { Product, Location, ProductLocation } = require('./index');
const { Op } = require('sequelize');
const readline = require('readline');


// initialize the db.
// extract the data from the csvs.
// find all the products that belong to the said location
// 'build' the productLocation, 
// set the products to the list of products we've got
// product.setProductLocation(product location)
// productLocation.setProducts([list of products])
// productLocation.addLocation(location)
// set the location to the location we have with addLocation



function formatProduct(product) {
  // console.log('incoming product -> ', product);

  const formattedProduct = {
    coreNumber: product['Core Number'],
    internalTitle: product['Internal Title'],
    vendor: product['Vendor'],
    vendorTitle: product["Vendor's Title"],
    vendorSKU: product["Vendor SKU"],
    backupVendor: product["Backup Vendor"],
    backupVendorSKU: product["Backup Vendor SKU"],
    restockable: product["Restockable"],
    vendorOrderUnit: product["Vendor Order Unit"],
    vendorCasePack: (product["Vendor Case Pack"]),
    moq: (product["MOQ (Pieces)"]),
    bufferDays: (product["Buffer Days"]),
    minLevel: (product["Minimum Level"]),
    productUrl: product["Product URL"],
    noteForNextOrder: product["Note for Next Order"],
    casePack: (product["Case Pack (Pieces)"]),
    piecesPerInternalBox: (product["Pieces Per Internal Box"]),
    boxesPerCase: (product["Boxes per Case"]),
    tagsAndInfo: product["Tags & Info"],
    tag1: product["Tag 1"],
    tag2: product["Tag 2"],
    tag3: product["Tag 3"],
    tag4: product["Tag 4"],
    hazmat: product["Hazmat"],
    active: product["Active"],
    ignoreUntil: (product["Ignore Until"]),
    notes: product["Notes"],
  };

  // console.log('formatted product -> ', formattedProduct);

  return formattedProduct;
};

function formatLocation(location) {
  const formattedLocation = {
    name: location["Location"]
  };

  const formattedProductLocation = {
    quantity: location["Quantity"],
    locationId: location["Location"],
    productId: location["Product Code"],
  };

  return { formattedLocation, formattedProductLocation };
};

const productsFileStream = fs.createReadStream(path.resolve(__dirname, 'products.csv'));

const parser = csv.parseStream(productsFileStream, { headers: true })
  .on('error', error => console.error(error))
  .on('data', async row => {
    try {
      parser.pause();
      const formattedProduct = formatProduct(row);
      await Product.create(formattedProduct);

      parser.resume();
      // products[formattedProduct.coreNumber] = productObj;
      // console.log('products -> ', products);

    } catch (e) {
      console.log('failed to format product -> ', e);
    }

  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    // console.log('formatted products -> ', products);
    readLocations();
  });

function readLocations() {

  const fileStream = fs.createReadStream(path.resolve(__dirname, 'locations.csv'));

  const parser = csv.parseStream(fileStream, { headers: true })
    .on('error', error => console.error(error))
    .on('data', async row => {
      try {
        parser.pause();
        const { formattedLocation, formattedProductLocation } = formatLocation(row);

        const currentLocation = await Location.findOrCreate({ where: { name: formattedLocation.name } });

        const currentProduct = await Product.findOne({ where: { coreNumber: formattedProductLocation.productId }, });

        const currentProductLocation = await ProductLocation.create({ quantity: formattedProductLocation.quantity,});

        await currentProductLocation.setProduct(currentProduct);
        // await currentLocation.setProductLocation(currentLocation);
        await currentProductLocation.setLocation(currentLocation[0]);
        parser.resume();

      } catch (e) {
        console.log('error parsing product locations -> ', e);
      }

    })
    .on('end', (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);


      // console.log('formatted locations -> ', locations);
      // console.log('formatted product-locations -> ', productLocations);
    });
}

// readLocations();


  // generate the unique locations

// generate the products.

// extract the product's location, and quantity, and set to the location.

// generate the connections.
// -> each product seems to have one location
// -> a location has many products, plus quantities for that product.