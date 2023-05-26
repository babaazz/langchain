const getAnswer = async (req, res) => {
  res.status(200).json({
    message: "Server setup successful",
  });
};

module.exports = { getAnswer };
