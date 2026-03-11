import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function getTitle(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("") || "";
  }
  return "";
}

export function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("") || "";
  }
  return "";
}

export function getNumber(page: PageObjectResponse, key: string): number {
  const prop = page.properties[key];
  if (prop?.type === "number" && prop.number !== null) {
    return prop.number;
  }
  return 0;
}

export function getSelect(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === "select" && prop.select) {
    return prop.select.name;
  }
  return "";
}

export function getCheckbox(page: PageObjectResponse, key: string): boolean {
  const prop = page.properties[key];
  if (prop?.type === "checkbox") {
    return prop.checkbox;
  }
  return false;
}

export function getUrl(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key];
  if (prop?.type === "url") {
    return prop.url;
  }
  return null;
}
