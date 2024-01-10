const mongoose = require("mongoose");

const connectionString = `mongodb+srv://alvaro:${process.env.MONGO_PASS}@curriculodatabase.e79k4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("ERRO NA BD!!!", error);
});

db.once("open", () => {
  if (!process.argv.includes("--no-logs")) {
    console.log("Tudo Correu Fixe ca DB!!!");
  }
});

module.exports = {
  con: db,
  Schema: mongoose.Schema,
  model: mongoose.model,
};
