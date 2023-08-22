const { Router } = require('express');
const multipart = require('connect-multiparty');
const { verifyToken, isAdmin } = require('../middlewares/authJwt')
const products = require('../controllers/products')


const router = Router()
const path = multipart({ uploadDir: './imagenes/articulos' });


router.get('/list_products', products.listProducts)
router.get('/list_products_limit', products.listProductsLimit);
router.get('/products_filter_category/:category', products.listProductsByCategory);
router.post('/create_products', products.createProduct)
router.delete('/delete_product/:id', products.deleteProduct);
router.put('/update_product/:id', products.updateProduct);

module.exports = router;