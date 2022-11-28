import mongoose from "mongoose";
var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String,required:true},
    otp : {type : String},
})

export default mongoose.model("User",userSchema);
