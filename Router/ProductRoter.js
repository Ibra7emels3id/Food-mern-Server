const express = require('express');
const upload = require('../MulterUploade/multer');
const { products, getAllProducts, getProductDetails, deleteProduct, updateProduct } = require('../controllers/ProductsConntroll');
const ProductRouterClint = express.Router();

ProductRouterClint.post('/products', upload.single('image'), products)
ProductRouterClint.get('/products', getAllProducts)
ProductRouterClint.get('/products/details/:id', getProductDetails)
ProductRouterClint.delete('/products/delete/:id', deleteProduct)
ProductRouterClint.put('/product/update/:id', upload.single('image'), updateProduct)



module.exports = ProductRouterClint;
