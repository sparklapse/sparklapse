import dotenv from "dotenv";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";

dotenv.config();

export default withAuth(
  config({
    server: {
      port: 3000,
      cors: {
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        origin: ["https://sparklapse.com", "http://localhost:4321"],
        credentials: true,
      },
    },
    db: {
      provider: "postgresql" as const,
      url: process.env.DB_CONNSTR!,
    },
    lists,
    session,
    telemetry: false,
  })
);
