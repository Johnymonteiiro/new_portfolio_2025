import { defineField, defineType } from "sanity";

export const recommendation = defineType({
  name: "recommendation",
  title: "Recommendation",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "jobTitle", type: "string" }),
    defineField({
      name: "recommendationText",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({
      name: "profileImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "span",
      type: "boolean",
      description: "When true, the card spans wider in the layout.",
      initialValue: false,
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
    select: { title: "name", subtitle: "jobTitle", media: "profileImage" },
  },
});
