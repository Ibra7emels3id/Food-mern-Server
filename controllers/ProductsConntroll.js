const Products = require("../models/Products")
const upload = require("../MulterUploade/multer")



// Add Products 
const products = async (req, res) => {
    try {
        console.log(req.body);

        if (!req.file) {
            return res.status(400).json({ msg: "No File Uploaded" })
        }

        const product = new Products({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.category,
            count: req.body.count,
            categoryFluidclass: req.body.categoryFluidclass,
            categoryCanned: req.body.categoryCanned,
            rating: req.body.rating
        })
        console.log(product);

        product.save()
        console.log(product);
        res.status(200).json({ msg: "Product added successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) return res.status(404).json({ msg: "Product not found" })
            res.status(200).json({ msg: "Product update successfully" , product })
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(500).send("Server Error")
    }
}

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
}

// Details Product
const getProductDetails = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        if (!product) return res.status(404).json({ msg: "Product not found" })
        res.json(product)
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(500).send("Server Error")
    }
}

// DElete Product
const deleteProduct = async (req, res) => {
    console.log(req.params.id);
    try {
        const product = await Products.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({ msg: "Product not found" })
        res.json({ msg: "Product deleted successfully" })
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(500).send("Server Error")
    }
}


module.exports = ({
    products,
    getAllProducts,
    getProductDetails,
    deleteProduct,
    updateProduct,
})