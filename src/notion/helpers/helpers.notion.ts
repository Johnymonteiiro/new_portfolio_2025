import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Properties = PageObjectResponse["properties"];

export function getText(props: Properties, key: string): string {
  const prop = props[key];
  if (!prop) return "";
  if (prop.type === "title")
    return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text")
    return prop.rich_text.map((t) => t.plain_text).join("");
  return "";
}

export function getSelect(props: Properties, key: string): string {
  const prop = props[key];
  if (prop?.type === "select") return prop.select?.name ?? "";
  return "";
}

export function getMultiSelect(props: Properties, key: string): string[] {
  const prop = props[key];
  if (prop?.type === "multi_select") return prop.multi_select.map((o) => o.name);
  return [];
}

export function getCheckbox(props: Properties, key: string): boolean {
  const prop = props[key];
  if (prop?.type === "checkbox") return prop.checkbox;
  return false;
}

export function getNumber(props: Properties, key: string): number {
  const prop = props[key];
  if (prop?.type === "number") return prop.number ?? 0;
  return 0;
}

export function getDate(props: Properties, key: string): string | null {
  const prop = props[key];
  if (prop?.type === "date") return prop.date?.start ?? null;
  return null;
}

export function getUrl(props: Properties, key: string): string {
  const prop = props[key];
  if (prop?.type === "url") return prop.url ?? "";
  return "";
}

export function getRelationIds(props: Properties, key: string): string[] {
  const prop = props[key];
  if (prop?.type === "relation") return prop.relation.map((r) => r.id);
  return [];
}

export function getFiles(props: Properties, key: string): string | null {
  const prop = props[key];
  if (prop?.type === "files" && prop.files.length > 0) {
    const file = prop.files[0];
    if (file.type === "file") return file.file.url;
    if (file.type === "external") return file.external.url;
  }
  return null;
}