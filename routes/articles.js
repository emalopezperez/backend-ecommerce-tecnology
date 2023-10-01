const { Router } = require('express');
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

const router = Router()


router.post('/create',  articlesControllers.create);
router.get('/imagen/:fichero', imagesControllers.image);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)
router.delete('/article/:id',  deleteItemControllers.deleteItem)
router.get('/buscar/:busqueda', buscarControllers.search)
router.put('/article/:id', updateItemControllers.updateItem)
router.post('/article/like/:id', likesControllers.likes)
router.delete('/article/deslike/:id',  deslikeControllers.deslike);
router.get('/user/likes/:userId',  getLikesControllers.getUserLikes)

module.exports = router;