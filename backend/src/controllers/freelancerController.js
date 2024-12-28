const freelancerServices=require("../services/freelancer")


const getClientPost=async (req,res,next)=>{
    try{
const response=await freelancerServices.getClientPost()
res.status(200).json({data:response})

    }
    catch(e){
        console.log(e)
    }
}


const applyProject=async(req,res,next)=>{
    const freelancerId=req.user._id
    console.log("freelancerId",freelancerId)
    console.log("req.params",req.params)
const {projectId}=req.params
try {
    const response= await freelancerServices.applyProject(projectId,freelancerId)
    res.status(200).json({data:response})
} catch (error) {
    
    console.log(error)
}

}





module.exports ={getClientPost,applyProject}