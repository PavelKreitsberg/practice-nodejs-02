const router = require("express").Router();
const { getAll, addContact, deleteContact } = require("../controllers/contact");
const auth = require("../middleware/auth");


router.get("/", auth, getAll);
router.post("/", auth, addContact);
router.delete("/:id", auth, deleteContact);

module.exports = router;
