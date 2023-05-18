const Category = require("./Category");
const Products = require("./Products");
const Role = require("./Role");
const User = require("./User");


Category.hasMany(Products)
Products.belongsTo(Category)

Role.hasMany(User)
User.belongsTo(Role)