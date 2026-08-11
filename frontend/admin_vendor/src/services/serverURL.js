const getSanitizedServerUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.");

    if (isLocal) {
      return envUrl || `http://${hostname}:8000/api`;
    }

    // On Production/Vercel (HTTPS):
    // If envUrl is an absolute "http://..." URL (insecure HTTP), strip out host domain
    // to use relative "/api" path so requests route through Vercel proxy securely!
    if (envUrl && envUrl.startsWith("http")) {
      try {
        const parsed = new URL(envUrl);
        const p = parsed.pathname;
        return p && p !== "/" ? (p.endsWith('/') ? p.slice(0, -1) : p) : "/api";
      } catch (e) {
        return "/api";
      }
    }

    return (envUrl && envUrl.startsWith("/")) ? envUrl : "/api";
  }

  return envUrl || "/api";
};

export const serverurl = getSanitizedServerUrl();
export const baseUrl = import.meta.env.VITE_MEDIA_BASE_URL || "";

/**
 * Returns a media URL safe for both local dev and production Vercel deployment.
 * On Vercel (HTTPS), it converts absolute HTTP backend media URLs to relative paths (/media/...)
 * so Vercel's rewrite proxy can fetch them over HTTP backend securely without Mixed Content errors.
 */
export const getMediaUrl = (path) => {
  if (!path) return "";

  // If path is an object containing image/url property
  if (typeof path === "object" && path !== null) {
    path = path.image || path.url || "";
  }
  
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

  // If path is a relative string (e.g., "/media/...", "media/...", or "products_image/...")
  if (typeof path === "string") {
    let cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Ensure path starts with /media/ for proper backend media routing
    if (!cleanPath.startsWith("/media/")) {
      cleanPath = `/media${cleanPath}`;
    }

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
