import { defineField, defineType } from "sanity";

export { PROFILE_SINGLETON_ID } from "../lib/constants";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "status", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "specializations", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({
      name: "communicationNote",
      type: "string",
      description:
        "A snippet of the bio that should be highlighted (must appear inside `bio`).",
    }),
    defineField({ name: "quote", type: "text", rows: 3 }),
    defineField({ name: "githubUrl", type: "url" }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({
      name: "cvUrl",
      type: "url",
      description: "External link to the CV (optional, takes precedence over file).",
    }),
    defineField({
      name: "cvFile",
      type: "file",
      description: "Uploaded CV file (PDF). Used when cvUrl is empty.",
    }),
    defineField({
      name: "profileImage",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "profileImage" },
  },
});
