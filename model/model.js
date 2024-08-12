import mongoose from 'mongoose';
import { type } from 'os';
const userSchema = mongoose.Schema({
    Subject: {
        type: "String",
        required: true
    },
    Lecture: {
        type: "String",
        required: true
    },
    CourseCode: {
        type: "String",
        required: true
    },
    BlockNo: {
        type: "String",
        required: true
    },
    Faculty: {
        type: "String",
        required: true
    },
    Time:{
        type: "String",
        required: true
    },
    Day:{
        type:"String",
        required: true
    },
   

})
const User = mongoose.model('tempdb', userSchema, 'Monday');
export default User;





