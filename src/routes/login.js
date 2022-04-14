const express= require('express')

require('../db/conn')
const register = require('../models/registers')
const article = require('../models/article')
const router =express.Router();


var currentUser;
var profile;
router.get('/', (req, res) => {
    res.render('login')
})


router.get('/login', (req, res) => {
    res.render('login')
})

//login check
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(email + '        ++      ' + password)

        const useremail = await register.findOne({ email: email })

        //res.send(useremail)
        //console.log(useremail.password)

        if (useremail.password === password) {



            currentUser = useremail.email
            profile = useremail.profile
            //     const a =await article.find().sort({createdAt: 'desc'
            // })
            const dd = await article.find({ email: currentUser }).sort({ createdAt: 'desc' })
            //console.log(dd)

            res.render('index.hbs', { dd: dd, currentUser, currentUser })

        } else {
            res.send('password not match')
        }
    } catch (error) {
        res.status(400).send('Invalid detail  '+error)
    }
})


//registration

router.get('/register', (req, res) => {
    res.render('register')
})



//register POST

router.post('/register', async (req, res) => {
    try {

        // console.log(req.body.email)
        // res.send(req.body.email)
        const password = req.body.password
        const cpassword = req.body.conformpassword

        if (password === cpassword) {
            const registerEmployee = new register({
                email: req.body.email,
                password: password,
                conformpassword: req.body.conformpassword,
                profile: req.body.profile
            })
            currentUser = req.body.email
            profile = req.body.profile

            const registered = await registerEmployee.save()
            //console.log(registered)
            // const a =await article.find({}).sort({createdAt: 'desc'
            // })
            const dd = await article.find({ email: currentUser }).sort({ createdAt: 'desc' })
            res.status(201).render('index.hbs', { dd: dd, currentUser, profile })



        } else {
            res.send('passward are not matching')
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
















module.exports =router;