export enum PipelineState {
  RECEIVED = "RECEIVED",
  VALIDATING = "VALIDATING",
  STORED = "STORED",
  PROCESSING = "PROCESSING",
  CLASSIFIED = "CLASSIFIED",
  EDITORIAL_REVIEW = "EDITORIAL_REVIEW",
  VERIFICATION = "VERIFICATION",
  DECISION = "DECISION",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PUBLISHED = "PUBLISHED",
  PRESERVED = "PRESERVED"
}

export const VALID_TRANSITIONS: Record<PipelineState, PipelineState[]> = {
  [PipelineState.RECEIVED]: [PipelineState.VALIDATING],
  [PipelineState.VALIDATING]: [PipelineState.STORED, PipelineState.REJECTED],
  [PipelineState.STORED]: [PipelineState.PROCESSING],
  [PipelineState.PROCESSING]: [PipelineState.CLASSIFIED],
  [PipelineState.CLASSIFIED]: [PipelineState.EDITORIAL_REVIEW],
  [PipelineState.EDITORIAL_REVIEW]: [PipelineState.VERIFICATION],
  [PipelineState.VERIFICATION]: [PipelineState.DECISION],
  [PipelineState.DECISION]: [PipelineState.APPROVED, PipelineState.REJECTED],
  [PipelineState.APPROVED]: [PipelineState.PUBLISHED],
  [PipelineState.PUBLISHED]: [PipelineState.PRESERVED],
  [PipelineState.REJECTED]: [PipelineState.PRESERVED],
  [PipelineState.PRESERVED]: []
};

export function canTransition(from: PipelineState, to: PipelineState): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) || false;
}
