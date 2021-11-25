// internal imports
const Product = require("../models/Product");
const SpecialOffer = require("../models/SpecialOffer");
const User = require("../models/User");
const moment = require("moment");

// get all special offer product
async function getAllOfferProduct(req, res, next) {
  try {
    const result = await SpecialOffer.find({}).sort({ createdAt: -1 });
    if (result) {
      const offerProduct = result.filter((res) => {
        const newDate = new Date().getTime();
        const dbStartingDate = res?.startingDateMiliSecond;
        const dbEndingDate = res?.endingDateMiliSecond;
        if (newDate >= dbStartingDate && newDate <= dbEndingDate) {
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
    const startDateHour = parseInt(req.body.startDateHour);
    const startDateMinute = parseInt(req.body.startDateMinute);
    const startDateSecond = parseInt(req.body.startDateSecond);
    const endDateSecond = parseInt(req.body.endDateSecond);
    const endDateMinute = parseInt(req.body.endDateMinute);
    const endDateHour = parseInt(req.body.endDateHour);
    const allProduct = await Product.find({});
    const product = allProduct[indexNumber];

    // starting date
    const startingDate = new Date();
    startingDate.setFullYear(endYear);
    startingDate.setMonth(startMonth);
    startingDate.setDate(startDate);
    startingDate.setHours(startDateHour);
    startingDate.setMinutes(startDateMinute);
    startingDate.setSeconds(startDateSecond);

    const startingDateMiliSecond = startingDate.getTime();

    // ending date
    const endingDate = new Date();
    endingDate.setFullYear(startYear);
    endingDate.setMonth(endMonth);
    endingDate.setDate(endDate);
    endingDate.setHours(endDateHour);
    endingDate.setMinutes(endDateMinute);
    endingDate.setSeconds(endDateSecond);

    const endingDateMiliSecond = endingDate.getTime();

    const offerProduct = {
      product,
      startingDate,
      startingDateMiliSecond,
      endingDate,
      endingDateMiliSecond,
    };

    const specialOffer = new SpecialOffer(offerProduct);
    const result = await specialOffer.save();
    const newProduct = result.product;
    const collectionName = "specialoffers";
    const offerId = result._id;
    const updateProduct = { ...newProduct._doc, collectionName, offerId };

    const pushToken = await User.find({
      $and: [
        { pushToken: { $exists: true, $ne: null } },
        { premium: "Premium" },
      ],
    });

    const users = await User.find({ premium: "Premium" });
    users.map(async (user) => {
      const prevNotification = user.notification;
      const notification = [updateProduct, ...prevNotification];

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { notification: notification } },
        { useFindAndModify: false }
      );
    });

    if (result) {
      res.status(200).json({
        success: "Offer product added successfully!",
        pushToken,
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

// update offer product
async function updateOfferProduct(req, res, next) {
  const id = req.params.id;
  if (req.files && req.files.length > 0) {
    req.body = {
      product: {
        ...req.body,
        img: `${req.files[0].filename}`,
        imgURL: `/uploads/products/${req.files[0].filename}`,
      },
    };
  }
  // save product
  try {
    const result = await SpecialOffer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// delete product
async function deleteOfferProduct(req, res, next) {
  try {
    const id = req.params.id;
    const offerProduct = await SpecialOffer.findByIdAndDelete({
      _id: id,
    });
    res.status(200).json({
      success: "Product was deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getAllOfferProduct,
  addOfferProduct,
  getSingleOfferProduct,
  updateOfferProduct,
  deleteOfferProduct,
};
