const Category = require("../models/Category");

const AddCategory = async (req, res, next) => {
    const { category } = req.body;
    if (!category) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        if (!req.file) {
            return res.status(400).json({ msg: "No File Uploaded" });
        }
        const newCategory = new Category({
            category,
            image: req.file.filename
        });
        await newCategory.save();
        res.status(200).json({ message: 'Category added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Update category
const UpdateCategory = async (req, res, next) => {
    const { category } = req.body;
    if (!category) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {
        const categoryId = req.params.id;
        const existingCategory = await Category.findByIdAndUpdate(categoryId, { category }, { new: true });
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


// Get category
const GetCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Delete category
const DeleteCategory = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    AddCategory,
    GetCategory,
    DeleteCategory,
    UpdateCategory,
};
