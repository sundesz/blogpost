import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      'process.env': process.env,
    },
    server: {
      port: 3000,
      proxy: {
        '/api/v1': {
          target: `${process.env.VITE_BACKEND_URL}`,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: '../dist',
    },

    plugins: [react()],
  });
};
