"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core4 = require("@keystone-6/core");

// schemas/user.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: {
    operation: {
      query: import_access.allowAll,
      create: ({ session: session2 }) => session2?.data.isAdmin,
      update: ({ session: session2 }) => session2?.data.isAdmin,
      delete: ({ session: session2 }) => session2?.data.isAdmin
    }
  },
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    username: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    isAdmin: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    })
  }
});

// schemas/event.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_access2 = require("@keystone-6/core/access");
var Event = (0, import_core2.list)({
  access: {
    operation: {
      query: import_access2.allowAll,
      create: ({ session: session2 }) => session2?.data.isAdmin,
      delete: ({ session: session2 }) => session2?.data.isAdmin,
      update: () => true
    },
    item: {
      update: async ({ session: session2, item, context }) => {
        if (session2?.data.isAdmin)
          return true;
        const { managers } = await context.query.Event.findOne({
          where: { id: item.id },
          query: "managers { id }"
        });
        if (managers.some((manager) => manager.id === session2?.data.id))
          return true;
        return false;
      }
    }
  },
  fields: {
    label: (0, import_fields2.text)({ validation: { isRequired: true } }),
    date: (0, import_fields2.timestamp)({
      validation: { isRequired: true },
      defaultValue: { kind: "now" }
    }),
    managers: (0, import_fields2.relationship)({ ref: "User", many: true }),
    docs: (0, import_fields2.relationship)({ ref: "EventDoc.event", many: true })
  }
});

// schemas/event-doc.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var import_access3 = require("@keystone-6/core/access");
var import_fields_document = require("@keystone-6/fields-document");
var EventDoc = (0, import_core3.list)({
  access: {
    operation: {
      query: import_access3.allowAll,
      create: () => true,
      delete: () => true,
      update: () => true
    },
    item: {
      update: async ({ session: session2, item, context }) => {
        if (session2?.data.isAdmin)
          return true;
        const { managers } = await context.query.Event.findOne({
          where: { id: item.eventId },
          query: "managers { id }"
        });
        if (managers.some((manager) => manager.id === session2?.data.id))
          return true;
        return false;
      }
    }
  },
  fields: {
    label: (0, import_fields3.text)({ validation: { isRequired: true } }),
    document: (0, import_fields_document.document)({
      formatting: true,
      dividers: true
    }),
    event: (0, import_fields3.relationship)({
      ref: "Event.docs",
      many: false,
      ui: { hideCreate: true }
    })
  }
});

// schema.ts
var lists = {
  User,
  Event,
  EventDoc
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "username",
  sessionData: "id name isAdmin",
  secretField: "password"
  // initFirstItem is run when there are no users and will run in sudo context!
  // remove in production
  // initFirstItem: {
  //   fields: ["name", "username", "password"],
  //   itemData: {
  //     isAdmin: true,
  //   },
  // },
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
import_dotenv.default.config();
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: {
      provider: "postgresql",
      url: process.env.DB_CONNSTR
    },
    lists,
    session,
    telemetry: false
  })
);
//# sourceMappingURL=config.js.map
