const Category = require('./Category')
const Product = require('./Product')
require('./User')


Product.belongsTo(Category)
Category.hasMany(Product)

