const express = require("express");
const router = express.Router();
const {
  getAllUrls,
  getUrl,
  createUrl,
} = require("../controllers/urlController.js");

router.get("/:urlId", getUrl);
router.post("/original", createUrl);
router.get("/all-urls", getAllUrls);
module.exports = router;
