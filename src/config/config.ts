export const config = {
  PORT: Number(process.env.PORT),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  SECRET_KEY:
    process.env.SECRET_KEY ||
    "jJAKLJO..,,.2@@@2U8901092222904688448161414918921",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
