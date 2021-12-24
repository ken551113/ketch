const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const todo = [
  { name: "吃飯", userId: "1" },
  { name: "睡覺", userId: "2" },
  { name: "洗澡", userId: "1" },
  { name: "打球", userId: "1" },
  { name: "煮飯", userId: "2" },
];

app.get("/todo", (req, res) => {
  setTimeout(() => {
    return res.send(todo);
  }, 5000);
});

app.listen(8081, () => {
  console.log("sever is run on port 8081");
});
