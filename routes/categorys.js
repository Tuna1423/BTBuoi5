const express = require('express');
const router = express.Router();
const Category = require('../schemat/category');



function GenString(length) {
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random() * source.length);
        result += source.charAt(rd);
    }
    return result;
}

// Get all categories
router.get('/', async (req, res) => {
    const categories = await Category.find({ isDeleted: false });
    res.send(categories);
});

// Create a new category
router.post('/', async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
        id: GenString(16),
        name: name
    });
    await newCategory.save();
    res.send(newCategory);
});

// Update a category
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const category = await Category.findOne({ id: id });
    if (category) {
        if (name) category.name = name;
        await category.save();
        res.send(category);
    } else {
        res.status(404).send({ message: "Category not found" });
    }
});

// Soft delete a category
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const category = await Category.findOne({ id: id });
    if (category) {
        category.isDeleted = true;
        await category.save();
        res.send(category);
    } else {
        res.status(404).send({ message: "Category not found" });
    }
});

module.exports = router;