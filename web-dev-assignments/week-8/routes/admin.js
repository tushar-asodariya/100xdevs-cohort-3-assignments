const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config/config");
const { adminMiddleware } = require("../middleware/admin");
const adminRoute = Router();

adminRoute.post("/signup", async function (req, res) {
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

    await adminModel.insertOne({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "Admin user already exist",
    });
    return;
  }

  res.status(200).json({
    message: "Sign up admin success",
  });
});

adminRoute.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email });
  if (!admin) {
    res.status(422).json({
      message: "Admin does not exist ",
    });
  }

  try {
    const checkPassword = await bcrypt.compare(password, admin.password);

    if (!checkPassword) {
      res.status(403).json({
        message: "Invalid admin credentials",
      });
    }

    const token = await jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_SECRET
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

adminRoute.use(adminMiddleware);
adminRoute.get("/course", async function (req, res) {
  const adminId = req.adminId;

  const { courseId } = req.query;
  try {
    let courseList = [];

    if (courseId) {
      courseList = await courseModel.find({
        _id: courseId,
        creatorId: adminId,
      });
    } else {
      courseList = await courseModel.find({ creatorId: adminId });
    }

    res.json({
      message: "Course list",
      courseList: courseList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

adminRoute.put("/course", async function (req, res) {
  const id = req.adminId;

  const { title, description, imageUrl, price, courseId } = req.body;
  try {
    const course = await courseModel.updateOne(
      { _id: courseId, creatorId: id },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: Number(price),
      }
    );
    res.json({
      message: "Course updated",
      courseId: course._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

adminRoute.delete("/course", async function (req, res) {
  res.json({
    message: "Delete courses admin",
  });
});

adminRoute.post("/course", async function (req, res) {
  const id = req.adminId;

  const { title, description, imageUrl, price } = req.body;
  try {
    const course = await courseModel.insertOne({
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: Number(price),
      creatorId: id,
    });
    res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = {
  adminRoute: adminRoute,
};
