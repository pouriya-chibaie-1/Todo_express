const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/ProjectController");

router.post("/create", projectController.AddProject);
router.get("/", projectController.GetAllProject);
router.delete("/:id", projectController.DeleteProject);
module.exports = router;
