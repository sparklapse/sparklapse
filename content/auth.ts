import { randomBytes } from "crypto";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = randomBytes(32).toString("hex");
}

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "username",
  sessionData: "id name isAdmin",
  secretField: "password",
  // initFirstItem is run when there are no users and will run in sudo context!
  // remove in production
  // initFirstItem: {
  //   fields: ["name", "username", "password"],
  //   itemData: {
  //     isAdmin: true,
  //   },
  // },
});

const sessionMaxAge = 60 * 60 * 24 * 30;
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
