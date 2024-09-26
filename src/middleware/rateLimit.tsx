// File: src/middleware/rateLimit.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60, // Per 60 seconds
});

export default async function rateLimitMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    await rateLimiter.consume(req.socket.remoteAddress ?? 'anonymous');
    next();
  } catch {
    res.status(429).json({ message: 'Too Many Requests' });
  }
}