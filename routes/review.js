const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const passport=require("passport");
const {isLoggedin,isReviewowner}=require("../middleware.js");
const{createReview,deleteReview}=require("../controllers/review.js");
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,res.error);
    }else{
        next();    }
}

router.post("/",isLoggedin,validateReview,WrapAsync(createReview));

//delete review
router.delete("/:reviewId",isLoggedin,isReviewowner,WrapAsync(deleteReview))
module.exports=router;