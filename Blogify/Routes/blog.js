const {Router} = require('express')
const multer  = require('multer')
const path = require ('path');
const router = Router();
const Blog = require('../Models/Blog');
const Comment = require('../Models/comments');

router.get('/add-blog',(req,res)=>{
    return res.render('addblog',{
        user : req.user
    });
})

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.resolve(`./public/uploads/`));

    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()} - ${file.originalname}` );
    }
})

const upload = multer({storage: storage});

router.post('/add-blog',upload.single("posterImageURL"),async(req,res)=>{
    const {title,content} = req.body;
   const blog = await Blog.create({
    title ,
    body :content,
    createdBy : req.user._id,
    coverImageURL : `/uploads/${req.file.filename}`,
   })

   return res.redirect(`/blog/${blog._id}`);//

})


router.get('/:id',async(req,res)=>{
    const blog = await Blog.findOne({_id : req.params.id}).populate("createdBy");
    const comments = await Comment.find({blogid:req.params.id}).populate("createdBy");
    return res.render('blog',{
        user : req.user,
        blogs : blog,
        comments : comments
    });
})


router.post('/comments/:blogId',async(req,res)=>{
    await Comment.create({
        content : req.body.content,
        blogid : req.params.blogId,
        createdBy : req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router;