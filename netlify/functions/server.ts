import app from '../../server/app';
import serverless from 'serverless-http';

// This file is the entry point for the Netlify serverless function.
// It imports the core Express app and wraps it with serverless-http.
// Netlify's CDN handles serving static files from the 'publish' directory.

export const handler = serverless(app);