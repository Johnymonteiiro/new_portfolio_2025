import { defineField, defineType, defineArrayMember } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedDate",
      type: "date",
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
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Next.js",
          "NestJS",
          "gRPC",
          "AI",
          "Auth",
          "RabbitMQ",
          "React",
        ].map((t) => ({ title: t, value: t })),
      },
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "subTitle",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                      { title: "Code", value: "code" },
                    ],
                    annotations: [],
                  },
                },
              ],
            }),
            defineField({
              name: "language",
              type: "string",
              options: {
                list: [
                  { title: "TypeScript", value: "ts" },
                  { title: "TSX", value: "tsx" },
                  { title: "JavaScript", value: "js" },
                  { title: "Protobuf", value: "proto" },
                  { title: "None", value: "none" },
                ],
              },
              initialValue: "none",
            }),
            defineField({
              name: "code",
              type: "text",
              rows: 10,
            }),
          ],
          preview: {
            select: { title: "subTitle" },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedDateDesc",
      by: [{ field: "publishedDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
