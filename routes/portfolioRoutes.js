const express = require("express");
const {sendEmailControler} = require("../controler/portfolioControler");

//router object
const router = express.Router();


//routes
router.post("/sendEmail",sendEmailControler);


//export
module.exports = router;