const actionsController = require("./actions-model");

function validateAction(req, res, next) {
  try {
    // console.log(req.body);
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function validateActionID(req, res, next) {
  try {
    const { id } = req.params;
    const action = await actionsController.get(id);
    if (!action) {
      return res.status(404).json({ message: "Action not found!" });
    }
    // req.action = action;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  validateAction,
  validateActionID,
};
