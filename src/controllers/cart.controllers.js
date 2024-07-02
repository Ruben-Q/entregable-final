const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id // primer filtrado 
    const results = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    Attributes: {exclude: ["createdAt", "updatedAt"]},
                    //attributes: ["title"]
                    include: [
                    {
                        model: Category,
                            attributes: ["name"]
                        }
                    ]              
                }
            ]
        });
    return res.json(results);
    });

const create = catchError(async(req, res) => {
    const { quantity, productId } = req.body
    const userId = req.user.id // El "res.user.id" viene del token del fronten.
    
    // const product = await Product.findByPk(productId)
    // if(!product) return res.sendStatus(404)
    
    const body = {userId, quantity, productId} // Del "req.body" desectructuro la cantidad y el producto.

    const result = await Cart.create(body); // El body lo tomo del frontend

    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id // primer filtrado 
    const result = await Cart.findByPk(id, {
        where: { userId },
        include: [
            {
                model: Product,
                Attributes: {exclude: ["createdAt", "updatedAt"]},
                //attributes: ["title"]
                include: [
                    {
                        model: Category,
                        attributes: ["name"]
                    }
                ]
            }
        ]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

// quantity, productId, userId, id, times / Las columnas de nuestro modelo
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.destroy({
        // Agregamos los filtrados. / Podemos agregar todos los filtrados que quramos. Si falla un filtrado retorna (404)
        where:{ // Filtrado por columna.
            id,
            userId: req.user.id
            // role: "administracion" / No tenemos la colm- "rool"
        }
    })
    // filtramos por "id" / tenemos doble verificacion
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const userId = req.user.id // permitir al usuario logueado que modifique 
    const { id } = req.params;
    const { quantity } = req.body // Desectructuramos "quantity" / Solo podemos modificar esta propiedad.
    const result = await Cart.update(
        { quantity }, // Dentro del body tengo: (quantity, productId, userId)
        { where: { id, userId }, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);

    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}

// En request.use tengo al usuario logeado