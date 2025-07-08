const devConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
};

const prodConfig = {
  baseURL: import.meta.env.VITE_API_URL, // Use env var in prod too
};

export const config = import.meta.env.MODE === 'development' ? devConfig : prodConfig;
