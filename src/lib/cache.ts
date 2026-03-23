interface CacheValue {
  [key: string]: unknown; // you can narrow this if you know the structure
}

const cache = new Map<string, CacheValue>();

export function getCache(key: string): CacheValue | undefined {
  return cache.get(key);
}

export function setCache(key: string, value: CacheValue) {
  cache.set(key, value);
}