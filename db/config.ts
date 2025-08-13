import { defineDb, defineTable, column } from "astro:db";

const Counter = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    value: column.number({ default: 0 }),
    active: column.boolean({ default: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Counter
  },
});
