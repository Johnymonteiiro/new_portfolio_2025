import { defineField, defineType } from "sanity";

export const journeyEntry = defineType({
  name: "journeyEntry",
  title: "Journey Entry",
  type: "document",
  fields: [
    defineField({
      name: "company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "position", type: "string" }),
    defineField({ name: "companyUrl", type: "url" }),
    defineField({
      name: "dateStart",
      type: "string",
      description: 'Free-form (e.g. "Mar 2023")',
    }),
    defineField({
      name: "dateEnd",
      type: "string",
      description: 'Free-form (e.g. "Present")',
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "responsibilities",
      type: "array",
      of: [{ type: "string" }],
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
    select: { title: "company", subtitle: "position" },
  },
});
