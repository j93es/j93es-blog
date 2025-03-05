import express, { Request, Response } from "express";

import { postingIndexController } from "../controllers/index";
import { apiDir } from "../config";

const router = express.Router();

router.get("/posting-index.json", (req: Request, res: Response) => {
  res.json(postingIndexController.getPostingIndex());
});

router.use(express.static(apiDir));

export default router;
