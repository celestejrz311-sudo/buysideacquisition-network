import app from "./app";
import { logger } from "./lib/logger";
import { seedSampleBuyerRequests } from "./lib/seed-sample-buyer-requests";
import { seedBusinessListings } from "./lib/seed-business-listings";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function startServer(): Promise<void> {
  // Seed sample data on boot
  try {
    await seedSampleBuyerRequests();
    await seedBusinessListings();
    logger.info("Sample data seeded");
  } catch (err) {
    logger.error({ err }, "Failed to seed sample data");
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}

void startServer().catch((err: unknown) => {
  logger.error({ err }, "Unable to start server");
  process.exit(1);
});
