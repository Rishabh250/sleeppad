import mongoose from "mongoose";
var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String,required:true},
    otp : {type : String},
    sleepData : [
        {
            time : {type:String,default : Date.now()},
            dataForSleep : 
                {
                    stateTime: {type:Number},
                    state: {type:Number}
                },
            

            dataForBreath: 
                {
                    breathValue: {type:Number}
                },
            

            dataForHeart: 
                {
                    heartValue: {type:Number}
                },
            

            dataForTurnOver: 
                {
                    turnOverValue: {type:Number}
                }
        
        }
    ]
})

export default mongoose.model("User",userSchema);
