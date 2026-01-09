const BASE_URL = 'https://api.sansekai.my.id/api';

const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    // Check if response is not JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API returned non-JSON:", contentType);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

export const api = {
  getLatestAnime: async () => {
    // Returns Array
    return await fetchAPI('/anime/latest');
  },

  getRecommendedAnime: async () => {
    // Returns Array
    return await fetchAPI('/anime/recommended');
  },

  searchAnime: async (query) => {
    // Returns { data: [ { result: [...] } ] }
    const res = await fetchAPI(`/anime/search?query=${encodeURIComponent(query)}`);
    if (res?.data?.[0]?.result) {
      return res.data[0].result;
    }
    return [];
  },

  getAnimeDetail: async (slug) => {
    // Verified: uses ?urlId=
    return await fetchAPI(`/anime/detail?urlId=${slug}`);
  },

  getAnimeMovies: async () => {
    // Assuming /anime/movie endpoint exists
    return await fetchAPI('/anime/movie');
  },

  getVideo: async (slug) => {
    // Verified: uses ?chapterUrlId=
    return await fetchAPI(`/anime/getvideo?chapterUrlId=${slug}`);
  }
};
