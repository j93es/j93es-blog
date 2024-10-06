import cors from "cors";

import { whitelist } from "../config";

// 옵션
export const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
};
