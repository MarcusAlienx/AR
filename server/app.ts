import express from "express";
import { registerRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export async function setupApp() {
  await registerRoutes(app);
  return app;
}
