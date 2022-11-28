import express from "express";
import userController from "../Controllers/UserController.js";

const userRouters = express.Router();



userRouters.get("/user_check_connection",userController.check_connection);


userRouters.post("/userRegistration",userController.userRegistration);
userRouters.post("/userLogin",userController.userLogin);
userRouters.post("/sendOTP",userController.sendOTP);
userRouters.post("/uploadDataForSleep",userController.uploadDataForSleep);
userRouters.post("/verifyOTP",userController.verifyOTP);



userRouters.get("/fetchDataForSleep",userController.fetchDataForSleep);


export default userRouters;

