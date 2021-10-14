// internal imports
const Product = require("../models/Product");
const SpecialOffer = require("../models/SpecialOffer");
const moment = require("moment");

// get all special offer product
async function getAllOfferProduct(req, res, next) {
  try {
    const result = await SpecialOffer.find({}).sort({ createdAt: -1 });
    if (result) {
      const offerProduct = result.filter((res) => {
        const newDate = new Date().getTime();
        const dbEndingDate = res?.endingDateMiliSecond;
        if (newDate < dbEndingDate) {
          return res;
        }
      });
      res.status(200).json(offerProduct);
    } else {
      res.status(400).json({
        error: "Not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

// get single offer products
async function getSingleOfferProduct(req, res, next) {
  try {
    const id = req.params.id;
    const offerProduct = await SpecialOffer.findOne({ _id: id });
    res.status(200).json(offerProduct);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// add special offer product
async function addOfferProduct(req, res, next) {
  try {
    const indexNumber = parseInt(req.body.indexNumber);
    const startDate = parseInt(req.body.startDate);
    const startMonth = parseInt(req.body.startMonth) - 1;
    const startYear = parseInt(req.body.startYear);
    const endDate = parseInt(req.body.endDate);
    const endMonth = parseInt(req.body.endMonth) - 1;
    const endYear = parseInt(req.body.endYear);

    const allProduct = await Product.find({});
    const product = allProduct[indexNumber];

    // starting date
    const startingDate = new Date();
    startingDate.setFullYear(endYear);
    startingDate.setMonth(startMonth);
    startingDate.setDate(startDate);

    const startingDateMiliSecond = startingDate.getTime();

    // ending date
    const endingDate = new Date();
    endingDate.setFullYear(startYear);
    endingDate.setMonth(endMonth);
    endingDate.setDate(endDate);

    const endingDateMiliSecond = endingDate.getTime();

    const offerProduct = {
      product,
      startingDate,
      startingDateMiliSecond,
      endingDate,
      endingDateMiliSecond,
    };

    const specialOffer = new SpecialOffer(offerProduct);
    const result = specialOffer.save();

    if (result) {
      res.status(200).json({
        success: "Offer product added successfully!",
      });
    } else {
      res.status(400).json({
        error: "Offer product not added!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}

module.exports = {
  getAllOfferProduct,
  addOfferProduct,
  getSingleOfferProduct,
};
