const express = require("express");
const openAiController = require("../controllers/openAiController");

const router = express.Router();

router.get("/getAnswer", openAiController.getAnswer);

module.exports = router;
