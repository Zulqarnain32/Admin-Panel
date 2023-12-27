const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"visitor"
    }
})
const UserModel = mongoose.model('UserModel',UserSchema)
module.exports = UserModel