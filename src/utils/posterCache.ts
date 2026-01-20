// utils/posterCache.ts
const POSTER_CACHE_KEY = "poster-cache-v1";

type PosterCache = Record<string, string | null>;

export function getPoster(imdbID: string): string | null | undefined {
    const cache = JSON.parse(localStorage.getItem(POSTER_CACHE_KEY) || "{}") as PosterCache;

    return cache[imdbID];
}

export function savePoster(imdbID: string, url: string | null) {
    const cache = JSON.parse(localStorage.getItem(POSTER_CACHE_KEY) || "{}") as PosterCache;

    cache[imdbID] = url;
    localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
}