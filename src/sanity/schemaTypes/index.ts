import type { SchemaTypeDefinition } from "sanity";

import { blogPost } from "./blogPost";
import { project } from "./project";
import { service } from "./service";
import { sidebarItem } from "./sidebarItem";
import { profile } from "./profile";
import { interestArea } from "./interestArea";
import { journeyEntry } from "./journeyEntry";
import { recommendation } from "./recommendation";

export const schemaTypes: SchemaTypeDefinition[] = [
  blogPost,
  project,
  service,
  sidebarItem,
  profile,
  interestArea,
  journeyEntry,
  recommendation,
];
