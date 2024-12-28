const express=require("express")
const { clientVerify } = require("../middleware/middleware")
const { createPost } = require("../controllers/clientController")
const router=express.Router()


router.post("/post",clientVerify,createPost)
router.post("/post",clientVerify,createPost)

module.exports=router