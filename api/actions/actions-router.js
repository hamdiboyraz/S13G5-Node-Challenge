// "eylem" routerını buraya yazın
const express = require("express");
const actionsController = require("./actions-model");
const actionsMiddleware = require("./actions-middlware");
const projectController = require("../projects/projects-model");

// Initialize a router
const actionsRouter = express.Router();

// Routes for the actions API -> /api/actions
// Get All Actions
actionsRouter.get("/", async (req, res, next) => {
  try {
    const actions = await actionsController.get();
    if (!actions) {
      return res.status(200).json([]);
    }
    return res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Create Action
actionsRouter.post(
  "/",
  actionsMiddleware.validateAction,
  async (req, res, next) => {
    try {
      const { project_id, description, notes } = req.body;
      const project = await projectController.get(project_id);
      if (!project) {
        return res
          .status(404)
          .json({ message: "No project found for this id!" });
      }

      const newAction = await actionsController.insert({
        project_id,
        description,
        notes,
      });
      res.status(201).json(newAction);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// Get Action
actionsRouter.get(
  "/:id",
  actionsMiddleware.validateActionID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const action = await actionsController.get(id);
      res.status(200).json(action);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
actionsRouter.put(
  "/:id",
  actionsMiddleware.validateAction,
  actionsMiddleware.validateActionID,
  async (req, res, next) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const updatedAction = await actionsController.update(id, {
      project_id,
      description,
      notes,
      completed,
    });
    res.status(200).json(updatedAction);
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
actionsRouter.delete(
  "/:id",
  actionsMiddleware.validateActionID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await actionsController.remove(id);
      res.status(204).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = actionsRouter;
