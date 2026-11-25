import "dotenv/config";
import { z } from "zod";

const originsSchema = z
  .string()
  .default("http://localhost:3000")
  .transform((value) => value.split(",").map((origin) => origin.trim()).filter(Boolean));

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().url(),
  CORS_ORIGINS: originsSchema,
  // Deliberately has no development fallback: use a locally generated secret.
  JWT_SECRET: z.string().min(32),
}).superRefine((config, context) => {
  if (config.CORS_ORIGINS.length === 0) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["CORS_ORIGINS"], message: "Configure at least one trusted origin." });
  }
  if (config.NODE_ENV === "production" && config.CORS_ORIGINS.some((origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin))) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["CORS_ORIGINS"], message: "Production origins must not point to localhost." });
  }
});

const result = schema.safeParse(process.env);
if (!result.success) {
  const fields = result.error.issues.map((issue) => issue.path.join(".") || "environment").join(", ");
  throw new Error(`Invalid API configuration. Check: ${fields}`);
}

export const env = result.data;
