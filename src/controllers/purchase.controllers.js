const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id // Quiero filtrar por userId.
    const result = await Purchase.findAll({
        where: { userId }, // Filtro por id.
        include: [
            // SE AJUSTA A LO QUE QUIERO VER.
            {
                model: Product, // Incluye el modelo.
                attributes: ["title", "price"], // Incluye la o las categorias.
                include: [
                    {
                        model: Category,  // include: [Category] // Incluye la categoria.
                        attributes: ["name"]
                    }
                ]
            }
        ]
    })
    return res.json(result)
});

// CON EL PURCHASE NO RECIBE EL BODY DEL FRONTEN.
const create= catchError(async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll({
        where: { userId },
        raw: true, // Estructura mejor la consola del "console.log"
        attributes: ["quantity", "userId", "productId"]// Estos atributes lo traemos del "purchase models"
    })
    if (!cart) return res.sendStatus (404)

    const result = await Purchase.bulkCreate(cart)
    if (!result) return res.sendStatus (404)

    await Cart.destroy({ where: { userId } })
    return res.status(201).json(result)
});

module.exports = {
    getAll,
    create
}