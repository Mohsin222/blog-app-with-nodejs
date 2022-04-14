const express= require('express')
//const router = require('express').Router()
require('../db/conn')
const register = require('../models/registers')
const article = require('../models/article')
const router =express.Router();


var currentUser;
var profile;

router.get('/index', async (req, res) => {
    console.log(currentUser)
    const dd = await article.find({ email: currentUser }).sort({ createdAt: 'desc' })


    res.render('index', { dd: dd, currentUser, profile })

})


//create blog
router.post('/newarticle', async (req, res) => {

    try {
        const articles = await article({
            email: currentUser,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            profile: profile,

        })

        const savedArticle = await articles.save()
        console.log(savedArticle)
        //     const a =await article.find().sort({createdAt: 'desc'
        // })
        const dd = await article.find({ email: currentUser }).sort({ createdAt: 'desc' })
        res.status(201).render('index.hbs', { dd: dd, currentUser, profile })


    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})



















module.exports =router;