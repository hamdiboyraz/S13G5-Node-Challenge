// IMPORTS
const express = require("express");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

// Initialize express server
const server = express();

// GLOBAM MIDDLEWARE
server.use(express.json());

// API
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// EXPORT
module.exports = server;
