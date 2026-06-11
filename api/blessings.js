import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set CORS headers so that it works seamlessly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const tmpPath = path.join('/tmp', 'blessings.json');
  const rootPath = path.resolve(process.cwd(), 'blessings.json');

  // Helper function to read wishes
  const readWishes = () => {
    try {
      if (fs.existsSync(tmpPath)) {
        return JSON.parse(fs.readFileSync(tmpPath, 'utf-8') || '[]');
      }
      if (fs.existsSync(rootPath)) {
        const rootData = fs.readFileSync(rootPath, 'utf-8');
        // Cache it in /tmp on first read
        try {
          fs.writeFileSync(tmpPath, rootData, 'utf-8');
        } catch (e) {
          console.error("Failed to write initial cache to /tmp", e);
        }
        return JSON.parse(rootData || '[]');
      }
    } catch (err) {
      console.error("Error reading wishes:", err);
    }
    return [];
  };

  // Helper function to write wishes
  const writeWishes = (wishes) => {
    try {
      fs.writeFileSync(tmpPath, JSON.stringify(wishes, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error("Error writing wishes:", err);
      return false;
    }
  };

  if (req.method === 'GET') {
    const wishes = readWishes();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(wishes));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newWish = JSON.parse(body);
        if (!newWish || typeof newWish !== 'object') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid wish data' }));
          return;
        }

        const wishes = readWishes();
        const updatedWishes = [newWish, ...wishes];
        
        const success = writeWishes(updatedWishes);
        if (success) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, wishes: updatedWishes }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to persist wish' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}
