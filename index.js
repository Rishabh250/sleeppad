import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import connection from "./public/DB_Connection/DB_Connection.js";
import userRouter from "./Routes/UserRouter.js";
const app = express();
connection();
let Port = 2504;
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/user",userRouter)


app.listen(Port,()=>{console.log(`Server Connected to Port : ${Port}`);})

app.get("/",(req,res)=>{
    return res.send("Connected");
});


