import { defineField, defineType } from "sanity";

export const sidebarItem = defineType({
  name: "sidebarItem",
  title: "Sidebar Item",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "anchor",
      type: "string",
      description: "Anchor id used by the in-page navigation",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "visible",
      type: "boolean",
      initialValue: true,
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
    select: { title: "sectionTitle", subtitle: "anchor" },
  },
});
