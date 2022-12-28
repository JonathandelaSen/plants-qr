import morgan, { StreamOptions } from "morgan"

import WinstonLogger from "./WinstonLogger"

const stream: StreamOptions = {
  write: (message) => WinstonLogger.info(message),
}

const morganMiddleware = morgan("combined", { stream })

export default morganMiddleware
