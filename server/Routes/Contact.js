const express = require('express')
const router = express.Router()
const ContactModel = require('../Model/ContactSchema')

//?fetching contact contact data
router.post('/contact', async (req,res) => {
    const { name,email,message } = req.body;
    if(!name || !email || !message){
        return res.json({messag:"please fill all fields"})
    }
    const newUser = new ContactModel({name,email,message})
    await newUser.save();
    return res.json({messag:"message sent"})
})


//?fetch all the user messages
router.get('/getdata', (req,res) => {
  ContactModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

//?deleting the user
  router.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    ContactModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


module.exports = router;