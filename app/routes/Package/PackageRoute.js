
const express = require('express');
const router = express.Router();
const controller = require("../../controllers/PACKAGE/packageController")

router.post("/createPackage" , controller.createPackage);
router.post("/updatePackage" , controller.updatePackage);
// router.post("/updatePackage" , controller.updatePackage);
router.post("/changeStatusPackage" , controller.deletePackage);
router.post("/deleteAllPackage" , controller.deleteAllPackage);
router.post("/getPackageByProductId" , controller.getPackageByProductId);

router.post("/getPackageByPriceId" , controller.getPackageByPriceId);

module.exports = router;