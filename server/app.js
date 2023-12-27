const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 5000;
const cors = require('cors')
const userRouter = require('./Routes/auth')
const contactRouter = require('./Routes/Contact')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','DELETE'],
    credentials:true
}))
app.use('/auth',userRouter)
app.use('/Contact',contactRouter)

mongoose.connect('mongodb://127.0.0.1:27017/adminkapanel')
.then(() => {
    console.log("connected successfully");
}).catch(err => console.log(err))

app.listen(port, () => {
    console.log("server is running at port no 5000");
})