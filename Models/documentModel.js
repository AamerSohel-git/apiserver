const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: { type: String },
  image: { data: Buffer, contentType: String },
  id: { type: Number },
});

const documentModel = mongoose.model("documents", documentSchema);

module.exports = documentModel;
