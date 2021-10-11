// internal imports
const Product = require("../models/Product");
const SpecialOffer = require("../models/SpecialOffer");
const moment = require("moment");

// get all special offer product
async function getAllOfferProduct(req, res, next) {
  try {
    const result = await SpecialOffer.find({}).sort({ createdAt: -1 });
    if (result) {
      res.status(200).json(result);
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
    const sd = `${moment().set({
      year: startYear,
      month: startMonth,
      date: startDate,
    })}`;
    const startingDate = sd.slice(4, 15);

    // ending date
    const ed = `${moment().set({
      year: endYear,
      month: endMonth,
      date: endDate,
    })}`;
    const endingDate = ed.slice(4, 15);

    const offerProduct = {
      product,
      startingDate,
      endingDate,
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
};
