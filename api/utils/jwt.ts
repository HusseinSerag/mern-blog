import jwt from "jsonwebtoken";
import log from "./logger";
export function sign(payload: Object, options: jwt.SignOptions) {
  const token = jwt.sign(payload, process.env.JWT_KEY!, options);
  return token;
}

export function verify(token: string) {
  try {
    log.info(process.env.JWT_KEY);
    const decodedURL = jwt.verify(
      token,
      process.env.JWT_KEY!
    ) as jwt.JwtPayload;

    return decodedURL;
  } catch (e) {
    throw e;
  }
}