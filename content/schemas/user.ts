import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const User: NonNullable<Lists["User"]> = list({
  access: {
    operation: {
      query: allowAll,
      create: ({ session }) => session?.data.isAdmin,
      update: ({ session }) => session?.data.isAdmin,
      delete: ({ session }) => session?.data.isAdmin,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    username: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({
      defaultValue: false,
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
