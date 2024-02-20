import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const Event = list({
  access: {
    operation: {
      query: allowAll,
      create: ({ session }) => session?.data.isAdmin,
      delete: ({ session }) => session?.data.isAdmin,
      update: () => true,
    },
    item: {
      update: async ({ session, item, context }) => {
        if (session?.data.isAdmin) return true;

        const { managers } = (await context.query.Event.findOne({
          where: { id: item.id as string },
          query: "managers { id }",
        })) as { managers: { id: string }[] };

        if (managers.some((manager) => manager.id === session?.data.id))
          return true;

        return false;
      },
    },
  },
  fields: {
    label: text({ validation: { isRequired: true } }),
    date: timestamp({
      validation: { isRequired: true },
      defaultValue: { kind: "now" },
    }),
    managers: relationship({ ref: "User", many: true }),
    docs: relationship({ ref: "EventDoc.event", many: true }),
  },
});
