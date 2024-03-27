const express = require("express");
const cors = require('cors')
const { connection, PORT } = require("./config/db");
const userController = require('./controller/user.controller')
const taskController = require('./controller/task.controller')
const authorization= require('./midleware/authorization')

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "API Running!" });
});

app.use('/user',userController)
app.use(authorization)
app.use('/task',taskController)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(`${error} is giving while connecting`);
  }
  console.log(`Listening on PORT: ${PORT}`);
});
