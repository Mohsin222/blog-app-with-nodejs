const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    conformpassword:{
        type:String,
        required:true
    },
    profile:{
        type:String
    }

})

const Register  = new mongoose.model("Register",employeeSchema)
module.exports = Register