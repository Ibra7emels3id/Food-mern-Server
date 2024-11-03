const express = require('express');
const { AddCategory, GetCategory, DeleteCategory, UpdateCategory } = require('../controllers/CategorysConntroll');
const upload = require('../MulterUploade/multer');
const CategoryRouterClint = express.Router();

CategoryRouterClint.post('/category', upload.single('image'), AddCategory)
CategoryRouterClint.get('/category', GetCategory)
CategoryRouterClint.delete('/category/:id', DeleteCategory)
CategoryRouterClint.put('/edit-category/:id', upload.single('image'), UpdateCategory)





module.exports = CategoryRouterClint;

