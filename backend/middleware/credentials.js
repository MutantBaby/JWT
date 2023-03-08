const allowedOptions = require("../config/allowedOptions");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOptions.includes(origin))
    res.header("Access-Control-Allow-Credentials", true);

  next();
};

module.exports = credentials;
