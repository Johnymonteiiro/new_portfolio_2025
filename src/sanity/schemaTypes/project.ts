import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "WEB DEVELOPMENT" },
          { title: "UI Design", value: "UI DESIGN" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      type: "url",
    }),
    defineField({
      name: "recent",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "Published" },
          { title: "Draft", value: "Draft" },
          { title: "Archived", value: "Archived" },
        ],
      },
      initialValue: "Draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
  },
});
