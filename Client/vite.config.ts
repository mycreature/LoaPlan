import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }], // '@'를 '/src' 폴더로 대체
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false, // HTTPS를 사용하는 경우 true로 설정
      },
    },
  },
})
