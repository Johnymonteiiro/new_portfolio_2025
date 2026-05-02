"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./src/sanity/schemaTypes";
import { PROFILE_SINGLETON_ID } from "./src/sanity/lib/constants";
import { apiVersion, dataset, projectId } from "./src/sanity/lib/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId(PROFILE_SINGLETON_ID)
              ),
            S.divider(),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("sidebarItem").title("Sidebar Items"),
            S.documentTypeListItem("interestArea").title("Interest Areas"),
            S.documentTypeListItem("journeyEntry").title("Journey"),
            S.documentTypeListItem("recommendation").title("Recommendations"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((t) => t.templateId !== "profile");
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "profile") {
        return prev.filter(
          ({ action }) => action && !["unpublish", "delete", "duplicate"].includes(action)
        );
      }
      return prev;
    },
  },
});
