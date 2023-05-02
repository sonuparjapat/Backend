const mongoose=require("mongoose")


const postschema=mongoose.Schema({
title:{type:String,required:true},
body:{type:String,required:true},
device:{type:String,"enum":["PC", "TABLET", "MOBILE"],required:true},
authorId:{type:String,required:true}

})
const postModel=mongoose.model("postdata",postschema)
module.exports={postModel}