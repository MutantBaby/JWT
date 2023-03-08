const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  // const authHeader = req.headers.["authorization"]; ==> when we have control over front-end
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ message: "Not authorized" });

  // console.log("EXE => 3\n", "1 Auth Header in VerifyAuth => ", authHeader); // Bearer Token

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      console.log("Error in jwt in verifyAuth", err);
      return res.status(403).json({ message: "Invalid Token in verify Auth" }); // invalid token
    }

    console.log("Decoded In VerifyJWT ", decoded);

    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;

    next();
  });
};

module.exports = verifyAuth;
