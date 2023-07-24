const express = require("express")
const router = express.Router();
const changeTheme = require("../controllers/themeController")

router.patch('/changetheme', changeTheme)





module.exports = router