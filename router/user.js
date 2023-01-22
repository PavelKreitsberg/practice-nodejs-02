const router = require("express").Router();
const auth = require("../middleware/auth");

const { signup, login, logout, current } = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/current", auth, current);

module.exports = router;
