
const mongoose=require('mongoose')
 const Item= new mongoose.Schema({
      Item :String
 })
 module.exports=mongoose.model('Item',Item)