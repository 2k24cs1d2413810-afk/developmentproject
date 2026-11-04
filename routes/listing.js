const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const passport=require("passport");
const {isLoggedin,isowner}=require("../middleware.js");
const {index,renderNewForm, showListing, createList,renderEdit, renderUpdate, renderDel}=require("../controllers/listing.js");

const {storage}=require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({storage});

//validating the string 
const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.message)
    }else{
        next();
    }
};


//main page
router.get("/",WrapAsync(index));

//new route 
router.get("/new",isLoggedin,renderNewForm);

//show  route
router.get("/:id",WrapAsync(showListing));

//create route
router.post("/",isLoggedin,validateListing,upload.single('listing[image]'),WrapAsync(createList));

//edit route
router.get("/:id/edit",isLoggedin,isowner,WrapAsync(renderEdit));

//update route
router.put("/:id",isLoggedin,isowner,validateListing,WrapAsync(renderUpdate));

//deleteroute
router.delete("/:id/delete",isLoggedin,isowner,WrapAsync(renderDel));

//exporting the router 
module.exports=router;