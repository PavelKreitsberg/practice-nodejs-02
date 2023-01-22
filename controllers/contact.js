const Contact = require("../model/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const data = await Contact.find({ owner: _id });
  res.send(data);
};

const addContact = async (req, res) => {
  const { name, number } = req.body;

  const { _id } = req.user;

  const contact = await Contact.create({ name, number, owner: _id });

  res.status(201).send(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const deletedContact = await Contact.findOneAndDelete({
    owner: _id,
    _id: id,
  });

  res.status(200).send(deletedContact);
};

module.exports = { getAll, addContact, deleteContact };
