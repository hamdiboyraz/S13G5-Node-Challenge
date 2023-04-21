// "project" routerını buraya yazın!
const express = require("express");
const projectsController = require("./projects-model");
const projectsMiddleware = require("./projects-middleware");

// Initialize a router
const projectsRouter = express.Router();

// Routes for the projects API -> /api/projects
// Get All Projects
projectsRouter.get("/", async (req, res, next) => {
  try {
    const projects = await projectsController.get();
    if (!projects) {
      return res.status(200).json([]);
    }
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Create Project
projectsRouter.post(
  "/",
  projectsMiddleware.validateProject,
  async (req, res, next) => {
    try {
      const { name, description, completed } = req.body;
      const newProject = await projectsController.insert({
        name,
        description,
        completed,
      });
      res.status(201).json(newProject);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// Get Project
projectsRouter.get(
  "/:id",
  projectsMiddleware.validateProjectID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const project = await projectsController.get(id);
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// Update Project
projectsRouter.put(
  "/:id",
  projectsMiddleware.validateProject,
  projectsMiddleware.validateProjectID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, completed } = req.body;
      const updatedProject = await projectsController.update(id, {
        name,
        description,
        completed,
      });
      res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// Delete Project
projectsRouter.delete(
  "/:id",
  projectsMiddleware.validateProjectID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await projectsController.remove(id);
      res.status(204).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// Get All Actions for Project
projectsRouter.get(
  "/:id/actions",
  projectsMiddleware.validateProjectID,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projectActions = await projectsController.getProjectActions(id);
      res.status(200).json(projectActions);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = projectsRouter;
