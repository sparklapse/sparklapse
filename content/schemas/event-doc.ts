import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";

export const EventDoc = list({
  access: {
    operation: {
      query: allowAll,
      create: () => true,
      delete: () => true,
      update: () => true,
    },
    item: {
      update: async ({ session, item, context }) => {
        if (session?.data.isAdmin) return true;

        const { managers } = (await context.query.Event.findOne({
          where: { id: item.eventId as string },
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
    document: document({
      formatting: true,
      dividers: true,
    }),
    event: relationship({
      ref: "Event.docs",
      many: false,
      ui: { hideCreate: true },
    }),
  },
});
