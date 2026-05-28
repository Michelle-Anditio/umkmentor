const LOCAL_API_URL = 'http://localhost:8000'

export const API_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || LOCAL_API_URL