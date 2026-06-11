import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

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
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/blessings' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const newWish = JSON.parse(body);
                const filePath = path.resolve('blessings.json');
                
                let wishes = [];
                if (fs.existsSync(filePath)) {
                  const data = fs.readFileSync(filePath, 'utf-8');
                  wishes = JSON.parse(data || '[]');
                }
                
                wishes = [newWish, ...wishes];
                fs.writeFileSync(filePath, JSON.stringify(wishes, null, 2), 'utf-8');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, wishes }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else if (req.url === '/api/blessings' && req.method === 'GET') {
            try {
              const filePath = path.resolve('blessings.json');
              let wishes = [];
              if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8');
                wishes = JSON.parse(data || '[]');
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(wishes));
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
