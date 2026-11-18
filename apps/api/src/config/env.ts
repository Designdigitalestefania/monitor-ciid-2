import "dotenv/config";
import { z } from "zod";
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().url(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(10)
});
const result = schema.safeParse(process.env);
if (!result.success) { console.error(result.error.flatten()); throw new Error("Configuración inválida"); }
export const env = result.data;
