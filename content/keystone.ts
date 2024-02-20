import dotenv from "dotenv";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";

dotenv.config();

export default withAuth(
  config({
    db: {
      provider: "postgresql" as const,
      url: process.env.DB_CONNSTR!,
    },
    lists,
    session,
    telemetry: false,
  })
);
