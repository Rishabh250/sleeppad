import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import sendMail from "../public/EmailServide.js";
import keys from "../public/Private/private_keys.js";


const getUser = async(token)=>{
    var decode = jwt.verify(token,keys.TOKEN_KEY);
    var findStudent = await User.findOne({email : decode.email});

    return findStudent;
}

const generateRandomNumber = ()=>{
    var randVal = 10000+(Math.random()*(99999-10000));
    return Math.round(randVal);  
}

const hashContent = (content)=>{
    var hash = bcrypt.hashSync(content,10);
    return hash;
}


var userController = {
    check_connection : async(req,res)=>{
        return res.status(200).json({msg : "Connected with User API"})
    },


    userRegistration : async(req,res)=>{
        if(!req.body.firstName || !req.body.lastName || !req.body.email){
            return res.status(401).json({error : "Fields Required"})
        }

        try {

           
            var createUser  = User({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
            
            });

            var findEmail = await User.findOne({email: req.body.email});

            if(findEmail){
                return res.status(201).json({error : `Account Already Exist`})
            }
            

            var token =  jwt.sign({ email: req.body.email }, keys.TOKEN_KEY);
            var addUser =   await User.create(createUser);

            return res.status(200).json({user : addUser, token : token})


            
        } catch (error) {
            return res.status(400).json({error : `User Registration ${error}`})
        }
    },

    userLogin : async(req,res)=>{
        if(!req.body.email){
            return res.status(404).json({msg : "Field can't be empty"});
        }
        try {

            let findUser = await User.findOne({email:req.body.email});
            if(!findUser){
                return res.status(404).json({error : `User not found`})
            }
            var token = jwt.sign({
                email : findUser.email
            },keys.TOKEN_KEY)
            return res.status(200).json({token:token,user : findUser});
            
        } catch (error) {
            return res.status(400).json({error : `User Login ${error}`})
            
        }
    },

    sendOTP : async(req,res)=>{
        try {

            if(!req.body.email){
                return res.status(404).json({msg : "Field can't be empty"});
            }
           
            var fetchUser = await User.findOne({email : req.body.email})
            
            if(!fetchUser){
                return res.status(404).json({error : `User not found`})
            }
            var otp =  generateRandomNumber();

            var time = new Date();
            var currentTime = time.getTime();

             await sendMail(fetchUser.email,"Account Verification",`${otp}`);

            var hasOTP = hashContent(otp.toString());
            fetchUser.set({otp :hasOTP,otpExpireTime : currentTime + 10*60000 });
            await fetchUser.save();
            return res.status(200).json({email : fetchUser.email,otpStatus : "Send Successfully"})


        } catch (error) {
            return res.status(403).json({otpStatus : `Failed to send ${error}`})
            
        }
    },

    uploadDataForSleep : async(req,res)=>{
        try {

            if(!req.headers["access-token"]){
                return res.status(404).json({msg : "Need Token"});
            }
        
            var findUser = await getUser(req.headers["access-token"]);


            if(findUser){
                
                var stateData = 
                {
                    stateTime: req.body.stateTime,
                    state: req.body.state
                } 
                
                var dataForBreath = 
                        {
                            breathValue: req.body.breathValue,
                        }
                    
                var dataForHeart = 
                        {
                            heartValue: req.body.heartValue,
                        }  
                        
                var dataForTurnOver = 
                        {
                            turnOverValue: req.body.turnOverValue,
                        }


                var sleepData = {
                    dataForSleep : stateData,
                    dataForBreath : dataForBreath,
                    dataForHeart : dataForHeart,
                    dataForTurnOver : dataForTurnOver,
                }
                findUser.sleepData.push(sleepData)
                await findUser.save()
                return res.status(200).json({msg : "Sleep Data Added",data : findUser});
            }
            else{
                 return res.status(404).json({error : `User not found`})
            } 
            
        } catch (error) {
            return res.status(403).json({error : `Sleep Data ${error}`})
            
        }
    },

    fetchDataForSleep : async(req,res)=>{
        try {
            if(!req.headers["access-token"]){
                return res.status(404).json({msg : "Need Token"});
            }

            var findUser = await getUser(req.headers["access-token"]);
            return res.status(200).json({sleepData : findUser.sleepData})
            
        } catch (error) {
            return res.status(403).json({error : `Unable to Fetch Sleep Data ${error}`})
            
        }

    }


}

export default userController;

