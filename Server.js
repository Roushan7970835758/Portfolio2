const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

require('dotenv').config();
const mailjet = require('node-mailjet').connect(
  process.env.API_MAILJET
);
//dotevn configrueation
dotenv.config();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//static files access
app.use(
  express.static(
    path.join(__dirname, "./client/build")
  )
);

//routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoutes"));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/build")
  );
});
//port
const PORT = process.env.PORT || 8080;

//listner
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
