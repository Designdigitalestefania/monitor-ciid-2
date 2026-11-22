import { z } from "zod";

export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["active", "suspended"]).default("active"),
});

export const MaterialTypeSchema = z.enum(["text","communique","bulletin","pdf","document","photo","design","video","audio","link","convocation","statement"]);

export const MaterialSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  sourceId: z.string().uuid().nullable(),
  title: z.string().min(1),
  type: MaterialTypeSchema,
  receivedAt: z.string().datetime(),
  hashSha256: z.string().length(64),
  storageKey: z.string().min(1),
  mimeType: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  status: z.enum(["received","validating","stored","processing","classified","editorial_review","verification","decision","approved","rejected","needs_changes","published","preserved"]),
});

export const PipelineStateSchema = z.enum(["RECEIVED","VALIDATING","STORED","PROCESSING","CLASSIFIED","EDITORIAL_REVIEW","VERIFICATION","DECISION","APPROVED","REJECTED","NEEDS_CHANGES","PUBLISHED_HUMAN","PRESERVED"]);

export const RoleSchema = z.enum(["admin","editor","journalist","reviewer","system"]);

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  status: z.enum(["active","disabled"]).default("active"),
});

export const EditorialDraftSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  materialId: z.string().uuid(),
  title: z.string(),
  hook: z.string(),
  body: z.string(),
  context: z.string(),
  closing: z.string(),
  cta: z.string(),
  hashtags: z.array(z.string()),
  observations: z.string(),
  status: z.enum(["draft","in_review","approved","rejected","needs_changes"]),
});

export const LegislativeSourceStatusSchema = z.enum(["consulted","partial","no_access","error","no_news"]);

export const LegislativeActivitySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  legislatorId: z.string().uuid(),
  kind: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  sourceUrl: z.string().url(),
  verified: z.boolean().default(false),
});
