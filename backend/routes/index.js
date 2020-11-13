var express = require("express");
var router = express.Router();
const Register = require("../model/model");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Post
router.post("/create", function (req, res, next) {
  Register.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  })
    .then(function (data) {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the Register.",
      });
    });
});

// Get All
router.get("/read", function (req, res) {
  Register.findAll().then((data) => {
    res.json({
      success: true,
      data: data,
    });
  });
});

// Get One
router.get("/read/:id", function (req, res) {
  Register.findAll({ where: { id: req.params.id } }).then((data) => {
    res.json({
      data,
    });
  });
});

// Updata One
router.put("/update/:id", function (req, res) {
  Register.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(function (data) {
    res.json({
      status: 1,
      data: data,
    });
  });
});

// Delete One
router.delete("/delete/:id", function (req, res) {
  Register.destroy({ where: { id: req.params.id } }).then(function (data) {
    res.json(data);
  });
});

module.exports = router;
