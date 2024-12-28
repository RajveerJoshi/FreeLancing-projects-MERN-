const express = require("express");
const { SignUp, multipleUpload } = require("../controller/user");
const router = express.Router();

router.post('/signup', multipleUpload, SignUp);

module.exports = router;
