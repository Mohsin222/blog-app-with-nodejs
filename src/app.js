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
const e = require('express')


//static path 
  const  static_path=path.join(__dirname, "../public")

 app.use(express.static(static_path))
//xx/xx

const template_path=path.join(__dirname, "../templates/views")
const partials_path=path.join(__dirname, "../templates/partials")
app.set("view engine","hbs")
app.set("views",template_path,'/views')
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
app.get('/index',async(req,res)=>{
    const dd =await article.find({email: currentUser})
 

res.render('index',{dd:dd})
   // res.render('home',)
})
app.get('/login',(req,res)=>{
    res.render('login')
})
//  blogpage = async function(){
//     const a =await article.find().sort({createdAt: 'desc'
// })

// res.render('home',{a:a})
// }


//login check
app.post('/login',async(req,res)=>{
try {
    const email = req.body.email
const password = req.body.password
console.log(email +'              ' +password)

const useremail = await Register.findOne({email:email})

//res.send(useremail)
console.log(useremail.password)

if(useremail.password === password){
    
    
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
    currentUser =useremail.email
//     const a =await article.find().sort({createdAt: 'desc'
// })
const dd =await article.find({email: currentUser}).sort({createdAt: 'desc'})
console.log(dd)

 res.render('index',{dd:dd})

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
currentUser =req.body.email

const registered = await registerEmployee.save()
console.log(registered)
const a =await article.find().sort({createdAt: 'desc'
})
    res.status(201).render('index',{a:a})



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
        imageUrl:req.body.imageUrl
    })

    const savedArticle = await articles.save()
    console.log(savedArticle)
    const a =await article.find().sort({createdAt: 'desc'
})
    res.status(201).render('index',{a:a})

} catch (error) {
    console.log(error)
    res.status(400).send(error)
}
})


app.get('/blog',async(req,res)=>{
 
    const a =await article.find().sort({createdAt: 'desc'
})
    res.status(201).render('blog',{a:a})

 
})
app.get('/gallery',async(req,res)=>{
res.render('gallery')
})
app.get('/contact',async(req,res)=>{
    res.render('contact')
    })
    app.get('/about',async(req,res)=>{
        res.render('about')
        })

app.listen(port,()=>{
    console.log(`server is running at  ${port}`)
})