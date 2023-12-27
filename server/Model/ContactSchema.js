const mongoose = require('mongoose');
const ContactSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})

const ContactModel = mongoose.model('ContactModel',ContactSchema) 
module.exports = ContactModel