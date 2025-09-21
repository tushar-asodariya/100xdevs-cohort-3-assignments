const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod")
require("dotenv").config();
const bcrypt = require("bcrypt");

mongoose.connect(`${process.env.DB_CONNECT}todos-db`);

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const requireBody = z.object({
    email: z.email(),
    password:z.string().min(3).max(30),
    name:z.string().min(3).max(100)
  })

  const parsedDataWithSuccess = requireBody.safeParse(req.body)

  if(!parsedDataWithSuccess.success){

    res.json({
      message:"Invalid input",
      error: parsedDataWithSuccess.error
    });

    return;
  
  }


  try {


    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.insertOne({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (e) {
    console.log("User already exist");
    res.json({
      message: "User already exist",
    });
    return
  }
  res.json({
    message: "You are signed up",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
  });

  if (response) {
    const passwordMatch = await bcrypt.compare(password, response.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: response._id.toString(),
        },
        JWT_SECRET
      );

      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect creds",
      });
    }
  } else {
    res.status(403).json({
      message: "User not found",
    });
  }
});

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(3000);
console.log("http://localhost:3000/");
