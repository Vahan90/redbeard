const config = require("../config");
const mongoose = require("mongoose");

module.exports = async () => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  return connection.connection.db;
};
