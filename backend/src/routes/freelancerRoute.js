const express=require("express")
const { authVerify } = require("../middleware/middleware")
const { getClientPost, applyProject } = require("../controllers/freelancerController")
const router=express.Router()

router.get('/post',authVerify,getClientPost)
router.post('/apply/:projectId',authVerify,applyProject)

module.exports=router    