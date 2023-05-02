const express=require("express")
const { userRouter } = require("./Controls/userRoute")
const { connection } = require("./Models/userModel")
const { authentication } = require("./Middleware/Authentication")
const { postRouter } = require("./Controls/PostRoute")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())



app.use("/user",userRouter)

app.use(authentication)
app.use("/posts",postRouter)
app.listen(8080,async()=>{
    try{
        await connection
        console.log("connect to socialmediaapp(db)")
    }catch(err){
        console.log(err)
    }
    console.log("server is running at port 8080")
})