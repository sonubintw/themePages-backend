const express = require("express")
const router = express.Router();
const { registerUser, getUserDetails } = require("../controllers/userController")

router.post("/register", registerUser)

router.get("/userdetails", getUserDetails)


module.exports = router