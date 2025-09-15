import 'dotenv/config';
import app from './app';
import { setupVite } from './vite';
import { log } from './log';

// This file is the entry point for local development.
// It imports the core app, adds the Vite middleware, and starts the server.

async function startDevServer() {
  // Add Vite middleware for HMR and development
  await setupVite(app);

  const port = parseInt(process.env.PORT || '5000', 10);

  app.listen(port, "0.0.0.0", () => {
    log(`Server listening on http://localhost:${port}`);
  });
}

startDevServer();