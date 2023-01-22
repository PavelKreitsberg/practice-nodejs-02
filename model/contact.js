const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: String,
  number: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
