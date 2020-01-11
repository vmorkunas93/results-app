const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const routes = require("./routes/index");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;

app.use(express.json());

// Mongo Connection
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
