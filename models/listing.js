const mongoose=require("mongoose");
const { listingSchema } = require("../schema");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listSchema= new Schema({
    title:{
        type:String,
        required:true,
        },
    Description:String,
    image:{
        filename:String,
        url:String,
    //     set:(v)=>
    //         v===""?"https://unsplash.com/s/photos/tropical-beach":v,
    //     default:"https://unsplash.com/s/photos/tropical-beach",
     },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});
//to delete the reviews whose listing has been deleted

listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in:listing.reviews}})
    }
})
const Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;