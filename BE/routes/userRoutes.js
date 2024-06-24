const express = require("express");
const router = express.Router();
const upload = require("../config/storageConfig");



const { userAuth } = require("../middleware/userAuth");

router.post("/reciever", userAuth, );
router.get("/reciever/:id", userAuth, );



module.exports = router;
