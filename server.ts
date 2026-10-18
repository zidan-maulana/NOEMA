import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import handler from "./api/analyze";

// Load environment variables from .env.local first, then .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50kb" }));

  // Middleware penangkap error format JSON korup
  app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof SyntaxError && "body" in err) {
      return res.status(400).json({
        errorType: "input",
        error: "Format data yang dikirimkan tidak valid atau rusak.",
      });
    }
    next();
  });

  // API endpoint for analyzing difficult paragraphs from books
  // Directly delegates to Vercel Serverless Function handler for parity
  app.all("/api/analyze", (req, res) => {
    return handler(req, res);
  });

  // Serve static files / dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`[Noema Server] Running on http://localhost:${port}`);
  });
}

startServer();
