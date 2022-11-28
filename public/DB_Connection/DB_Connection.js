import mongoose from 'mongoose';

const connection = async ()=>{
    await mongoose.connect("mongodb+srv://Nexinfosoft:Nexinfosoft@cluster0.ryg9ia4.mongodb.net/test")
    .then((response)=>console.log(`Connection Success with MongoDB`))
    .catch((response)=>console.log(`Connection Error with MongoDb`))
}

 
export default connection;