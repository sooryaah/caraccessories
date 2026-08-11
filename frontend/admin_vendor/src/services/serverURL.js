const getLocalServerUrl = (path) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.")) {
      return `http://${hostname}:8000${path}`;
    }
  }
  return path;
};

export const serverurl = import.meta.env.VITE_API_BASE_URL || getLocalServerUrl("/api");
export const baseUrl = import.meta.env.VITE_MEDIA_BASE_URL || getLocalServerUrl("");

/**
 * Returns a media URL safe for both local dev and production Vercel deployment.
 * On Vercel (HTTPS), it converts absolute HTTP backend media URLs to relative paths (/media/...)
 * so Vercel's rewrite proxy can fetch them over HTTP backend securely without Mixed Content errors.
 */
export const getMediaUrl = (path) => {
  if (!path) return "";
  
  // If backend returns an absolute HTTP URL like "http://13.233.157.90/media/sample.jpg"
  if (typeof path === "string" && path.startsWith("http")) {
    try {
      const parsed = new URL(path);
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname !== "localhost" && hostname !== "127.0.0.1" && !hostname.startsWith("192.168.")) {
          return parsed.pathname; // returns "/media/..." relative path for Vercel proxy
        }
      }
    } catch (e) {
      // fallback if URL parsing fails
    }
    return path;
  }

  // If path is a relative string (e.g., "/media/..." or "media/...")
  if (typeof path === "string") {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.")) {
        return `http://${hostname}:8000${cleanPath}`;
      }
      return cleanPath;
    }
  }

  return path;
};
