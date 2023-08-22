const { Router } = require('express');
const multipart = require('connect-multiparty');
const articlesControllers = require('../controllers/articles');
const getItemsControllers = require('../controllers/articles')
const getItemControllers = require('../controllers/articles')
const deleteItemControllers = require('../controllers/articles')
const updateItemControllers = require('../controllers/articles')
const imagesControllers = require('../controllers/articles')
const buscarControllers = require('../controllers/articles')
const likesControllers = require('../controllers/articles')
const getLikesControllers = require('../controllers/articles')
const deslikeControllers = require('../controllers/articles')
const { verifyToken, isAdmin } = require('../middlewares/authJwt')

const router = Router()

const path = multipart({ uploadDir: './imagenes/articulos' });

router.post('/create', [verifyToken, isAdmin], articlesControllers.create);
router.get('/imagen/:fichero', imagesControllers.image);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)
router.delete('/article/:id', [verifyToken, isAdmin], deleteItemControllers.deleteItem)
router.get('/buscar/:busqueda', buscarControllers.search)
router.put('/article/:id', [verifyToken, isAdmin, path], updateItemControllers.updateItem)
router.post('/article/like/:id', verifyToken, likesControllers.likes)
router.delete('/article/deslike/:id', verifyToken, deslikeControllers.deslike);
router.get('/user/likes/:userId', verifyToken, getLikesControllers.getUserLikes)

module.exports = router;