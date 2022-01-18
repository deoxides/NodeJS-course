const { response, request } = require("express");
const { Category } = require("../models");

const getCategories = async(req,res = response) =>{
    try {
        const query = {status:true};
        const { limit = 5, from = 0 } = req.query;
        const [categories,total] = await Promise.all([
            Category.find(query).skip(Number(from)).limit(Number(limit)).populate('user'),
            Category.countDocuments(query)
        ]);
        res.json({
            msg:'GET - All Ok',
            categories,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Something goes wrong'
        })
    }
}
const getCategoryById = async(req,res = response) =>{
    try {
        const {id} = req.params;
        const category = await Category.findById(id).populate('user')
        if(!category){
            return res.status(400).json({
                msg:'Category not found'
            })
        }
        res.json({
            msg:'GET - All Ok',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Something goes wrong'
        })
    }
}
const postCategory = async(req = request,res = response) =>{
    const name = req.body.name.toUpperCase();
    const user = req.user;
    try {
        const category = await Category.findOne({name})
        if(category){
            return res.status(400).json({
                msg:`The category ${name} is already exists`
            })
        }
        const data = {
            name,
            user: user._id
        }
        const newCategory = new Category(data);
        await newCategory.save()
        res.status(201).json({
            msg:'POST - All Ok',
            category: newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Something goes wrong'
        })
    }
}
const putCategory = async(req,res = response) =>{
    const {id} = req.params;
    const name = req.body.name.toUpperCase();
    const user = req.user
    try {
        const category = await Category.findByIdAndUpdate(id,{name,user});
        res.json({
            msg:' PUT - All Ok',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Something goes wrong'
        })
    }
}
const deleteCategory = async(req,res = response) =>{
    const {id} = req.params;
    const user = req.user
    try {
        const category = await Category.findByIdAndUpdate(id,{state:false,user})
        res.json({
            msg:'DELETE - All Ok',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Something goes wrong'
        })
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory,
    postCategory,
    putCategory
}