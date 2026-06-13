import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = 'https://vatnbzumvyqguizfsctz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-RQLjVoabbcwSHhVj2FYVg_xGqBHhLL';

// Helper function to read request body as Promise
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

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    watch: {
      ignored: ['**/blessings.json']
    }
  },
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'blessings-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/blessings' && req.method === 'POST') {
            try {
              const body = await getRequestBody(req);
              const newWish = JSON.parse(body);
              if (!newWish || typeof newWish !== 'object') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid wish data' }));
                return;
              }

              // Post to Supabase
              const dbRow = {
                name: newWish.name,
                relation: newWish.relation,
                message: newWish.message,
                timestamp: newWish.timestamp
              };

              const postResponse = await fetch(`${SUPABASE_URL}/rest/v1/blessings`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_KEY,
                  'Authorization': `Bearer ${SUPABASE_KEY}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(dbRow)
              });

              if (postResponse.ok) {
                // Fetch updated wishes list from Supabase
                const getResponse = await fetch(`${SUPABASE_URL}/rest/v1/blessings?select=*&order=id.desc`, {
                  headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                  }
                });
                const wishes = await getResponse.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, wishes }));
              } else {
                const errText = await postResponse.text();
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Supabase error: ${errText}` }));
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          } else if (req.url === '/api/blessings' && req.method === 'GET') {
            try {
              const getResponse = await fetch(`${SUPABASE_URL}/rest/v1/blessings?select=*&order=id.desc`, {
                headers: {
                  'apikey': SUPABASE_KEY,
                  'Authorization': `Bearer ${SUPABASE_KEY}`
                }
              });
              if (getResponse.ok) {
                const wishes = await getResponse.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(wishes));
              } else {
                const errText = await getResponse.text();
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Supabase error: ${errText}` }));
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
})
