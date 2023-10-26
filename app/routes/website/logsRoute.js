
const express = require('express');
const router = express.Router();
const controller = require("../../controllers/LOGS/logsController")

router.post("/createLog" , controller.createLog);
router.post("/updateLog" , controller.updateLog);
router.post("/archieveLog" , controller.archieveLog);
router.post("/deleteLog" , controller.deleteLog);
router.post("/deleteAllLog" , controller.deleteAllLog);
router.get("/getAllLogs" , controller.getAllLogs);
router.post("/getLogDetails" , controller.getLogDetails);

module.exports = router;