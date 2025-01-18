const {Router} = require('express')
const router = Router();
const User = require('../Models/user')
router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName : fullName,
        email : email,
        password :password
    })
    return res.redirect('/');
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        res.render('signin',{
            error: "Incorrect credentials"
        })
    }

})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})


module.exports = router;