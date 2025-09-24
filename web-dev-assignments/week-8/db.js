const { Schema, default: mongoose } = require("mongoose");
require("dotenv").config();

const CONNECT_STR = `${process.env.DB_CONNECT}coursera-clone`;
mongoose.connect(CONNECT_STR)
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
}); 
const adminSchema = new Schema({
 email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
}); 
const courseSchema = new Schema({
 title: {type: String, unique: false},
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageUrl: String
}); 
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: { type: ObjectId, ref:"course" },
}); 

const userModel = mongoose.model('user', userSchema)
const adminModel = mongoose.model('admin', adminSchema)
const courseModel = mongoose.model('course', courseSchema)
const purchaseModel = mongoose.model('purchase', purchaseSchema)


module.exports ={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}