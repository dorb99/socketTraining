const { throws } = require("assert");
const Student = require("../schemas/userSchema");
const User = require("../schemas/userSchema");

exports.create = async (req, res) => {
  try {
    const { fullName, username, passKey } = req.body;
    const check = await User.findOne({ username });
    if (check)
      return res.status(404).send({ status: "404 username already exist" });
    if (passKey === "student") {
      const newStudent = await User.create({ fullName, username });
      res
        .status(200)
        .send({ status: "200 created student", student: newStudent });
    } else if (passKey === "Teacher@") {
      const newTeacher = await User.create({
        fullName,
        username,
        role: "teacher",
      });
      res
        .status(200)
        .send({ status: "200 created Teacher", Teacher: newTeacher });
    } else return res.status(404).send({ status: "404 wrong passkey" });
  } catch (err) {
    res.status(500).send({ status: "500 server error", data: err });
  }
};
