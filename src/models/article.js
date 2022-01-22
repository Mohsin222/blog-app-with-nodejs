const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    email:{
         type:String
    },
    title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      markdown: {
        type: String,
      //  required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      imageUrl:{
        type:String
      },
      profile:{
        type:String
      }

})

module.exports = mongoose.model('Article',articleSchema)