import express, { Request, Response } from "express";

import { postingMetadata } from "../controller/index";
import { apiDir } from "../config";

const router = express.Router();

router.get("/index/", (req: Request, res: Response) => {
  const metadata = postingMetadata.getMarkdownFilesMetadata();
  res.json(metadata);
});

router.use(
  express.static(apiDir, {
    etag: false,
    index: false,
    maxAge: "1d",
  })
);

export default router;
