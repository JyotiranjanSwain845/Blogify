const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function creatTokenForUser(user){
    const payload = {
        _id :user._id,
        name : user.fullName,
        email : user.email,
        profileImageURL :user.profileImgURL,
        role : user.role,

    };

    const token = jwt.sign(payload,secret);

    return token;
}

function validateToken(token){
    const payload = jwt.verify(token,secret);
    return payload;
}

module.exports = {creatTokenForUser,validateToken}