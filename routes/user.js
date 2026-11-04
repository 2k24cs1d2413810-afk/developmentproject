const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const{userSignup, createnewUser, userLogin, userLogout}=require("../controllers/user.js");


router.get("/",userSignup);

router.post("/",createnewUser);
router.get("/login",async(req,res,next)=>{
    res.render("users/login.ejs");
})
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/signup/login",failureFlash:true}),userLogin);
router.get("/logout",userLogout);
module.exports=router;