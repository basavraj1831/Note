import { createNote, deleteNote, getNotes } from "../controllers/noteController";
import { protectRoute } from "../middleware/authMiddleware";

const express = require('express');

const noteRoute = express.Router();

noteRoute.post("/create",protectRoute,createNote);
noteRoute.get("/get",protectRoute, getNotes);
noteRoute.delete("/:id",protectRoute, deleteNote);

export default noteRoute;