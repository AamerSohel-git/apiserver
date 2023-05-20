const mongoose = require("mongoose");

const connectDatabase = (dbName) => {
  mongoose
    .connect(`mongodb://localhost/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(() => console.log(`my server is connected to ${dbName}`))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
