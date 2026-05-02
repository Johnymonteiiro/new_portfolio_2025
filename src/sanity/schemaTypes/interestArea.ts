import { defineField, defineType } from "sanity";

export const interestArea = defineType({
  name: "interestArea",
  title: "Interest Area",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order, Asc",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "order" },
  },
});
