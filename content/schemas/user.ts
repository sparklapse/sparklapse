import { list } from "@keystone-6/core";
import { allowAll, denyAll } from "@keystone-6/core/access";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";

export const User = list({
  access: {
    operation: {
      query: allowAll,
      create: ({ session }) => session?.data.isAdmin,
      delete: ({ session }) => session?.data.isAdmin,
      update: allowAll,
    },
    item: {
      update: ({ session, item }) => {
        if (session?.data.isAdmin) return true;
        if (session?.data.id === item.id) return true;

        return false;
      },
    },
  },
  fields: {
    name: text({
      access: {
        update: ({ session, item }) => {
          if (session?.data.isAdmin) return true;
          if (session?.data.id === item.id) return true;

          return false;
        },
      },
      validation: { isRequired: true },
    }),
    username: text({
      access: {
        update: ({ session, item }) => {
          if (session?.data.isAdmin) return true;
          if (session?.data.id === item.id) return true;

          return false;
        },
      },
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({
      access: {
        update: ({ session }) => session?.data.isAdmin,
      },
      defaultValue: false,
    }),
    createdAt: timestamp({
      access: {
        create: ({ session }) => session?.data.isAdmin,
        read: allowAll,
        update: denyAll,
      },
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
