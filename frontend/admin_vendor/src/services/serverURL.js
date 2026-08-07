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
export const baseUrl = import.meta.env.VITE_MEDIA_BASE_URL || getLocalServerUrl("/");
