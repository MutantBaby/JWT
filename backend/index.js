require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const app = express();
const PORT = process.env.PORT || 8000;

// parsing cookies
app.use(cookieParser());

// cross origin resource sharing
app.use(credentials);
app.use(cors(corsOptions));

// to handle urlendcoded data, or get words from form
app.use(express.urlencoded({ extended: false }));

// parse the incoming requests with JSON payloads
app.use(express.json());

// securing HTTP headers
app.use(helmet());

// http request logs files
app.use(morgan("common"));

// router ==> API
app.use("/refresh", require("./routes/refreshDir"));
app.use("/register", require("./routes/registerDir"));
app.use("/auth", require("./routes/authDir"));
app.use("/employees", require("./routes/employeeDir"));

app.listen(PORT, () => {
  console.log(`\nServer is running at port ${PORT}\n`);
});
