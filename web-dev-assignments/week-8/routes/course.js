const { Router } = require("express");
const { courseModel, purchaseModel, userModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const courseRoute = Router();

courseRoute.get("/preview", async function (req, res) {
  const courseList = await courseModel.find({});
  res.json({
    message: "all courses",
    courseList: courseList,
  });
});

courseRoute.use(userMiddleware);
courseRoute.post("/purchase", async function (req, res) {
  //do it without payment integration
  const userId = req.userId;
  const courseId = req.body.courseId;

  const userPurchaseData = await purchaseModel.findOne({ userId: userId });

  if (userPurchaseData && userPurchaseData.courseId == courseId) {
    res.json({
      message: "User has already purchased this course",
    });
    return;
  }

  await purchaseModel.insertOne({
    userId: userId,
    courseId: courseId,
  });
  res.json({
    message: "Course purchase success",
  });
});

module.exports = {
  courseRoute: courseRoute,
};
