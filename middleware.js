const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const mongoose=require("mongoose");
module.exports.isLoggedin=function(req,res,next){if(!req.isAuthenticated()){
    //redirect url
    req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to make changes");
        res.redirect("/signup/login");
        return ;
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}



module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
     if (!mongoose.isValidObjectId(id)) {
            req.flash("error", "Invalid listing ID.");
            return res.redirect("/listings");
        }
    let listing=await Listing.findById(id);
    if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
    }
    if (
            !req.user ||
            !listing.owner ||
            listing.owner.toString() !== req.user._id.toString()
        ) {
        req.flash( "error","You do not have permission to modify this listing.");
        return res.redirect(`/listings/${id}`);
    }
    if(!(res.locals.currUser && listing.owner && res.locals.currUser._id.toString() === listing.owner._id.toString())){
        req.flash("error","you dont have permission to make changes");
       return res.redirect(`/listings/${id}`);
    }
     next();
}
module.exports.isReviewowner=async(req,res,next)=>{
    let {reviewId}=req.params;
    let {id}=req.params;
     if (
            !mongoose.isValidObjectId(id) ||
            !mongoose.isValidObjectId(reviewId)
        ) {
            req.flash("error", "Invalid listing or review ID.");
            return res.redirect("/listings");
        }
    let review=await Review.findById(reviewId);
    let listing=await Listing.findById(id);
    if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
    } 
    if (!review) {
            req.flash("error", "Review not found.");
            return res.redirect(`/listings/${listing._id}`);
    }
    
     if(!(res.locals.currUser && review.author && res.locals.currUser._id.toString() === review.author._id.toString())){
        req.flash("error","you dont have permission to make changes");
       return res.redirect(`/listings/${id}`);
     }
     next();
}