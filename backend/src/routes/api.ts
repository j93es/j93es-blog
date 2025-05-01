import express, { Request, Response } from "express";

import { postingIndexServ } from "../service/index";
import { apiDir, monitoringKey } from "../config";
import { eachErrorHandler } from "../middlewares/index";

const router = express.Router();

router.get("/posting-index.json", (req: Request, res: Response) => {
  res.json(postingIndexServ.get());
});

router.get(
  `/monitoring/health/${monitoringKey}`,
  (req: Request, res: Response) => {
    res.status(200).send("OK");
  }
);

router.use(express.static(apiDir));

router.use(eachErrorHandler.routerNotFound);

export default router;
