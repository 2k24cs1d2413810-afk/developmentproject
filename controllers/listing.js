const Listing=require("../models/listing.js");


module.exports.index=(async(req,res)=>{
   const allListing= await Listing.find({});
    res.render("./listings/index.ejs",{allListing});
});

module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
};
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for doesnt exist");
        return res.redirect("/listings");
    }
    //console.log(listing);
    res.render("./listings/show.ejs",{listing})
}

module.exports.createList=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let newlisting=new Listing(req.body.listing);
     console.log(newlisting);
     newlisting.owner=req.user._id;
     newlisting.image={url,filename}
     await newlisting.save();
        req.flash("success","new listing created");
        res.redirect("/listings");

}

module.exports.renderEdit=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
         req.flash("error","listing you requested for doesnt exist");
    return  res.redirect("/listings");
    }
    
    res.render("./listings/edit.ejs",{listing});
}

module.exports.renderUpdate=async(req,res)=>{
    let {id}=req.params; 
     let listing=await Listing.findById(id);
     if(!(res.locals.currUser && listing.owner && res.locals.currUser._id.toString() === listing.owner._id.toString())){
        req.flash("error","you dont have permission to edit");
       return res.redirect(`/listings/${id}`);
     }
     await Listing.findByIdAndUpdate(id,listing);
     if(typeof(req.file)!=="undefined"){
     let url=req.file.path;
     let filename=req.file.filename;
     listing.image={url,filename}
     await listing.save();}
     req.flash("success","listing updated");
    res.redirect(`/listings/${id}`); 
}

module.exports.renderDel=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}