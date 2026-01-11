const BASE_URL = 'https://api.sansekai.my.id/api';

// Cache configuration (TTL in milliseconds)
const CACHE_TTL = {
  LATEST: 15 * 60 * 1000,        // 15 menit - data sering berubah
  RECOMMENDED: 15 * 60 * 1000,   // 15 menit - data sering berubah
  DETAIL: 60 * 60 * 1000,        // 1 jam - data relatif stabil
  SEARCH: 30 * 60 * 1000,        // 30 menit - cache per query
  VIDEO: 5 * 60 * 1000,          // 5 menit - link bisa expire
  MOVIE: 30 * 60 * 1000,         // 30 menit - data jarang berubah
};

// Request queue untuk rate limiting
let requestQueue = [];
let isProcessingQueue = false;
const REQUEST_DELAY = 500; // 500ms delay antar request

// ===== CACHE MANAGEMENT =====
const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`anime_cache_${key}`);
    if (!cached) return null;

    const { data, timestamp, ttl } = JSON.parse(cached);
    const now = Date.now();

    // Cek apakah cache masih valid
    if (now - timestamp < ttl) {
      console.log(`✅ Cache hit: ${key}`);
      return data;
    }

    // Cache expired, hapus
    localStorage.removeItem(`anime_cache_${key}`);
    console.log(`⏰ Cache expired: ${key}`);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

const setCachedData = (key, data, ttl) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(`anime_cache_${key}`, JSON.stringify(cacheData));
    console.log(`💾 Cached: ${key} (TTL: ${ttl / 60000} menit)`);
  } catch (error) {
    // Handle localStorage quota exceeded
    if (error.name === 'QuotaExceededError') {
      console.warn('Cache storage full, clearing old cache...');
      clearOldCache();
      // Try again
      try {
        localStorage.setItem(`anime_cache_${key}`, JSON.stringify({ data, timestamp: Date.now(), ttl }));
      } catch (e) {
        console.error('Failed to cache even after cleanup:', e);
      }
    }
  }
};

const clearOldCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(k => k.startsWith('anime_cache_'));

    // Hapus cache yang sudah expired
    cacheKeys.forEach(key => {
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const { timestamp, ttl } = JSON.parse(cached);
          if (Date.now() - timestamp >= ttl) {
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        // Invalid cache entry, hapus
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing old cache:', error);
  }
};

// Export untuk debugging/admin
export const clearAllCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(k => k.startsWith('anime_cache_'));
    cacheKeys.forEach(k => localStorage.removeItem(k));
    console.log('🗑️ All cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// ===== REQUEST QUEUE =====
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const { fn, resolve, reject } = requestQueue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    }

    // Delay sebelum request berikutnya
    if (requestQueue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }
  }

  isProcessingQueue = false;
};

const queueRequest = (fn) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fn, resolve, reject });
    processQueue();
  });
};

// ===== FETCH WITH RETRY =====
const fetchWithRetry = async (endpoint, retries = 3, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      // Handle rate limit (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : backoff * Math.pow(2, i);
        console.warn(`⚠️ Rate limited, retry ${i + 1}/${retries} after ${waitTime}ms`);

        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        throw new Error('Rate limit exceeded');
      }

      // Check content type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("API returned non-JSON:", contentType);
        return null;
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`Error fetching ${endpoint} (attempt ${i + 1}/${retries}):`, error);

      // Jika bukan attempt terakhir, retry dengan exponential backoff
      if (i < retries - 1) {
        const waitTime = backoff * Math.pow(2, i);
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        // Attempt terakhir gagal
        return null;
      }
    }
  }

  return null;
};

// ===== API METHODS =====
export const api = {
  getLatestAnime: async () => {
    const cacheKey = 'latest';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const data = await fetchWithRetry('/anime/latest');
      if (data) {
        setCachedData(cacheKey, data, CACHE_TTL.LATEST);
      }
      return data;
    });
  },

  getRecommendedAnime: async () => {
    const cacheKey = 'recommended';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const data = await fetchWithRetry('/anime/recommended');
      if (data) {
        setCachedData(cacheKey, data, CACHE_TTL.RECOMMENDED);
      }
      return data;
    });
  },

  searchAnime: async (query) => {
    const cacheKey = `search_${query}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const res = await fetchWithRetry(`/anime/search?query=${encodeURIComponent(query)}`);
      let result = [];

      if (res?.data?.[0]?.result) {
        result = res.data[0].result;
      }

      if (result.length > 0) {
        setCachedData(cacheKey, result, CACHE_TTL.SEARCH);
      }

      return result;
    });
  },

  getAnimeDetail: async (slug) => {
    const cacheKey = `detail_${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const data = await fetchWithRetry(`/anime/detail?urlId=${slug}`);
      if (data) {
        setCachedData(cacheKey, data, CACHE_TTL.DETAIL);
      }
      return data;
    });
  },

  getAnimeMovies: async () => {
    const cacheKey = 'movies';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const data = await fetchWithRetry('/anime/movie');
      if (data) {
        setCachedData(cacheKey, data, CACHE_TTL.MOVIE);
      }
      return data;
    });
  },

  getVideo: async (slug) => {
    const cacheKey = `video_${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    return queueRequest(async () => {
      const data = await fetchWithRetry(`/anime/getvideo?chapterUrlId=${slug}`);
      if (data) {
        setCachedData(cacheKey, data, CACHE_TTL.VIDEO);
      }
      return data;
    });
  }
};
