export const APP_NAME = "monitor-ciid-2";
export class AppError extends Error {
  constructor(public code: string, message: string, public status = 400) {
    super(message);
  }
}
