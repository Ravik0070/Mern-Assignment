const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
const { verifyToken } = require("../middleware/jwtMiddleware");

router.get("/getnote/:id", verifyToken, noteController.GetNote);
router.get("/all", verifyToken, noteController.GetNotes);
router.post("/create", verifyToken, noteController.Create);
router.put("/update/:id", verifyToken, noteController.Update);
router.delete("/delete/:id", verifyToken, noteController.Delete);

module.exports = router;
