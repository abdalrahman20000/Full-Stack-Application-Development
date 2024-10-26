const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);
router.post("/add-product", productController.addProducts);
router.put("/update-product", productController.updateProducts);
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;
