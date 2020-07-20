const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, "verysecretkey");
    console.log(decodedData, typeof decodedData.id);
    if (decodedData) {
      req.userId = decodedData.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
