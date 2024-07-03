// PASO 4
const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const ProductImg = require('./ProductImg')
const Purchase = require('./Purchase')
const User = require('./User')

Product.belongsTo(Category)
Category.hasMany(Product)

// User / Uno a muchos
Cart.belongsTo(User)
User.hasMany(Cart)

// Cart / Muchos a uno
Cart.belongsTo(Product)
Product.hasMany(Cart)

// Purchase / UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

// Purchate / ProductId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)


//productiImg / ProductId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)


