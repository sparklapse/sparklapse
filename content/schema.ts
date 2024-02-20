import { User } from "./schemas/user";
import { Event } from "./schemas/event";
import { EventDoc } from "./schemas/event-doc";
import type { Lists } from ".keystone/types";

export const lists: Lists = {
  User,
  Event,
  EventDoc,
};
