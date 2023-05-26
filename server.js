const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { logger } = require("./middlewares/logEvents");
const openAiRouter = require("./routes/openAiRoute");

//express setup
const app = express();
dotenv.config();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
app.use("/openAi", openAiRouter);

//Server setup
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
