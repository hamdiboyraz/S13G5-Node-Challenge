const projectsController = require("./projects-model");

function validateProject(req, res, next) {
  try {
    // console.log(req.body);
    const { name, description, completed } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }
    if (completed) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed field must be a boolean value.",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function validateProjectID(req, res, next) {
  try {
    const { id } = req.params;
    const project = await projectsController.get(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    // req.project = project;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  validateProject,
  validateProjectID,
};
