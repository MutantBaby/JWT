const allowedOptions = require("./allowedOptions")

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOptions.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};

module.exports = corsOptions;