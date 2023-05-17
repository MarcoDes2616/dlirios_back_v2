const Category = require("./Category");
const Products = require("./Products");


Category.hasMany(Products)
Products.belongsTo(Category)