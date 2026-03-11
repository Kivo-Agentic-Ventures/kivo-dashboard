import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getTitle, getRichText, getNumber, getSelect, getCheckbox, getUrl } from "./parsers";
import type { Idea, Venture, Stage } from "./types";

const IDEAS_DB_ID = "f870e6b515754d6a88636f4896934fc6";
const VENTURES_DB_ID = "33e4c95474634b88873d3e01630240de";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function fetchIdeas(): Promise<Idea[]> {
  const response = await notion.databases.query({
    database_id: IDEAS_DB_ID,
    sorts: [{ property: "Score", direction: "descending" }],
    page_size: 100,
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map((page) => ({
      id: page.id,
      title: getTitle(page, "Idea"),
      score: getNumber(page, "Score"),
      marketSize: getSelect(page, "Market Size"),
      feasibility: getSelect(page, "Feasibility"),
      productName: getRichText(page, "Product Name"),
      summary: getRichText(page, "Summary"),
      shouldPursue: getCheckbox(page, "Should Pursue"),
      emailId: getRichText(page, "Email ID"),
    }));
}

export async function fetchVentures(): Promise<Venture[]> {
  const response = await notion.databases.query({
    database_id: VENTURES_DB_ID,
    sorts: [{ property: "Score", direction: "descending" }],
    page_size: 100,
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map((page) => ({
      id: page.id,
      productName: getTitle(page, "Product Name"),
      stage: getSelect(page, "Stage") as Stage,
      score: getNumber(page, "Score"),
      tagline: getRichText(page, "Tagline"),
      targetAudience: getRichText(page, "Target Audience"),
      valueProposition: getRichText(page, "Value Proposition"),
      siteUrl: getUrl(page, "Site URL"),
      repoUrl: getUrl(page, "Repo URL"),
      monthlyRevenue: getNumber(page, "Monthly Revenue"),
      totalRevenue: getNumber(page, "Total Revenue"),
      visitors: getNumber(page, "Visitors"),
      conversions: getNumber(page, "Conversions"),
    }));
}
