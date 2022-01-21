const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/webregistration",{
    // useNewUrlParser:true,
    // useUNifiedTopology:true,
    // useCreateIndex:true,
}).then( ()=>{
    console.log('connection successfully')
}).catch( ()=>{
    console.log(
      'no connection'
    )
})