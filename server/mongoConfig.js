const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://alvaro:${process.env.MONGO_PASS}@curriculodatabase.e79k4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on("error", (error) => {
    console.log("ERRO NA BD!!!", error);
})

db.once("open", () => {
    console.log("Tudo Correu Fixe ca DB!!!");
})

module.exports = {
    con: db,
    Schema: mongoose.Schema,
    model: mongoose.model,
}