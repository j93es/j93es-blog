import cors from "cors";

import { corsWhitelist } from "../config";

// 옵션
const corsOptions: cors.CorsOptions = {
  origin: corsWhitelist,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
