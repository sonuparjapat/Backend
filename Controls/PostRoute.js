const express=require("express")
const postRouter=express.Router()
const {postModel}=require("../Models/userPost")



// getting user posts by applying filteration also
postRouter.get("/",async(req,res)=>{
const query={}
const {device,device1,device2}=req.query

if(device){
    query.device=device
} 
if(device2&&!device1){
    query.device=device2
}
if(device1&&!device2){
    query.device=device1
}
if(device1&&device2){
    query.$or=[{"device":device1},{"device":device2}]
}
if(device1&&device2&&device3){
    query.$or=[{"device":device1},{"device":device2},{"device":device3}]
}

// device=Mobile
// device=$and:[{device:device1},{device:device2}]
const data=await postModel.find({authorId:req.body.authorId})
if(data){

console.log(data)

try{
    
    const posts=await postModel.find({$and:[{authorId:req.body.authorId},query]})
  

        // const data=await postModel.find(query)

        res.status(200).json({"data":posts})
    }catch(err){
    res.status(400).json({"msg":err})
}

}else{
    res.status(400).send({msg:"you are not authorised to do this"})
}
})

// creating post>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
postRouter.post("/create",async(req,res)=>{
    try{
        const data=new postModel(req.body)
        await data.save()
        res.status(200).json({"msg":"posted successfully"})
    }catch(err){
        res.status(400).json({"msg":"something going wrong"})
    }
})

// updating post>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
postRouter.patch("/update/:id",async(req,res)=>{
const {id}=req.params
const post=await postModel.findOne({_id:id})
if(post){
    try{
        if(req.body.authorId!==post.authorId){
            res.status(400).json({"msg":"!!You are not authorised to do this operation"})
        }else{
            await postModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({"msg":`data with id ${id} updated successfully`})
        }
    }catch(err){
        res.status(400).send({"msg":"something going wrong"})
    }
}else{
    res.status(400).json({"msg":"no data found "})
}
})
// deleting post>>>>>>>>>>>>>>>>>>>>>>>
postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const post=await postModel.findOne({_id:id})
    if(post){
        try{
            if(req.body.authorId!==post.authorId){
                res.status(400).json({"msg":"!!You are not authorised to do this operation"})
            }else{
                await postModel.findByIdAndDelete({_id:id})
                res.status(200).json({"msg":`data with id ${id} deleted successfully`})
            }
        }catch(err){
            res.status(400).send({"msg":"something going wrong"})
        }
    }else{
        res.status(400).json({"msg":"no data found "})
    }
    })
module.exports={postRouter}


