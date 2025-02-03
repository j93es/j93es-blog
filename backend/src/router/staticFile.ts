import express, { Request, Response } from "express";
import { FilesMetadataController } from "../controller/index";
import { publicDir } from "../config";

const router = express.Router();
const postingMetadata = new FilesMetadataController("/posting/");

router.get("/index/", (req: Request, res: Response) => {
  const metadata = postingMetadata.getMarkdownFilesMetadata();
  res.json(metadata);
});

router.use(
  express.static(publicDir, {
    etag: false,
    index: false,
    maxAge: "1d",
  })
);

export default router;
