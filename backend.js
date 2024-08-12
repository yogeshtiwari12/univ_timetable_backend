import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import routes from "./routes/routes.js";
import User from "./model/model.js";
// import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());



mongoose.connect('mongodb://localhost:27017/tempdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(mongoose.connection.db.databaseName)
}).catch((err) => {
    console.error("Error ", err)
})

async function data(){
    try {
        const data = await User.find()
        if (!data) {
            console.log("errr")
        }
        else{
            console.log(data)
        }
        
    } catch (error) {
        console.log("Error", error)
        
    }
}
data()

app.use('/routes', routes)

app.listen(3000, () => {
    console.log("Connected to Mongoose")
})




