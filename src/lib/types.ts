export interface Idea {
  id: string;
  title: string;
  score: number;
  marketSize: string;
  feasibility: string;
  productName: string;
  summary: string;
  shouldPursue: boolean;
  emailId: string;
}

export interface Venture {
  id: string;
  productName: string;
  stage: Stage;
  score: number;
  tagline: string;
  targetAudience: string;
  valueProposition: string;
  siteUrl: string | null;
  repoUrl: string | null;
  monthlyRevenue: number;
  totalRevenue: number;
  visitors: number;
  conversions: number;
}

export type Stage = "research" | "build" | "deploy" | "marketing" | "complete" | "failed";

export const STAGES: Stage[] = ["research", "build", "deploy", "marketing", "complete", "failed"];
