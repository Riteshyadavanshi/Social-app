

const express=require('express')
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(require('./Route/Addtodo'))
app.use(require('./Route/SignIn'))

const mongoose=require('mongoose')


 const db="mongodb://127.0.0.1:27017/todo"
 mongoose.set('strictQuery', true);
 mongoose.connect(db,(err)=>{
    if(err){
        throw new Error({massage:"something wrong during connection "})
    }
    console.log( "successfully connect")
 })
 app.listen(4500)