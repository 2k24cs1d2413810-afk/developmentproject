const User=require("../models/user.js");

const Listing=require("../models/listing.js");
const Review=require("../models/review.js")

module.exports.userSignup=(req,res,next)=>{
    res.render("users/signup.ejs");
     
};

module.exports.createnewUser=async(req,res,next)=>{ try{
         let {username,email,password}=req.body;
    const newUser= new User({username,email});
    let registeredUser= await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){return req.flash("error","some error occured")}
        else{
            req.flash("success","you are welcome");
            if(res.locals.redirectUrl){
       return  res.redirect(res.locals.redirectUrl);}
            res.redirect("/listings");}
    })
    req.flash("success","welcome to wanderlust");
    }
    catch(err){
        req.flash("error","same user exists");
        res.redirect("/signup");
    }
   
};

module.exports.userLogin=async(req,res)=>{
    //console.log(res.locals.redirectUrl);
    if(res.locals.redirectUrl){
       return  res.redirect(res.locals.redirectUrl);
    }
    res.redirect("/listings")
    req.flash("success","welcome to wanderlust ypu are logged in");}

module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){return next(err)}
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}