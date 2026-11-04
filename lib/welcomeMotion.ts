export const WELCOME_MOTIONS = ["expand", "converge", "bloom"] as const;
export type WelcomeMotionId = (typeof WELCOME_MOTIONS)[number];

export function isWelcomeMotion(value: string | undefined): value is WelcomeMotionId {
  return WELCOME_MOTIONS.includes(value as WelcomeMotionId);
}

export function resolveWelcomeMotion(value: string | undefined): WelcomeMotionId {
  if (isWelcomeMotion(value)) return value;
  return "converge";
}
