const mongoose=require("mongoose")

const clientPost=new mongoose.Schema({
    clientId:{
     type:mongoose.Schema.ObjectId,
        
        ref:"User"
    },
    projectTitle:{
        type:String
    },
    projectDescription:{
        type:String
    },
    requiredSkill:{
        type:[String]
    },
    
createdAt:{
    type:Date,
    default: Date.now // Automatically sets the createdAt field to the current date/time


}
})

module.exports=mongoose.model("ClientPost",clientPost)