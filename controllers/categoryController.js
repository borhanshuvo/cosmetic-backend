// internal imports
const Category = require("../models/Category");

// get category
async function getCategory(req, res, next) {
  try {
    const categories = await Category.find({}).sort(-1);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// add category
async function addCategory(req, res, next) {
  try {
    const category = new Category(req.body);
    const result = await category.save();
    res.status(200).json({
      success: "Category was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getCategory,
  addCategory,
};
