const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");

router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
