const mongoose = require("mongoose");

url =
  "mongodb+srv://mohsin:mohsin@cluster0.uilr4ld.mongodb.net/?retryWrites=true&w=majority";
const conectionDb = () => {
  console.log("DB is connected");
  mongoose.set("strictQuery", false);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = conectionDb;

