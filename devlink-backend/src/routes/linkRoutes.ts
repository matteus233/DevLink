import { Router } from "express";
import { addLink, listLinks, removeLink } from "../controllers/linkController.ts";
import { authenticate } from "../middleware/authMiddleware.ts";

const router = Router();

router.get("/", authenticate, listLinks);
router.post("/", authenticate, addLink);
router.delete("/:id", authenticate, removeLink);

export default router;
