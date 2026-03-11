const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("user", "admin"), noteController.createNote);
router.get("/", authMiddleware, noteController.getNotes);
router.get("/:id", authMiddleware, noteController.getNoteById);
router.put("/:id", authMiddleware, roleMiddleware("admin", "user"), noteController.updateNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;