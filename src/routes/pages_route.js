const express= require('express')

require('../db/conn')
const register = require('../models/registers')
const article = require('../models/article')
const router =express.Router();


var currentUser;
var profile;



router.get('/newarticle', (req, res) => {

    res.render('newarticle',)
})


router.get('/blog', async (req, res) => {

    const a = await article.find().sort({
        createdAt: 'desc'
    })
    res.status(201).render('blog', { a: a, currentUser, profile })


})
router.get('/feeds', async (req, res) => {

    const a = await article.find().sort({
        createdAt: 'desc'
    })
    res.status(201).render('feeds', { a: a, currentUser, profile })


})
router.get('/gallery', async (req, res) => {
    res.render('gallery', { currentUser, profile })
})
router.get('/contact', async (req, res) => {
    res.render('contact', { currentUser, profile })
})
router.get('/about', async (req, res) => {
    res.render('about', { currentUser, profile })
})

router.get('/single-post', async (req, res) => {
    // const dataId = await article.findById(req.params.id);
    // console.log(` Single Post  ${dataId.profile}`)
      res.render('single-post', { currentUser, profile })
  })
router.get('/single-post/:id', async (req, res) => {
   try {

    const dataId = await article.findById(req.params.id);

        res.render('single-post', { currentUser,profile, dataId})
    
  console.log(` Single Post  ${dataId.id}`)
 
   } catch (error) {
       console.log(error)
   }
})





module.exports =router;