const Url = require("../models/url");
const crypto = require("crypto");

const getAllUrls = async (req, res) => {
  const urls = await Url.find({});
  if (!urls) {
    res.status(404).json({ error: "No URLs found" });
    return;
  }
  if (urls.length === 0) {
    res.status(404).json({ error: "You do not have any url saved" });
    return;
  }
  res.status(200).json(urls);
  console.log("Retrieved all URLs:", urls);
};

const getUrl = async (req, res) => {
  const urlId = req.params.urlId;
  const url = await Url.findOne({ shortUrl: urlId });
  if (url) {
    res.status(301).json({
      message: "Redirecting to original URL",
      originalUrl: url.originalUrl,
    });
  } else {
    res.status(404).json({ error: "URL not found" });
    return;
  }
};

const createUrl = async (req, res) => {
  const originalUrl = req.body.originalUrl;
  const doesUrlExist = await Url.findOne({ originalUrl: originalUrl });
  if (doesUrlExist) {
    res.status(404).json({ status: "Invalid", message: "Url already exists" });
    return;
  }
  const shortUrl = `slicer${crypto.randomBytes(3).toString("hex")}`;

  const newUrlId = await Url.create({
    originalUrl: originalUrl,
    shortUrl: shortUrl,
  });
  res.status(200).json({
    message: "Successfully sliced your url",
    shorterUrl: shortUrl,
  });
  console.log("Successfully created a new url", newUrlId);
};

module.exports = { getAllUrls, getUrl, createUrl };
