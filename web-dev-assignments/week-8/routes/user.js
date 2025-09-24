const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config/config");
const { userMiddleware } = require("../middleware/user");

const userRoute = Router();

userRoute.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.email(),
    password: z.string().min(3).max(30),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });
  console.log(req.body);
  const isReqBodyValid = requireBody.safeParse(req.body);

  if (!isReqBodyValid.success) {
    res.json({
      message: "Invalid input",
      error: isReqBodyValid,
    });
  }
  try {
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.insertOne({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "User already exist",
    });
    return;
  }

  res.json({
    message: "Sign up user success",
  });
});

userRoute.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(422).json({
      message: "User does not exist ",
    });
  }

  try {
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(403).json({
        message: "Invalid user credentials",
      });
    }

    const token = await jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER_SECRET
    );

    res.json({
      token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRoute.use(userMiddleware);
userRoute.get("/purchases", async function (req, res) {
  const userId = req.userId;
  const userCourseData = await purchaseModel
    .find({ userId: userId })
    .populate("courseId");
  // const courseListData = await courseModel.find({_id: {$in : userCourseData.map(x=>x.courseId)}})
  res.json({
    message: "Success",
    courseList: userCourseData,
  });
});

module.exports = {
  userRoute: userRoute,
};
