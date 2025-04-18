const notFoundError = (req, res) => {
  res
    .status(404)
    .json({ status: "Invalid", message: "Route does not exist 🤔🤔" });
};

module.exports = notFoundError;
