import mongoose from "mongoose";
import log from "./logger";
export default async function connect() {
  const databaseUri = process.env.DATABASE_URI!;
  const databasePassword = process.env.DATABASE_PASSWORD!;
  const databaseConnectionString = databaseUri.replace(
    "<PASSWORD>",
    databasePassword
  );

  return mongoose
    .connect(databaseConnectionString)
    .then(function () {
      log.info("Database connected successfully");
    })
    .catch((error) => {
      log.fatal(error);
      log.fatal("Database connection failed!");
    });
}
