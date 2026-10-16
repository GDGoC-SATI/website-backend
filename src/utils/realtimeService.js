// Centralized Real-Time Server-Sent Events (SSE) Service
// Broadcasts database mutations instantly to all connected clients with zero latency

const clients = new Set();

/**
 * Handle incoming SSE connection
 */
export const handleRealtimeStream = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
    'Access-Control-Allow-Origin': '*',
  });

  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', timestamp: Date.now() })}\n\n`);

  clients.add(res);

  // Keep-alive heartbeat every 20s
  const heartbeat = setInterval(() => {
    try {
      res.write(': keepalive\n\n');
    } catch {
      clearInterval(heartbeat);
      clients.delete(res);
    }
  }, 20000);

  req.on('close', () => {
    clearInterval(heartbeat);
    clients.delete(res);
  });
};

/**
 * Broadcast an entity mutation event to all active clients
 * @param {string} entity - 'events' | 'gallery' | 'projects' | 'team' | 'alumni' | 'sections' | 'contact' | 'stats'
 * @param {string} action - 'CREATE' | 'UPDATE' | 'DELETE' | 'REORDER'
 * @param {object} [data] - optional payload
 */
export const broadcastRealtimeUpdate = (entity, action = 'UPDATE', data = null) => {
  if (clients.size === 0) return;

  const message = `event: db-update\ndata: ${JSON.stringify({
    entity,
    action,
    data,
    timestamp: Date.now(),
  })}\n\n`;

  for (const client of clients) {
    try {
      client.write(message);
    } catch {
      clients.delete(client);
    }
  }
};
