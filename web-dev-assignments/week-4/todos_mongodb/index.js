const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());

const JWT_SECRET = "SECRET_KEY";

mongoose.connect(
  ""
);
app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.insertOne({
    name: name,
    password: password,
    email: email,
  });

  res.status(200).json({
    message: "You have signup successfully!",
  });
});

app.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });


  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "Success",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

function authenticationMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodeToken = jwt.verify(token, JWT_SECRET);

  if (decodeToken) {
    req.userId = decodeToken.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
}

app.use(authenticationMiddleware);

app.get("/todos", async function (req, res) {
  const userId = req.userId;
const todos = await TodoModel.find({
    userId: userId,
  });

  if(todos){
  res.status(200).json({
    userId: userId,
    todos:todos
  });
  }else{
    res.status(422).json({
        message:"No data found"
    })
  }
});

app.post("/todo", async function (req, res) {
  const userId = req.userId;

    await TodoModel.insertOne({
        title: req.body.title, 
        userId: userId
    })

  res.status(200).json({
    message: 'Todo created successfully!',
  });
});

app.listen(3000);
