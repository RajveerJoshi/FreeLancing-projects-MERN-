const ClientPost=require("../model/clientpost")

const createPost=async(_id,data)=>{

const clientPost=new ClientPost({
    clientId:_id,
    projectTitle:data.projectTitle,
    projectDescription:data.projectDescription,
    requiredSkill:data.requiredSkill
})

const createdPost= await clientPost.save()
if(!createdPost){
    throw new Error("fail to created post")
}
return {message:"post created Successfully"}
}


module.exports={createPost}