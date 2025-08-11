import express, { Request, Response } from "express";

import { ForbiddenError } from "../models/error";
import { postingIndexServ } from "../service/index";
import { apiDir, monitoringKey } from "../config";
import { eachErrorHandler } from "../middlewares/index";

const router = express.Router();

router.get("/posting-index.json", (req: Request, res: Response) => {
  res.json(postingIndexServ.get());
});

router.get(`/monitoring/health`, (req: Request, res: Response) => {
  if (req.query.key !== monitoringKey) {
    throw new ForbiddenError("Invalid monitoring key");
  }
  res.setHeader("Cache-Control", "no-cache, no-store");
  res.status(200).send("OK");
});

router.get("/t", (req: Request, res: Response) => {
  res.send(`
  <!Doctype html>
  <meta http-equiv="refresh" content="0; url=https://example.com">`);
});

router.use(express.static(apiDir));

router.use(eachErrorHandler.routerNotFound);

export default router;
