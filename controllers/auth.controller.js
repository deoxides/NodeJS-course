const { response, request } = require("express");
const User = require("../models/ODM/User.model");
const bcrypt = require('bcryptjs');
const { createToken } = require("../helpers/jwt");

const login = async(req = request,res = response) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg:'The email or password is not correct'
            })
        }
        if(!user.status){
            return res.status(400).json({
                msg:'Your account is dehabilited'
            })
        }
        if(!bcrypt.compareSync(password,user.password)){
            return res.status(400).json({
                msg:'The email or password is not correct'
            })
        }
        const jwtResponse = await createToken(user._id)
        res.json({
            result:jwtResponse
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Ups. Something went wrong'
        })
    }
}

module.exports = {
    login
}