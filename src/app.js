const express = require('express')
// const res = require('express/lib/response')
const path= require('path')
const hbs = require('hbs')
const port = process.env.PORT || 8000
const app = express()
require('./db/conn')
const register = require('./models/registers')
const async = require('hbs/lib/async')
const Register = require('./models/registers')
const article = require('./models/article')


//static path 
//  const  static_path=path.join(__dirname, "../public")

// app.use(express.static(static_path))
//xx/xx

const template_path=path.join(__dirname, "../templates/views")
const partials_path=path.join(__dirname, "../templates/partials")
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)

var currentUser='';


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/login',(req,res)=>{
    res.render('login')
})



//login check
app.post('/login',async(req,res)=>{
try {
    const email = req.body.email
const password = req.body.password
console.log(email +'              ' +password)

const useremail = await Register.findOne({email:email})
currentUser =useremail.email
//res.send(useremail)
console.log(useremail.password)

if(useremail.password === password){
    var title;
    
    // res.status(201).render('home',{
    //     data:[
    //         {
    //             name:"ali",
    //             title:"Tex1"
    //                     },
    //                     {
    //                         name:"asif",
    //                         title:"Tex2"
    //                                 },
    //     ]
    // }
    // )
    const a =await article.find().sort({createdAt: 'desc'
})

res.render('home',{a:a})
}else{
    res.send('password not match')
}
} catch (error) {
    res.status(400).send('Invalid detail')
}
})

app.post('/register',async(req,res)=>{
    try {
        // console.log(req.body.email)
        // res.send(req.body.email)
        const password = req.body.password
        const cpassword = req.body.conformpassword

        if(password === cpassword){
const registerEmployee = new Register({
    email :req.body.email,
    password :password,
    conformpassword:req.body.conformpassword
})

const registered = await registerEmployee.save()
console.log(registered)
res.status(201).render('home')


        }else{
        res.send('passward are not matching')
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/newarticle',(req,res)=>{

    res.render('newarticle',)
})
app.post('/newarticle',async(req,res)=>{

try {
    const articles = await article({
        email:currentUser,
        title:req.body.title,
        description:req.body.description,
    })

    const savedArticle = await articles.save()
    console.log(savedArticle)

    res.status(201).render('home')
} catch (error) {
    console.log(error)
    res.status(400).send(error)
}
})
app.get('/home',(req,res)=>{

    res.render('home',)
})

app.listen(port,()=>{
    console.log(`server is running at  ${port}`)
})