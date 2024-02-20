import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import type { Lists } from ".keystone/types";

export const Permission: NonNullable<Lists["Permission"]> = list({
  access: {
    operation: {
      query: allowAll,
      create: ({ session }) => session?.data.isAdmin,
      update: ({ session }) => session?.data.isAdmin,
      delete: ({ session }) => session?.data.isAdmin,
    },
  },
  fields: {
    label: text({ validation: { isRequired: true } }),
    users: relationship({ ref: "User", many: true }),
  },
});
