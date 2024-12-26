import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/checker': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/switch_bot': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/notify': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/token': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/login': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/logout': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/data': {
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/ws': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
            },
        }
    }
})
