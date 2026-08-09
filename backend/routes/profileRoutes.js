const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();
router.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        message:"You are authenticated",
        userId:req.userId
    });
});
module.exports=router;
