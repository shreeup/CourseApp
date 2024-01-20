require("dotenv").config();
require("express-async-errors");
var bodyParser = require("body-parser");
const express = require("express");
const app = express();

//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//swagger
const swagger = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

//connectdb
const connectDB = require("./db/connect");
const { auth, adminauth } = require("./middleware/authentication");
//routers
const authRouter = require("./routes/auth");
const coursesRouter = require("./routes/courses");
const usercoursesRouter = require("./routes/usercourses");
const usersRouter = require("./routes/users");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra packages
app.set("trust proxy", 1);
//app.use(rateLimiter());
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );
const corsOptions = {
  credentials: true,
  origin: "*", // Whitelist the domains you want to allow
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));

app.use(express.static("public"));
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));
// routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/courses`, coursesRouter);
app.use(`/api/v1/`, auth, usercoursesRouter);
app.use(`/api/v1/users`, auth, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3009;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port a  ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
