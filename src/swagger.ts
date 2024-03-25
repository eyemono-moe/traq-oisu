import swagger from "@elysiajs/swagger";
import { createSelectSchema } from "drizzle-typebox";
import { lists, receptions } from "./db/schema";

export const swaggerOptions = swagger({
  documentation: {
    tags: [
      {
        name: "lists",
        description: "Lists API",
      },
      {
        name: "receptions",
        description: "Receptions API",
      },
    ],
    components: {
      schemas: {
        list: createSelectSchema(lists),
        reception: createSelectSchema(receptions),
      },
    },
  },
});
