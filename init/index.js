const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const mongourl="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>console.log("connection successfull")).catch(err=>{console.log(err)});
async function main() {
  await mongoose.connect(mongourl);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "6ad8bc89212f4e076b988529"
    }));

    console.log("Owner before insertion:", initdata.data[0].owner);

    const result = await Listing.insertMany(initdata.data);

    console.log("Owner after insertion:", result[0].owner);
    console.log("Inserted listings:", result.length);
};
initDB();