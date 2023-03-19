
const route=require('express').Router()
const todoData=require('../schema/Item')


route.get('/',async(req,res)=>{
   const allList= await todoData.find()
   res.status(200).json(allList)
})
route.post('/todo',async(req,res)=>{
        
    //    if(!item){
    //     return res.status(400).json({massage:"please write something"})
    //    }
    const {Item}=req.body
         try{
             
             const newItem= await new todoData({
                Item
             })
             const data= await newItem.save()
             res.status(200).json(data)
         }
         catch(err){
            res.status(400).json(
               err
            )
         }
})


// delete todo item 

route.delete('/todo/:id',async(req,res)=>{
   const {id}=req.params
   if(!id){
      return res.status(400).json({
         massage:"something wrong"
      })
   }

   try{
      await todoData.findByIdAndDelete({_id:id})
      res.status(200).json({massage:"successfully delete"})
   }catch(err){
       res.status(400).json({
         massage:"enable to delete please try again"
       })
   }
})

//updating todo item


route.put("/todo/:id",async(req, res)=>{
        const{id}=req.params
        const {Item}=req.body
        if(!id){
          return res.status(400).json({massage:"something wrong"})
        }
        if(!Item){
         return res.status(400).json({
            massage:"please write something to update"
         })
        }
      
        try{
         const data=await todoData.findById({_id:id})
         data.Item=Item
        await data.save()
         res.status(200).json({
            massage:"successfully update your todo list"
         })
        }catch(err){
         res.status(400).json(err)
        }
})
module.exports=route