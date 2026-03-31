import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
  }
} catch {
  // Redis not configured
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(maxAttempts: number): Ratelimit | null {
  if (!redis) return null;
  const key = `${maxAttempts}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maxAttempts, '15 m'),
      analytics: false,
      prefix: 'ratelimit',
    });
    limiters.set(key, limiter);
  }
  return limiter;
}

export async function checkRateLimit(
  key: string,
  maxAttempts: number = 5
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  try {
    const limiter = getLimiter(maxAttempts);
    if (!limiter) return { allowed: true };

    const { success, reset } = await limiter.limit(key);

    if (!success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return { allowed: false, retryAfterSeconds };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check failed:', error instanceof Error ? error.message : 'Unknown error');
    return { allowed: true };
  }
}
