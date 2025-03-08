import express, { Request, Response } from "express";

import { postingIndexServ } from "../service/index";
import { apiDir } from "../config";
import { eachErrorHandler } from "../middlewares/errorHandler";

const router = express.Router();

router.get("/posting-index.json", (req: Request, res: Response) => {
  res.json(postingIndexServ.get());
});

router.use(express.static(apiDir));

// router.use(eachErrorHandler.routerNotFound);

export default router;
