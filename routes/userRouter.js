const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/:chatId", userController.getUser);
router.get("/order/:chatId", userController.getUserOrder);
router.put("/order/:chatId", userController.updateUser);

module.exports = router;
