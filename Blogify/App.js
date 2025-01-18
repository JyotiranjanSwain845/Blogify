require('dotenv').config()
const path = require('path');
const userRoute = require('./Routes/user')
const blogRoute = require('./Routes/blog');
const Blog = require('./Models/Blog');
var cookieParser = require('cookie-parser')
const express = require('express');
const mongoose = require('mongoose');

const exp = require('constants');
const { checkForAuthenticationCookie } = require('./Middlewares/authentication');
const app = express();
const PORT = process.env.PORT || 3030;


//connecting to db
mongoose.connect(process.env.Mongo_Url).then(()=>console.log("DB Connected Successfully...")).catch(err=>console.log(err));

//setting up template engine and directory as well
app.set('view engine' , 'ejs')
app.set('views', path.resolve('./Views'));

//setting of json parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('./Public'));
//custom middleware
app.use(checkForAuthenticationCookie("token"));

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.get('/',async(req,res)=>{
    const blogs = await Blog.find({});
    return res.render('home',{
        user : req.user,
        blogs : blogs,
    });
})

app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`);
})