// internal imports
const Category = require("../models/Category");

// get category
async function getCategory(req, res, next) {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// get category name
async function getCategoryName(req, res, next) {
  try {
    const result = await Category.find({});
    const categories = result.map((category) => {
      const { categoryName, ...rest } = category._doc;
      return categoryName;
    });
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
  getCategoryName,
};
