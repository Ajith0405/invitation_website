import fs from 'fs';
import path from 'path';

// Helper function to read request body as Promise to ensure Vercel handler awaits it
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

export default async function handler(req, res) {
  // Set CORS headers so that it works seamlessly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vatnbzumvyqguizfsctz.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_-RQLjVoabbcwSHhVj2FYVg_xGqBHhLL';

  // Helper function to read wishes from Supabase with fallback to local file
  const readWishes = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/blessings?select=*&order=id.desc`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errText = await response.text();
        console.error("Supabase GET error:", response.status, errText);
      }
    } catch (err) {
      console.error("Error connecting to Supabase GET:", err);
    }

    // Fallback: read from blessings.json if Supabase fails
    try {
      const rootPath = path.resolve(process.cwd(), 'blessings.json');
      if (fs.existsSync(rootPath)) {
        return JSON.parse(fs.readFileSync(rootPath, 'utf-8') || '[]');
      }
    } catch (e) {
      console.error("Local file read fallback failed:", e);
    }
    return [];
  };

  // Helper function to write wish to Supabase
  const writeWish = async (newWish) => {
    try {
      const dbRow = {
        name: newWish.name,
        relation: newWish.relation,
        message: newWish.message,
        timestamp: newWish.timestamp
      };

      const response = await fetch(`${SUPABASE_URL}/rest/v1/blessings`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(dbRow)
      });

      if (response.ok) {
        return true;
      } else {
        const errText = await response.text();
        console.error("Supabase POST error:", response.status, errText);
      }
    } catch (err) {
      console.error("Error connecting to Supabase POST:", err);
    }
    return false;
  };

  if (req.method === 'GET') {
    const wishes = await readWishes();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(wishes));
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = await getRequestBody(req);
      const newWish = JSON.parse(body);
      if (!newWish || typeof newWish !== 'object') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid wish data' }));
        return;
      }

      const success = await writeWish(newWish);
      if (success) {
        const wishes = await readWishes();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, wishes }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to write wish to Supabase' }));
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body or JSON' }));
    }
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}
