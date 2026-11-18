import { z } from "zod";
export const EditorialOutputSchema = z.object({
  agent_id: z.literal("monitor-editorial"), status: z.literal("completed"),
  source: z.object({ name: z.string(), source_type: z.string() }),
  material: z.object({ material_id: z.string(), extracted_text: z.string() }),
  analysis: z.object({ summary: z.string(), topic: z.string(), unverified_claims: z.array(z.string()) }),
  editorial_proposal: z.object({ headline: z.string(), body: z.string() }),
  verification: z.object({ status: z.string(), required_checks: z.array(z.string()) }),
  human_review: z.object({ required: z.literal(true), status: z.string(), reviewer: z.null(), decision: z.null() })
});
