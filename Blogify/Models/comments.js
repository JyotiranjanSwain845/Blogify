const {Schema,model} = require('mongoose');
const { schema } = require('./Blog');

const commentSchema = new Schema({
    content :{
        type: String,
        required : true
    },
    blogid :{
        type : Schema.Types.ObjectId,
        ref : "blogs" 
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : "user"
    }
},{timestamps:true})

const Comment = model("comment",commentSchema);

module.exports = Comment;