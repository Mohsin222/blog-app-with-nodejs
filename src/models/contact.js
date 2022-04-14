const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    sybject:{
        type:String,
    },
    message:{
        type:String,
    }
})

const contact  = new mongoose.model("contact",contactSchema)
module.exports = contact