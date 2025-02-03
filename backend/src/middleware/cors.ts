import cors from "cors";

import { whitelist } from "../config";

// 옵션
const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
