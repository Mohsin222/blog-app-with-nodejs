const express = require('express')
// const res = require('express/lib/response')
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 8000
const app = express()
require('./db/conn')
const register = require('./models/registers')
const async = require('hbs/lib/async')
const Register = require('./models/registers')
const article = require('./models/article')
const contact = require('./models/contact')
const loginRouter = require('./routes/login')
const create_blog_Router = require('./routes/create_blog')
const pages_route_Router = require('./routes/pages_route')




//static path 
const static_path = path.join(__dirname, "../public")

app.use(express.static(static_path))
//xx/xx

const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
app.set("view engine", "hbs")
app.set("views", template_path, '/views')
hbs.registerPartials(partials_path)

var currentUser;
var profile;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.use('/',loginRouter);
app.use('/',create_blog_Router);
app.use('/',pages_route_Router);











app.post('/contact',async(req,res)=>{
    try {

        const contactUs = new contact({
            name:req.body.name,
            email:currentUser,
            subject:req.body.subject,
            message:req.body.message,
        })
        const sendContact =await contactUs.save()
        res.status(201).render('index', {  currentUser, profile })
        console.log(sendContact)
    } catch (error) {
        console.log(error)
    }
    })


app.listen(port, () => {
    console.log(`server is running at  ${port}`)
})